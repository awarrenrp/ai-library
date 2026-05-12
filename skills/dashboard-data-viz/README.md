# Dashboard dataviz skills

A set of focused skill files that guide a prompt-driven dashboard generator toward high-quality data visualization. Source syntheses in `_sources/`.

## How to use

**Two-phase loading.** The full skill system is ~120k tokens. To keep individual generation sessions cheap, use a two-phase load:

1. **Triage** — read [`rules-index.md`](rules-index.md) (~4k tokens). It lists every rule in the system, organized by governance unit, with a file pointer.
2. **Deep-read** — load only the skill files that govern the units you're actually producing.

Each file's frontmatter `description` is a trigger condition ("Produce X"). `governs` declares which units it owns; `consumes` declares which dashboard-scope decisions it depends on. These let an agent decide what to load without reading the file.

## Where to start

Read these four foundational files first — they establish the vocabulary everything else uses:

1. [`00-mental-model.md`](00-mental-model.md) — chart as composition, not opcode. Data → mapping → stat → geom → scale → coord → facet. "Above all else show the data."
2. [`01-design-process.md`](01-design-process.md) — frame audience, purpose, mode before any chart choice.
3. [`02-graphical-integrity.md`](02-graphical-integrity.md) — lie factor, proportional encoding, the six integrity principles. Non-negotiable.
4. [`03-composition.md`](03-composition.md) — the unit graph every other skill operates against. Rules govern production units; units compose by containment. This is how the skill system stays coherent as it grows.

Then use [`rules-index.md`](rules-index.md) to triage.

## Structure

```
rules-index.md    triage: every rule keyed to its governance unit + file pointer
00-mental-model.md    chart-as-composition, perceptual hierarchy
01-design-process.md  strategic units (audience, purpose, mode, big-idea)
02-graphical-integrity.md  non-negotiable rules: lie factor, proportional encoding, honest axes
03-composition.md    unit graph, production order

choose-chart/    chart-type selection (by question, by data shape, end-to-end flow)
encode/          visual channels, color principles + palettes, scales/axes, small multiples
craft/           per-chart clutter, emphasis, typography & labels, annotations
charts/          one recipe per chart type (governs chart.geom + per-type rules)
dashboard/       structure (grid, tile, sizing), consistency (cross-chart rules),
                 chrome (whitespace, density, decoration), archetypes,
                 narrative (explanatory mode), audience-purpose (mode),
                 interactivity (filters, tooltips, drill, operational real-time),
                 kpi-row (strip composition), common-mistakes (pre-ship review sweep)
```

## Composition and unit graph

See [`03-composition.md`](03-composition.md) for the full unit catalog and production order. The short version:

- **Strategic units** (audience, purpose, mode, big-idea) resolved first.
- **Dashboard units** (palette, delta-format, legend-treatment, time-range, annotation-style, category-order, grid, chrome, archetype) resolved once at dashboard scope, before any chart is drafted.
- **Chart selection** picks a chart type per tile.
- **Chart units** (geom, scale, axis, mark, annotation, title, direct-label) drafted per chart. Chart recipes `consume` resolved dashboard units — they don't re-decide.
- **Verification** re-checks cross-chart consistency. Includes the *consumed-not-declared family* (palette / typography / layout / text-on-fill / y-axis decimation, where library defaults silently override declared intent), palette coherence (OKLCH monotonicity / hue-arc / saturation), and column scans (delta, value, time-axis, scale, category-order). Full audit list in [`03-composition.md`](03-composition.md) step 5.

Composition order is the workflow; there's no separate "phase" concept.

## Chart types

All skills in `charts/` are first-class. Files: `bar`, `box-plot`, `bubble`, `bullet`, `combination`, `donut`, `dot-plot`, `funnel`, `gauge`, `grid`, `heatmap`, `histogram`, `line`, `map`, `pivot-table`, `scatter`, `single-value`, `slopegraph`, `sparkline`, `stacked`, `sunburst`, `treemap`, `waterfall`. Horizontal variants of `bar` and `stacked` are covered inside their respective files.

## Known gaps

Things the skill set describes but the generator doesn't render well (or at all) yet. Each is a pending build-out:

- **Small multiples / faceting.** [`encode/small-multiples.md`](encode/small-multiples.md) is in the set, but the tool doesn't render facet grids natively. Fallback: multiple separate charts sharing axis ranges, laid out in a dashboard grid.

Additional forms sometimes referenced in passing for context but without their own skill file: Sankey / flow diagrams, density plots, strip plots, area charts.

## Tone

Softer rather than strict across the board. The user can always pick a donut or a gauge or a sunburst; our job is to render it as well as possible and suggest the better alternative when there's a clear one. Hard "never" is reserved for deceptive rendering (lie factor >1.05, 3D on 2D data, truncated bar baselines) and accessibility/legibility blockers (red/green as the sole distinction, missing units).
