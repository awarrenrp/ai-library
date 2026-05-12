---
name: graphical-integrity
description: Non-negotiable integrity rules: lie factor, proportional encoding, zero baselines, honest axes, matched dimensionality. Applies to every chart.
---

# Graphical integrity

These rules are not stylistic. They govern whether a chart tells the truth. Apply them unconditionally.

## The lie factor

Formal definition:

```
Lie Factor = size of effect shown in graphic / size of effect in data
```

A lie factor in **[0.95, 1.05]** is acceptable. Anything outside that range means the chart overstates or understates the underlying change. Most real-world distortions overstate, with factors of 2–5 common; extreme cases reach 10–15.

The agent should be able to compute and apply this: if the data shows a 20% change, the visual change on the axis chosen must also be ~20%, not 200%.

## Six principles

Apply each before shipping a chart.

1. **Proportional encoding.** The visual size of a mark — bar height, point position, area — must be directly proportional to the numeric quantity. This is the foundation of every other rule.
2. **Clear, thorough labeling.** Axes, units, dates, sources. Write explanations on the graphic itself rather than relying on the reader to remember context.
3. **Show data variation, not design variation.** Scales, axis breaks, line weights, colors must stay constant across the display. If the scale changes between panels, the reader sees a change in the data that isn't there.
4. **Deflate monetary values over time.** Nominal dollars across years encode inflation as if it were a real change. Use constant/real dollars or state the deflator.
5. **Match dimensionality.** A one-dimensional value (a total, a count) must be encoded with a one-dimensional visual (length, position). Encoding a scalar as an area or a volume multiplies the apparent effect — a 2× value rendered as a 2×-wide-and-tall icon looks 4× larger.
6. **Never quote data out of context.** Always provide a baseline. The single most useful question in data design is "*compared to what?*" — prior period, target, peer group, forecast, the same metric one year ago. A number alone is nearly always misleading.

## Axis rules (the honest-axis checklist)

- **Bar and column charts must start at zero.** Non-zero baselines are the single most common integrity violation. If zero makes the visual unreadable because the variance is small relative to the absolute values, switch to a dot plot or a slopegraph — do not truncate the bar.
- **Line and scatter plots may start above zero**, because position (not length) encodes the value, and zero is often not meaningful. Still, pick an axis range that doesn't exaggerate — don't zoom so far that a 1% wiggle looks like a collapse.
- **Log scales are fine when the data span multiple orders of magnitude** (earthquakes, revenue across company sizes, virus cases over time). Label the axis clearly (`log scale`) — logarithmic ticks are not self-evident to every reader.
- **Truncated / broken axes are almost always a mistake.** If used, make the break visible with an unambiguous gap marker; do not quietly compress a section of the range.
- **Dual y-axes are hard to do honestly.** Two unrelated scales sharing an x-axis invite the reader to perceive a correlation you didn't prove. Prefer two stacked plots sharing the x-axis; if forced into dual-axis, see [`charts/combination.md`](charts/combination.md).
- **Time axes must use consistent intervals.** Mixing monthly and quarterly spacing on the same axis, or skipping empty periods, silently distorts the shape of the trend. Library auto-tickers frequently violate this rule: they anchor ticks to "nice" calendar values (first-of-month, day-of-month 1/8/15/22) and produce 8–10 day gaps across month boundaries alongside 7-day gaps within them — visually uniform, actually not. **Test:** compute the time delta between every adjacent pair of rendered ticks; all must be equal. **Remedy:** specify the cadence as a strict interval ("every 7 days," "every 30 days") or supply explicit tick positions; don't let the library pick. This is design variation masquerading as data variation — the same species of violation as mixing monthly and quarterly, just more subtle.
- **Don't invert axes** (y going down, x going right-to-left) unless the convention is universal in the domain and clearly labeled.
- **Aspect ratio is design variation** — stretching a line chart vertically makes slopes look steeper; squishing it horizontally flattens trends. Arbitrary aspect ratios distort perceived data even when every value is plotted correctly. Cleveland's "banking to 45°" principle: the steepest slope should sit near 45° for accurate slope perception. See [`encode/scales-and-axes.md`](encode/scales-and-axes.md) for defaults (line ~1.5:1, scatter square) and [`charts/line.md`](charts/line.md) for per-chart guidance. Keep aspect ratio consistent across comparable charts on the same dashboard — inconsistency reads as data change.

## Area and volume encoding

- Never encode a one-dimensional quantity using area (circle area, square area) or volume. Use length/position instead.
- If area is used (e.g., treemap, bubble chart), verify that the area — not the radius or the side — is proportional to the value. A circle where radius ∝ value looks quadratically too big.
- Pie, donut, sunburst, and gauge all use angle/area encoding. They pay an accuracy tax by construction; see the specific chart recipes for when that tax is acceptable.

## Annotation as integrity

Integrity is not just about not lying — it's about not letting the reader invent a lie. Explicit annotation prevents misreading:

- Label the units (`$M`, `%`, `ms`, `per 1,000`).
- Mark the scale type when non-obvious (`log`, `indexed to Jan 2024 = 100`, `year-over-year`).
- State the time range and the data source.
- Call out structural breaks (methodology changes, definitional shifts, a new product launch) with a vertical reference line and a short caption.
- Label outliers that could distort the reader's mental model.

## Common violations to catch

- A bar chart of revenue with a y-axis starting at $100M — the 5% month-over-month looks like a doubling.
- A line chart of a stock price over five years in nominal dollars with no inflation adjustment.
- A bubble chart where the author sized by radius, not area, so values look quadratically off.
- A time axis that skips the pandemic months because "data was weird," flattening the shape of the recovery.
- A "weekly" time axis whose ticks land on day-of-month 1, 8, 15, 22, then next month's 1 — the gap across the month boundary is 8–10 days, not 7. Visually uniform ticks that aren't actually uniform. Library-default output, not a true weekly axis.
- A combo chart with revenue on the left and conversion rate on the right, rescaled independently so they appear to move together.
- A map shaded by total (not per-capita), in which the most populous region always looks like the story.
- A line chart rendered tall-and-narrow to make a modest trend look dramatic, or wide-and-short to make a real trend look flat. Aspect ratio is design variation; pick it to match the data's natural shape (banking to 45°), not the story you want to tell.

## See also

- [`00-mental-model.md`](00-mental-model.md) — "show the data" in the large
- [`encode/scales-and-axes.md`](encode/scales-and-axes.md) — specific scale choices
- [`craft/annotations.md`](craft/annotations.md) — how to label structural context
