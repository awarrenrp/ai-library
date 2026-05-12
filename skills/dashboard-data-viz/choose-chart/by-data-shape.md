---
name: choose-chart-by-data-shape
description: Pick chart type from data shape: measures × categoricals × time × hierarchy × geography × distribution.
---

# Choose a chart by data shape

When the user's question is vague but the data is concrete, let the data shape drive the chart. The eight-relationship taxonomy is the spine of this file: every dataset fits one of eight relationships, and each has a small set of appropriate chart types.

## How to use

1. Classify the dataset into one of the eight relationships below.
2. Pick the primary chart. Fall back to an alternative if the primary doesn't fit the data volume.
3. Use the mental model: match data type to aesthetic *before* picking a geom. Continuous → position; categorical → color/shape/facet.
4. Cross-link to [`by-question.md`](by-question.md) if the question is more specific than the raw shape.

## The eight (plus two) relationships

Few's canonical eight, extended with two shapes that come up constantly in BI work and don't cleanly fit his taxonomy:

| #  | Relationship         | Data shape                                         | Primary                         | Alternatives                                  |
| -- | -------------------- | -------------------------------------------------- | ------------------------------- | --------------------------------------------- |
| 1  | Nominal comparison   | 1 measure × 1 categorical (unordered)              | `horizontal-bar`                | `bar`, `dot-plot` (subtle differences), `pivot-table` |
| 2  | Time series          | 1 measure × time                                   | `line`                          | `bar` (few periods), `scatter` (irregular), `slopegraph` (two time points) |
| 3  | Ranking              | 1 measure × 1 categorical (ordered by value)       | sorted `horizontal-bar`         | sorted `bar`, `dot-plot`                      |
| 4  | Part-to-whole        | 1 measure × 1 categorical summing to a total       | sorted `horizontal-bar` with %  | `donut` (≤5 parts, rough), `sunburst` (hierarchy), `stacked` (when total is primary), `treemap` (≥10 parts + hierarchy) |
| 5  | Deviation            | 1 measure + 1 reference (target, prior period)     | `single-value`, `combination`   | `bar` with reference line, `bullet`, `waterfall` (itemized decomposition) |
| 6  | Distribution         | 1 measure × many observations (frequency of values)| `histogram`                     | `box-plot`, `line` as frequency polygon       |
| 7  | Correlation          | 2 measures × many observations                     | `scatter`                       | `pivot-table` for small N, `bubble`, `heatmap` for heavy overplot |
| 8  | Geospatial           | 1 measure × location                               | `map`                           | sorted `horizontal-bar` by region             |
| 9  | Matrix / 2D pattern  | 1 measure × 2 categoricals (pattern across grid)   | `heatmap`                       | `pivot-table` with conditional formatting     |
| 10 | Before/after         | 2 measures at 2 time points × many entities        | `slopegraph`                    | `horizontal-bar` of the delta, two-column `pivot-table` |

The rest of this file expands each row. Rows 9–10 are extensions beyond Few's eight; see their dedicated sections below.

## 1. Nominal comparison

**Shape:** one quantitative value per categorical item, where the categories have no inherent order (e.g., revenue by product, errors by service).

- Primary: **`horizontal-bar`** if category labels are long (>10 chars) or there are >7 categories. **`bar`** when labels are short, few, and chronological-ish reading is helpful.
- Bars emphasize the distinctness of each value — length on a common baseline, the most accurate perceptual channel.
- Start at zero. If the values are very similar and zero makes differences vanish, switch to a **`dot-plot`** — do not truncate the bar axis. This is Few's principled escape: position replaces length, so a non-zero baseline is honest. Canonical cases: NPS across regions ranging 42–51, response times 1.8–2.3s, satisfaction scores 4.1–4.4. Any time a bar chart would be a row of nearly-identical bars, a dot-plot reveals the differences without distortion.
- Sort by value unless a natural order exists (alphabetical-by-convention for countries, chronological for months, audience-expected for age bands).
- With >25 categories, fall back to `pivot-table` with conditional formatting; a 25-bar chart becomes a texture, not a comparison.
- If bars are too many, consider faceting by a secondary dimension (small multiples).

## 2. Time series

**Shape:** one quantitative value indexed by regularly-spaced time (daily, weekly, monthly, quarterly, yearly).

- Primary: **`line`**. Time must run left-to-right on the x-axis; this is a universal convention.
- Use `bar` only when the emphasis is on individual periods rather than the trend (e.g., "how many tickets in each of the last 6 months?" where each month is a discrete comparison). If the audience will ask "is it going up?", use line.
- Irregular intervals: show **`scatter`** points without a connecting line. Connecting irregularly-sampled points invents intermediate values.
- Zero baseline on a line chart is *optional* — position, not length, carries the value. But don't zoom so tight that a 1% wiggle looks like a cliff. See [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md).
- Multiple series: cap at 3–4 lines; direct-label each at the right endpoint; mute non-focal lines to gray.
- Aspect ratio matters: narrow exaggerates slope, wide flattens it. "Banking to 45°" — the steepest segment near 45° — maximizes slope-perception accuracy.
- Actual + target / forecast / prior year: `combination` (line + bar, or two lines with different `linetype`).
- **Exactly two time points across many entities** → **`slopegraph`**, not a 2-point line. A line with two points implies a trend that two points can't support; a slopegraph frames the comparison correctly. See relationship #10 below.

## 3. Ranking

**Shape:** same as nominal comparison, but ordering the categories by value is the point (e.g., "top 10 reps", "bottom-performing stores").

- Primary: **`horizontal-bar`**, sorted descending from the top (largest on top) when highlighting the biggest; ascending when highlighting the smallest.
- Vertical `bar` works for few categories (≤7) with short labels; descending left-to-right.
- Show the top-N explicitly; group the tail into an "Other" bar if its magnitude matters.
- Accent-on-gray: use a single bold color for the focal bars and gray everything else; label the focal values directly. See [`../encode/color.md`](../encode/color.md).
- Do not use `donut` or `sunburst` for ranking — users cannot rank arcs or wedges accurately.

## 4. Part-to-whole

**Shape:** parts of a total, typically as percentages summing to 100% (e.g., revenue by product as share of total revenue).

- Primary: sorted **`horizontal-bar`** of the parts, labeled with percentages, with a note that they sum to 100%. Superior to a pie chart for every precision task.
- Acceptable when the ask is explicitly "slice of a pie" and the parts are 2–5, rough comparison only: **`donut`**. Label slice values; sort slices by size; reserve an accent color for the emphasized slice; do not render in 3D.
- Hierarchical part-to-whole (category → subcategory → leaf): **`sunburst`**. Only when the hierarchy itself is the message; if the user just wants the leaf shares, use bars. Alternative: nested `pivot-table`.
- Many parts (≥10) where rough magnitude suffices and hierarchy is present: **`treemap`**. Area encoding is weaker than length, so use a treemap when the part count would make a bar chart a texture but precision isn't required (AWS cost by service × region, disk usage by folder). If the reader will ask "is service A bigger than service B and by how much?", switch to top-N `horizontal-bar` + "Other".
- Absolute-units part-to-whole (total in $, not %): **`stacked`** is acceptable *when the total is the primary message* and the composition is secondary. Only the bottom segment shares the baseline; all other segments are hard to compare across categories.
- Comparing composition across several groups: **`horizontal-stacked`** normalized to 100%. Sort groups by the focal segment's share, not alphabetically.
- Never use `donut` / `sunburst` / `stacked` when the user must read the parts precisely.

## 5. Deviation

**Shape:** one measure plus a reference value (target, plan, prior period, forecast), and the interesting quantity is the difference between them.

- Primary with one entity and one focal number: **`single-value`** showing the current value, with target and variance as annotations (e.g., "$4.2M · -16% vs. $5.0M plan").
- Primary with a gauge-like aesthetic the audience expects: **`gauge`**, labeled clearly with value and target. Pays the angle-encoding accuracy tax.
- With many entities and one target per entity: `bullet` chart is ideal. Simpler fallback: sorted `horizontal-bar` of actuals with a vertical reference line at the target.
- Deviation over time: **`line`** of actual + dashed `line` of target; or **`combination`** with `bar` for actual and `line` for target.
- Deviation as a variance (signed): vertical `bar` with positive above zero, negative below — the zero line becomes the baseline. Avoid red+green together; blue+orange is a colorblind-safe positive/negative pairing. See [`../encode/color.md`](../encode/color.md).
- Deviation *decomposed* into itemized positive/negative contributions (start → +A − B + C → end): **`waterfall`**. The canonical "bridge" form — headcount bridges, revenue bridges, variance decomposition. Keep steps ≤8 and color positive/negative distinctly.

## 6. Distribution

**Shape:** one measure over many observations; the question is "what's the shape of the values?" (e.g., response-time distribution, order-size distribution).

- Ideal primary: `histogram` or `box-plot`.
- Fallback if neither is available: **bin the data yourself** and render as `bar`. Set bars touching (no spacing) to signal continuity — this is a histogram by construction. Label x-axis with bin ranges.
- For comparing distributions across a small number of groups: overlay frequency polygons as `line` (one line per group), capped at 3–4 groups.
- For comparing many groups' distributions: `box-plot` is ideal. Precise fallback: a `pivot-table` showing min / p25 / median / p75 / max per group.
- Do not use `donut` / `sunburst` / `stacked` for distributions — they hide the shape entirely.

## 7. Correlation

**Shape:** two measures with paired observations; the question is "do they move together, and how?" (e.g., marketing spend vs. sign-ups, tenure vs. salary).

- Primary: **`scatter`**. 2-D position is the single most accurate encoding for two variables.
- Square aspect ratio (height ≈ width) so neither axis is visually emphasized.
- Optional trend line when the overall relationship is the point; omit when outliers or clusters are the point.
- Third quantitative variable on size (`bubble`) or color; fourth on shape. Cap at three total aesthetics before faceting.
- With <20 paired observations, `pivot-table` with both columns shown side by side may be more honest than a near-empty scatter.
- Do **not** force correlation into `combination` (dual-axis line chart). Dual axes let the author manipulate apparent correlation by rescaling one series; reach for scatter instead.

## 8. Geospatial

**Shape:** one measure indexed by location (country, state, zip, store address).

- Ideal primary: `map`.
- Simpler fallback: sorted **`horizontal-bar`** with location name as the category label. Less expressive but truthful.
- On maps: shade by per-capita or per-unit rate, not raw total, or the most populous region will always dominate.

## 9. Matrix / 2D pattern

**Shape:** one measure indexed by two categorical dimensions — a grid (e.g., retention by cohort × months-since-signup, errors by service × region, activity by hour × day-of-week).

- Primary: **`heatmap`**. Color lightness encodes magnitude; the two categorical axes form the grid. The reader scans for patterns — hot corners, ridges, diagonals — that a grid of bar charts would fragment across panels.
- Color is channel #7 in the perceptual hierarchy, so heatmaps are for *pattern discovery*, not precise value reading. If precise values matter, overlay labels or switch to a **`pivot-table`** with conditional formatting (same encoding; value text is primary, color is secondary).
- Palette: sequential (Blues, YlOrRd) for low → high magnitudes; diverging (RdBu centered at zero) when the measure has a meaningful midpoint.
- **Form-fit**: heatmaps depend on whole-view parallel scan. If the grid won't fit unscrolled in its tile, the affordance silently collapses — scrolling serializes a perception meant to be parallel. Either reduce the grid (filter, aggregate, top-N), facet, or switch form. See [`decision-flow.md`](decision-flow.md) Step 4 *Form-fit*.
- Not on Few's list; included here because 2D categorical patterns are a staple of BI dashboards.

## 10. Before/after across many entities

**Shape:** one measure at exactly two time points, across many entities — NPS per region at Q1 and Q4, win rate per rep H1 and H2, feature usage before and after launch.

- Primary: **`slopegraph`**. Two endpoints per entity, connected by a line; left = time A, right = time B, slope = rate of change. Encodes absolute values AND direction/magnitude of change in one glance.
- Knaflic's rule: when there are exactly two time points across many categories, a slopegraph beats both (a) a 2-point line (implies continuous trend that two points can't support) and (b) side-by-side bars (no rate-of-change encoding; the reader has to subtract mentally).
- Cap at ~15 entities before slopes overlap illegibly; beyond that, facet or show only the movers.
- Accent the entities whose change is the story; mute the rest. Direct-label endpoints.
- Alternative when "who moved most?" is the only question: **`horizontal-bar`** of the delta, sorted. Loses the absolute-value context but ranks moves precisely.
- Not on Few's list; included because 2-point longitudinal comparison is common and has a specific correct answer.

## Data-type → aesthetic quick check

Before picking a geom, match data type to aesthetic. This reasoning produces the right chart most of the time without needing to name a chart type.

- **Continuous quantitative** → position (x or y). Most accurate.
- **Ordered categorical** → position (x or y) or sequential color (lightness).
- **Unordered categorical** → hue or shape.
- **Time** → position on x-axis, left-to-right, linear scale.
- **Hierarchy** → facet / nesting; position in sunburst or treemap only when the hierarchy is the point.
- **Geography** → map coordinates; otherwise horizontal-bar by region.

If you catch yourself wanting to encode a continuous quantity via area, angle, or volume, you are almost always better off encoding it via position or length.

## When data volume changes the chart

- **1 value:** `single-value` (with comparison annotation), or `gauge` if progress-to-target is the point.
- **2–20 values, same metric:** `bar` or `horizontal-bar`. A `pivot-table` also works when precision matters.
- **20–50 values:** `horizontal-bar` if sort order matters; `pivot-table` with conditional formatting if lookup matters.
- **50–500 values:** a table becomes unreadable; a bar chart becomes a texture. Reach for aggregation, faceting (small multiples), or a `heatmap`. Simpler fallback: `pivot-table` sorted and truncated to top N.
- **500+ values:** aggregate first, then chart the aggregate. Never show 500 raw bars.

## Common mistakes this skill prevents

- Rendering a `donut` for a 9-slice part-to-whole where the audience needs to rank the slices.
- Forcing a ranked dataset into a `pivot-table` when a sorted `horizontal-bar` would make the ranking instantly visible.
- Using `line` for a dataset with irregular time intervals — connect-the-dots fabricates intermediate values.
- Picking `scatter` for a time series when `line` would show the trend.
- Rendering distribution data as a `donut` of bins (a classic wrong answer).

## See also

- [`by-question.md`](by-question.md) — pick a chart based on the analytical question
- [`decision-flow.md`](decision-flow.md) — stepwise end-to-end tree from data + question to chart
- [`../00-mental-model.md`](../00-mental-model.md) — perceptual hierarchy behind position/length/angle/area
- [`../encode/visual-channels.md`](../encode/visual-channels.md) — channel effectiveness in detail
- [`../encode/small-multiples.md`](../encode/small-multiples.md) — when to facet instead of layering aesthetics
