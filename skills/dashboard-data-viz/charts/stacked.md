---
name: stacked
description: Produce chart.geom (stacked or horizontal-stacked bars) — total is the primary message, composition is secondary.
governs: chart.geom (stacked)
consumes: dashboard.palette, dashboard.category-order
---

# Stacked bar chart

A stacked bar combines a total (the full bar length) with its composition (the segments within). It is a compromise form: the total reads on a common baseline, but only the first segment also sits on that baseline — every segment above is read from a floating base, paying a measurable accuracy tax. Ship it when the total is the headline and the parts are orienting context; reach for alternatives when precise comparison across parts is the job.

## When to use

- The **total is the primary message**, and the composition provides useful context.
- Part-to-whole across categories where absolute totals matter more than the exact per-part comparison (revenue by region, split by product line — the region total is the story).
- A small number of parts (3–5 maximum). Beyond that, middle segments become unreadable.
- Time series of composition where the total also carries meaning (headcount over time, split by department).
- 100%-stacked variant when **part-to-whole proportion across many categories** is the story and absolute totals are deliberately not.

## When NOT to use (and alternatives in the palette)

- Precise comparison of a *non-baseline* part across categories (e.g., "how does product B compare across regions?") → **unstacked grouped bars** (`bar.md`) or **small multiples**.
- **Parts count > 5** → unstacked grouped bars, small multiples, or a heat-shaded `grid.md`. Stacked with 8 segments is unreadable.
- The **total is not interesting** → drop the stack; show parts as unstacked bars sorted by value.
- Composition evolving smoothly over time where the total also rises/falls → consider an area chart with the same caveats — but start by asking whether a line chart of totals + a small-multiples grid of parts would tell the story more honestly.
- Both per-part trend *and* total trend matter → split into two stacked plots sharing the x-axis.

## Orientation: vertical vs horizontal

**Use vertical stacked when:**

- X-axis is time — months or quarters of composition.
- Short category labels fit under bars.
- The reader scans left-to-right as chronology.

**Use horizontal stacked when:**

- **Long category labels** — same rule as `bar.md`.
- **Ranking of totals** — biggest total at top, composition within each.
- Many categories (10+) where vertical would crowd.
- A single-row horizontal 100%-stacked bar is a clean way to show one part-to-whole composition — often better than a donut.

## Rules

### Zero baseline (non-negotiable)

- **Stacked bars must start at zero**, same rule as `bar.md`. A truncated baseline distorts every segment, not just the bottom.

### Parts count

- **Limit to 3–5 segments.** Beyond that, readers cannot track the middle parts across bars, and the legend exceeds working memory.
- If the tail is long, aggregate smaller categories into "Other" (explicitly labelled, typically muted grey).

### Consistent segment ordering

- **Every bar stacks the parts in the same order.** The reader compares segments by their *vertical (or horizontal) position* in the stack; reordering segments per bar destroys this.
- **Put the part you most need to compare at the baseline.** That segment gets common-baseline accuracy; every other part pays the floating-base tax. If there is a "focus" segment, put it on the bottom.
- For 100%-stacked, the part near the baseline reads most accurately; the part at the top reads second-most (it's anchored to 100%); everything in the middle is hardest.

### 100%-stacked (percent composition)

- Use when part-to-whole proportion across many categories is the story and absolute totals are deliberately not.
- **Always annotate absolute numbers** in a footnote or direct label — without them the reader cannot tell whether "50%" is of 10 or 10,000.
- Bars may touch (no gap between bars) to reinforce that each bar is its own whole summing to 100%.
- Include a "100%" marker or axis label so the reader orients immediately.

### Colour

- **Clear ordering in the palette.** If parts are ordered (tiers, time buckets, severity), use a sequential palette — lightness variation within a hue. If parts are categorical (product lines), use a categorical palette of 3–5 distinct hues.
- Accent-on-grey works: mute four of five segments; colour the focal one.
- Never red-green as the only distinction between parts.
- See `./encode/color.md`.

### Labels

- **Direct-label segments** with value or share when space allows; label only the focal segment otherwise.
- Direct-label the **total** at the end of each bar (top for vertical, right for horizontal) — this is the reason you chose stacked in the first place.
- Replace legend with direct segment labels when feasible.
- **Segment labels need the segment's minor dimension to fit the label's line-height block with breathing room (~1.2× block height).** In a horizontal strip, segment width carries data and segment height carries label space; in a vertical stack, segment height carries data and segment width carries label space. The label's full block height (line-height × lines) has to fit inside the mark's minor dimension, or the library silently clips the top and bottom against the mark boundary — text still renders, but as half-height glyphs that read as a rendering bug. Budget this at **tile-sizing time**, not at review: pick tile height so that plot-area height ≥ label block × ~1.2, plus chrome. If the tile cannot be that tall, move the labels outside the mark (above/below the strip, or beside each end) or drop to single-line labels. This is the chart-specific mirror of [`../dashboard/structure.md`](../dashboard/structure.md) *Natural-height ranges are plot-area heights, not tile heights* — the general rule applies anywhere labels sit inside marks (stacked segments, treemap cells, donut slices, heatmap cells).

### Axis

- Horizontal gridlines light; remove the axis line when every bar is clearly anchored to zero.
- 100%-stacked axis: ticks at 0, 25, 50, 75, 100 — do not overcrowd.

## Anti-patterns

- **More than 5 stacked segments** — unreadable middle parts; legend overwhelms working memory.
- Inconsistent segment order across bars — silently destroys cross-bar comparison.
- Stacked chart used when per-part trend is the actual question — reader cannot answer it.
- 100%-stacked with no absolute totals shown anywhere — the reader is left guessing scale.
- Rainbow categorical palette where parts have a natural order (use sequential).
- Stacked area with overlapping shaded regions suggesting "stacked" behaviour it doesn't have (different chart — see notes under `line.md`).
- Truncated baseline.
- 3D stacked bars — perspective makes the top segments look larger than they are.
- Using stacked bars to "show everything at once" — usually the sign that the chart has no editorial focus.

## See also

- [`bar.md`](bar.md) — unstacked grouped bars when parts are the message
- [`bar.md`](bar.md) — horizontal form, same rules
- [`line.md`](line.md) — when the total's trend is the whole story
- [`combination.md`](combination.md) — stacked total with an overlay line (e.g., target)
- [`../encode/color.md`](../encode/color.md) — sequential vs categorical palettes
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — "total" vs "per-part" questions
