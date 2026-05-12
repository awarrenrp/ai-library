---
name: composition
description: Unit graph and production workflow. Defines the units (chart, dashboard, strategic) and the composition order that every skill operates against. Load alongside 00-mental-model.md.
---

# Composition

A chart is a composition, not an opcode — and so is a dashboard. Both decompose into atomic production units that compose by containment. This file catalogs the units and the composition workflow every other skill operates against. [`00-mental-model.md`](00-mental-model.md) introduces the idea of a chart as a composition; this file extends the grammar past the chart boundary so dashboard-level decisions (palette, legend treatment, delta format) are first-class units too.

## Why composition, not scope

Rules are small. Each one governs exactly one production unit. Units compose by containment: a dashboard contains tiles; a tile contains a chart; a chart contains geoms, marks, scales, axes, annotations, direct labels; a mapping binds data to aesthetics. When a unit is being produced, the rules that govern it fire.

An earlier framing of this skill system used "scope" as the organizing concept — chart-level rules vs dashboard-level rules. That framing leaked: rules that were *decided* at dashboard level but *applied* at chart level felt cross-scoped, and the boundary between the two was fuzzy. The fix is to stop labeling rules by scope and start identifying the **unit** each rule governs. Scope is a shadow of the unit; the unit is primary.

Under this framing, nothing is cross-scoped. A rule either governs `dashboard.palette` (decided once, consumed wherever a `mark.fill` is painted) or it governs `mark.fill` (consumes `dashboard.palette`). Each rule has one unit. Files group rules by topic; rules inside may govern different units and declare so inline.

## The unit catalog

### Universal units (grammar of graphics)

See [`00-mental-model.md`](00-mental-model.md) for why these are the right atoms.

- `data` — the table of values
- `mapping` — binding from data columns to aesthetics
- `stat` — a transformation applied before drawing
- `geom` — the physical shape drawn
- `scale` — the mapping from data values to visual values
- `coord` — the coordinate system
- `facet` — the variable that splits into small multiples

### Chart-composition units

A chart is assembled from:

- `chart.geom` — the physical shape drawn (bars, line, points, etc.)
- `chart.mark` — a single data-bearing shape (one bar, one point, one line segment)
- `chart.axis` — one axis with labels and ticks
- `chart.gridlines` — horizontal/vertical rules inside the plot area
- `chart.legend` — the mapping key, when present
- `chart.title` — the chart's title line
- `chart.subtitle` — secondary caption or context line
- `chart.direct-label` — a label adjacent to a mark (endpoint labels, bar values)
- `chart.reference-line` — target line, forecast divider, structural break
- `chart.annotation` — a callout, shaded band, leader-lined note
- `chart.ink` — the total rendered-ink inventory of this chart (the denominator in the data-ink ratio)

### Dashboard-composition units

A dashboard is assembled from:

- `dashboard.tile` — a container hosting one chart, one single-value tile, or one table
- `dashboard.row` — a horizontal group of tiles
- `dashboard.section` — a group of rows with an optional section header
- `dashboard.grid` — the column structure tiles align to (a 12-column grid is the common default)
- `dashboard.palette` — the mapping from series or semantic role to hex value, resolved once per dashboard
- `dashboard.delta-format` — the convention for KPI deltas (relative %, absolute, absolute-with-relative), resolved once per dashboard
- `dashboard.value-format` — the convention for KPI tile values (the large-font number), resolved once per dashboard so the value column reads as one unit suffix; sibling of `dashboard.delta-format`
- `dashboard.legend-treatment` — the strategy for legends across the dashboard (one dashboard-level key, direct labels only, or per-chart)
- `dashboard.time-range` — the shared time window across time-series charts
- `dashboard.annotation-style` — the visual treatment applied to all annotations on the dashboard
- `dashboard.category-order` — the canonical ordering of a categorical (regions, segments, teams) that every chart uses
- `dashboard.chrome` — page title, subtitle, footer, source line, section headers, filter bar
- `dashboard.navigation` — filters, tabs, drill-down affordances

### Strategic units (decided before any composition begins)

- `strategic.audience` — who reads this
- `strategic.purpose` — exploratory, explanatory, or reference
- `strategic.big-idea` — the one-sentence point of view (explanatory mode only)
- `strategic.mode` — the combination of audience and purpose that drives every downstream default

## Composition order

The generator (or author) produces units in this order. Each unit's governing rules fire when the unit is being produced. Later units *consume* earlier ones — they do not re-decide them. Composition order **is** the phasing; there is no separate phase concept.

1. **Strategic units** — produce `strategic.audience`, `strategic.purpose`, `strategic.mode`, `strategic.big-idea`. Consult [`01-design-process.md`](01-design-process.md), [`dashboard/audience-purpose.md`](dashboard/audience-purpose.md).

2. **Dashboard units** — produce `dashboard.palette`, `dashboard.delta-format`, `dashboard.legend-treatment`, `dashboard.time-range`, `dashboard.annotation-style`, `dashboard.category-order`, `dashboard.grid`, `dashboard.section` structure, `dashboard.chrome`. These are decided once, *before* any individual chart is drafted. Consult `dashboard/*.md`, `encode/color.md`, and the KPI-row rules in `charts/single-value.md`.

3. **Chart selection** — for each tile, produce the chart type. Consult `choose-chart/*.md`.

4. **Chart units** — for each chart, produce `chart.geom`, `chart.scale`, `chart.axis`, `chart.mark`, `chart.direct-label`, `chart.annotation`, `chart.reference-line`, `chart.title`, `chart.subtitle`. Chart-unit rules fire as the unit is produced. Rules that *consume* a dashboard unit (`dashboard.palette`, `dashboard.delta-format`, `dashboard.annotation-style`, `dashboard.category-order`) reference the already-resolved value — they do not re-decide.

5. **Verification** — re-consult the governance rules on dashboard units against the composed dashboard. Palette consistency scan (resolution uniqueness + OKLCH coherence audit per [`encode/color-palettes.md`](encode/color-palettes.md) *Palette coherence audit* when the palette is compound), **hue-role uniqueness scan** (each hue in the resolved palette is bound to exactly one role across all tiles per [`encode/color.md`](encode/color.md) *One hue, one meaning per dashboard* — a fix that reduces accent count without changing accent hue does not satisfy this rule), **text-on-quantitative-fill contrast scan** (for every cell-labeled fill in the rendered dashboard — heatmap cells, choropleth regions, conditional-formatted pivot cells — confirm WCAG ≥4.5:1 between text color and cell fill, with per-cell flip applied where needed per [`encode/color.md`](encode/color.md) *Text on quantitative fills*), delta-format and value-format column scans (per the explicit suffix-extraction procedure in [`dashboard/consistency.md`](dashboard/consistency.md) *Column-scan procedure* — not advisory prose, a procedural check the generator runs per KPI row), row-span scan (sum each row's tile spans; verify each is 12 or matches a documented partial pattern per [`dashboard/structure.md`](dashboard/structure.md) *Row spans sum to 12, or match a documented partial pattern*), legend-treatment check, time-axis match, scale-consistency check across small multiples, category-ordering match. The **consumed-not-declared family** — palette ([`encode/color.md`](encode/color.md)), typography ([`craft/typography-and-labels.md`](craft/typography-and-labels.md)), and layout ([`dashboard/structure.md`](dashboard/structure.md)) — share a failure shape where a declared dashboard-scope intent silently doesn't realize in render (an unset library slot, an undefined CSS class, a canvas default); audit each by inspecting the rendered output (rendered hexes vs resolved palette; canvas text vs DOM text; rendered tile widths vs declared spans), not the spec. **A second failure family worth naming separately**: *advisory-rule-not-applied* — rules that exist as prose ("scan down the column," "check that the palette feels coherent") never fire unless the verification phase has them as explicit procedural steps. The cure is the same as for the OKLCH and column-scan audits: convert prose to procedure (numbered steps with explicit inputs, comparisons, and remedies). When adding a new rule, ask whether it's procedural enough to actually run at this step, or whether it needs lifting into a numbered procedure first.

**A third failure family**: *single-write-per-context* — a fact that should appear once in a render context lands at the wrong count. The fact can be a unit, a value, a scope, a direction, a series name — anything the reader reads as one piece of information. Two failure modes:

- **Double** — a fact appears in two slots that both render. Examples: KPI tile with `63.4% %` (value-string slot AND unit-suffix slot both fill the unit); KPI tile with title `"68% of engineers active with AI coding tools"` over big-number `68%` (title and big-number both carry the value); delta + arrow glyph + colored badge all carrying the same direction signal; subtitle + axis-title + filter-chip all restating the same time scope.
- **Missing** — a fact omitted from a context where the value is read in isolation. Example: a scatter tooltip showing bare `18.9` for an "Avg daily spend ($)" series — the axis declares the unit but the tooltip is a separate read context that needs the unit on its own.

Diagnostic: pick a canonical slot per fact, audit the render for the fact appearing exactly once per context. Rules live in [`craft/typography-and-labels.md`](craft/typography-and-labels.md) *Units appear exactly once per read context* and [`charts/single-value.md`](charts/single-value.md) *The title and the big number must carry different facts*. Same shape as *consumed-not-declared*, mirrored across "wrong count = 0 or ≥2" instead of "silent default."

## How each rule declares its governance unit

Inside a skill file, each rule or rule-group states the unit it governs. Three conventions, picked file by file:

- **Section header by unit** — a file that covers rules at multiple units sections them by unit. A reader scanning the file sees `## Rules governing chart.annotation` vs `## Rules governing dashboard.annotation-style` and cannot confuse them.
- **Inline tag on a bullet** — for a single bullet that governs a specific unit in an otherwise single-unit file: `[governs: dashboard.palette] Resolve the palette once, before any chart is rendered..`.
- **Frontmatter `governs:` field** — for files whose rules are tightly scoped, the frontmatter can list the units covered.

Files remain **topical** groupings (color, annotation, layout). A file that covers rules at multiple unit levels sections them by unit. A rule in the "wrong" file is still identifiable by its unit tag, and can be moved without changing its meaning.

## Rule consumption: chart units that consume dashboard units

Many chart-unit rules reference a dashboard unit. The recipe should say so explicitly:

- `chart.mark.fill` **consumes** `dashboard.palette` — paint the mark with the resolved color for its series; do not invent.
- `chart.direct-label.format` **consumes** `dashboard.delta-format` on KPI tiles — use the resolved convention; do not pick per-tile.
- `chart.annotation.style` **consumes** `dashboard.annotation-style` — use the resolved styling; do not style per-chart.
- `chart.axis.time` **consumes** `dashboard.time-range` — use the resolved window.
- `chart.axis.category-order` **consumes** `dashboard.category-order` — use the resolved ordering.
- `chart.legend` **consumes** `dashboard.legend-treatment` — if the treatment is "one dashboard-level key," no per-chart legend; if it's "direct labels everywhere," direct-label; etc.

When a chart recipe doesn't declare its consumptions, the generator re-decides per chart and consistency across the dashboard breaks. **Every chart recipe must enumerate which dashboard units it consumes.** That's the architectural enforcement that replaces scope policing.

## Diagnosing past failures in this vocabulary

The bugs we've hit map cleanly onto unit mis-assignment:

- **Clutter leaked from chart to dashboard.** A `chart.ink` rule (data-ink) was used to evaluate `dashboard.chrome`. Different units; different rules. `chart.ink` asks "does this ink encode data?"; `dashboard.chrome` asks "does this ink aid navigation or hierarchy?"
- **KPI delta format in the wrong file.** The rule governs `dashboard.delta-format`, but lived inside `charts/single-value.md` as if it were a chart-unit rule. Moving it to `dashboard/consistency.md` moves it to the home of its unit. The `charts/single-value.md` recipe now declares it *consumes* `dashboard.delta-format`.
- **Color not consulted at chart render time.** `chart.mark.fill` consumes `dashboard.palette`, but the line-chart recipe didn't declare the consumption, so the generator re-decided per chart. Fix: the recipe explicitly consumes `dashboard.palette`.
- **Rotated annotation label.** `chart.annotation.label` governance rule (horizontal text, never rotate) lived only in `craft/annotations.md` and wasn't mirrored in the chart recipes that actually draw annotations. Fix: recipes that produce `chart.annotation` reference the governance rules.

## Using this file

Before producing any unit, check which rules govern it. When writing a new rule, ask: "which unit does this govern?" The answer is always exactly one. When a rule seems to need two units, it is probably two rules — one per unit — masquerading as one.

## See also

- [`00-mental-model.md`](00-mental-model.md) — "chart as composition" at the chart level; this file extends the composition idea past the chart boundary
- [`01-design-process.md`](01-design-process.md) — strategic-unit production
- [`02-graphical-integrity.md`](02-graphical-integrity.md) — integrity rules apply to many units, but each rule itself governs exactly one
- [`dashboard/structure.md`](dashboard/structure.md), [`dashboard/consistency.md`](dashboard/consistency.md), [`dashboard/chrome.md`](dashboard/chrome.md), [`dashboard/archetypes.md`](dashboard/archetypes.md) — dashboard composition units
- [`encode/color.md`](encode/color.md) — `dashboard.palette` resolution
- [`charts/single-value.md`](charts/single-value.md) — `tile` rules, consumption of `dashboard.delta-format`
- [`craft/annotations.md`](craft/annotations.md) — `chart.annotation` rules; cross-references `dashboard.annotation-style`
