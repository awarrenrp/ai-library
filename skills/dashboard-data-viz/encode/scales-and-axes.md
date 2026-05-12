---
name: encode-scales-and-axes
description: Produce chart.scale and chart.axis: zero baselines, log scales, tick intervals, aspect ratio, time axes.
governs: chart.scale, chart.axis
---

# Scales and axes

Scales convert data values to pixel positions. They are the single source of truth for the data-to-visual mapping. Most integrity violations are scale choices: truncated baselines, mis-scaled log axes, inconsistent time intervals, dual-axis distortions. This file codifies the rules.

## Zero baseline

*Principle: encode-by-length must include zero; encode-by-position should fit the data.* Length without a zero origin is not length, so any geom that maps value → bar/segment/area size needs a zero baseline. Position-based geoms (line, scatter, dot plot) encode value as location, so the axis should frame the meaningful range — forcing zero on a stock price or a latency series flattens the signal. When extending these rules to a chart type not listed below, ask which channel carries the value.

### Mandatory

- **Bar, column, and horizontal-bar charts must start at zero.** Length encodes the value, and length without a zero origin is not length — it is noise. A 5% difference on a y-axis that starts at 95 looks like a doubling.
- **Stacked and horizontal-stacked charts must start at zero.** The outer boundary is a bar; the inner segments are lengths that sum to the total.
- **Area charts must start at zero.** Area encodes magnitude.
- **Funnel charts** implicitly use length; the convention is that stage sizes are proportional to the values.

### Not required

- **Line charts may start above zero**, *unless the metric is a share of a fixed, knowable universe* (see "Share-of-universe exception" below). Position, not length, encodes the value, and zero is often not meaningful (e.g., stock price, web latency, NPS).
- **Scatter plots may start at any value on either axis.** Position encodes the variables and zero isn't special.

### Share-of-universe exception

When the metric is a fraction of a fixed, named denominator — % of N engineers active, % of M customers churned, share of a known headcount or installed base — **anchor the axis at 0**, even on a line chart. Zero is meaningful (no one is doing the thing) and 100% is meaningful (everyone is); cropping the bottom of the range throws away the "compared to what" the reader is implicitly asking. A line that climbs from 29% to 47% on a 25–65% axis fills half the plot and reads as dramatic growth; on a 0–100% axis it reads as "less than a third → under half," which is the honest framing.

Cues that this exception applies:

- The subtitle or `dataNote` names the denominator ("percent of 460 engineers", "share of paid accounts").
- The metric is bounded in [0, 100%] by construction, not by happenstance.
- The reader's natural question is "what fraction of the whole?" — not "how is this number trending?"

When in doubt, ask: *is zero a meaningful, possible value for this metric?* If yes (zero engineers using a tool, zero customers churning), anchor at 0. If no (a stock price of $0, a latency of 0ms — degenerate cases not worth showing), the standard line-chart allowance applies.

### Caveat when zero is optional

Even when zero is not mandatory, don't zoom so tight that a 1% fluctuation looks like a collapse. Choose a range that:

- Shows meaningful variation without exaggerating it.
- Covers the full span of the data with a small margin (roughly 5–10% of the data range) at each end.
- Doesn't cut off peaks or troughs.
- Spans roughly 1.5–3× the data range within the plotted window. Tighter than 1.5× exaggerates noise; looser than 3× flattens the signal.

### What to do when zero makes the chart unreadable

If the variance is small relative to the absolute values (all bars nearly the same height), the answer is **not** to truncate the bar axis. The answer is to switch chart type:

- Dot plot — uses position, permits non-zero baseline.
- `pivot-table` with conditional formatting — precision without chart.
- Render a *variance chart* (deviation from mean, or % change) instead — now zero is meaningful and the bars legitimately start there.

## Logarithmic scales

Use when the data span multiple orders of magnitude:

- Revenue across company sizes (thousands to billions).
- Earthquake magnitudes.
- Latency tails (p50 to p99.9).
- Infection case counts over time.

Rules:

- **Label the scale explicitly** as "log scale" or "log₁₀" on the axis. Log ticks look like linear ticks to a reader who isn't paying attention.
- **Tick marks on powers of 10** (1, 10, 100, 1,000) — not on linear arithmetic intervals.
- **Log applies to the scale, not the data.** Apply `scale_y_log10`; don't pre-transform a column and then label it linearly.
- **Log + bar** is usually wrong. Bars encode with length from a baseline, and log-scale length isn't a linear-length. Prefer dot plot or `scatter`.
- **Never log-scale a variable with zeros or negatives.** log(0) is undefined; log(-x) is imaginary. Shift the data or pick a different scale.

## Broken / truncated axes

Almost always a mistake.

- The correct answer to "my range is compressed against one end" is usually a different chart type, a log scale, or a variance transform — not a break in the axis.
- If you must use a break, make it visible: a gap in the axis with an unambiguous break marker (the zig-zag symbol or a clear white gap). Do not silently compress a range.
- Never break a bar chart's value axis — it breaks the length encoding.
- If two groups of values are so different in magnitude that they can't share one axis, split into two charts or use small multiples.

## Tick marks and intervals

- **Round numbers.** Tick at 0, 25, 50, 75, 100 — not at 17, 34, 51.
- **Round intervals in natural units:** 1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500. Multiples of 1, 2, 5 × powers of 10.
- **Minimum tick density:** enough ticks for the reader to interpolate, not so many that the axis becomes noise. Usually 4–7 ticks per axis.
- **Strip trailing zeros** in tick labels: "10" not "10.0"; "1K" not "1,000.00".
- **Abbreviate large numbers:** $1.2M is more readable than $1,200,000 in a tick label.
- **Units in the axis title or attached to the first/last tick:** "Revenue ($M)" or axis label "2024" with "$" on the first tick.
- **Categorical axes:** one tick per category, all labels visible. If labels overlap, rotate to 45° at most, or flip to horizontal bars.

## Time axes

- **Time runs left to right on the x-axis.** Always. Reversing this violates a near-universal convention.
- **Consistent intervals.** Don't mix monthly and quarterly spacing on the same axis. Don't skip empty periods (holidays, pandemic gaps) — it distorts the shape of the trend. Library auto-tickers commonly violate this rule silently — they anchor ticks to "nice" calendar values (first-of-month, day-of-month 1/8/15/22) and produce 8–10 day gaps across month boundaries alongside 7-day gaps within them. Visually uniform, actually not. **Test:** compute the time delta between every adjacent pair of rendered ticks; all must be equal. **Remedy:** specify tick cadence as a strict interval ("every 7 days," "every 30 days") or supply explicit tick positions — don't let the library pick.
- **Label the first and last period explicitly.** For a 2-year chart, label the year at the start of each year; label months in shorthand (Jan, Apr, Jul, Oct) for dense axes.
- **Use consistent formats:** don't mix "Jan 2024" and "February 2024" on the same axis.
- **Category consistency — every tick the same kind of thing.** On a monthly time axis, every tick label must be a month. When a year boundary falls in the rendered range, library defaults (D3's multi-scale time formatter, ECharts' default time axis) silently substitute the year for January's tick — so the axis reads `Nov · Dec · 2026 · Feb · Mar · Apr`, with one tick in a different category than the others. Override the formatter: append the year to the January tick (`Jan '26`), place a small year callout on the chart, or state the year in the subtitle. A tick that changes category mid-axis is design variation, not data variation.
- **Regular sampling required for line charts.** If data is irregularly sampled, render as `scatter` without a connecting line.
- **Fiscal vs. calendar year:** state which one in the axis title if there's any chance of ambiguity.
- **Structural breaks** (methodology change, new product, policy change) deserve a vertical reference line and a short caption. See [`../craft/annotations.md`](../craft/annotations.md).

## Aspect ratio

Aspect ratio affects perceived steepness of lines and the apparent strength of correlations.

- **Line charts:** narrow panels exaggerate slopes; wide panels flatten them. A 52-week trend in a 300×200 pixel panel will look dramatic; in a 600×150 panel it will look tame. Pick the ratio that matches the message honestly.
- **"Banking to 45°":** the slope of the steepest segment should be close to 45°. This maximizes the average accuracy of slope perception. Useful when trend shape matters.
- **Scatter plots:** use a square aspect ratio (height ≈ width) so neither axis is visually emphasized. Non-square distorts apparent correlation.
- **Bar charts:** width is determined by category count; height is whatever the layout permits. Keep the value axis long enough that the longest bar fills ~70–90% of the axis height.
- **Slopegraphs:** aspect matters; narrow width amplifies apparent change. Test at the rendered size.

## Horizontal bias

Graphics tend toward the horizontal, ~50% wider than tall. Reasoning:

- The eye is practiced at detecting deviations from the horizon.
- Left-to-right labels are easier to read.
- Many graphics plot effect (vertical) against cause (horizontal); the horizontal should elaborate.

Override this when the nature of the data suggests a different shape — e.g., a many-category horizontal-bar needs tall, not wide.

## Gridlines

- **Muted or suppressed.** Gridlines carry no data; they are apparatus. Light gray, thin weight, behind the data. See [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md).
- **Horizontal gridlines** help readers trace a bar's height or a line's value to the y-axis. Use them sparingly on bar/line charts.
- **Vertical gridlines** are rarely needed and often clutter. Omit by default.
- **No gridlines on scatter plots** unless precision is being optimized (which is rare).
- **No gridlines on charts with few values** (≤5 bars, one `single-value`, `donut`) — they are all apparatus.

## Scales as the single source of truth

If a transformation is needed, apply it at the scale — not in the data.

- Log skewed data with `scale_y_log10`, not `y = log(value)` in the query.
- Re-express in percent with `scale_y_percent`, not by dividing in the query.
- Keep the chart specification self-documenting: the axis labels reflect original units; the transformation is explicit in the scale.

Benefits: axis labels stay correct; the same data can be plotted on multiple scales; transformations are auditable and removable.

## Dual y-axes

Covered in depth in [`../charts/combination.md`](../charts/combination.md). Short version:

- Dual axes let the author choose scales that manufacture apparent correlation.
- Prefer two stacked charts sharing the x-axis.
- If forced into a dual-axis (e.g., `combination` with a count and a rate), make both axes' scales explicit, label them clearly, and check whether the visual correlation survives a rescale.

## Inverted axes

Don't invert axes (y decreasing upward, x decreasing rightward) unless the domain convention is universal and the axis is clearly labeled.

- Common legitimate use: rank (1 at top, 10 at bottom). Mark it clearly.
- Any other inversion is a trap for the reader.

## Integrity checklist before shipping

Run through this list whenever a chart has axes.

- [ ] Bar/stacked/area chart starts at zero.
- [ ] Line chart of a share-of-universe metric (% of N) anchors at 0.
- [ ] Line/scatter axis range doesn't exaggerate a small wiggle.
- [ ] Log scale (if used) is labeled and has power-of-10 ticks.
- [ ] No broken axes, or breaks are clearly marked.
- [ ] Tick marks on round numbers.
- [ ] Trailing zeros stripped.
- [ ] Time axis runs left-to-right with consistent intervals — adjacent-tick time deltas are all equal (library auto-tickers often violate this silently).
- [ ] No axis inversion without justification.
- [ ] Gridlines muted or removed.
- [ ] Units labeled on the axis or first/last tick.

## Common violations to catch

- A bar chart of revenue with y-axis starting at $100M — 5% month-over-month looks like a doubling.
- A stock-price line with a y-axis so tight the chart looks like a collapse when the drop was 2%.
- A line chart of "% of engineers using tool X" with the y-axis starting at 25% — the universe (the other 75%) is the comparison the reader cares about, and cropping it makes adoption look further along than it is.
- A log-scaled bar chart — the length encoding is broken.
- A time axis that skips "empty" periods, flattening the shape of the data.
- Mixing monthly and quarterly spacing on the same time axis.
- A "weekly" time axis with ticks on month-day 1, 8, 15, 22, then next month's 1 — across-month gaps are 8–10 days, within-month gaps are 7. Library auto-ticker output, not a true weekly axis.
- A monthly time axis reading `Nov · Dec · 2026 · Feb · Mar` — one tick is a year, the rest are months, because the library's default formatter swapped in at the year boundary.
- A dual-axis `combination` chart where the two scales are chosen to imply correlation.
- Gridlines at pixel-level density, turning the background into noise.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — the integrity rules that drive these choices
- [`visual-channels.md`](visual-channels.md) — why length requires a baseline
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — muted gridlines as decluttering
- [`../craft/annotations.md`](../craft/annotations.md) — labeling structural breaks
- [`../charts/combination.md`](../charts/combination.md) — dual-axis specifics
