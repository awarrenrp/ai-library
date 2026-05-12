---
name: dashboard-structure
description: Produce dashboard structural units — grid, tile, row, section, alignment, reading order, tile sizing (natural shape and horizontal extent), Gestalt composition, responsive behavior.
governs: dashboard.grid, dashboard.tile, dashboard.row, dashboard.section
consumes: strategic.mode
---

# Dashboard structure

How the tiles sit on the canvas: where the reader's eye lands, the grid they align to, how big each tile should be, how the composition holds together across viewport sizes. For cross-chart consistency (palette, delta format, legend treatment) see [`consistency.md`](consistency.md); for page chrome and density see [`chrome.md`](chrome.md); for canonical layouts see [`archetypes.md`](archetypes.md).

## The reader's eye — design for how it actually moves

Western readers scan **top-left first**, then left-to-right, top-to-bottom in a rough **Z-pattern**. The top-left quadrant is the single most valuable pixel real estate on the canvas. Treat it like headline space.

- The chart (or number) that carries the main point goes **top-left**. Not centered, not bottom, not tucked behind a filter bar.
- Secondary detail flows right and down from the anchor.
- A filter row or a title bar can occupy the very top edge, but the **first chart the eye lands on** should be the most important one.
- If you cannot articulate which chart is most important, the dashboard has no point of view yet — go back to [`../01-design-process.md`](../01-design-process.md) before laying anything out.

Test every draft: close your eyes, open them, note where they land. If the first thing you see is a legend, a logo, a decorative border, or a low-priority chart, the layout is upside down.

## Visual hierarchy — size, position, and emphasis

Three knobs establish hierarchy without extra ink:

1. **Size.** The primary chart is physically larger than the supporting charts. A common ratio: one "hero" tile at 2×2 cells, surrounded by 1×1 supporting tiles. Equal size reads as equal importance; if everything is equally important, nothing is.
2. **Position.** Top-left > top-center > center > bottom-left > bottom-right. Map importance to position.
3. **Emphasis.** The primary chart may use a stronger accent color; supporting charts sit in greys with a single accent. "Accent on grey" applied at the dashboard level. Muted supporting charts don't compete with the hero.

Pair these deliberately — a small chart with a bold accent in a prominent position can outweigh a big muted chart in a corner. Don't send mixed signals (e.g., a huge chart in a corner in grey).

## Grid structure

- A **12-column grid** is a safe default: divides cleanly into halves, thirds, quarters, sixths. Hero tiles take 6 or 8 columns; supporting tiles 3 or 4.
- **Consistent row heights** for the same class of chart. Don't let one single-value tile be twice the height of its neighbors.
- **Consistent gutters.** One gutter width everywhere; mixing gutters reads as accidental.
- **Don't stretch to fill.** If a tile doesn't need to be 1200px wide, let it be smaller. Horror vacui is an anti-pattern; generous whitespace is a feature, not waste.
- **Layout is consumed, not just declared.** Same shape as *palette is consumed, not just resolved* in [`../encode/color.md`](../encode/color.md) and *typography is consumed, not just declared* in [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md): a tile declares its span (`class="span-2"`, `<Tile span={2}>`, `col-span-2`, `width: 200`), and the render can silently produce something else when the declaration mechanism isn't realized. Common silent fallbacks: an undefined CSS class collapses to `grid-column: auto` (span-1); a Tailwind utility not in the JIT build has no effect; a React component that doesn't consume its `span` prop; a child width overridden by parent spec. Declared row-intent `6+2+2+2=12` can render as `6+1+1+1=9` with no error — empty trailing columns are the visible symptom. *This differs from "don't stretch to fill" above: that rule permits deliberate whitespace; this rule catches unintended collapse where the generator believed the row was full.* **Audit by inspecting the render, not the spec**: for each row, measure each tile's rendered width as a fraction of the row and confirm proportions match the declared intent. Screenshot-and-compare, same audit pattern as palette and typography.
- **Row spans sum to 12, or match a documented partial pattern.** Each row's tile spans must compose to exactly 12 — or to one of these intentional partials: **hero-with-sidebar** (`8+4` or `9+3`), **centered single-hero** (one tile with explicit left and right margin offsets), **master-detail** (overview + detail panel, typically `8+4`), or **end-of-section breathing room** (final row deliberately under-filled to mark a section boundary, paired with the section divider). Any partial that doesn't match a documented pattern is an accident, not a choice. *Don't stretch to fill* (above) permits the deliberate partial; this rule forbids the accidental one. The generator's most common failure: tiles sized by per-content reasoning that happen to sum to `5+3+3 = 11` or `7+4 = 11`, leaving an awkward 1-column strip the generator didn't intend.
- **Tile sizes compose from factor-of-12 partitions.** Pick a canonical partition for the row first, then assign tiles to it: `12` / `8+4` / `6+6` / `9+3` / `6+3+3` / `4+4+4` / `3+3+3+3` / `2+2+2+2+2+2`. Don't size each tile by its content's natural width and hope the row sums; that produces orphan strips and unpredictable wraps. Composition order: row partition first, then content fits into the partition (re-aggregate, drop, or split a chart that doesn't fit a clean cell).
- **Final-row strategy when tile count doesn't divide the row size.** If a section has 5 tiles and the dashboard uses quartered rows, the 5th is the orphan. Priority order:
  1. **Regroup tiles by topic** so each section's tile count divides evenly — the orphan often signals the topic boundary is in the wrong place.
  2. **Promote one tile to a hero size** that absorbs the leftover (e.g., 5 tiles → `8+4 + 8+4` with one tile carrying the larger half of two rows).
  3. **Demote tiles to a smaller row size** that fits (e.g., 5 tiles → `4+4+4 + 6+6` mixing thirds and halves, with the rationale stated in the section header).
  4. **Drop a tile** that didn't pass the *justify each tile* test in [`kpi-row.md`](kpi-row.md) Q2. The orphan is often a tile added by habit rather than load-bearing reason.

Prefer three tiles with clean margins over five tiles crammed edge-to-edge.

## Alignment

Sloppy alignment is the most common failure mode of prompt-generated dashboards. Every misalignment forces the reader to check whether a position difference encodes a meaning difference.

- **Left edges** of tiles in a column align exactly.
- **Top edges** of tiles in a row align exactly.
- **Chart titles** left-align with the chart body. Centered titles "hang in space" and break the tile's left edge.
- **Axis titles** align with their axes — vertical title at the top of the y-axis, horizontal title at the left of the x-axis.
- **Numbers in tables** right-align on the decimal. Never left-align or center numeric columns.

A clean vertical edge down the left side of the dashboard beats most decorative choices.

## Sizing guidance per chart type

Minimum tile sizes per chart type:

- **`single-value`** — 1×1 to 2×1 cells. Compact; best as a row of tiles across the top.
- **`gauge`** — at least 2×2; smaller and the dial is illegible.
- **`donut`** / **`sunburst`** — at least 2×2; need room for labels.
- **`line`** / **`bar`** / **`horizontal-bar`** / **`stacked`** / **`horizontal-stacked`** / **`combination`** — typically 4×3 or larger; smaller sizes for 2–3 category bars or sparkline-style lines.
- **`scatter`** — at least 4×4, ideally square aspect ratio to avoid distorting the apparent relationship.
- **`funnel`** — at least 3×4 vertical; needs length to show narrowing stages.
- **`grid`** — scales with facet count; each panel needs ~2×2 minimum.
- **`pivot-table`** — depends on rows/cols; allow generous width to avoid wrapped column headers.

A `donut` at 1×1 is unreadable; a `single-value` at 4×2 wastes space. Either change the type or resize the tile.

## Sizing tiles to match each chart's natural shape

Every chart has a **natural shape** from its geometry — not just a natural height, but an aspect that says which dimension scales and which stays fixed. Picking tile dimensions is the reverse problem: compute each chart's natural shape, then decide how tiles share the row. The failure mode is treating "equal tile sizes" as stronger than "don't stretch to fill", leaving marks in a sea of whitespace or squashed below readable.

### Three natural shapes

Most chart types fall into one of three shapes. Knowing which tells you which dimension to scale:

- **Horizontal strips** — wide, short. Single-row 100%-stacked bar, sparkline, single-value / KPI tile, KPI-row element, compact breakdown bar. Natural ~80–140px tall × as wide as fits. More width = more precision per segment; more height adds no information.
- **Vertical lists** — tall, narrow. Ranked horizontal bars, funnels, pivot tables with many rows. Height scales with N; width stable. More height = more rows visible; more width adds nothing past label room.
- **Square or near-square** — both axes matter. Scatter, donut/sunburst, heatmap, treemap, bubble. Natural ~1:1. Stretching either dimension distorts the relationship the chart shows.

A horizontal strip in a tall tile wastes vertical space. A vertical list in a short tile truncates. A square form stretched to a rectangle distorts. Each shape tells you which dimension scales and which stays fixed.

### Natural shape, by chart type

- **Bar / horizontal-bar (multi-bar ranked or grouped):** vertical list. Height ≈ `N_bars × (bar_height + gap) + padding + axes + title`. 4 categories ≈ 180–220px; 10 categories ≈ 320–360px.
- **100%-stacked single-row bar (breakdown strip):** horizontal strip. ~80–120px tall × as wide as fits. Width scales with tile; more width = more precision for small segments.
- **Line:** strip with aspect rule. Natural height ~60–75% of chart width ("banking to 45°" so the steepest segment approaches 45°). 8-column line on ~900px wants ~300–340px.
- **Scatter:** square. Height ≈ width.
- **Donut / sunburst / heatmap / treemap:** square. Height ≈ width.
- **Grid / small multiples:** height and width scale with facet count; each facet panel ≥ ~2×2 cells.
- **Single-value / KPI tile:** horizontal strip. ~100–140px × ~200–320px. Stretching to match a 320px line chart dilutes visual weight.
- **Pivot table:** vertical list. Row count × row-height + header.
- **Sparkline:** horizontal strip, minimal. ~20–40px × 100–200px.
- **Funnel:** vertical list. Height scales with stage count.

### Natural-height ranges are plot-area heights, not tile heights

The heights above (strip ~80–140px, line ~300–340px, bar ~180–360px, etc.) describe the chart's **plot area** — the rectangle the marks render into — not the hosting tile. The tile additionally needs room for its title, subtitle, top+bottom padding, and *any vertical space the marks themselves demand beyond their baseline natural height*. A typical chrome budget: title ~20px, subtitle ~20px, padding ~24px top+bottom → roughly 60–70px of non-plot chrome per tile.

The commonly-missed case is **labels rendered inside marks** — stacked-segment labels, treemap-cell labels, donut slice labels, heatmap cell values, data labels inside bars. The *minor* dimension of each mark has to fit the label's full line-height block, not just the text. A two-line label at 16 + 14px line-heights needs ≥30px of mark extent plus ~1.2× breathing room; any mark shorter than that clips the label's top and bottom against the mark boundary. The clip is **silent** — the text still renders, it just reads as half-height glyphs against the fill, and in review it looks like a font-rendering bug rather than an authoring choice.

Natural height, corrected:

```
tile height ≈ plot-area height
            + chrome (~60–70px: title, subtitle, padding)
            + any in-mark label block height the plot must accommodate
```

For a stacked-strip tile with in-segment two-line labels, plot-area height wants ≥40–50px, so the tile wants ≥110–130px *of plot area*, i.e., ≥170–200px total. If a shorter tile is genuinely required (a dense KPI-adjacent strip), move the labels outside the mark — above or below the strip, or beside it on each side — or collapse them to a single line.

**Construction, not post-hoc check.** Budget the chrome and any in-mark label block at tile-sizing time, not after render. The reviewer check ("is any label clipped?") catches the failure too late — the only fixes at that point are to enlarge the tile (ripples into siblings' alignment) or to cut label content (often the content is load-bearing). Same shape as the "reserve fixed-height zones" pattern for KPI tiles and the "pick one row pitch" pattern for coupled vertical lists: derive the container from the content up front so misalignment is structurally impossible.

**Test, if a review pass is still needed.** Inspect a representative in-mark label at 100% zoom against the mark's boundary. If the first or last line clips, the mark's minor dimension is shorter than the label's line-height block — enlarge the plot area (and therefore the tile) or move the label outside the mark.

**Common failure.** A stacked-strip tile set to ~110px because "horizontal strip is 80–120px." Title + subtitle + padding eat ~70–80px; the bar itself gets ~30px; two-line in-segment labels clip top and bottom; the chart reads as if the text were cut with scissors. The natural-height number was the plot-area height; applying it to the whole tile undersized the plot. Chart-specific mirror: [`../charts/stacked.md`](../charts/stacked.md) *Segment labels need the segment's minor dimension*, and the same shape applies anywhere labels sit inside marks — see [`../charts/treemap.md`](../charts/treemap.md), [`../charts/donut.md`](../charts/donut.md), [`../charts/heatmap.md`](../charts/heatmap.md).

### The decision, in priority order

When siblings on a row have materially different natural shapes:

1. **Preferred — top-align, accept a ragged bottom.** Each tile takes its natural height; align at top. The row gutter below carries the separation. Readers don't read a ragged bottom as broken if top edges align.
2. **Repack the row.** Move one chart to a different row where the sibling has a compatible natural shape. A horizontal strip next to a trend line is a mismatch every time — the strip belongs with other strips; the trend belongs with things that want vertical extent.
3. **Densify the shorter chart with additional data.** Facet, add a compact related chart inside the tile, add a sparkline of history. Only if the added data is useful — never as filler. Earn the extra height by *showing more data*, not stretching what's already there.
4. **Never — stretch marks, pad whitespace, or center a compact chart vertically in a tall tile.** Bars that grow to square start reading as area-encoding. A horizontal strip centered vertically in a 400px tile is the same failure as stretching marks — the tile is stretched, the chart isn't, the dead space is identical.

Matching tile heights is tidiness; it yields to "don't stretch to fill" every time.

Example: DAU line + 4-category coverage strip (100%-stacked single-row bar) on the same row. Line wants ~320px natural; strip wants ~100px natural. Either (1) set the line tile to 320px, the strip tile to 100px, top-align; or (2) move the strip to a different row where siblings are also horizontal strips. **Not**: stretch the strip tile to 320px and center the bar vertically, leaving 220px of empty plot area.

### Coupled vertical lists — same entities, same order

The decision above handles siblings with **different** natural shapes. A distinct case — with a stronger rule — is two or more tiles on a row that show the **same entities in the same order**: a ranked horizontal-bar chart beside a detail table of the same products, a dot plot beside a heatmap row per entity, a single-value strip beside per-entity sparklines. These aren't independent tiles — they're one logical strip rendered in two channels, and the reader should be able to trace any entity across the row on a single horizontal line.

Concretely: `Analytics Cloud` in the bar chart must sit at the same y-coordinate as the `Analytics Cloud` row in the table. When rows peer-align like this, the pair reads as one lookup view — the bar becomes a visual extension of the table, not a separate chart. When they don't, the reader's eye jumps between two parallel lists that almost-but-not-quite line up, and the row-by-row lookup that the data structure invites is broken.

This is a stronger alignment than the top-align-and-accept-ragged-bottom default above; that default is for tiles whose natural shapes genuinely differ. Coupled vertical lists have the *same* shape (both are ranked lists of N entities), so the row pitch is genuinely shared and the tiles *should* match.

**Mechanism — construction, not post-hoc check.** Pick one row pitch at dashboard time, apply to both tiles:

1. Choose a per-row height (typically 40–48px) sized to the denser tile's per-row content — usually the table, since table rows carry more ink (text, numbers, embedded sparkline) than bar rows.
2. Apply that pitch to the table's row heights *and* to the bar chart's category spacing (category-axis plot height = N × pitch).
3. Reserve a matched "header band" in each tile so the first entity row starts at the same y in both tiles (table thead ↔ bar chart `grid.top` reserved the same height).
4. Title/subtitle bands above the data should match heights too (they already will, if the dashboard uses one typography scale).
5. Tiles now reach the same total height naturally — no stretching, no dead plot area, no ragged bottom.

The alternative — "render each tile independently and hope the heights match" — fails predictably, and the only fixes at review time are either to stretch one tile (violates the never-stretch rule) or to let the bottoms go ragged (breaks the peer-alignment the data invites). Couple the pitch up front.

**When this applies:** bar chart + detail table on the same entities · dot plot + heatmap row per entity · ranked single-value tiles + per-entity sparkline column · any case where a row in tile A has a direct counterpart row in tile B.

**When it doesn't:** different entities (bar of regions + line of time) · different N (top-10 bars + all-50 table — either filter both to the same N or fall back to top-align) · different natural shapes (bars + donut).

## Sizing tiles to the chart's horizontal data extent

Tiles have a **natural width** as well as a natural height; the mechanism is symmetric. Pick tile width from the horizontal extent the data occupies, not from a default "this chart goes full-width."

### The test

Data marks should occupy **≳60% of the plot area's horizontal extent**. If horizontal bars top at 31% of a 0–100 axis, or a time series plots 30 days of a 180-day axis, or scatter points cluster in the left third — the tile is wider than the data. Horizontal analog of the "banking to 45°" principle: an aspect mismatched to the data wastes canvas and flattens the comparisons.

### The decision, in priority order

1. **Tighten the axis first.** Proportion bars topping at 31% want axis max ~40%, not 100% — see [`../charts/bar.md`](../charts/bar.md) *Axis max should match the data, not the theoretical ceiling*.
2. **Narrow the tile next.** Intrinsically narrow data (8 categories, bars capped at 31%) fits in 6–8 columns; 12 columns leaves dead plot area. Give the reclaimed columns to a sibling that can use them.
3. **Densify the chart with additional data** — a second series, a companion chart — only if genuinely useful, never filler.
4. **Never — stretch marks or pad whitespace** to fill a wider tile.

Common failure: a proportion bar chart in a 12-column tile with a 0–100% axis while data tops at 31%. Bars occupy the left ~30% of the plot; the rest is dead. Two compounding choices: axis auto-maxed to 100% ("it's a percentage") and tile given full width ("it's a breakdown"). Fix either shrinks the dead space; fix both and tile proportions match the data.

### The test applies recursively — any container holding data marks

The ≳60% extent rule is scoped to "data marks in their container," not specifically to "chart in its tile." Any container that holds data marks is in scope — the same failure reappears one level deeper whenever marks sit inside a sub-container:

- A **sparkline embedded in a table cell** — if the sparkline is pinned at `width: 140px` but the cell stretches to 400px, every row has 260px of dead space to the right of the mark. Same failure as an over-wide tile, one scope down.
- A **small-multiples facet panel** where each panel has its own auto-axis and bars fill 30% of the panel width.
- A **mini-chart inside a single-value tile** (a KPI number + trend sparkline) where the sparkline occupies a thin strip of the tile.
- A **nested chart inside a tooltip, drawer, or master-detail pane** — the same ≳60% rule applies.

The fix mirrors the outer rule: either let the mark fill its container (sparkline width = cell width — sparklines *earn* precision from horizontal pixels, they don't waste them), or tighten the container to the mark's natural width (explicit table column widths; narrower facet panels). Never pad the gap and leave it as dead space.

Audit the rule at every container level that holds data marks, not only at the tile boundary. A dashboard can pass the tile-level extent check and still fail it inside a cell.

## Section headers and grouping

When a dashboard has multiple logical clusters (e.g., "Acquisition," "Retention," "Revenue"), mark them:

- A lightweight **section header** — one line of type, left-aligned, above the group. Not a bar, not a colored block — just type.
- A **gutter bump** between sections (larger than within-section gutters).
- Optional **light background shading** to enclose a group — only if the grouping is load-bearing; otherwise the shading is decoration that doesn't aid navigation.

Don't use section headers as decorative filler. One section → no header.

## Gestalt principles at the dashboard scale

Six principles operate on individual charts AND on whole dashboards:

- **Proximity** — charts physically close together read as related. Group related charts; use distance (larger gutters, section breaks) to separate independent clusters.
- **Similarity** — same chart type / accent color / size reads as parallel. Right for a row of single-value tiles or small-multiples grid. Wrong if charts are making different kinds of claims.
- **Enclosure** — light shading or a subtle border around a group signals "this cluster belongs together." Use sparingly.
- **Closure** — the reader completes implied boundaries from alignment alone. Rarely need explicit borders if alignment is clean.
- **Continuity** — the eye follows smooth paths. A clean left alignment creates a continuity the reader follows naturally.
- **Connection** — an explicit line (divider) or a shared axis across stacked charts is the strongest grouping signal. Use deliberately.

Most "why does this dashboard feel off" diagnostics come back to violated Gestalt.

## Responsive behavior

Dashboards are viewed on laptops, monitors, tablets, phones. A 12-column grid that falls apart at 900px is a partial dashboard.

- **Breakpoints.** Define desktop (≥1200px), tablet (768–1199px), mobile (<768px). On narrow viewports, charts stack vertically; top-left becomes top.
- **Reading order preserved on stack.** Priority top-left → priority top. Narrative flow survives.
- **Minimum tile sizes.** A chart smaller than ~280×180px is generally illegible. Drop tiles rather than shrink below usable.
- **Tables scroll horizontally** on narrow viewports; don't cram a 10-column pivot into 400px.
- **Static export fidelity.** The PDF / screenshot export renders the desktop layout; treat it as canonical.

## Things to avoid

- **Secondary charts in premium real estate.** Don't put the "last refreshed" timestamp or nav tabs in the top-left where the hero belongs.
- **Starting the reader anywhere but top-left.** Centered hero tiles, bottom-up layouts fight the default scan pattern.
- **Filter bars that occupy a third of the canvas.** Filters are infrastructure; compact and out of the way. See [`interactivity.md`](interactivity.md).
- **Inconsistent tile sizes that don't encode priority.** If every tile is random-sized, the reader guesses whether size means importance.
- **Tiles stretched vertically to match a taller sibling.** Four bars in a 320px tile — huge whitespace, bars wide enough to read as area. Let the short tile take its natural height.
- **Dead plot area from over-wide tiles.** Data marks < ~60% of plot's horizontal extent. Tighten the axis, narrow the tile, or add useful data.
- **Mixing fonts and type scales.** One typeface family, small size scale (e.g., 24/18/14/12).

## See also

- [`consistency.md`](consistency.md) — cross-chart consistency (palette, delta format, legend treatment, category order)
- [`chrome.md`](chrome.md) — page chrome, whitespace, density, scrolling tiles
- [`archetypes.md`](archetypes.md) — canonical layouts by mode
- [`../01-design-process.md`](../01-design-process.md) — frame audience and purpose before laying out
- [`narrative.md`](narrative.md) — reading order as story
- [`audience-purpose.md`](audience-purpose.md) — layout defaults by mode
