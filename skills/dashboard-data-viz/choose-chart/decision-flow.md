---
name: choose-chart-decision-flow
description: End-to-end chart-type decision flow from data + question to specific chart.
---

# Chart-type decision flow

A stepwise tree that terminates in a single chart type. Use this when the question and data are both known and you just need the answer. When either is underspecified, use [`by-question.md`](by-question.md) or [`by-data-shape.md`](by-data-shape.md) first.

The chart types are: `grid, pivot-table, bar, horizontal-bar, stacked, horizontal-stacked, line, combination, donut, sunburst, funnel, scatter, gauge, single-value, heatmap, histogram, box-plot, dot-plot, slopegraph, waterfall, sparkline, bullet, treemap, bubble, map`. A simpler fallback is always given when the primary is unusual or the audience is unlikely to be fluent.

## Before the tree: Knaflic's simple-six

Before descending into the tree, try to answer the question with one of **simple text, table, heatmap, scatter, line, or bar**. Knaflic built an entire year of BI visuals out of roughly a dozen chart types, with these six doing most of the work.

If one of the six fits, stop. You don't need the tree.

The tree below exists for cases where (a) none of the six fits the shape of the data, or (b) the choice among them needs sharpening, or (c) a specialized form (funnel, bullet, slopegraph, waterfall, treemap) is the unambiguously correct answer for a specific triggering condition. Reach for a specialized form only when its trigger applies — never because it looks more interesting than a bar chart.

**Exotic forms that a beginner might overreach for** — gauge, sunburst, radar, donut beyond 4 slices, treemap beyond rough magnitude — should be actively resisted. Each pays a tutorial tax and a perceptual-accuracy tax. The tree surfaces their *specific* triggers; if those triggers don't match, use a simpler form.

**Sparkline is not a top-level choice.** Sparklines live inside `single-value` tiles and `pivot-table` rows, never as a standalone chart. If you're about to select sparkline from this tree, you want a small `line` instead.

## The 5-step tree

Work each step in order. Do not skip.

### Step 1 — how many values will the chart show?

- **1 value** (one number, possibly with a comparison)
  - Progress to a known target / plan / budget, and a dial aesthetic is expected → **`gauge`**.
  - Any other case (KPI, single metric with comparison annotation, headline number) → **`single-value`**. Add a small subtitle with "vs. prior period" or "vs. target"; `single-value` + annotation is more precise and readable than a gauge.
- **2 values** (just two numbers to compare)
  - Most of the time: **`single-value`** or a two-cell `pivot-table` with the difference as a third cell. Two bars are usually overkill; inline text lands faster.
  - Over time (two time points, many entities): `slopegraph` is ideal. Simpler fallback: `horizontal-bar` of the change, or `combination`.
- **3–25 values**
  - Go to Step 2.
- **25+ values**
  - Likely needs aggregation, faceting (small multiples), or a table. Continue to Step 2 but consider a `pivot-table` with conditional formatting as the honest answer. More than ~30 bars becomes a texture, not a chart.
- **Many paired observations (correlation-shaped data)**
  - Jump to Step 3's correlation branch.

### Step 2 — is this a time series?

Time series means one quantitative value indexed by regularly-spaced time on a single axis.

- **Yes, regular intervals**
  - Trend or direction is the message → **`line`**. Time on x-axis, left-to-right, cap at 3–4 lines, direct-label endpoints.
  - Individual periods are the message (e.g., "what was the total for each of the last 4 quarters?") → **`bar`**. But if the audience will ask "is it going up?", switch to line.
  - Actual vs. target / forecast / prior period → **`combination`** (bar + line) or two `line`s with different `linetype`.
  - Going up and composition *within* each period → **`stacked`** when total is the primary message; otherwise multiple lines.
  - **Exactly two time points across many entities** (Q1 vs. Q4 NPS by region, H1 vs. H2 win rate by rep) → **`slopegraph`**. Do not use a 2-point line — two points can't support a trend. Do not use side-by-side bars — they hide rate of change.
- **Yes, irregular intervals**
  - **`scatter`** with no connecting line. Connecting irregular time points invents data between them.
- **No** (not time-indexed)
  - Proceed to Step 3.

### Step 3 — what's the relationship?

Classify the intent. Each branch terminates in a specific chart.

#### Comparison across categories (nominal / ranking)

- Sort by value helps the message (ranking, top-N, outliers) → sorted **`horizontal-bar`** when labels are long or ≥7 categories; sorted **`bar`** for short labels with ≤7 categories. Accent the focal bar; gray the rest. See [`../encode/color.md`](../encode/color.md).
- Natural order matters (chronological, audience convention) → `bar` or `horizontal-bar`, preserve the natural order.
- **Values very similar and zero baseline makes the differences disappear** → **`dot-plot`**. Position encodes the value, so a non-zero baseline is honest. This is the principled escape from the zero-baseline rule: never truncate the bar axis to show subtle differences — swap the geom. Canonical cases: NPS 42–51 across regions, response times 1.8–2.3s. Simpler fallback: `pivot-table` with conditional formatting.
- Too many categories for bars (≥25) → `pivot-table` with conditional formatting, or aggregate to top N + "Other".

#### Composition (part-to-whole)

- Parts are few (2–5), precision not the goal, audience explicitly asks for a slice view → **`donut`**. Label slices with values; sort by size; accent the focal slice.
- Parts are few (≤10), precision matters, or "rank the parts" is the real question → sorted **`horizontal-bar`** with percentages labeled and a "100%" total.
- Hierarchy itself (parent → child → leaf) is the point → **`sunburst`**. If the user only cares about leaves, use bars instead.
- **Many parts (≥10) with hierarchy, rough magnitude is enough** → **`treemap`**. Typical cases: AWS cost by service × region, disk usage by folder, headcount by org tree. If the reader needs to rank precisely, use top-N bars + "Other" instead — treemap's area encoding is weaker than length.
- Totals are the primary message, composition is secondary, few sub-components (2–3) → **`stacked`** or **`horizontal-stacked`**.
- Composition *across groups* (e.g., "how does mix differ by region?") → **`horizontal-stacked`** normalized to 100%; sort groups by the focal segment's share.
- **Itemized decomposition: start → +A − B + C → end** → **`waterfall`**. Headcount bridges, revenue bridges, variance decomposition. Keep steps ≤8; color positive/negative distinctly (blue/orange, not green/red). Use only when the data is genuinely a start-changes-end story.

#### Correlation (two quantitative variables)

- Always start with **`scatter`**. Square aspect ratio; trend line if the overall relationship is the message; accent individual outlier points.
- Third quantitative variable → size (`bubble`) or color; fourth → shape. Cap at 3 aesthetics before faceting.
- If you feel the urge to use `combination` (dual-axis) to show correlation, stop. Dual axes let the author invent correlation through rescaling; use scatter.

#### Target vs. actual / deviation

- Single entity, single focal number → **`single-value`** with target and variance as annotation.
- Single entity, dial aesthetic requested → **`gauge`**.
- Many entities, each with its own target → `bullet`. Simpler fallback: sorted **`horizontal-bar`** of actuals with a vertical reference line at target.
- Deviation over time → **`combination`** (bar actual + line target) or two `line`s.
- Signed variance (positive above zero, negative below) → vertical **`bar`** across the zero line. Blue/orange for positive/negative; not red/green.

#### Sequential progression

- Strictly sequential stages, each a subset of the previous (signups → activations → trials → paid) → **`funnel`**. Label each stage with count and conversion %.
- Not strictly sequential, or stages branch → sorted **`horizontal-bar`** or `pivot-table`.

#### Distribution

- Shape of values for one measure over many observations → `histogram`. Simpler fallback: bin the data and render as `bar` with bars touching. Label bins on x-axis.
- Compare distributions across groups → `box-plot`. Simpler fallback: overlay frequency polygons as `line` (≤4 groups), or `pivot-table` with summary stats.
- Never use `donut` / `sunburst` / `stacked` for distributions.

#### 2D categorical pattern (matrix)

- One measure indexed by two categorical dimensions, where **pattern across the grid** is the point (cohort retention, hour × day activity, errors by service × region, correlation matrix) → **`heatmap`**. Color lightness encodes magnitude; sequential palette for low→high, diverging for signed deviation from a midpoint.
- Precise values are the point → **`pivot-table`** with conditional formatting (value text primary, color secondary).
- **Form-fit caveat**: heatmaps require whole-view parallel scan. If the grid won't fit unscrolled, the pattern-discovery affordance silently collapses — aggregate, facet, or switch form. See Step 4 *Form-fit*.

#### Geospatial

- Geographic distribution → `map`. Simpler fallback: sorted `horizontal-bar` by region.

#### Lookup / precise values

- Reader is looking up specific numbers → **`pivot-table`** or **`grid`**. Right-align numbers, align decimals, light gridlines.

### Step 4 — apply constraints

Before finalizing, check three constraints. Each can override the Step 3 answer.

#### Audience literacy

- Unfamiliar chart types (`sunburst`, `funnel`, `gauge`, `waterfall`, `slopegraph`, `treemap`, `bullet`, `box-plot`) carry a tutorial tax. If the audience isn't fluent, either (a) switch to a familiar type (bar, line, table), or (b) annotate heavily — title states the takeaway, callouts explain how to read it.
- For exec audiences with seconds of attention, `single-value` + strong title often beats the fancier answer.
- For analyst audiences with time, a `pivot-table` or `scatter` lets them do their own reading.
- Knaflic's position: most questions can be answered with simple text, table, heatmap, scatter, line, or bar. If your tree-terminating chart isn't one of these six, double-check the trigger actually applies.

#### Precision required

- High precision (lookup, financial reports, compliance) → `pivot-table` or `grid` beats any chart.
- Medium precision (comparison, trend) → `bar` / `line` / `scatter`.
- Low precision (emotional framing, rough magnitude, "one big number") → `single-value`, `donut`, `gauge` all acceptable.
- If the user's question is "is A bigger than B, and by how much?" and you're about to render a `donut`, stop. Switch to sorted `horizontal-bar`.

#### Number of categories / series

- `line`: ≤3–4 series or it becomes a spaghetti chart. Mute non-focal lines to gray.
- `bar` / `horizontal-bar`: up to ~25 categories. Beyond, aggregate or switch to table.
- `donut`: 2–5 slices.
- `sunburst`: depth 2–3 levels, ≤30 leaf nodes.
- `stacked` / `horizontal-stacked`: 2–3 segment categories per bar. More than that and segments become unreadable.
- `scatter`: unlimited observations; thin points or add alpha transparency if overplotting.
- `gauge`: one number.
- `slopegraph`: ≤15 entities before slope overlap destroys readability; facet or show only movers beyond that.
- `waterfall`: ≤8 steps before labels become a hunt.
- `treemap`: 10–50 leaf cells is the sweet spot; <10 is better as bars, >50 and cells become unreadable.
- `heatmap`: must fit unscrolled in the tile; aggregate or facet if not.

#### Form-fit — does the affordance survive the data size?

Every chart form is chosen for a specific perceptual affordance. Each affordance holds only within a capacity range; exceeding the range doesn't just make the chart harder to read — it **silently voids the reason the form was chosen**. The chart still renders; it no longer does its job. Before committing a form, estimate whether the data will fit the form's affordance in the tile it will occupy.

- **Forms that depend on whole-view parallel scan** (heatmap, `pivot-table` with conditional formatting pitched as a heatmap, small multiples, dense `scatter`) fail *silently* when the data exceeds the visible tile. Scrolling serializes a perception meant to be parallel; the reader can no longer hold the whole grid in one glance and the "look for clusters / hot corners / ridges" job breaks. Either (a) reduce the data to fit (filter, aggregate, top-N), (b) facet so each panel's grid fits, or (c) switch form.
- **Forms that degrade gracefully under scroll** (`pivot-table` as lookup, ranked `horizontal-bar`, `grid`, `single-value` rows) keep working — if the reader has to scroll to find row 42, the scroll *is* the lookup.
- **Specific capacities** to check against:
  - `scatter` above ~2,000 points without alpha/binning → overplotting destroys the density signal; switch to a binned heatmap or `pivot-table`.
  - `bar` / `horizontal-bar` above ~25 bars → becomes texture, not chart.
  - `pivot-table` with conditional formatting that doesn't fit unscrolled → heatmap affordance collapses; drop the shading, facet, or switch to `scatter` / `horizontal-bar`. See [`../charts/pivot-table.md`](../charts/pivot-table.md) *Conditional formatting*.
  - Small multiples whose panels fall below ~2×2 cells → each panel too small to read; reduce facet count or drop the form.

The common trap: the generator picks the form that answers the question in principle (heatmap for a 2D categorical × measure shape) but the data has 80 rows and the tile is 520px tall. The rendered chart *looks* like the right answer and is *labeled* like the right answer, but the affordance that made the form correct isn't there. A reader pressed for time will read the shading as a pattern signal it can't deliver and walk away with a wrong conclusion. Form-fit is a first-class design constraint, not a rendering detail.

### Step 5 — sanity check against integrity

Before shipping, apply the integrity rules from [`../02-graphical-integrity.md`](../02-graphical-integrity.md). These can demote a chart that passed Step 3:

- Bar chart not starting at zero → switch to `dot-plot` or `pivot-table`; never truncate.
- Dual-axis `combination` chart where the two series share a fake visual correlation → split into two stacked charts or use `scatter`.
- Area encoding a one-dimensional value (bubble sized by radius, 3D column) → reject.
- Time axis with inconsistent intervals → reject; reformat data first.

## Simpler-fallback list

When the ideal chart is the right answer but an audience wouldn't be fluent, the tile is too small, or the form isn't available, use the simpler fallback:

| Ideal          | Simpler fallback                                         |
| -------------- | -------------------------------------------------------- |
| Histogram      | Binned `bar` with bars touching                          |
| Box plot       | `pivot-table` with min/p25/median/p75/max columns; overlaid `line`s for frequency polygons when comparing groups |
| Dot plot       | `pivot-table` with values, or `bar` starting at zero if the range permits |
| Slopegraph     | `line` with only two x-values per series; or `horizontal-bar` of the change |
| Bullet         | `horizontal-bar` with a vertical reference line at target |
| Waterfall      | `bar` chart with positive and negative values across a zero baseline; annotate running total |
| Sparkline      | Small `line`, axes suppressed, endpoint labeled          |
| Heatmap        | `pivot-table` with conditional formatting — **only when the matrix fits unscrolled**; otherwise `scatter` (for per-entity relationships across continuous measures) or sorted `horizontal-bar` (for ranking). See Step 4 *Form-fit*. |
| Bubble         | `scatter` with size omitted, or with `pivot-table` showing the third variable |
| Treemap        | `sunburst` (single level) or sorted `horizontal-bar`     |
| Map            | Sorted `horizontal-bar` by region                        |
| Small multiples| Multiple separate charts sharing axis ranges             |

## Worked examples

### Example 1

User: "I have revenue by region for the last quarter. Show me which region leads."

- Step 1: 5 regions → 3–25 values branch.
- Step 2: not a time series.
- Step 3: comparison, ranking is the point → sorted `horizontal-bar`.
- Step 4: audience is an exec → action title, accent the top bar.
- Step 5: zero baseline OK; labels short but there are 5, so horizontal is fine.
- Answer: `horizontal-bar`, sorted descending, accent on the top bar.

### Example 2

User: "Show me our monthly signups over the last year."

- Step 1: 12 values.
- Step 2: yes, regular monthly intervals, trend is the point → `line`.
- Step 3: already resolved.
- Step 4: one series, any audience can read it.
- Step 5: zero baseline optional; pick a range that doesn't exaggerate.
- Answer: `line`, one series, direct-label the endpoint.

### Example 3

User: "What's the share of revenue from each of our 8 product lines?"

- Step 1: 8 values.
- Step 2: not a time series.
- Step 3: part-to-whole. 8 parts is too many for `donut`; precision will matter because someone will ask "is A bigger than B" → sorted `horizontal-bar` with percentages, labeled with "100%" total.
- Step 4: fine for any audience.
- Step 5: zero baseline.
- Answer: sorted `horizontal-bar`, percentages labeled, small "100%" annotation.

### Example 4

User: "Are we on track to hit $5M this quarter? We're at $4.2M."

- Step 1: 2 values (actual + target).
- Step 2: not a time series view (one snapshot).
- Step 3: deviation, one entity → `single-value`.
- Step 4: exec audience → action title, variance annotation.
- Step 5: honest framing.
- Answer: `single-value` displaying "$4.2M", subtitle "vs. $5.0M plan", annotation "-16% · 3 weeks remaining".

### Example 5

User: "Does CAC correlate with retention across our customer cohorts?"

- Step 1: many paired observations.
- Step 2: not a time series.
- Step 3: correlation → `scatter`.
- Step 4: analyst audience, high tolerance.
- Step 5: square aspect ratio, label axes with units.
- Answer: `scatter`, square aspect, optional trend line, annotate any obvious outlier cohorts.

## See also

- [`by-question.md`](by-question.md) — when the question is primary
- [`by-data-shape.md`](by-data-shape.md) — when the data shape is primary
- [`../00-mental-model.md`](../00-mental-model.md) — the perceptual hierarchy under every branch
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — the integrity check in Step 5
- [`../encode/small-multiples.md`](../encode/small-multiples.md) — the faceting escape valve
