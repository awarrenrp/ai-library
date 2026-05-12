---
name: treemap
description: Produce chart.geom (treemap) — hierarchical part-to-whole with many categories; nested rectangles by area.
governs: chart.geom (treemap)
consumes: dashboard.palette
---

# Treemap

A treemap renders a hierarchical part-to-whole as nested rectangles: the whole fills a bounding rectangle, top-level categories tile it in proportion to their value, and each category sub-tiles into its children. Area encodes quantity; nesting encodes hierarchy. It is a space-filling form — every pixel of the canvas is data — which makes it unusually dense, and unusually demanding of the reader's tolerance for rough area reading.

The reader gets a fast gestalt of "which parts dominate" across potentially hundreds of categories in one tile. What they do not get is precise value comparison; area is mid-to-low on the perceptual hierarchy. Treemaps are therefore an overview form — the jumping-off point for drilling, filtering, or a follow-up bar chart.

## When to use

- **Hierarchical part-to-whole with many categories.** Spend by GL account (hundreds of lines nested under ~10 cost centres); portfolio holdings by sector > industry > company; storage by team > project > file type. A bar chart would overflow; the treemap gives a survey view.
- **Showing composition where rough area comparison is acceptable** — the reader needs to see "sales is dominated by EMEA, which is dominated by UK enterprise" without reading exact percentages.
- **Dense reference / overview dashboards** where one tile needs to carry a whole hierarchy at a glance.
- **Pair with drill-down interactivity** — the treemap is the overview, and a click reveals a precise bar chart or grid for the focal branch.
- **Anomaly spotting in a hierarchy.** A surprisingly large rectangle jumps out; the reader can then zoom in for detail.

## Treemap vs sunburst vs stacked bar

All three encode hierarchical part-to-whole; choose by shape of the data and precision required:

- **Treemap:** area in a shared rectangle. Best for deep or uneven hierarchies (one branch 10x another). Reads adjacency and composition; reads precise values poorly. Handles ~hundreds of leaves.
- **Sunburst** (palette): arc length in a ring, angle for nesting. Best for balanced shallow hierarchies. Reads nesting depth clearly; reads precise values poorly (angle is worse than length). Handles fewer leaves before rings become hair-thin.
- **Stacked 100% bar:** length per segment in one bar. Best for single level and ≤5 parts, or for comparing composition across a small number of groups (one bar each). Reads precise values best of the three; cannot render hierarchy.

Default recommendation when the generator adds treemap: treemap for the "one tile, deep hierarchy, gestalt of composition" case; sunburst for shallow balanced hierarchies; stacked bar for flat or two-group comparisons.

## When NOT to use

- The reader must read precise values or rank close-to-equal items — area is not accurate enough. Use a sorted `bar.md`, or a `pivot-table.md` with conditional formatting.
- There is no hierarchy — single-level part-to-whole is better as `bar.md` sorted descending (more accurate, easier labels). Reserve the treemap for genuine hierarchies.
- Small totals and few categories — under ~8 items, a sorted bar chart always wins.
- Values are negative or can cross zero — treemaps cannot render negatives; use `bar.md` with a zero baseline in the middle (deviation form).
- Most of the canvas would be empty because one item dominates at 95% — the treemap becomes one big rectangle and a field of slivers. A `donut.md` or a `single-value.md` + "everything else" breakdown reads more honestly.
- The audience is unfamiliar with treemaps and there's no interactivity — the form carries a literacy tax and without hover values it becomes decorative.

## Rules

### Editorial choice: when a treemap is actually better than a bar

A treemap is worth its literacy tax only when:

- The hierarchy has **meaningful containment** — a parent's total equals the sum of its children's, and the reader cares about both.
- The **distribution is uneven enough** that a bar chart would either overflow (hundreds of rows) or hide the dominant lump (a single item is 60%).
- The reader values **gestalt over precision** — "show me what makes up the pie" rather than "what are the top 10 vendors".
- The form's weakness (area reading) is mitigated by a partner chart or interactive drill.

If any of these fail, reach for a sorted `bar.md` or a `pivot-table.md` first.

### Area encoding

- **Area — not length, not radius — is proportional to value**. This is the treemap's defining rule. A 2× value must render as a 2× *area*, which is a √2× each side. Scaling either side linearly by the value quadruples the apparent size and introduces a Lie Factor of ~2.
- **No negative values.** Area has no sign; treemaps silently drop or absolute-value negatives, which misrepresents the data. If negatives exist, use a different form.
- **Zero-area cells disappear.** Items below a threshold relative to the whole (<0.5% of canvas) become un-clickable slivers; group them into an "Other" cell with a count in the label, or add a minimum-size floor (labelled).

### Hierarchy depth

- **Two to three levels is the practical limit.** Beyond that, nested rectangles are too small for labels, hierarchy boundaries are ambiguous, and the reader cannot keep more than a few containers in working memory.
- **Nesting must be visually obvious.** A thicker border or a small margin between parent cells so the child grouping reads as contained. Children share a muted tint of the parent's hue (see colour).
- **Provide drill-in interactivity** (click to zoom a branch) when hierarchy exceeds two levels.

### Layout and ordering

- **Squarified layout by default** — rectangles close to square are easier to compare in area than long thin ones (the eye reads a long thin rectangle as length, not area, and misestimates).
- **Largest rectangle top-left.** Within each level, order by value descending so the eye lands on the dominant cell first and descends naturally in a z-pattern.
- **Consistent ordering rule across the whole chart** — don't order one parent by value and another alphabetically.

### Colour

- **Hue for category (top-level grouping); lightness for emphasis or a secondary variable.** Avoid giving every child a distinct hue — a treemap with 100 rainbow cells is visual noise.
- **Default to a muted neutral palette** for context; reserve saturation for the focal cell(s) or a secondary quantitative overlay.
- **Secondary variable via diverging lightness** is the canonical use (rectangle area = revenue, colour = margin variance to target). Label the colour scale — the reader will otherwise assume colour means the area variable.
- **Accessible palette**: no red/green-only distinctions; ensure sufficient lightness contrast.

### Labels

- **Label cells with name + value when space allows.** For large cells (>5% of canvas), full name + value; for medium cells, name only; for small cells, no label (they're illegible).
- **Truncate gracefully** with ellipsis, then fall back to tooltip.
- **Tooltips on every cell**, even unlabelled ones, surfacing the full name, value, percentage of parent, and percentage of whole.
- **Parent labels** sit in a header strip or floated on the parent's top-left corner, not inside a child cell.
- **Label color must contrast with the cell fill** when the treemap encodes a quantitative variable as cell color (saturation/lightness ramp for value, growth, share). Compute the text-color flip per [`../encode/color.md`](../encode/color.md) *Text on quantitative fills* — WCAG contrast at design time; flip text on cells whose fill drops below threshold. A fixed-color label vanishes on the darkest cells.
- **Units and totals labelled once** at the tile level ("Revenue $M by region and country; total $2.4B").

### Size of the canvas

- **Give the treemap a tile big enough for its data.** A treemap in a small tile with 50 categories is decorative; in a big tile it can be scanned. Provide the space or reduce the hierarchy depth.
- **Aspect ratio of the canvas matters.** A very wide or very tall treemap produces long thin rectangles that destroy area-reading. Aim for a canvas aspect close to the golden rectangle (roughly 1.3:1 to 1.6:1) or square, which gives the squarified algorithm room to produce near-square cells.

### Interaction (when available)

- **Click-to-zoom-into-branch** is the canonical treemap interaction — the clicked parent expands to fill the canvas, children become readable, breadcrumb above lets the reader back out.
- **Hover tooltip** surfaces full name, value, percentage of parent, percentage of whole, and the rank within parent.
- **Link to a drill-down chart** (a `bar.md` or `pivot-table.md` of the focal branch) for precise comparison — the treemap's weakness is exact value; let the partner chart carry it.

### Algorithm note

- **Squarified layout** (Bruls/Huijsing/Wijk, 2000) is the canonical algorithm — it produces near-square rectangles and is the reader-friendly default.
- **Slice-and-dice** (alternating horizontal/vertical cuts) preserves ordering but produces long thin strips that destroy area reading; avoid.
- **Strip / ordered layouts** strike a middle ground when preserving value order matters.
- Specify squarified as the generator default; offer ordered only when the ordering is the point and aspect can tolerate it.

## Simpler alternatives

- **`pivot-table.md` with conditional formatting is the closest substitute.** A hierarchical table with rows indented by level, a value column, and a heatmap-shaded "% of parent" or "% of whole" column gives the same information — the whole, the parts, and a visual magnitude cue — and is more precise than a treemap, at the cost of compactness. This is the recommended alternative for most business dashboards when precision matters more than gestalt.
- **`bar.md` sorted descending, for a single level.** When the hierarchy is really two levels and the reader only cares about the top, flatten and use a bar chart. More accurate; loses the nesting.
- **`sunburst.md`.** Similar data shape — hierarchical part-to-whole — rendered in polar coordinates with angle (and arc) encoding. A sunburst and a treemap solve the same problem; treemaps read area from a common bounding rectangle and tend to be more legible for deep hierarchies with uneven distributions, while sunbursts handle balanced hierarchies well. If the audience is fluent in sunbursts but not treemaps, render a sunburst but warn: area-with-a-common-baseline is perceptually easier than angle-in-a-ring.
- **`stacked.md` (single bar, 100%).** For a single level of part-to-whole, a 100% stacked bar can stand in. Loses the hierarchy; acceptable for ~5 categories.
- **Small multiples of `bar.md`** — one bar chart per parent category, each sorted descending, laid out in a grid. Loses the proportional-area comparison across parents but gives precise intra-parent ranking. Good fallback when the reader cares about within-group ranking more than overall composition.

When precision trumps gestalt, the pivot-table-with-conditional-formatting alternative is usually the right call — it carries the hierarchy honestly and preserves precise values.

## Anti-patterns

- **Scaling by side length or radius rather than area.** The classic treemap bug; produces a Lie Factor of ~2.
- **Deep hierarchies (4+ levels) without drill interaction** — slivers are unreadable and unlabelled.
- **Rainbow colour per category** — every cell a different hue, no visual hierarchy, nothing stands out.
- **Using colour for the area variable (redundant encoding)** when colour could carry a second variable — wastes a channel.
- **Treemaps with negative values silently absolute-valued** — a cell labelled `-$2M` rendered at the same size as `+$2M` is a Lie Factor violation.
- **Tiny canvas.** A 100-category treemap in a 200×150 tile is wallpaper, not a chart.
- **Ordering cells alphabetically** — the reader expects value ordering, and alphabetical makes the gestalt impossible.
- **Hiding the total.** The whole is the ground truth; include it in the title or a corner annotation.
- **Using a treemap to compare two dashboards' compositions side by side** — aspect ratios differ, layouts differ, and cross-comparison is unreliable. Use `stacked.md` at 100% or a `pivot-table.md` comparison instead.
- **Labels inside cells too small to read** — a 5px label is worse than no label; truncate or fall back to tooltip.
- **Heavy borders everywhere** — cell borders should be thin or whitespace-only; thick borders eat into the area encoding and lie about the proportions.
- **Treemap as the only view of the hierarchy** — without a ranked table or drill, the chart is a pretty wall; pair it with a precise partner.

## Worked examples

### Spend composition

Quarterly spend by cost-centre > vendor. Top level: eight cost centres (R&D, S&M, G&A, Infrastructure, …) tiled in proportion to their quarterly spend; largest cost centre occupies the top-left. Within R&D, ~40 vendors tile by spend, labelled with vendor name on the larger cells, tooltips on the rest. Colour: muted grey base; darker overlay on vendors whose quarter-over-quarter growth exceeds 20% (a second variable via colour). Reader sees at a glance where the money is, and which line items are growing fastest — pairs with a drill-down `pivot-table.md` below for precise values.

### Portfolio composition

Portfolio holdings by sector > industry > company. Three-level hierarchy; interactive click-to-zoom into a sector fills the canvas with its industries and companies. Title: "Portfolio weight by sector and industry, $12.4B AUM." The treemap carries composition; a sortable `grid.md` below carries precise per-holding return and risk columns. The two together answer both the "what's the shape" and "what's the number" questions without forcing one chart to do both.

## See also

- [`sunburst.md`](sunburst.md) — polar cousin; similar data shape
- [`bar.md`](bar.md) — single-level alternative, more accurate
- [`pivot-table.md`](pivot-table.md) — the closest precise substitute with hierarchy
- [`stacked.md`](stacked.md) — single-level part-to-whole
- [`../encode/visual-channels.md`](../encode/visual-channels.md) — area vs length on the perceptual hierarchy
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — area-proportional-to-value; no negatives
- [`../dashboard/interactivity.md`](../dashboard/interactivity.md) — drill-down as the treemap's partner
