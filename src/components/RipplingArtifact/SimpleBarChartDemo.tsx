import "./SimpleBarChartDemo.css";

const Y_AXIS = ["100", "80", "60", "40", "20", "0"];

export type ChartDemoVariant = "bar" | "stacked-bar";

export const CHART_VARIANT_OPTIONS: readonly { id: ChartDemoVariant; label: string }[] = [
  { id: "bar", label: "Bar" },
  { id: "stacked-bar", label: "Stacked bar" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] as const;
const PRIMARY = [65, 45, 78, 55, 70, 50, 82, 62];

/** Stacked segments — purple ramp (Figma · stacked bar · 860:17310). */
const STACK_RATIOS = [0.18, 0.22, 0.2, 0.22, 0.18] as const;
const STACK_COLORS = [
  "rgb(74, 0, 57)",
  "rgb(159, 30, 122)",
  "rgb(206, 113, 187)",
  "rgb(234, 184, 242)",
  "rgb(252, 233, 255)",
] as const;

const PLOT_H = 196;

export type SimpleBarChartDemoProps = {
  variant?: ChartDemoVariant;
};

export function SimpleBarChartDemo({ variant = "bar" }: SimpleBarChartDemoProps) {
  const trackPx = PLOT_H;

  const min = Math.min(...PRIMARY);
  const max = Math.max(...PRIMARY);
  const monthRange = `${MONTHS[0]} through ${MONTHS[MONTHS.length - 1]}`;
  const ariaByVariant: Record<ChartDemoVariant, string> = {
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
                <div
                  className="bar-chart-bar"
                  style={{ height: Math.round((trackPx * PRIMARY[i]!) / 100) }}
                />
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

      <div className="bar-chart-source">
        <p className="bar-chart-source-label">Source info</p>
        <p className="bar-chart-source-desc">
          Here’s some info about the report if you want to give some additional context to
        </p>
      </div>
    </div>
  );
}
