---
name: donut
description: Produce chart.geom (donut / pie) — 2–5 slice part-to-whole. Poor for precise comparison; prefer sorted bars.
governs: chart.geom (donut)
consumes: dashboard.palette, dashboard.category-order
---

# Donut (and pie)

A donut is a pie with a hole. Both encode values as angles and arcs. Angle is near the bottom of the perceptual hierarchy (position > length > angle > area), so these charts pay an accuracy tax by construction — the reader cannot rank three similarly-sized slices as precisely as three bars of near-equal length. They still ship, and sometimes the audience expects them. This skill is about rendering them well when they're the right call, and steering to a better palette member when flexibility exists.

## When to use

A donut is acceptable — not ideal, but acceptable — when **all** of the following hold:

- The part count is **2 or 3** total slices. Anything more, and angle-reading collapses.
- Only **rough magnitude** is needed. The reader will not be asked to rank or precisely compare slice values.
- There is a clear **big winner** (one slice dominates), so the reader sees the story pre-attentively from the slice size alone.
- **Or** the donut is a single-value "progress dial" — `67% complete`, `82% of goal`, `3 of 5 steps done` — where the ring is a decorative wrapper around one number and the number itself carries the information.
- The audience strongly expects this idiom (e.g., a marketing dashboard, an executive summary template, an existing style guide).

If any of those conditions doesn't hold, the donut is probably the wrong palette choice — see alternatives below.

## When NOT to use (and alternatives in the palette)

- **4 or more slices.** Angle resolution is not good enough to distinguish small slices or rank mid-sized ones. Use sorted **`horizontal-bar`** with percentage labels. Label the 100% total explicitly.
- **Slice values are close.** If three slices are 32% / 34% / 34%, a donut hides the difference. Use **`horizontal-bar`** sorted descending — the length difference is readable; the angle difference is not.
- **Precise comparison is the job.** If the reader will be asked "which is bigger, A or C?", angles will lose to bars every time. Use **`horizontal-bar`** or **`pivot-table`** with the values.
- **Comparison across multiple donuts.** Two side-by-side donuts ("last quarter vs. this quarter") force the reader to compare two separate angle systems and hold both in working memory. Use a **`horizontal-stacked`** 100% chart with two rows, or two rows of sorted bars.
- **Change over time.** A donut is a single snapshot. Time trends belong in **`line`** or **`stacked`** (100% stacked bar if composition is the point).
- **Ranking / top-N.** Sorted **`horizontal-bar`** is the correct primary.

The single-value alternative deserves its own callout. A donut rendered as "67% complete" in a 400-pixel square is giving the reader one number wrapped in ~300 pixels of circle. In almost every such case, a **`single-value`** card with `67%` large, the label underneath, and a tiny delta-to-target annotation reads faster, takes less space, and conveys the same information more honestly. If the dial feels necessary because the audience expects a visual cue, a thin linear progress bar below the number preserves the "at a glance" read without inviting angle misjudgment.

## Rules (how to render a donut well when you do ship one)

### Structural

- **Cap at 3 slices.** If the data has more categories, aggregate the tail into `Other` and keep 2 primary slices plus `Other`. Note the aggregation in a subtitle.
- **Sort slices largest to smallest, starting at 12 o'clock, proceeding clockwise.** This gives the reader a predictable entry point and a consistent reading direction. `Other` always goes last, regardless of size, so the reader knows to expect the "everything else" bucket at the end.
- **Do not explode slices.** Exploding breaks the common-baseline (the shared center) that the reader uses to judge arc length; it multiplies the angle-reading tax rather than compensating for it.
- **Do not tilt** or render in 3D. 3D on 2D data is a graphical integrity violation — perspective foreshortening makes back slices look smaller than their value and front slices look larger. See [`../02-graphical-integrity.md`](../02-graphical-integrity.md).
- **Donut hole size:** if the hole exists, size it so the ring is at least as wide as the hole's radius. A skinny ring reads as a border, not as data. For single-value "progress" donuts, a larger hole is fine because the number itself fills it.

### Labels

- **Direct-label every slice** with the category name and the percentage, placed outside the ring with a short leader line, or inside the ring if the slice is large enough to hold the label at body-text size. This directly defeats the angle-reading weakness — if the label says `34%`, the reader doesn't have to estimate the angle.
- **No separate legend.** The legend forces the reader to match a color swatch to a slice, which is exactly the lookup-tax that direct labels remove.
- **Always show the total.** A footer or subtitle like `Total: $4.2M` or `Sums to 100%` makes the part-to-whole framing explicit and prevents the reader from wondering if there's a hidden "Other".
- For single-value donuts, the number goes in the center of the hole, large and bold. The subtitle underneath states what it is (`of annual target`, `complete`, `of quota`). The ring becomes decoration; the number is the data.

### Color

- **Accent-on-gray.** The focal slice gets the single accent color. All other slices are grays of different lightness. Do not use a different hue for every slice — this is "rainbow land" and it exceeds preattentive processing while telling the reader that each category is equally important.
- If there is no focal slice (no story about which one matters), use monochrome lightness variation (light → mid → dark of a single hue). This signals "these are equal-status categories."
- **Never red/green** as the only distinction between slices (colorblind access).
- For single-value progress donuts: the filled arc is the accent color; the unfilled arc is a light gray. Do not use green for "good" and red for "bad" — a single-value card with color conditional on threshold is more honest (see [`single-value.md`](single-value.md) when it exists).

### Size and layout

- A donut needs room to breathe. Render at least 240 pixels square. Smaller, and labels don't fit, and slice angle differences collapse into visual noise.
- Prefer horizontal layout with the donut on the left and the labels on the right (or vice versa) rather than labels squeezed around the ring.
- Against's horizontal-preferred aspect ratio: donuts are square by nature. Fighting this is worse than accepting it. But do not force a square donut into a wide card just to fill space — leave whitespace.

## Palette alternatives to suggest

When flexibility exists, lead the user toward one of these:

- **Sorted `horizontal-bar` with percentage labels.** The literature-preferred replacement for a pie. Works for any part count, supports precise ranking, and stays readable down to small panel sizes.
- **`single-value`.** For "67% complete" or "82% of target," a single-value card with a small delta annotation reads faster, uses less space, and does not invite angle misjudgment.
- **`horizontal-stacked` (100%).** When the user wants to show composition across multiple groups (e.g., revenue mix this quarter vs. last quarter), a two-row 100% stacked bar beats two donuts.
- **`pivot-table` with conditional formatting.** When precise values matter and part count is high (7+), a table with lightness-encoded percentages gives both the precision of the number and the at-a-glance pattern of the color — without any angle-reading.
- **Treemap.** Strictly better than a pie when the part count is 6+ and the user wants proportion at a glance. See [`treemap.md`](treemap.md).

Phrasing when suggesting: "This can ship as a donut. Given the three near-equal slices, a sorted horizontal bar would make the ranking unambiguous — want me to switch?" Do not refuse to render the donut; render it well, and offer the upgrade.

## Anti-patterns

- **4+ slices in a donut.** The slice at 7% is indistinguishable from the slice at 9%; the reader has no way to rank them.
- **3D / tilted / exploded pie.** Integrity violation. Angle foreshortening breaks proportional encoding; exploded slices break the shared baseline. Hard no.
- **Rainbow palette across slices.** Every slice a different hue. Tells the reader nothing about which matters, exceeds preattentive processing.
- **Legend off to the side, no direct labels.** Forces legend-to-slice matching, which is exactly the tax donuts already pay.
- **Donut-as-progress with a target line overlaid and no numeric label in the center.** The reader has to mentally compute a ratio of arc lengths. Put the number in the middle.
- **Two donuts side-by-side for comparison.** Two separate angle systems, no shared baseline. Use `horizontal-stacked` 100% or a slopegraph.
- **Donut of a non-part-to-whole quantity.** Pie charts only make sense when the parts sum to a meaningful whole. Rendering a donut of "top 5 customers by revenue" when those 5 are not the whole is a category error — use a sorted `horizontal-bar`.
- **Counterclockwise or 3-o'clock-start ordering.** Breaks the 12-o'clock-clockwise convention readers expect; forces them to re-learn the reading order before they can read the data.
- **Donut as default visualization** when the user said "show the breakdown" without specifying form. Default to sorted `horizontal-bar`; only reach for donut when the conditions above actually hold.

## Common failures to catch

- Sum of slices ≠ 100% (the "Other" was omitted, or the data is not actually part-to-whole).
- Slice order not sorted by value, so the reader can't scan smallest-to-largest.
- Labels inside tiny slices where they don't fit, producing overlap and illegibility.
- A donut with one slice at 98% and another at 2% — that's a single-value card pretending to be a chart.
- The donut's accent slice matches a different chart's accent color for a different meaning, breaking consistency across the dashboard.

## Worked example

Request: "Show the breakdown of Q3 revenue by customer segment." Three segments: Enterprise ($6.2M), Mid-Market ($3.1M), SMB ($1.4M). Total $10.7M.

- Three slices, a clear leader (Enterprise at 58%), a part-to-whole question, rough magnitude is the narrative. **Donut is acceptable.**
- Render a semi-thick donut, 320 px square, hole radius equal to the ring width.
- Order clockwise from 12: Enterprise (58%), Mid-Market (29%), SMB (13%). No `Other` needed.
- Enterprise in the accent color (the dashboard's focal hue). Mid-Market in mid-gray, SMB in lighter gray.
- Direct-label each slice outside the ring: `Enterprise 58% · $6.2M`, `Mid-Market 29% · $3.1M`, `SMB 13% · $1.4M`. No legend.
- Subtitle: `Q3 revenue by segment · total $10.7M`.
- Footer note: `FY24 constant dollars. Source: Deal registry.`

Counter-example: the same request but four segments with shares of 28/27/24/21. Switch to sorted `horizontal-bar` — the angle resolution cannot distinguish 27 from 28, but the bar length does.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — dimensionality and why 3D donuts lie
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — part-to-whole routing and alternatives
- [`../encode/color.md`](../encode/color.md) — accent-on-gray for the focal slice
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — why legends lose to direct labels
- [`bar.md`](bar.md) — the literature-preferred part-to-whole form
- [`single-value.md`](single-value.md) — the right home for "67% complete"
