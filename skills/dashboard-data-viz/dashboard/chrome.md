---
name: dashboard-chrome
description: Produce dashboard.chrome — page title, subtitle, footer, filter bar, section headers, whitespace, density. Ink at the dashboard scale is evaluated by whether it aids navigation, grouping, or hierarchy — not by the chart-level data-ink rule.
governs: dashboard.chrome
consumes: strategic.mode
---

# Dashboard chrome

Everything on the dashboard that is not data: page title, subtitle, footer, filter bar, section dividers, whitespace, the tile itself. At the dashboard scale, ink is evaluated by whether it aids navigation, grouping, and hierarchy — not by the chart-level data-ink rule. Tile separators, section headers, compact filter bars, subtle group shading are **scaffolding**, not chartjunk, as long as they earn their space by aiding the reader's movement across the composition. (The per-chart data-ink rule applies *inside* each chart; see [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md).)

For structural units (grid, tile, alignment) see [`structure.md`](structure.md); for cross-chart consistency (palette, formats) see [`consistency.md`](consistency.md).

## Whitespace

Generous margins are not wasted pixels:

- **Group** (Gestalt proximity) — charts close together read as related; charts separated by whitespace read as independent.
- **Separate** unrelated sections without visible borders (Gestalt closure — the eye supplies the missing boundary).
- **Calm the composition.** A dense, zero-margin dashboard reads as anxious; air reads as considered.

Rule of thumb: small gutter inside a group, 2–3× larger gutter between groups. The whitespace carries the structure.

## Density — dense, but not cramped

A dashboard should carry high data density — more information per square inch. Density is earned through thoughtful layout, not through cramming.

What high density looks like done well:

- **Small multiples** — repeated simple chart across a categorical split, sharing scales. The right response to many similar views. Use the `grid` chart type.
- **Sparklines / single-value tiles with trend** — each tile tiny but carrying value + trajectory + comparison-to-target.
- **Pivot tables** for reference — a 20-row × 8-column table is denser than 20 separate gauges, and far more readable.

What cramped-not-dense looks like:

- Five multi-series line charts stacked vertically with overlapping legends and 8px gutters.
- Every tile padded to the pixel with data labels, gridlines, axis titles, and a legend.
- A "dashboard" that is twelve charts fighting for 800px of vertical space.

If a dashboard feels busy, the failure is usually not "too much data" — it is **too much decoration that doesn't aid navigation**: heavy tile borders, drop shadows, gradient backgrounds, logos in premium real estate, redundant per-tile legends. These fail the dashboard-composition criterion (does this ink help the reader scan, group, orient?). Strip dashboard decoration first before cutting charts.

## Chart-type density on a dashboard

Palette discipline: use a small number of chart types per dashboard. A dashboard with one pivot table, one line, two bars, and one single-value is coherent. A dashboard with a donut, a sunburst, a funnel, a gauge, a scatter, and a stacked bar is a zoo. Each unfamiliar chart type carries a tutorial tax.

Pair with consistency: if two charts answer the same kind of question (e.g., breakdowns by region), use the same chart type. Consistency of form signals consistency of meaning.

## Scrolling silently changes what a tile does

Wrapping a tile in `overflow: auto` is often framed as a harmless density trade-off — "the data won't fit, so we let the reader scroll." It isn't harmless. Scrolling converts the tile's *function*, and the conversion is usually not what the author intended.

- **Pattern-discovery forms** (heatmap, `pivot-table` with conditional formatting pitched as a heatmap, small-multiples grid, dense `scatter`) depend on the whole view being perceived in parallel. The reader's eye scans for clusters, bands, hot corners, ridges — a 2D job that requires 2D extent to be visible at once. **Scrolling serializes that scan into strips**, forcing working-memory comparison between what the reader sees now and what they saw a moment ago. The chart still renders; the affordance that justified the form is gone. Worse, the shading or small-multiples layout reads as a pattern-discovery promise the tile can no longer keep.
- **Lookup forms** (`pivot-table` as lookup, ranked `horizontal-bar`, `grid`, row-per-entity `single-value` strips) degrade gracefully under scroll. If the reader has to scroll to find the row for "EMEA" or "Ada Chen," the act of scrolling *is* the lookup. Precision per row stays intact; no parallel perception is being faked.

**Before accepting a scrolled tile, name its job — pattern-discovery or lookup?**

- If pattern-discovery, either fit the data unscrolled (filter, aggregate, top-N, shorter window), facet into small multiples whose panels each fit, or switch form to one whose affordance survives the data size (`scatter` for per-entity continuous relationships, sorted `horizontal-bar` for rankings).
- If lookup, scroll is fine — but drop any conditional formatting whose purpose was pattern-discovery. Shading a scrolling table is decoration making a promise the form can't keep.

Don't pick a pattern-discovery form, scroll it, and call the job done.

## Page header, subtitle, footer

The page title names the dashboard. The subtitle gives context the dashboard doesn't render — scope (`600 employees, 2026 cycle`), time window, snapshot date, audience, methodology. **Not** a prose summary of what the tiles below show.

A dense paragraph restating the KPI row ("Outstanding performers receive 3.4 pp more merit than Meets, but Customer Success, Marketing, Finance, and L5 Director show under 2 pp of differentiation") when the tiles and heatmap below already paint exactly that story is **restatement, not repetition** — ink that doesn't encode anything the reader can't see. See [`narrative.md`](narrative.md) *Repetition vs. restatement*.

The footer carries: data source, date range / last updated, key definitions. Small, muted, one line. A large banner with logos and breadcrumbs displaces data without aiding navigation.

## Filter bar

Filters are infrastructure; compact and out of the way of the data. Don't let a filter bar occupy a third of the canvas. See [`interactivity.md`](interactivity.md) for filter behavior.

## Things to avoid

- **Decoration that doesn't aid reading** — heavy tile borders, drop shadows, gradient backgrounds, textures. Fails the dashboard criterion (does this ink aid navigation, grouping, or hierarchy?).
- **Gratuitous chrome** — large banners, logos in premium real estate, breadcrumb bars. A small footer with timestamp and source is load-bearing; a banner isn't.
- **Header subtitle that narrates the tiles below.** The subtitle carries context the tiles don't render — scope, time, methodology — not a prose summary.
- **Scrolling a pattern-discovery tile** — heatmap, dense scatter, small-multiples grid wrapped in `overflow: auto`. Pattern-discovery depends on parallel 2D perception; scroll serializes it.
- **Filter bars that eat a third of the canvas.** Compact and peripheral.

## See also

- [`structure.md`](structure.md) — grid, tile, alignment, sizing, reading order
- [`consistency.md`](consistency.md) — cross-chart consistency rules
- [`narrative.md`](narrative.md) — page subtitle, restatement-vs-repetition
- [`interactivity.md`](interactivity.md) — filter bar behavior
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — per-chart data-ink rule (different scope)
