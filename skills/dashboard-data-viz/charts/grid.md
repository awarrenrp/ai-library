---
name: grid
description: Produce dashboard.tile (data grid / table) — precise-value lookup, multi-unit comparison, summary + detail in one view.
governs: dashboard.tile (grid/table)
consumes: dashboard.category-order
---

# Grid (data table)

A grid is a rows-by-columns table of values. It is the right form when precision matters more than pattern — when the reader will *read* the number, not *see* it. A well-made grid is often the best chart on a dashboard for reference and ops work, and many requests that start "make me a chart of X by Y" are better served as a grid with conditional formatting than as yet another bar.

## When to use

- The audience will look up individual values.
- The audience will compare specific pairs of values, not whole series.
- Precise values are critical — cents, percentages to a decimal, counts that must reconcile.
- Multiple units of measure share the same view ($, %, count, ms) — a chart forces a single scale; a grid does not.
- Both summary and detail must appear together (KPI row + breakdown rows).
- The dashboard is in **reference / ops** mode — the reader is doing lookup, and the same layout renders every time.
- Audience is mixed, scanning different rows for different answers.

## When NOT to use (and alternatives in the palette)

- The audience wants to see a *pattern* or the *shape* of the data — reach for `bar.md` (nominal, ranking), `line.md` (time), or `scatter.md` (correlation).
- You need to compare an entire series across categories — `bar.md` or small multiples.
- Exact values are not needed and visual impact is the point — a chart will land faster than a grid.
- Live presentation, where the audience will read the table instead of listening — collapse to a `single-value.md` tile with the headline, push the full grid to an appendix.
- Large numbers of rows that the reader will scroll rather than read — consider a `pivot-table.md` with subtotals, or a chart that summarises first.

## Rules

### Numbers and alignment

- **Right-align all quantitative columns**. Magnitudes read correctly only when ones stack over ones, tens over tens.
- **Align decimal points** so numbers line up vertically. `   1.23 / 1,204.50 / 847.00` — not left- or centre-aligned.
- **Consistent number formatting within a column.** Same precision, same unit, same thousands separator. Mixing `1.2M` and `1,234,567` in the same column is a defect.
- **Keep the redundant signs** — `$`, `%`, comma thousands separators. They aid interpretation and do not burden cognitive load.
- **Strip trailing zeros** that carry no information (`10` not `10.0`) unless you are column-aligning decimals.

### Structure and whitespace

- **Use whitespace as the primary organising tool**. Related rows/columns grouped by proximity; separators where the data genuinely breaks.
- **Muted, not heavy, gridlines.** Light grey at most; prefer no lines and let whitespace do the work. Dark rules in every cell are chartjunk.
- **Row banding is optional, not default.** Use it only when rows are long enough that the eye loses its place. Short tables (<10 rows) don't need banding.
- **Header typography distinct from body** — weight or case change, not a different font. Subtle, not loud.
- **Total rows visually distinct** from detail rows — a rule above, slightly heavier weight, or a muted fill. Not all three.
- **Whitespace margins** around the whole grid; do not let it touch the tile edges.

### Sorting and order

- **Sort by the column that makes the question easy.** For a ranking task, sort descending on the value column. For a time lookup, sort by time. For a name lookup, alphabetical is fine. Do not default to alphabetical when a meaningful order exists.
- Respect natural order when one exists (Mon–Sun, Q1–Q4, revenue tiers).

### Conditional formatting (heatmap-style cells)

- **Colour-shading cells by value turns a grid into a dense visualization** — the "table lens" / heatmap upgrade. This is the single highest-leverage upgrade to a plain grid.
- Use **lightness variation in a single hue** for sequential magnitude; a **diverging palette** (cool→neutral→warm) only when the column has a meaningful midpoint (variance to target, YoY delta). See `./encode/color.md`.
- **Always include a legend** explaining the colour scale (LOW–HIGH) when used.
- Apply per-column scales when columns carry different units; one global scale only when all columns are comparable.
- Keep the numbers legible against the shaded cell — reduce saturation before the text becomes hard to read.

### Totals

- **Place the total row where the question lives.** Top when the summary is the hero and rows explain the summary; bottom when rows build to a total.
- Visually set off the total row (rule above, slight shading, bold) — but only one of these cues.
- Grand total columns on the right follow the same rules.

## Anti-patterns

- Alphabetical sort when value order would answer the question (ranking presented in A–Z order loses the ranking).
- Bold dark rules between every cell — the grid competes with the data.
- Left-aligning or centring numeric columns.
- **Gradient background fills** behind the data — context effect makes identical values look different. Reserve fills for deliberate conditional formatting.
- Inconsistent decimal precision within one column.
- Mixing units in one column (`$1.2M` next to `1,204` next to `84.3%`).
- Treating the grid as a "data dump" — if no row or column is load-bearing, cut it.
- Row banding on a 4-row table (cognitive overhead for no payoff).
- A heatmap-shaded grid with no legend — the reader must guess whether dark means high or low.

## See also

- [`pivot-table.md`](pivot-table.md) — grids with hierarchies and subtotals
- [`single-value.md`](single-value.md) — when one or two numbers are the whole point
- [`../encode/color.md`](../encode/color.md) — sequential, diverging, categorical palettes for conditional formatting
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — why gridlines should be muted
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — "lookup" vs "see the pattern"
