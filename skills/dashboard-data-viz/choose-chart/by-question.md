---
name: choose-chart-by-question
description: Pick chart type from user's question: comparison / trend / breakdown / correlation / outliers / target-vs-actual.
---

# Choose a chart by the question

Most user requests land on one of a dozen question shapes. If you can name the question, the chart type is nearly determined. Work from question → data type → precision required → chart, in that order.

## How to use

1. Restate the user's request as a question in one of the categories below.
2. Check the data types (continuous vs. categorical, time vs. not, how many series, how many points).
3. Pick the primary chart. Fall back to the alternative if the primary doesn't fit the data shape or the audience.
4. Cross-link to [`by-data-shape.md`](by-data-shape.md) if the data shape is doing more work than the question.

## Comparison: how do values compare across categories?

- Example phrasings: "sales by region", "revenue per product line", "headcount by department".
- Primary: **`bar`** (vertical) when labels are short and you want chronological or ranked reading; **`horizontal-bar`** when labels are long or there are more than ~7 categories. Horizontal is the safer default.
- Sort bars by value unless a natural order exists (chronological, alphabetical-by-convention, or the audience already has a mental order).
- Must start at zero. Non-zero baselines misrepresent the magnitudes being compared.
- **When bars would be similar in length and zero-baseline buries the differences** → switch to **`dot-plot`**. Position (not length) carries the value, so the axis doesn't have to start at zero. The principled escape from the zero-baseline rule: never truncate a bar axis to show subtle differences; swap the geom. Canonical case: NPS across regions ranging 42–51, or response times 1.8–2.3s. See [`../charts/dot-plot.md`](../charts/dot-plot.md).
- Do not use `donut` or `sunburst` for comparison across categories — angles and areas are harder to judge than lengths.
- Fallback: if there are too many categories to render as bars (≥25), use a `pivot-table` with conditional formatting, or faceted bars via small multiples (see [`../encode/small-multiples.md`](../encode/small-multiples.md)).

## Trend: how has X changed over time?

"Trend" is not one question; it's at least seven, and the default line chart answers only the first well. Before drafting a time chart, name the sub-question. The same dataset rendered as a line chart, slope chart, cycle plot, heatmap, and bump chart exposes completely different stories.

### Sub-question 1 — What's the macro trend?

Standard case. Continuous time on the x-axis, value on the y-axis.

- Primary: **`line`**. Conveys continuity and direction of change.
- When the message is *individual periods* rather than *trend* (e.g., "revenue for each of the last 4 quarters"), use vertical `bar` — but prefer line if the reader will ask "is it going up?".
- For multiple series on one line chart: cap at 3–4 series; direct-label the endpoints; mute non-focal series to gray.
- Time must be on the x-axis, left to right, with consistent intervals. Mixing monthly and quarterly on the same axis distorts the trend shape.
- Line charts may start above zero; zero baseline is optional. See [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md).
- When showing *actual vs. forecast* or *actual vs. target* on the same timeline, reach for `combination` (line + bar) or two lines with different `linetype`.
- Fallback for sparse / irregular data points: use `scatter` (no connecting line); connecting irregularly-sampled points invents intermediate values.

### Sub-question 2 — How does "now" compare with the start of the period?

"Which stations gained / lost popularity from July to June?", "NPS by region, Q1 vs. Q4."

- Primary: **`slopegraph`**. Strip intermediate points; show only endpoints. For 8–15 entities, a slope chart surfaces the one outlier (e.g., the station that went from #1 to #8) in a way a line chart with 8 colored lines obscures. See [`../charts/slopegraph.md`](../charts/slopegraph.md).
- When intermediate points matter to the story (e.g., "it dipped in March before recovering"), the line chart is the right form even though the endpoint question could be answered with a slope.

### Sub-question 3 — Are there cyclical patterns?

"What's our usage pattern by hour of day, and how does it differ weekday vs. weekend?"

- **Cycle plot** is the ideal form: for each position within the cycle (hour, day), plot a short line showing values across the enclosing period (days-of-week at 8am). Reveals that "8am" is not one thing — it's a busy weekday commute peak plus a sleepy weekend lull.
- Out of our current chart palette. Approximate via `grid` of small `line` charts — one per hour-of-day, each line showing the day-of-week pattern — using [`../encode/small-multiples.md`](../encode/small-multiples.md). Or facet a `bar` chart by day-of-week with hour-of-day on the x-axis.
- Cheaper fallback: if the reader only cares about the overall cyclical shape and not the within-cycle variation, aggregate by ordinal time (day-of-week, hour-of-day) and render as a `bar` chart. Note this hides specific events (Christmas disappears when you aggregate by day-of-week).

### Sub-question 4 — Trends across two time dimensions?

"Which days of the year see the most births?", "Road fatalities by month × year", "Activity by hour × day-of-week."

- Primary: **`heatmap`** with cell labels (a labeled calendar heatmap, sometimes called a "highlight table").
- Row = finer time dimension (day-of-month, hour), column = coarser (month, day-of-week), color = value.
- Reveals patterns invisible in a line chart: holiday effects (Jan 1 / July 4 / Dec 25 stand out as cells), weekly rhythms (a light stripe on the 13th of each month), long-term trends (a red "island" in the summer of 1980).
- See [`../charts/heatmap.md`](../charts/heatmap.md). For precise lookup alongside the pattern, `pivot-table` with conditional formatting — same data, same reveal, different emphasis.

### Sub-question 5 — Rank over time, not absolute value?

"How did each team move through the standings over the season?", "Which Billboard Top 40 tracks rose and fell?"

- **Bump chart** is the ideal form: x-axis = time, y-axis = rank (1 at top, N at bottom), one line per entity.
- Out of our current palette. Render in-palette as a `line` chart with **inverted y-axis** (rank instead of value) and direct-labeled endpoints; emphasize one or two focal entities via accent-on-gray (see [`../encode/color.md`](../encode/color.md)). This is a hand-rolled bump chart.
- Cap at ~8 entities before color differentiation collapses. Rank hides absolute magnitude — pair with a second chart (`bar` or `pivot-table`) if magnitude is load-bearing.
- If only two time points, use `slopegraph` (sub-question 2) — simpler, same insight.

### Sub-question 6 — Growth from different start times?

"Which YouTube video reached 1B views fastest?", "How does Q3's retention curve compare to Q1's cohort?", "A/B test ramp-up: which variant grew fastest?"

- **Index chart**: the x-axis is not calendar date but **"days since event"** (or weeks since signup, hours since deploy). Anchors compared items to a common starting point.
- Fully in-palette: render as a `line` chart with x-axis relabeled. The whole trick is the axis transformation; no new geom needed. See [`../charts/line.md`](../charts/line.md).
- Without indexing, comparing growth rates of things that started at different times requires the reader to mentally slide curves — which they cannot do accurately.

### Sub-question 7 — Durations of events?

"Project plan with start / end dates", "Sprint burndown", "Outage timeline", "Workflow step durations."

- **Gantt chart** is the ideal form: one horizontal bar per event, bar position encodes start, bar length encodes duration.
- Out of our current palette. Render in-palette as `horizontal-bar` where the bar's *start* position encodes the event's start time and the bar *length* encodes duration. This is a Gantt by construction, minus project-management chrome (dependencies, milestones).
- Add a vertical reference line for "today" if the chart is live; use two overlaid bars per row for estimated vs. actual duration.

### Which sub-question? — a decision path

If the data has a time axis, ask in this order:

1. Two time points + many entities → sub-question 2 (slope chart).
2. Rank is the message → sub-question 5 (bump chart / inverted-y line).
3. Different start times being compared → sub-question 6 (index chart).
4. Durations rather than point values → sub-question 7 (Gantt / horizontal-bar-with-start).
5. Two meaningful time dimensions (day × month, hour × day) → sub-question 4 (heatmap).
6. Cyclical pattern is the point → sub-question 3 (cycle plot / faceted bars).
7. None of the above → sub-question 1 (line chart).

Defaulting to a line chart without asking the sub-question is the common failure. The line chart is often right — but it's right *because* you confirmed none of 2–6 apply, not because it was the default.

## Trend + comparison: how has X changed over time across categories?

- Primary: **`line`** with one line per category, capped at 3–4 categories.
- If you need more than 4 categories, either (a) highlight one and gray the rest, or (b) facet by category (small multiples).
- If the audience needs both totals and composition changing over time, use `stacked` (area not available) — but only when the total is the primary message and the composition is secondary. Inner bands are hard to read because only the bottom segment shares the axis baseline.

## Before/after across many entities: how did each item change between two points?

- Example phrasings: "NPS by region, Q1 vs. Q4", "feature usage before and after launch", "win rate per rep, H1 vs. H2".
- Primary: **`slopegraph`**. Two endpoints (the two time points) connected by a line per entity. Encodes three things at once with no tutorial cost: absolute value at time A (left point), absolute value at time B (right point), and the rate/direction of change (the slope). When the comparison is exactly two points across many categories, slopegraph beats both a 2-point line (trend implied but unsupported) and side-by-side bars (rate of change is not encoded, only implied through mental subtraction).
- Highlight movers: accent the lines whose change is the story; mute the rest. Direct-label endpoints.
- Cap at ~15 entities before overlap makes the slopes unreadable; beyond that, facet or show only movers.
- See [`../charts/slopegraph.md`](../charts/slopegraph.md).

## Breakdown (part-to-whole): what is X composed of?

- Example phrasings: "revenue by product category (as share)", "users by plan tier", "expenses by line item".
- Primary (few parts, ≤4): sorted **`horizontal-bar`** of the parts with percentages labeled; add a note that the parts sum to 100%. Bars beat pies for every precision task.
- Acceptable when the user asks specifically for a share view, 2–5 slices, and precision is not the goal: **`donut`**. Label slices with values; sort slices by size; reserve one accent color for the emphasized slice.
- **`sunburst`** only when the hierarchy itself is the point (multi-level part-to-whole). If the user just wants one level, use bars.
- **`treemap`** when there are many parts (≥10), the data is hierarchical, and rough magnitude is enough — AWS cost by service × region, disk usage by folder, company headcount by org tree. Area is a weaker channel than length, so use a treemap when the number of parts would make a bar chart a texture but the reader only needs relative magnitude; reach for bars when precise ranking matters.
- `stacked` / `horizontal-stacked` are appropriate when the primary message is the *total* and the composition is secondary, or when comparing totals across several categories with 2–3 composition pieces each.
- Do not use any area/angle encoding (`donut`, `sunburst`, `treemap`) when the reader must rank the parts precisely — they will misread.

## Breakdown + comparison: how does the composition of X differ across groups?

- Primary: **`horizontal-stacked`** with parts normalized to 100% across groups, or side-by-side grouped bars.
- If there are ≥5 parts per group, consider small multiples or a `pivot-table` with conditional shading.
- Sort groups by the focal segment's share, not alphabetically.

## Correlation: how do X and Y relate?

- Example phrasings: "does marketing spend correlate with sign-ups?", "price vs. rating", "tenure vs. salary".
- Primary: **`scatter`**. 2-D position encodes both variables; this is the most accurate encoding available.
- Use a square aspect ratio (height ≈ width) so neither axis is visually emphasized.
- Add a trend line when the overall relationship is the message; omit it when outliers are the message.
- A third quantitative variable can go on size (`bubble`) or color; a fourth on shape. Cap at 3 total aesthetics before faceting.
- Do not force correlation into a dual-axis line chart — it implies causation through shared x-axis and hides the actual relationship.

## Outliers / top-N: what are the biggest, smallest, or unusual values?

- Example phrasings: "top 10 customers by ARR", "worst-performing stores", "which reps missed quota?".
- Primary: **`horizontal-bar`** sorted descending (or ascending if "bottom N"), top-N truncated, with "Other" aggregated if the tail matters.
- Direct-label the focal bar(s) and annotate why they're notable.
- Use accent-on-gray to make the outlier bar stand out; gray the rest. See [`../encode/color.md`](../encode/color.md).
- If the outliers live in a two-dimensional relationship (e.g., "which customers are high-spend but low-retention?"), use `scatter` and annotate the quadrant or individual points.
- For single-dimension outlier detection over many points, a `box-plot` is ideal.

## Bridge / decomposition: how did we get from A to B?

- Example phrasings: "headcount bridge from Q1 to Q4 (starting + hires + transfers − attrition)", "revenue bridge from plan to actual", "cost variance: volume + mix + price effects".
- Primary: **`waterfall`**. Starting value, a sequence of itemized positive/negative changes, ending value. The shape makes the decomposition legible in a way a stacked bar cannot: the reader sees both the size of each contribution and where the running total sits after each step.
- Keep the step count small (≤8) or the chart becomes a hunt for labels.
- Color positive/negative contributions distinctly (blue/orange rather than green/red for colorblind safety). Label every bar with its delta.
- Don't reach for a waterfall unless the data is *genuinely* a start → changes → end story. A waterfall of arbitrary variance components without a true starting/ending anchor reads as a strange bar chart.
- See [`../charts/waterfall.md`](../charts/waterfall.md).

## Target vs. actual: are we hitting our number?

- Example phrasings: "is Q3 revenue on track?", "bug count vs. SLA", "pipeline coverage vs. quota".
- Primary when you have exactly one focal number: **`single-value`** with the target as a small subtitle and the variance as an annotation (e.g., "$4.2M / $5.0M target · -16%"). Lightest, most readable option.
- Primary when rough progress is the point and the audience expects a dial: **`gauge`**. Acceptable but pays the angle-encoding accuracy tax. Label the value and the target clearly; avoid using color alone to signal good/bad.
- When comparing actual to target across several entities (reps, regions, products): a `bullet` chart is ideal. Simpler fallback: `horizontal-bar` of actual, with a vertical reference line for the target and a muted "max/stretch" bar behind it.
- When showing target vs. actual over time: `line` for actual + dashed `line` for target, or `combination` with bars for actual and line for target.

## Progression / funnel: how many drop off at each stage?

- Example phrasings: "sign-up funnel", "sales stages", "onboarding completion".
- Primary: **`funnel`**. Only use when stages are strictly sequential and each stage is a subset of the previous one.
- Label each stage with absolute count and conversion % from the prior stage; include end-to-end conversion.
- If stages are not strictly sequential (e.g., parallel paths), do not use a funnel. Use sorted `horizontal-bar` or a `pivot-table` instead.

## Distribution: how is X spread out?

- Example phrasings: "distribution of order sizes", "response time histogram", "salary bands".
- Primary: `histogram` or `box-plot`.
- Simpler fallback: bin the data yourself and render as **`bar`** (one bar per bin, bars touching to signal continuity — that's a histogram by construction). Label x-axis with bin ranges.
- For comparing distributions across groups, reach for `box-plot`; otherwise overlay frequency polygons as `line` with each group a separate line, or facet.
- Do not use `donut` / `sunburst` / `stacked` for distributions — they hide the shape.

## Geospatial: where are the values concentrated?

- Primary: `map`.
- Simpler fallback: `horizontal-bar` of regions sorted by value, with the regional name in the category label. Not as expressive but truthful.

## Pattern across two categorical dimensions: where is the signal in the matrix?

- Example phrasings: "retention by cohort × month", "errors by service × region", "activity by hour-of-day × day-of-week", "correlation matrix across metrics".
- Primary: **`heatmap`**. Two categorical axes form the grid; color lightness encodes the measure. Reads as a 2D pattern at a glance — hot corners, ridges, diagonal stripes — where a grid of bar charts would fragment the pattern across panels.
- Color channel ranks low in the perceptual hierarchy, so reserve heatmaps for *pattern discovery*, not precise value reading. If the reader needs exact values, overlay labels or switch to a `pivot-table` with conditional formatting.
- Sequential palette when the measure runs low → high (Blues, YlOrRd); diverging palette when there's a meaningful midpoint (RdBu centered at zero for variance from plan).
- **Form-fit constraint**: heatmaps depend on a whole-view parallel scan. If the matrix won't fit unscrolled in its tile, the affordance silently collapses — the reader scrolls instead of scanning, and the "find the hot corner" task breaks. See [`decision-flow.md`](decision-flow.md) Step 4 *Form-fit* and [`../charts/heatmap.md`](../charts/heatmap.md).

## Lookup / reference: what exactly is the value of X for row Y?

- Primary: **`pivot-table`** or **`grid`**. Tables beat charts when the reader is looking up precise values.
- Right-align numbers, align decimals, use light gridlines.
- Add conditional formatting (color intensity) only as a secondary cue, not as the primary encoding.

## Quick-reference matrix

| Question shape                 | Primary chart                  | Acceptable alternatives             | Notes                                           |
| ------------------------------ | ------------------------------ | ----------------------------------- | ----------------------------------------------- |
| Compare values across categories | `horizontal-bar` / `bar`     | `dot-plot` (similar-length bars), `pivot-table` (many categories) | Sort by value; zero baseline (or swap geom to dot-plot) |
| Trend over time (macro)        | `line`                         | `bar` for few periods, `combination`| Time on x-axis, consistent intervals            |
| Before/after, many entities    | `slopegraph`                   | `horizontal-bar` of the change      | Two time points only; encodes values + rate     |
| Rank over time                 | `line` with inverted-y (rank)  | `slopegraph` if only 2 time points  | Out-of-palette ideal: bump chart; ≤8 entities    |
| Growth from different starts   | `line` with "days since" x-axis | —                                  | Out-of-palette ideal: index chart; re-anchor x   |
| Durations / event timelines    | `horizontal-bar` (start + length) | —                                | Out-of-palette ideal: Gantt chart                |
| Two time dimensions (h × d)    | `heatmap` (labeled)            | `pivot-table` with conditional fmt  | Labeled calendar heatmap; reveals holidays + cycles |
| Cyclical patterns              | faceted `bar` or `line` (small multiples) | `bar` aggregated by ordinal time | Out-of-palette ideal: cycle plot           |
| Part-to-whole (few parts)      | sorted `horizontal-bar`        | `donut` (2–5 slices, rough)         | Label % and 100% total                          |
| Part-to-whole (hierarchical)   | `sunburst`                     | `treemap` (many parts), nested `pivot-table` | Only when hierarchy is the point       |
| Part-to-whole (many parts, rough) | `treemap`                   | sorted `horizontal-bar` top-N       | Area encoding, precision poor                   |
| Composition across groups      | `horizontal-stacked` (100%)    | side-by-side bars, small multiples  | Sort by focal segment                           |
| Correlation                    | `scatter`                      | `bubble` (3rd var), `pivot-table`   | Square aspect ratio; trend line optional        |
| 2D categorical pattern         | `heatmap`                      | `pivot-table` with conditional fmt  | Pattern, not precision; must fit unscrolled     |
| Top-N / outliers               | sorted `horizontal-bar`        | `scatter` (2-D outliers), `box-plot` (single-dim) | Accent the outlier; gray the rest   |
| Bridge / decomposition         | `waterfall`                    | —                                   | Start → changes → end; keep steps ≤8           |
| Target vs. actual (one number) | `single-value`                 | `gauge`                             | Show target and variance as annotation          |
| Target vs. actual (many)       | `bullet`                       | `horizontal-bar` with reference line | Bullet beats gauge everywhere                 |
| Target vs. actual (over time)  | `combination` or two `line`s   | —                                   | Dashed line for target                          |
| Funnel / sequential progression| `funnel`                       | sorted `horizontal-bar`             | Only if strictly sequential                     |
| Distribution                   | `histogram`                    | binned `bar` chart, `box-plot`      | Bars touching to signal continuity             |
| Geospatial                     | `map`                          | sorted `horizontal-bar` by region   | —                                               |
| Lookup / reference             | `pivot-table` / `grid`         | conditional-formatted table         | Right-align numbers                             |

`sparkline` is not in the table by design — it's never a top-level chart choice. Sparklines live embedded in `single-value` tiles or `pivot-table` rows. If you find yourself reaching for a sparkline as a standalone chart, the right answer is a small `line`.

## Common mistakes this skill prevents

- Using `donut` or `sunburst` when the user's real question is "rank these".
- Using `line` when the user wants discrete-period comparison, or `bar` when they want trend.
- Using `combination` (dual-axis) to imply a correlation that should be proven with `scatter`.
- Reaching for `gauge` whenever a target exists, when `single-value` + annotation reads faster and more precisely.
- Binning "top N" as a `pivot-table` when a sorted `horizontal-bar` would let the outlier pop instantly.

## See also

- [`by-data-shape.md`](by-data-shape.md) — when the data shape is the determining factor rather than the question
- [`decision-flow.md`](decision-flow.md) — stepwise decision tree from data + question to chart type
- [`../00-mental-model.md`](../00-mental-model.md) — perceptual hierarchy behind these recommendations
- [`../encode/color.md`](../encode/color.md) — accent-on-gray for emphasizing the answer
- [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md) — zero baselines and time axes
