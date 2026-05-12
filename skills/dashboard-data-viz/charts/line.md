---
name: line
description: Produce chart.geom (line) — time series and continuous-x / continuous-y trends.
governs: chart.geom (line), chart.mark
consumes: dashboard.palette, dashboard.time-range, dashboard.annotation-style
---

# Line chart

A line chart connects ordered (x, y) points with line segments, implying continuity between them. It is the canonical form for time series and any trend reading of a continuous variable. Lines encode value by position — the strongest perceptual channel — and the slope between adjacent points encodes rate of change *for free*, which is why lines beat bars for trend questions even when the x-axis is discrete time periods.

## When to use

- **Time series** — values at regular intervals ordered along a time axis. Monthly revenue, daily active users, quarterly margin.
- Any **continuous-x, continuous-y trend** — even when x is not time (e.g., latency vs load, dose vs response).
- Comparing **a small number of series** (≲4) over the same x range.
- Showing **range** (min/max/median) across a continuous axis — line with shaded band.

## When NOT to use (and alternatives in the palette)

- Values are collected at **irregular** intervals — connecting them fakes continuity that isn't there. Use points only (scatter) or a step line if the underlying process is step-like.
- **Nominal categorical comparison** — regions, products, vendors → [`bar.md`](bar.md).
- Emphasising a **single period's magnitude** rather than the trend — `bar.md`.
- Comparing **two time periods only** → `slopegraph.md` reads more cleanly than a 2-point line.
- **>4 series overlapping** → spaghetti chart; switch to small multiples, a single highlighted line with others greyed, or a slopegraph.
- **Precise value lookup** → `grid.md` or `pivot-table.md`.
- Part-to-whole over time → `stacked.md` or small multiples of lines — rarely stacked area (see anti-patterns).

## Rules

### Line, points, and continuity

- **Connect points with a line** to imply continuity of the underlying process.
- **Omit data-point markers by default** — the line already shows each value; markers add redundant ink. Add markers only when (a) individual points need labels, (b) intervals are infrequent enough that markers aid reading (quarterly with annotation), or (c) you are plotting both line and a few specific discrete events on it.
- **Consistent time intervals on the x-axis** — do not mix monthly and quarterly spacing without a visible indicator. Silently switching cadence distorts the shape of the trend. Library auto-tickers frequently produce visually-uniform ticks that aren't actually uniform (anchored to month starts, so across-month gaps exceed within-month gaps); verify adjacent-tick time deltas are all equal before shipping. See [`../02-graphical-integrity.md`](../02-graphical-integrity.md) and [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md).
- **Don't skip missing periods** — leave a gap in the line or explicitly label the missing span. Closing the gap fakes data.

### Smoothing cyclical noise

Daily metrics on human-activity data — daily active users, logins, tickets opened, requests per minute within business hours — carry cyclical noise that visually dominates the underlying trend:

- **Weekend damping** on enterprise / B2B tools. Activity drops 60–90% on Sat/Sun; weekdays peak. Plotted raw, a daily DAU line looks like a sawtooth swinging from ~10% to ~50% every week, and the trend underneath the saw is invisible.
- **Business-hour peaks** on intraday charts. Same problem at a shorter period.
- **Pay-cycle and month-end spikes** in finance data.
- **Holiday troughs** around major calendar events.

When the chart's job is to show the **trend**, plot a k-period moving average, not the raw daily values. Rules:

- **Default window**: 7 days for daily data with weekly cycles (DAU, daily logins); 24 hours for hourly data with business-hour cycles; month for monthly data with annual cycles.
- **Label the window explicitly** in the subtitle or axis title: "7-day moving average" / "7d MA" — otherwise the reader sees smoother data than the source and doesn't know what they're seeing.
- **Use a trailing (or centered) MA computed in the data pipeline, not a render-time line smoother.** Render smoothing (ECharts `smooth: 0.5`, D3 `curveBasis`) invents intermediate values between real points and is a graphical-integrity violation. The MA is honest because each plotted point is a real computed statistic over a real window.
- **If both trend and variance matter**, show both: plot the raw daily values as a thin, muted line (or small translucent dots) behind the MA. Label the raw data too so the reader knows what they're seeing.
- **At the window edges**, the MA has fewer contributing points — either note the edge effect, use a centered MA with shortened windows at the edges, or truncate the plotted range.

The failure mode: a 90-day DAU chart plotted at daily granularity with no smoothing. The reader sees a chaotic sawtooth, cannot read the trend, and either mis-reads the last-day value as "today's number" (noise) or gives up. The trend the chart exists to show (the ramp, the plateau, the dip) is there in the data but hidden by the cycle amplitude. A 7-day MA makes the trend read at a glance and keeps the dashboard honest.

### Axis and baseline

- **Zero baseline is NOT required for unbounded position metrics** (stock price, latency, NPS, response time) — anchoring at zero often flattens the signal these charts exist to show.
- **BUT zero IS required for share-of-universe metrics** — % of N engineers, share of a fixed customer base, fraction of a known total. Zero (no one) and 100% (everyone) are both real and meaningful values, and cropping the bottom hides the "compared to what" the reader needs. See [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md) "Share-of-universe exception".
- **But don't zoom in so far that a 1% wiggle looks like a collapse**. Pick a range that shows the variation honestly relative to the data's natural scale. A useful heuristic: y-axis range should span roughly 1.5–3× the data's range within the plotted window.
- **If you use a non-zero y-axis, make it obvious** — start the axis on a round number and label it clearly. Do not insert axis breaks.
- **Logarithmic scale** when the data spans orders of magnitude; label the axis `log scale` explicitly.

### Legends, labels, and multi-series

- **Endpoint labels** beat legends — direct-label each line at its right edge where the eye lands. Colour the label the same as its line.
- **Limit to 3–4 lines** before the chart becomes unreadable. When more are needed:
  - Use **small multiples** (one panel per series).
  - Or **highlight one line** in colour, render the rest in muted grey — the "one hawk, many pigeons" pattern.
  - Or switch to a **slopegraph** if you only need first-last comparison.
- **Consistent line weight** for data lines; reserve thicker/highlighted lines for focal series.

### Reference lines and annotations

- **Target, prior year, forecast, budget** — render as a **distinct** line (dashed, muted grey, or a thinner weight) so the reader doesn't mistake them for a data series.
- Direct-label reference lines at their right end (`Target 95%`, `Forecast`).
- **Annotate structural breaks** — a vertical reference line at a methodology change, product launch, or definitional shift, with a short caption. Without this, the reader reads the break as data.
- **Caption on a structural-break line is horizontal** — placed above the plot area, or to the side of the line, never rotated bottom-to-top along the rule. Library defaults (ECharts `markLine`, Plotly) rotate the label by default; override. Full rule in [`../craft/annotations.md`](../craft/annotations.md).
- Label **outliers, peaks, and inflection points** the story turns on.

### Colour

Consumes `dashboard.palette`. Load the resolved palette from [`../encode/color.md`](../encode/color.md) (principles, colorblind-safe defaults) and [`../dashboard/consistency.md`](../dashboard/consistency.md) (dashboard-wide uniformity) before assigning any hue. Don't invent colors at render time.

- One hue for a single-series chart; mute non-focal to grey.
- Multi-series: distinct *hues* (not just lightness), categorical encoding.
- Colour each endpoint label to match its line so the reader never reaches for a legend.

### Aspect ratio

- Line charts respond strongly to aspect ratio — narrow panels exaggerate slopes, wide panels flatten them.
- Default to **wider than tall**, roughly 1.5:1 — the "banking to 45°" principle.
- Keep aspect ratio **consistent across comparable line charts** on the same dashboard.

### Areas under lines

- Filled area under a single line is occasionally fine when the total magnitude is meaningful.
- **Stacked area with overlapping fills** is almost always a mistake — only the bottom series has a true baseline, and overlapping fills mix into muddled colour. Use unfilled overlaid lines or small multiples instead.

## Anti-patterns

- **Mixing time intervals** on the x-axis (monthly then quarterly with no indicator).
- **Non-uniform tick cadence from library auto-tickers** — visually regular ticks at month-day 1, 8, 15, 22, next month's 1 hide 8–10 day gaps among 7-day gaps. Override the default; specify strict-interval or explicit tick positions.
- **Dual-axis** with two unrelated metrics juxtaposed to suggest a correlation — see `combination.md` for when this is legitimate.
- **Zoomed-in y-axis** that turns a 1% move into a visual collapse.
- **Spaghetti** — more than 4 coloured lines overlapping. Switch to small multiples.
- **Points without lines** on regular-interval data (suggests no continuity).
- **Filled areas under multiple overlapping lines** — reads as stacked-area chartjunk.
- **Closing gaps** where data is actually missing.
- **Cluttered markers** on every point of a long line — adds ink, obscures trend.
- Non-deflated nominal dollars over a long span.
- **Raw daily data on a metric with a strong weekly cycle** — a sawtooth of weekend damping overwhelms the trend. Plot a 7-day moving average; see *Smoothing cyclical noise* above.
- **Render-time smoothing** (ECharts `smooth`, D3 `curveBasis`) that invents curve between real points. Smooth the *data* (MA in the pipeline), not the path.
- **Rotated structural-break label** running bottom-to-top along a vertical reference line. Horizontal, above the plot; see [`../craft/annotations.md`](../craft/annotations.md).

## See also

- [`bar.md`](bar.md) — when individual periods are the message
- [`combination.md`](combination.md) — when bars + lines share an axis
- [`slopegraph.md`](slopegraph.md) — two time points, many categories
- [`sparkline.md`](sparkline.md) — miniature lines inline with text/tables
- [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md) — log, truncation, date axes
- [`../encode/color.md`](../encode/color.md) — palette choice and colorblind-safe pairings
- [`../craft/annotations.md`](../craft/annotations.md) — structural-break labels, outlier callouts, horizontal-label rule
- [`../dashboard/consistency.md`](../dashboard/consistency.md) — dashboard-wide palette consistency
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — axis integrity
