---
name: encode-small-multiples
description: Produce chart.facet — small-multiples panels. Reach for this when a single chart is crowded with multiple categories or aesthetics.
governs: chart.facet
---

# Small multiples

A sequence of similar graphics, each showing the same variables for a different subset of the data. Formalized in the grammar as `facet_wrap` and `facet_grid`. The go-to answer when a single chart is trying to carry too much.

> Note on tool support: native small-multiples rendering is a known gap (see README "Known gaps"). Fallback until it lands: multiple separate charts sharing axis ranges, laid out in a dashboard grid.

## Why small multiples work

- **Consistency of scale, encoding, and design across all panels.** That's the whole point — the reader's eye compares shapes, not labels.
- **Enable comparison across a categorical dimension** without overloading aesthetics. Instead of 8 lines in one chart in 8 colors, 8 panels with 1 line each, all on the same axis.
- **Accommodate interactions and non-linearities** that disappear when data is aggregated.
- **High data density at a reduced size** — each panel is small and efficient; the matrix of panels shows complex relationships on a single page.
- **Answer "compared to what?" visually** — every panel is a comparison target for every other panel.

## When to reach for small multiples

- **>3 aesthetics in one panel.** The rule of ≤3 aesthetics per chart means the fourth variable should go to facet, not to a new color/size/shape. See [`visual-channels.md`](visual-channels.md).
- **Breakdown across a categorical dimension** with more than 3–4 categories. A 10-line line chart is unreadable; 10 small lines in a grid is.
- **Many time series with the same shape but different scales.** Trends by region, by product, by cohort.
- **Multiple distributions** (histograms or box plots) one per group.
- **Many correlations** (scatter plots) one per condition.
- **Matrix breakdowns** (e.g., revenue by product × region) — use `facet_grid` semantics (row = product, column = region).

If you find yourself reaching for more colors, more shapes, more sizes, or a crowded legend, facet instead.

## Core rules

### 1. Consistent scale across panels (default)

All panels share the same y-axis (and x-axis) ranges. This is the rule that makes comparison across panels valid.

- A bump in panel A at the same y-value as a bump in panel B actually means the same thing.
- Without shared scale, the reader sees "shape similar across panels" when the data says "magnitudes wildly different."

Override only when:

- Per-panel variation is the point (rare — document it).
- Data spans orders of magnitude that can't share one axis. In that case, consider a log scale on the shared axis instead of free scales.

### 2. Consistent design across panels

Everything except the data ink is identical across panels:

- Same chart type (all lines, all scatters, etc.).
- Same axis layout (shared x across a row, shared y down a column).
- Same colors for the same variables.
- Same annotations style.
- Same aspect ratio.

This is the "show data variation, not design variation" rule applied panel-to-panel.

### 3. Reasonable panel count

- **3–12 panels** is the sweet spot — each panel is large enough to read, the matrix fits on one screen.
- **25+ panels** only as a reference / overview ("here are all 50 states") where the user can scan the grid for outliers.
- **100+ panels** = heatmap territory. Switch encoding.
- Below 3, small multiples rarely earn their complexity; a single chart with direct labels is usually better.

### 4. Shared axes, shared legend

- The x-axis and y-axis apparatus should appear once per row/column, not in every panel. This saves space and signals that the scale is shared.
- The legend appears once for the whole multiples matrix, not per panel.
- Every panel labeled with its subset identifier (region name, product, cohort), placed consistently (usually top-left).

### 5. Ordering of panels matters

- **Order by value**, not alphabetically.
- Order by the focal quantity: descending by mean y-value, by most recent value, by total, by rank.
- Alphabetical ordering hides patterns — the data's structure becomes random noise in the panel arrangement.
- For `facet_grid`-style (two-dimensional faceting), order both dimensions by their marginal statistic.
- Natural orders override: months chronologically, age bands low-to-high, severity levels low-to-high.

### 6. Annotate the "story" panel

When one panel is the point (the one with the outlier, the one with the turnaround), use accent-on-gray and a direct annotation on that panel.

- Every other panel stays gray/muted.
- The focal panel gets the accent color and a short caption.
- This turns an exploratory grid into an explanatory one.

## Panel arrangement

### `facet_wrap` (1-D faceting)

- One categorical variable, panels flow left-to-right, top-to-bottom, wrapping after N columns.
- Use for a simple breakdown: one panel per region, one per product, one per cohort.
- Pick column count to roughly match the aspect ratio of the panels: wide panels → few columns; tall panels → many columns.

### `facet_grid` (2-D faceting)

- Two categorical variables, one on rows and one on columns.
- Use for matrix breakdowns: product (rows) × region (columns); age band (rows) × gender (columns).
- Every row shares a y-axis; every column shares an x-axis.
- Label the row variable on the right margin; the column variable on the top margin.

### When to prefer which

- One categorical dimension → `facet_wrap`.
- Two categorical dimensions where every cell matters → `facet_grid`.
- Two dimensions but sparse combinations → `facet_wrap` with a combined label (e.g., "US · Enterprise").

## Small multiples vs. other answers

When the data suggests "too many" for one chart, small multiples is one of three valid responses. Pick the right one:

- **Small multiples** — when you want per-category detail and per-category comparison. The default when you have 4–20 categories and per-category shape matters.
- **Accent-on-gray** in a single chart — when one category is the focus and the others are context. Cheaper visually; less information.
- **Aggregation** — when per-category detail isn't needed and a total or average summarizes the truth.

Do not mix: a chart with both per-category detail *and* aggregation usually muddles both.

## Small multiples and the grammar

Faceting is independent of layer, geom, and stat. You can facet:

- A `line` chart → one line per panel.
- A `scatter` → one scatter per panel.
- A `bar` chart → one bar group per panel.
- A multi-layer chart (points + smooth) → both layers faceted identically.

The rest of the grammar stays the same. The faceting spec is a separate dial.

## Fallback until native faceting ships

Small multiples is a known gap (see README "Known gaps"). Until the tool supports native faceting, simulate small multiples by:

- Placing multiple single-panel charts on the dashboard in a grid layout.
- Manually forcing identical x-axis and y-axis ranges across the group.
- Using identical chart type, colors, and annotation style.
- Labeling each chart with its subset identifier.
- Arranging in value order (not alphabetical).

See [`../dashboard/structure.md`](../dashboard/structure.md) for grid layout mechanics.

This is worse than native faceting — legends and axes can't be shared, space isn't reclaimed by removing duplicate apparatus, panel sizing is manual — but it is the best available until the tool ships faceting.

## Common mistakes

- **Free scales per panel.** Breaks the whole comparison. Override only with explicit justification.
- **Alphabetical panel order.** Hides the shape.
- **Too many panels.** A 40-panel grid at screen resolution is unreadable. Aggregate or filter first.
- **Too few panels.** 2 panels rarely beat a single two-line chart with direct labels.
- **Different chart types per panel.** Defeats the "show data variation, not design variation" principle.
- **Adding color to distinguish panels.** The panel label already distinguishes them; color should encode data, not panel identity.
- **Using small multiples when one chart with accent-on-gray would do.** If only one category matters and the rest are context, facet is overkill.

## When small multiples specifically win

- **Regional breakdowns of time series.** 10 regions × 24 months is unreadable in one chart, clear in a 10-panel grid.
- **Cohort analyses.** Retention curves by cohort month — classic small-multiples use case.
- **Before/after comparison across groups.** Treatment effect per segment.
- **Per-page analytics.** Funnel step, per page.
- **Distributions across many groups.** Histograms per region, per cohort.

## See also

- [`visual-channels.md`](visual-channels.md) — the ≤3-aesthetics rule that drives the reach for facets
- [`../00-mental-model.md`](../00-mental-model.md) — the grammar of graphics including facet
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — shared apparatus reclaims ink
- [`../choose-chart/by-data-shape.md`](../choose-chart/by-data-shape.md) — the data shapes that want faceting
- [`../dashboard/structure.md`](../dashboard/structure.md) — simulating small multiples via dashboard grid layout
