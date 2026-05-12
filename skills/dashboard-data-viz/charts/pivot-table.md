---
name: pivot-table
description: Produce dashboard.tile (pivot table) — lookup plus hierarchical breakdown with subtotals and drill.
governs: dashboard.tile (pivot)
consumes: dashboard.category-order
---

# Pivot table

A pivot table is a grid that adds hierarchy and aggregation: rows grouped into categories with subtotals, optional column hierarchies, and a grand total. It is the canonical form for operational and financial reporting — the reader wants to see the whole at the top, the breakdown beneath, and reconcile one to the other without flipping views. Done well, it carries enormous information density; done poorly, it becomes an unreadable nest of numbers.

## When to use

- The audience needs **lookup** *and* **hierarchical structure** in one view — revenue by region-then-product, headcount by org-then-team, spend by category-then-vendor.
- Both summary values (subtotals, grand total) and detail values must appear together.
- The reader will reconcile a total to its parts — this is the pivot table's core job.
- Multiple aggregations per cell (sum + count + avg) where a chart would force a single encoding.
- Reference / ops mode, where the same structure renders each period and the reader has built muscle memory.

## When NOT to use (and alternatives in the palette)

- Flat table with no hierarchy → use `grid.md`; pivot machinery is overhead.
- The primary message is a pattern across one category → `bar.md` (or `bar.md` for many categories / long labels).
- A single headline number → `single-value.md`.
- Part-to-whole composition where the total matters and parts are secondary → `stacked.md`.
- Time trend with a single hierarchy → `line.md` with small multiples per category.
- More than ~4 levels of hierarchy — the structure exceeds working memory; split into separate tables or views.

## Rules

### Hierarchy structure

- **Keep hierarchies shallow.** Three levels usually; four only when the structure is genuinely nested and each level carries its own subtotals. Beyond that, the reader is navigating, not reading.
- **Indent or outline clearly.** Each level steps in by a consistent amount; children are visibly subordinate to parents.
- **Collapse/expand controls** (if the tool offers them) default to the level that matches the headline question. Expand-all is rarely the right default.
- **Respect working memory (≤4 chunks)**. If a reader must hold five category paths in mind to read a cell, redesign.

### Subtotals and totals

- **Subtotals visually distinct from detail** — combine at most two of: bolder weight, a rule above, a muted row fill. All three is loud.
- **Grand total also distinct from subtotals** — one more notch of emphasis, not a visually identical row.
- **Totals row placement:**
  - **Top** (summary first) when the headline is the hero and detail explains it — most exec dashboards.
  - **Bottom** (building up) when the reader computes or reconciles line by line — most financial reconciliations.
- **Column totals** follow the same logic on the right edge (or left, if right-to-left narrative).

### Numeric formatting (inherits from `grid.md`)

- Right-align numerics; align decimal points.
- Consistent precision *within* a column; vary precision across columns if meaning requires.
- **Do not mix very different units within one column.** A column mixing `$`, `%`, and `count` is almost always a design mistake — split into multiple columns or multiple measures.
- Keep `$`, `%`, and commas; drop trailing zeros.

### Conditional formatting

- **Heatmap-style cell shading is the single biggest upgrade** — turns a pivot into a quantitative view without losing exact values. Especially valuable on variance columns (red/blue diverging from zero) and on "percent of total" columns (sequential).
- Apply shading **per measure column**, not globally — a `$ sales` column and a `% margin` column need different scales.
- Always legend the colour scale (LOW–HIGH or NEGATIVE–POSITIVE).
- **Cell text color must contrast with the conditional-format fill.** The cell number sits inside the colored cell — same problem as a heatmap. Compute the text-color flip per [`../encode/color.md`](../encode/color.md) *Text on quantitative fills*; on cells whose fill drops contrast below 4.5:1 (or 3:1 for bold/large), switch text to the inverse extreme. A fixed dark-text default vanishes on the darkest red/blue cells; a fixed light-text default vanishes on the palest cells.
- Fade or skip shading on subtotal/total rows, or use a separate scale — they are almost always the extreme values and will dominate the palette.
- **If the pivot scrolls, the shading's pattern-discovery affordance is gone.** Conditional formatting only does heatmap-like work when the whole matrix is visible at once — the reader's eye scans for clusters, bands, hot corners. Scrolling serializes a perception meant to be parallel; the reader has to hold strip A in memory to compare with strip B, and working memory for 2D pattern across a scrolled view is terrible. The chart still renders; it just no longer does the thing the shading was added for. When the row count exceeds what fits unscrolled, pick one:
  - **Fit unscrolled** — filter, roll up to subtotals only, cap at top-N plus an "Others" row, or shorten the time window.
  - **Facet into small multiples** where each panel's grid fits (e.g., one pivot per team). Shared column scales preserve cross-panel comparison; see [`../encode/small-multiples.md`](../encode/small-multiples.md).
  - **Switch form** to one whose affordance survives the data size — `scatter` when the question is a per-entity relationship across continuous measures, sorted `horizontal-bar` when the question is ranking, `single-value` when only the headline is needed.
  - **Treat it honestly as lookup** — drop the shading and keep the table. Numbers plus sort order do the lookup job; a scrolling shaded pivot is lookup with decoration, and the decoration reads as a pattern-discovery promise the form can't keep.

### Sparklines per row

- **Sparklines per row are gold** when time context exists — one small line at the end of each row shows the trend that the cell-value alone cannot.
- See [`sparkline.md`](sparkline.md) for rules on aspect ratio, baseline, and labelling.
- When sparklines aren't available, a heavily-shaded heatmap across a handful of period columns approximates the same insight.

### Typography and rhythm

- Header typography distinct from body; subcategory headers distinct from detail rows.
- Row height consistent except at subtotal boundaries, where extra whitespace helps break the section.
- Muted gridlines; prefer whitespace and rules only between hierarchy levels.

## Anti-patterns

- **Deep nested hierarchies (>4 levels)** — exceeds working memory; the reader gives up.
- Subtotals indistinguishable from detail rows — the reader can't find the total.
- Every hierarchy level bolded and filled — nothing stands out, everything is loud.
- Mixing units in one column.
- Heatmap shading applied globally across mixed-unit columns — produces colours that mean nothing.
- Totals placed inconsistently (sometimes top, sometimes bottom) across a dashboard — breaks muscle memory.
- Dense dark gridlines in every cell.
- Using pivot table as a dump for "all our data" with no editorial decision about which measures to show.
- **Scrolling shaded pivot pitched as a heatmap.** A pivot with conditional formatting is *only* a heatmap when the whole matrix fits unscrolled. The moment the tile scrolls, the pattern-discovery affordance collapses; what remains is lookup with decoration. Fit, facet, switch form, or drop the shading. See *Conditional formatting · If the pivot scrolls* above.

## See also

- [`grid.md`](grid.md) — the flat form; most rules inherit from there
- [`sparkline.md`](sparkline.md) — per-row trend add-on
- [`../encode/color.md`](../encode/color.md) — sequential vs diverging palettes for conditional formatting
- [`../craft/emphasis.md`](../craft/emphasis.md) — hierarchy of row/column emphasis
- [`../dashboard/audience-purpose.md`](../dashboard/audience-purpose.md) — when reference/ops mode justifies the density
