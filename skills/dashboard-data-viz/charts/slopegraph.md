---
name: chart-slopegraph
description: Produce chart.geom (slopegraph) — many categories across exactly two time points; absolute values + change in one chart.
governs: chart.geom (slopegraph)
consumes: dashboard.palette
---

# Slopegraph

A slopegraph shows two values per category — typically "before" and "after," or "period 1" and "period 2" — with a line segment between them. Two vertical axes at left and right carry the value scale; each category appears as an endpoint on each axis, connected by a line. The slope of the line encodes the rate of change; the endpoint positions encode the absolute values; the color of the line can pick out categories of interest.

Slopegraphs pack a lot into a small space: packing a lot of information into a small space: absolute values, change, rank change, and emphasis — all in one chart that the audience can read intuitively without training.

In the grammar: two categorical positions on x (period 1, period 2), one continuous position on y (value), one `geom=line` layer and one `geom=text` layer for the labels. Equivalent to a line chart with only two x-positions and many series.

## When to use

- **Comparing many categories between exactly two points.** The defining use. Regions, products, segments, customers — the slopegraph handles up to ~15 categories gracefully in one panel.
- **When rank change is part of the story.** The criss-crossing of lines between the two axes instantly shows which categories swapped positions, which is hard to see in a bar chart pair.
- **When rate of change is part of the story.** Slope encodes rate; the steepest and shallowest lines pop preattentively.
- **When both absolute value and change matter.** A delta bar chart shows change but loses absolute values; a pair of bar charts shows absolute values but makes change read-and-compare. A slopegraph carries both.
- **Before/after comparison across categories.** Pre- vs. post-launch, pre- vs. post-policy, current vs. forecast, actual vs. target per category.
- **Two non-time conditions.** "Control vs. treatment per cohort," "US vs. EU per metric." Any two-column comparison per category.

## When NOT to use

- **More than two time points.** Use a line chart, a small-multiples line chart, or a heatmap.
- **More than ~15 categories.** Lines overlap into visual mud. Either highlight a few and gray the rest, or facet into two slopegraphs, or switch to a horizontal-bar of deltas.
- **When the two values are very close for every category.** The slopes will all be near-horizontal and unreadable. Concrete check: after fitting the y-axis to the data range (see *Axis treatment*), the steepest line's slope in the rendered aspect ratio should land at 30–60° from horizontal (see *Aspect ratio*). If the steepest slope is below ~15°, the form is wrong — the whole plot reads as horizontal lines, and endpoint labels stack because data points are nearly collinear. Use a dumbbell dot plot (paired dots per row) instead; dumbbells read near-equal values as two distinct dots rather than one flat line, and tolerate tight value ranges that a slopegraph cannot.
- **When only one or two categories matter.** A slopegraph's strength is comparing many rows simultaneously. For one category, use a single-value with delta. For two, a grouped bar or two single-values read faster.
- **When absolute values span orders of magnitude.** The small values crush to the bottom of the axis. Consider log scale (label clearly) or split into tiers as small multiples.
- **When the two axes represent different metrics or units.** That's a two-variable relationship question — use a scatter plot with both conditions labeled per point.

## Rules

### Endpoints labeled at both axes

- **Left axis: category name + value at time 1.** Right axis: category name + value at time 2. Direct labels on both sides replace a legend.
- **Format values consistently with the rest of the dashboard** — units (`$M`, `%`), thousands commas, matching decimal places.
- **When categories share the same value on one axis**, offset labels vertically or concatenate ("North, South: $120M") so labels don't overlap. Overlap is the most common slopegraph rendering failure.
- **Category names should read in sentence case** unless the domain convention is otherwise (SKUs, codes).

### Slope and color to direct attention

- **Gray out context; color the focal categories.** The accent-on-gray pattern is especially powerful in a slopegraph because the eye already follows line slope — a single bright line against a sea of gray reads instantly. Render 1–3 focal categories in accent color; render the rest in light gray.
- **Signed color for increase vs. decrease** is also valid — e.g., green for lines that went up, red for lines that went down, gray for roughly flat. Watch color-blind accessibility; consider blue/orange instead of red/green.
- **Line thickness can encode a magnitude-of-change threshold** — thicker for the biggest movers. Don't layer all three (color + thickness + explicit label) on the same chart; pick the one that carries the story.
- **The category the user asked about goes in the accent color**; everything else subordinates.

### Axis treatment

- **Two explicit vertical axes, left and right.** Unlike a dual-y-axis line chart (which is bad because two unrelated metrics share an x-axis), the two axes of a slopegraph are the SAME scale — identical units, identical range, identical tick marks. They are two readouts of the same axis, not two different axes.
- **Label each axis with the period** — "2023" on the left, "2024" on the right. The time labels are axis titles, not decorative.
- **Render the two x-positions as a category axis, not a formatted value axis.** The two time positions are categorical. Use `type: 'category'` with `data: ['Current', 'After']` (or the period labels); plot each endpoint at category index 0 or 1. The common trap is rendering x as `type: 'value'` with `min`/`max` bounds and a formatter that returns `'Current'` or `'After'` based on the tick value (`formatter: v => v < 0.5 ? 'Current' : 'After'`). The trick breaks the moment the library renders a boundary tick or an extra "nice" tick inside the range — the formatter returns the same label for multiple tick positions, and the axis reads `Current · After · After` (or similar duplication). Library specifics: ECharts `xAxis.type: 'category'`; Plotly `xaxis.type: 'category'` with an explicit category array; D3 `scaleBand` or `scalePoint` on the two period names.
- **Y-axis range fitted to the data, never auto-zero.** Slopegraphs encode position, not length — so the baseline must serve position discrimination, not magnitude interpretation. Concrete: `yAxis.min = data_min − 0.1 · range`, `yAxis.max = data_max + 0.1 · range`, where `range = data_max − data_min`. Do not rely on the library's default auto-range, which typically anchors to zero — compa ratios of 0.91–1.08 on a 0.00–1.20 auto-range axis compress every slope into the top ~10% of the plot and pile every endpoint label on top of every other label. Library overrides: ECharts explicit `yAxis.min` / `yAxis.max` (NOT `scale: true` alone, which still rounds to nice-numbered extremes); Plotly `yaxis.autorange: False` + explicit `range`; D3 manual `scale.domain([min, max])` after computing the data bounds. Over-zooming still amplifies noise into apparent signal; apply the same honest-scale sanity check as for line charts.
- **Gridlines: optional and light.** The two vertical axes carry the values directly; horizontal gridlines rarely add much.

### Managing overlap and crowd

- **Limit to ~15 categories in one panel.** Beyond that the lines tangle and the chart stops functioning.
- **Stagger label positions** to avoid overlap; use thin leader lines if a label needs to sit off its endpoint.
- **If two categories have the same value on one side**, decide whether to merge labels ("A, B: 45%") or stack them vertically. Merging is cleaner when the matching side also matches; stacking is necessary when only one side coincides.
- **Sort categories on each axis by value** for the panel's dominant axis (usually the "current" / right side). This puts the highest line at the top — consistent with top-left scanning.

### Annotation carries the story

- **Action-title the chart.** "Every region grew except South America, where conversion dropped 4 points" beats "Conversion by Region, 2023 vs. 2024".
- **Annotate the biggest mover** with a short phrase at the line's midpoint or endpoint. "Down 12% — pricing rollback Q2" tells the story the slope alone cannot.
- **Call out rank changes** when they matter. "Enterprise overtook SMB for the first time in 2024." The crossing of lines is visible; the significance is not.

### Aspect ratio

Slopegraphs are narrow and tall by default — a wide slopegraph flattens all slopes toward horizontal and defeats the form. Aspect ratio amplifies or dampens apparent change. Pick an aspect ratio where the steepest slope in the data is visibly steep (say, 30–60° from horizontal) but not vertical. Document the choice; don't tilt the ratio to flatter the story.

## Simpler alternatives

When audience fluency or tile size makes a slopegraph risky, options ranked:

1. **`horizontal-bar` of deltas (the change), sorted by delta.** The best fallback. One bar per category showing "value_2 − value_1" (or "% change"), sorted descending by change. Keeps the ranking-of-changes story but loses the absolute-values context. Add data labels with both the delta and the two endpoint values when space allows. This is the single most useful substitution.
2. **`line` chart with exactly two x-positions per series and many series.** This IS a slopegraph in the grammar. If the tool's `line` primitive accepts two x-values per series and can direct-label endpoints, render a slopegraph via `line`. Watch for tools that enforce a minimum number of points or auto-smooth — a 2-point "line" can render oddly.
3. **Two side-by-side `horizontal-bar` charts**, one per period, with categories in the same order. The viewer reads left vs. right to infer change. Loses slope encoding entirely; the reader has to mentally subtract. Acceptable only when change is secondary to absolute values.
4. **`pivot-table`** with columns `category | period_1 | period_2 | delta | % change`, sorted by delta with conditional formatting on the delta column. Precision wins; visual scan is slower. Pair with option 1 as a detail view.
5. **`combination`** with bars for period 1 and line-endpoints for period 2 — clever but brittle; not recommended as a default.

When substituting, tell the user explicitly why: "Shown as a delta bar chart because this audience reads bars faster than slopes." Keep the fallback honest.

## Anti-patterns

- **Too many categories without emphasis.** A 40-line spaghetti slopegraph is unreadable; the form stops working.
- **Every line a different color.** Rainbow land; no focal point.
- **Dual-axis with different units on each side.** That's the forbidden dual-y-axis chart, not a slopegraph — the two axes of a real slopegraph share a single scale.
- **Slope exaggerated by axis truncation or aspect ratio.** Lie-factor violation.
- **Library auto-zero y-axis producing collapsed slopes and stacked endpoint labels.** Compa ratios 0.91–1.08 rendered on a 0–1.2 axis put every endpoint in the top ~10% of the plot; category labels at `position: 'left'` and value labels at `position: 'right'` both collapse into single illegible stacks. Root cause is the axis range, not the labels — fit the y-axis to the data range first (see *Axis treatment*). Left-margin reservation for the category labels is then a follow-on concern handled by [`../craft/annotations.md`](../craft/annotations.md) *Reference-line labels sit in the axis margin* (the rule generalizes past reference lines to any outside-plot label).
- **`Current · After · After` on the x-axis.** Fake-categorical-via-value-axis: rendering x as `type: 'value'` with a formatter that bucketizes numeric tick values into two string labels. Any extra tick the library generates (boundary tick at `min`/`max`, a "nice" tick inside the range) produces a duplicate label. Fix: `type: 'category'` with `data: ['Current', 'After']`. See *Axis treatment*.
- **No endpoint labels.** Forces the viewer to a legend and defeats the proximity gain.
- **Slopegraph for more than two time points.** That's a line chart.
- **Using slope alone to convey magnitude** when all slopes are near-horizontal. The chart is the wrong form; use a dumbbell dot plot or a delta bar instead.
- **Animating transitions between the two endpoints** as if it were a time-series animation. Two points do not a trend make.
- **3D / perspective slopegraphs.** Integrity violation.

## See also

- [`dot-plot.md`](dot-plot.md) — paired / dumbbell dot plots are a close cousin; better when slopes would be near-horizontal
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — trend and comparison question shapes
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — aspect ratio and axis-range honesty; avoiding dual-y-axis confusion
- [`../encode/color.md`](../encode/color.md) — accent-on-gray for directing attention across many lines (when added)
- [`../craft/annotations.md`](../craft/annotations.md) — direct labeling at endpoints; calling out the biggest mover (when added)
- [`line.md`](line.md) — the grammar underpinning: a slopegraph is a line chart with two x-positions (when added)
