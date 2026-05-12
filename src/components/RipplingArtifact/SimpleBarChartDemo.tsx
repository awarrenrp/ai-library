import "./SimpleBarChartDemo.css";

/*
 * Chart demos for the Rippling-native artifact shell.
 *
 * Each variant follows the rules in `skills/dashboard-data-viz/` (a project-
 * local snapshot of the dashboard data-viz skill). The rules drove the
 * specific design choices here:
 *
 * - `bar` / `stacked-bar` follow charts/bar.md + charts/stacked.md (zero
 *    baseline, single hue, value-sorted dataset).
 * - `line` follows charts/line.md (no point markers, endpoint label, non-zero
 *    baseline is fine for an unbounded metric, wider-than-tall aspect).
 * - `area` follows charts/line.md "Areas under lines" (single series only,
 *    fill carries total magnitude).
 * - `donut` follows charts/donut.md (≤3 slices, sorted desc, accent-on-grey,
 *    no legend, direct labels with category + percentage + value, total in
 *    the subtitle).
 * - `kpi` follows charts/single-value.md (label → big number → comparison →
 *    inline sparkline; symbol unit baked into the number; left-aligned).
 */

export type ChartDemoVariant = "bar" | "stacked-bar" | "line" | "area" | "donut" | "kpi";

export const CHART_VARIANT_OPTIONS: readonly { id: ChartDemoVariant; label: string }[] = [
  { id: "bar", label: "Bar" },
  { id: "stacked-bar", label: "Stacked bar" },
  { id: "line", label: "Line" },
  { id: "area", label: "Area" },
  { id: "donut", label: "Donut" },
  { id: "kpi", label: "Single value" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] as const;
const PRIMARY = [65, 45, 78, 55, 70, 50, 82, 62];
const Y_AXIS = ["100", "80", "60", "40", "20", "0"];
const PLOT_H = 196;

/* Stacked segments — purple ramp (Figma · stacked bar · 860:17310). */
const STACK_RATIOS = [0.18, 0.22, 0.2, 0.22, 0.18] as const;
const STACK_COLORS = [
  "rgb(74, 0, 57)",
  "rgb(159, 30, 122)",
  "rgb(206, 113, 187)",
  "rgb(234, 184, 242)",
  "rgb(252, 233, 255)",
] as const;

/*
 * Donut dataset — three segments, sorted descending. Pulled from the worked
 * example in charts/donut.md so the chart demonstrates a textbook-correct
 * use of the form (clear leader, 3 slices, part-to-whole). The accent slice
 * (Enterprise) carries the dashboard primary hue; the rest are mid + light
 * greys per the "accent-on-grey" rule.
 */
const DONUT_SEGMENTS = [
  { id: "enterprise", label: "Enterprise", value: 6.2, share: 0.58, color: "var(--color-primary, #7a005d)" },
  { id: "mid-market", label: "Mid-market", value: 3.1, share: 0.29, color: "rgb(0 0 0 / 35%)" },
  { id: "smb", label: "SMB", value: 1.4, share: 0.13, color: "rgb(0 0 0 / 18%)" },
] as const;
const DONUT_TOTAL = DONUT_SEGMENTS.reduce((acc, s) => acc + s.value, 0);

/* KPI dataset — Q3 revenue total, with a 12-month run-up for the sparkline. */
const KPI_VALUE_LABEL = "$10.7M";
const KPI_METRIC_LABEL = "Q3 revenue";
const KPI_PERIOD_LABEL = "as of 30 Sep";
const KPI_DELTA_LABEL = "+12% vs Q2";
const KPI_DELTA_DIRECTION: "up" | "down" = "up";
const KPI_SPARKLINE = [6.4, 6.8, 7.2, 7.0, 7.8, 8.1, 8.6, 9.1, 9.0, 9.6, 10.2, 10.7];

export type SimpleBarChartDemoProps = {
  variant?: ChartDemoVariant;
};

export function SimpleBarChartDemo({ variant = "bar" }: SimpleBarChartDemoProps) {
  if (variant === "donut") return <DonutChart />;
  if (variant === "kpi") return <KpiTile />;
  if (variant === "line") return <LinePlot mode="line" />;
  if (variant === "area") return <LinePlot mode="area" />;
  return <BarPlot variant={variant} />;
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Bar + Stacked bar (existing renderer, factored out)                      */
/* ──────────────────────────────────────────────────────────────────────── */

function BarPlot({ variant }: { variant: Extract<ChartDemoVariant, "bar" | "stacked-bar"> }) {
  const trackPx = PLOT_H;
  const min = Math.min(...PRIMARY);
  const max = Math.max(...PRIMARY);
  const monthRange = `${MONTHS[0]} through ${MONTHS[MONTHS.length - 1]}`;
  const ariaByVariant: Record<typeof variant, string> = {
    bar: `Sample bar chart, sales ${monthRange}. Y axis 0 to 100, values range ${min} to ${max}.`,
    "stacked-bar": `Sample stacked bar chart, sales ${monthRange}. Y axis 0 to 100, totals range ${min} to ${max}; five-segment purple ramp from base to top.`,
  };

  return (
    <div className={["bar-chart-demo", `bar-chart-demo--${variant}`].join(" ")}>
      <div className="bar-chart-demo-inner">
        <div className="bar-chart-y" aria-hidden>
          {Y_AXIS.map((label) => (
            <span key={label} className="bar-chart-y-label">
              {label}
            </span>
          ))}
        </div>

        {variant === "bar" && (
          <div className="bar-chart-bars bar-chart-bars--simple" role="img" aria-label={ariaByVariant.bar}>
            {MONTHS.map((month, i) => (
              <div key={month} className="bar-chart-column">
                <div className="bar-chart-bar" style={{ height: Math.round((trackPx * PRIMARY[i]!) / 100) }} />
                <span className="bar-chart-x-label">{month}</span>
              </div>
            ))}
          </div>
        )}

        {variant === "stacked-bar" && (
          <div className="bar-chart-bars bar-chart-bars--stacked" role="img" aria-label={ariaByVariant["stacked-bar"]}>
            {MONTHS.map((month, i) => {
              const totalH = Math.round((trackPx * PRIMARY[i]!) / 100);
              return (
                <div key={month} className="bar-chart-column">
                  <div className="bar-chart-stack">
                    {STACK_RATIOS.map((ratio, j) => {
                      const h = Math.max(0, Math.round(totalH * ratio));
                      const isTop = j === STACK_RATIOS.length - 1;
                      return (
                        <div
                          key={j}
                          className={["bar-chart-stack-seg", isTop ? "bar-chart-stack-seg--top" : ""]
                            .filter(Boolean)
                            .join(" ")}
                          style={{ height: h, background: STACK_COLORS[j] }}
                        />
                      );
                    })}
                  </div>
                  <span className="bar-chart-x-label">{month}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ChartFooter />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Line + Area                                                              */
/* ──────────────────────────────────────────────────────────────────────── */

/*
 * Inline SVG line / area plot. Same dataset + y-axis as the bar charts so
 * the variants are honestly comparable (charts/line.md: "consistent axes
 * across comparable charts"). The fill in `mode="area"` is a single-series
 * fill — charts/line.md flags overlapping stacked areas as an anti-pattern;
 * single-series fills are fine when total magnitude is the message.
 */
function LinePlot({ mode }: { mode: "line" | "area" }) {
  const width = 480;
  const height = PLOT_H;
  const padX = 8;
  const padBottom = 14;
  const innerW = width - padX * 2;
  const innerH = height - padBottom;

  const stepX = innerW / (PRIMARY.length - 1);
  const points = PRIMARY.map((v, i) => {
    const x = padX + i * stepX;
    const y = padBottom + (innerH - (innerH * v) / 100);
    return { x, y, value: v };
  });
  const polyline = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  /* Area path: bottom-left → up to first point → line through each → bottom-right → close. */
  const areaPath =
    `M ${points[0]!.x.toFixed(1)} ${height} ` +
    points.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    ` L ${points[points.length - 1]!.x.toFixed(1)} ${height} Z`;
  const monthRange = `${MONTHS[0]} through ${MONTHS[MONTHS.length - 1]}`;
  const min = Math.min(...PRIMARY);
  const max = Math.max(...PRIMARY);

  const lastPoint = points[points.length - 1]!;
  const lastValue = PRIMARY[PRIMARY.length - 1]!;

  return (
    <div className={`bar-chart-demo bar-chart-demo--${mode}`}>
      <div className="bar-chart-demo-inner">
        <div className="bar-chart-y" aria-hidden>
          {Y_AXIS.map((label) => (
            <span key={label} className="bar-chart-y-label">
              {label}
            </span>
          ))}
        </div>

        <div className="line-chart-plot">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="line-chart-svg"
            role="img"
            aria-label={
              mode === "line"
                ? `Line chart of sales ${monthRange}. Values range ${min} to ${max}.`
                : `Area chart of sales ${monthRange}. Filled to show cumulative magnitude; values range ${min} to ${max}.`
            }
          >
            {mode === "area" ? (
              <path d={areaPath} fill="var(--color-primary, #7a005d)" fillOpacity="0.18" />
            ) : null}
            <polyline
              points={polyline}
              fill="none"
              stroke="var(--color-primary, #7a005d)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {/*
              Endpoint marker — charts/line.md omits markers by default but
              calls out the endpoint as a useful exception so the direct
              label has somewhere to anchor.
            */}
            <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="var(--color-primary, #7a005d)" />
          </svg>

          {/* Endpoint label — charts/line.md "Endpoint labels beat legends". */}
          <span
            className="line-chart-endpoint-label"
            style={{
              left: `min(100%, ${((lastPoint.x / width) * 100).toFixed(2)}%)`,
              top: `${((lastPoint.y / height) * 100).toFixed(2)}%`,
            }}
            aria-hidden
          >
            {lastValue}
          </span>

          <div className="line-chart-x-axis" aria-hidden>
            {MONTHS.map((m) => (
              <span key={m} className="bar-chart-x-label">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ChartFooter />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Donut                                                                    */
/* ──────────────────────────────────────────────────────────────────────── */

/*
 * Donut — 3 slices sorted desc, starting at 12 o'clock proceeding clockwise.
 * Accent slice (focal) carries the dashboard primary hue; the remaining two
 * slices step down through mid-/light-grey per charts/donut.md "accent-on-
 * grey." Direct labels live in a column to the right of the ring (category
 * + percent + value); no legend.
 */
function DonutChart() {
  const size = 168;
  const stroke = 28;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const arcs = DONUT_SEGMENTS.map((seg) => {
    const dash = seg.share * circumference;
    const arc = {
      ...seg,
      dash,
      gap: circumference - dash,
      offset,
    };
    offset += dash;
    return arc;
  });

  return (
    <div className="bar-chart-demo bar-chart-demo--donut">
      <div className="donut-chart-inner">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="donut-chart-svg"
          role="img"
          aria-label={`Donut chart of Q3 revenue by segment. Total $${DONUT_TOTAL.toFixed(1)}M across ${DONUT_SEGMENTS.length} segments.`}
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgb(0 0 0 / 5%)"
            strokeWidth={stroke}
          />
          {arcs.map((arc) => (
            <circle
              key={arc.id}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth={stroke}
              strokeDasharray={`${arc.dash} ${arc.gap}`}
              strokeDashoffset={-arc.offset}
              /* Rotate so the first slice starts at 12 o'clock (donut.md). */
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
        </svg>

        <ul className="donut-chart-legend" aria-hidden>
          {DONUT_SEGMENTS.map((seg) => (
            <li key={seg.id} className="donut-chart-legend-row">
              <span
                className="donut-chart-legend-swatch"
                style={{ background: seg.color }}
              />
              <span className="donut-chart-legend-label">{seg.label}</span>
              <span className="donut-chart-legend-value">
                {Math.round(seg.share * 100)}% · ${seg.value.toFixed(1)}M
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ChartFooter
        label="Q3 revenue by segment"
        desc={`Total $${DONUT_TOTAL.toFixed(1)}M · FY24 constant dollars.`}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Single-value KPI                                                         */
/* ──────────────────────────────────────────────────────────────────────── */

/*
 * KPI tile — hero number first, then comparison, then a tiny sparkline.
 * The unit symbol ($, M) is baked into the number so we never double-render
 * units (single-value.md "unit appears on the number exactly once"). The
 * delta direction renders with an explicit glyph so colour isn't the only
 * channel.
 */
function KpiTile() {
  const sparkW = 200;
  const sparkH = 36;
  const sparkPadX = 2;
  const sparkPadY = 4;
  const innerW = sparkW - sparkPadX * 2;
  const innerH = sparkH - sparkPadY * 2;
  const min = Math.min(...KPI_SPARKLINE);
  const max = Math.max(...KPI_SPARKLINE);
  const range = max - min || 1;
  const step = innerW / (KPI_SPARKLINE.length - 1);
  const polyline = KPI_SPARKLINE.map((v, i) => {
    const x = sparkPadX + i * step;
    const y = sparkPadY + (innerH - (innerH * (v - min)) / range);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="bar-chart-demo bar-chart-demo--kpi">
      <div className="kpi-tile">
        <p className="kpi-tile__label">{KPI_METRIC_LABEL}</p>
        <p className="kpi-tile__value" aria-label={`${KPI_METRIC_LABEL} ${KPI_VALUE_LABEL}`}>
          {KPI_VALUE_LABEL}
        </p>
        <p
          className={[
            "kpi-tile__delta",
            KPI_DELTA_DIRECTION === "up" ? "kpi-tile__delta--up" : "kpi-tile__delta--down",
          ].join(" ")}
        >
          <span aria-hidden className="kpi-tile__delta-glyph">
            {KPI_DELTA_DIRECTION === "up" ? "↑" : "↓"}
          </span>
          <span>{KPI_DELTA_LABEL}</span>
          <span className="kpi-tile__period">{KPI_PERIOD_LABEL}</span>
        </p>

        <svg
          viewBox={`0 0 ${sparkW} ${sparkH}`}
          className="kpi-tile__sparkline"
          preserveAspectRatio="none"
          role="img"
          aria-label={`12-month trend, values $${min.toFixed(1)}M to $${max.toFixed(1)}M`}
        >
          <polyline
            points={polyline}
            fill="none"
            stroke="var(--color-primary, #7a005d)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <ChartFooter
        label="Q3 revenue · constant dollars"
        desc="Source: Deal registry. Refresh nightly."
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Shared footer (source caption)                                           */
/* ──────────────────────────────────────────────────────────────────────── */

function ChartFooter({
  label = "Source info",
  desc = "Here\u2019s some info about the report if you want to give some additional context to",
}: {
  label?: string;
  desc?: string;
}) {
  return (
    <div className="bar-chart-source">
      <p className="bar-chart-source-label">{label}</p>
      <p className="bar-chart-source-desc">{desc}</p>
    </div>
  );
}
