---
name: bubble
description: Produce chart.geom (bubble) — scatter with a third continuous variable as circle area. Use sparingly; area is perceptually weak.
governs: chart.geom (bubble)
consumes: dashboard.palette
---

# Bubble chart

A bubble chart is a scatter plot in which each point's **area** encodes a third quantitative variable. Two continuous variables live on the axes (position — the most accurate channel); a third rides on the mark's size (area — far weaker). The classic example is growth-vs-margin with bubble size = revenue: the positional story is "growth vs margin", and the size variable gives a sense of which entities matter economically.

Bubble charts are easy to misuse. The perceptual tax on area is substantial; a fourth variable layered as colour can push the chart into puzzle territory. Use when the third variable is genuinely a secondary "importance" signal, not when you want to see its values precisely.

## When to use

- **Three continuous variables where the third is "size of the bet".** Classic portfolio plots (growth × margin × revenue), customer cohorts (CAC × LTV × count), product lines (units × price × revenue). The scatter answers the primary question; the size gives context on what matters.
- **Spotting outliers in a two-variable scatter that are also economically large or small.** A high-margin, low-growth point that happens to be 80% of revenue is the headline; bubble size surfaces it.
- **Visual summary of a ranked list projected onto two axes.** When a sorted bar by the size variable alone would lose the bivariate relationship the reader needs.
- **With direct labels and interactivity** — tooltips for exact values, hover-highlight, click-to-filter. Bubble charts shine when interactive and falter when static.

## Bubble vs scatter-with-size-legend vs paired plots

Three honest ways to show three continuous variables, from weakest to strongest encoding of the third:

- **Bubble chart.** Third variable as area. Highest visual density (one tile), lowest accuracy on the third variable.
- **Scatter with size legend and value labels.** Same as above but exact values also appear in a side table or tooltip. Better for audiences that will want to read the third variable.
- **Scatter + ranked bar chart (paired).** Third variable promoted to a separate bar chart beside the scatter. Highest accuracy; uses two tiles of real estate.

Default: pair the scatter with a ranked bar unless space is truly constrained. The bubble is the right choice when the third variable is narratively secondary and the at-a-glance size signal is worth the perceptual tax.

## When NOT to use

- The third variable is primary or needs precise reading — promote it to an axis and demote one of the others; area-reading is too lossy. Use a standard `scatter.md` and report the third variable in a small table or side tile.
- You have more than ~30–50 bubbles with significant overlap — the chart becomes a cluster; use `scatter.md` (with jitter or transparency) and put the size variable in a companion ranked `bar.md` or `pivot-table.md`.
- The bubble sizes vary by several orders of magnitude — the smallest points become invisible and the largest dominate; log-scaling the area helps but adds interpretation load. Consider splitting into two plots by size tier.
- Categorical third variable — use colour on `scatter.md`, not size.
- The audience needs to read exact values — bubble charts invite "about how big is that one?" questions that a table would answer directly.
- Negative values on the size variable — area has no sign.

## Rules

### Before you pick bubble

Before committing to a bubble chart, verify:

- The third variable is genuinely secondary — the primary story lives on the axes.
- The value range for the size variable is manageable (fewer than ~3 orders of magnitude, or log-scaling is acceptable).
- The size variable is non-negative.
- The audience will tolerate area reading (executive / strategic audiences usually fine; ops / precision audiences usually not).
- The chart will have a size legend and direct labels for focal points.

If any of these is false, promote the third variable to a separate sorted bar chart beside a `scatter.md` — almost always the stronger honest answer.

### Area, not radius

- **Encode by area, not radius or diameter.** A value 4× another should render with a 4× *area*, which is 2× radius. Scaling radius by value directly causes the larger bubble to appear 4× too big (Lie Factor ≈ 2).
- **Many plotting libraries default to radius-scaling** — this is the single most common implementation bug in bubble charts. Verify or explicitly set area scaling, and label the convention in the legend ("size = revenue; area proportional to value").
- **Size legend is mandatory.** Show 2–3 reference bubbles at known values ("$1M / $10M / $100M") so the reader can calibrate area reading.

### Axes

- **Use the strongest channels for the primary two variables.** Position on x and y — the most accurate quantitative encoding. The bubble's size is secondary by construction.
- **Zero baseline is not required** for a scatter-form chart — position encodes value, not length. Pick an axis range that frames the relationship without zooming into noise.
- **Squared aspect ratio** (height ≈ width) is the default — it keeps the relationship visually fair and avoids implying a steeper or flatter trend than the data supports.
- **Label both axes with variable and unit**; label the size variable in the legend.

### Fills and overlap

- **Translucent fills (40–60% alpha).** Opaque bubbles obscure each other; translucency lets overlaps remain readable and surfaces clustering. A darker outline at the same hue helps boundaries read.
- **Layer from large to small.** Draw the largest bubble first so smaller, focal bubbles are not hidden behind it. **Do not override this with semantic-role layering.** A common bug: the generator wants accent-on-grey bubbles to appear on top of muted ones (to reinforce emphasis) and sets `z` by cohort — accent = 2, muted = 1. This silently reverses the large-to-small rule whenever a large muted bubble sits behind a smaller accent bubble, the large bubble renders *on top*, and the accent bubble disappears. Layer by **size** (largest rendered first); carry emphasis with the other channels already available — hue saturation, stroke weight, direct-label-vs-tooltip — not with layer order. Emphasis-via-z breaks occlusion; occlusion-via-size breaks only when two bubbles are the same size, in which case stack order is genuinely arbitrary.
- **Avoid extreme overlap** that becomes a blob — if it happens, jitter, filter, facet, or switch to a `scatter.md` with the size variable encoded elsewhere.

### Colour (the fourth variable, if any)

- **One categorical fourth variable via hue is acceptable** if categories are few (≤4) and the chart is not already dense.
- **A sequential fourth variable via lightness** is acceptable when the colour scale is legend-explained and the reader doesn't need precise reading from colour — it is the weakest-encoded variable on the chart.
- **Avoid a fifth channel (shape)**. At that point the chart is a puzzle; facet into small multiples instead.
- Default to **accent-on-grey**: most bubbles muted, a focal subset saturated.

### Labels

- **Direct-label the bubbles the story needs the reader to find** (top-left, extreme, focal customer) and let the rest live in tooltips.
- Labels inline with the bubble centre or nudged to a nearby empty spot; a leader line only if the label can't sit unambiguously.
- Do not label every bubble — the chart becomes a word cloud.

### Honesty

- **No 3D bubbles.** Spheres are area-squared-by-projection and further distort.
- **Size scaling by area, documented.** If the tool scales by radius, either recompute scaling by area or re-label so the reader is not misled.
- **Consistent size scaling across small multiples** — if the same chart is faceted by time or region, the bubble-area legend must be shared; otherwise a bubble of the same apparent size means different values across panels.
- **Cap or log-scale for extreme ranges.** When the size variable ranges over 3+ orders of magnitude, linear area scaling makes small bubbles invisible. Log-scale the area and label the legend explicitly as log-scaled, or split the chart by size tier. Never silently clamp large values to the maximum symbol size without annotation.

### Reference lines

- **Quadrant lines at meaningful thresholds** (x = median, y = target) split the plot into narrative quadrants ("high-growth / high-margin" etc.) and make the story literal. Muted grey lines with small text labels at the intersection.
- **No regression line by default.** A bubble chart's third variable complicates what the line means; include a fit only if the relationship is the primary claim and state what it is weighted by.

### Bubble count and density

- **Sweet spot: 8–25 bubbles.** Fewer than 8, a sorted bar with the size variable direct-encoded is clearer; more than 25, overlap overwhelms and the chart is better faceted or the reader better served by a `scatter.md` + ranked table.
- **Minimum bubble size floor** around 3–4 px area equivalent so the smallest bubble remains visible; note the floor in the legend caption if any bubbles would otherwise fall below.
- **Maximum bubble size** such that the largest bubble does not span more than ~15–20% of the chart's shortest dimension — otherwise it dominates, occludes, and warps the reader's sense of the axis scale.
- **Bubbles must not straddle a meaningful reference line.** When the plot has a baseline that carries narrative meaning — `y = 0` for growth / variance / deviation, `y = target`, `y = prior period`, `y = break-even` — crossing the line changes the *category* of the point ("growing vs shrinking", "above target vs below"). A large bubble plotted just above the line whose radius extends below it visually straddles the two categories, and small-value points near the line read ambiguously even when the data is unambiguous. Specific failure: a `$400M` bubble plotted at `y = +6%` growth with a radius that reaches down to `y = −15%` looks like it reports negative growth; smaller bubbles (fixed position, smaller radius) next to it look cleanly above zero. Same data value, different visual category, purely from radius. Fixes, in priority order:
  1. **Cap max radius** so the largest bubble at its extreme axis position still fits entirely on one side of the reference line. If the closest-to-baseline value is `+6%` and the axis range is `0–100%`, max radius in data units ≤ 6%.
  2. **Extend the axis range** so the reference line sits well inside the plot, not near the edge — e.g., axis `−5%` to `+100%` instead of `0–100%`, which gives every positive-growth bubble headroom below. Costs a small amount of plot area; restores the axis reading.
  3. **Switch to `scatter.md` + ranked `bar.md`** — fixed-size dots don't straddle anything; area encoding moves to length in the bar.
  4. **Disclose in the subtitle** if none of the above are available — "Bubbles are positioned at their YoY value; radius alone may visually cross the 0% line." Last resort; the structural fixes are stronger.

  This is a specific case of the general "axis reading is damaged by large bubbles" concern (covered by the max-size rule above), but it's worth calling out because the reader's error is categorical (growing vs shrinking), not just quantitative (is that 6% or 4%?) — and reference-line-adjacent points are often the narratively interesting ones.

## Simpler alternatives

- **`scatter.md` + companion sorted `bar.md`.** The dominant honest fallback. The scatter carries the two-variable relationship using position (the strongest channel); a side-by-side bar chart ranks entities by the "size" variable using length (also strong). Readers get both signals more accurately than a bubble chart would give them, at the cost of one tile instead of two.
- **`scatter.md` with the size variable shown in the tooltip or a label column** — simplest swap; loses the at-a-glance sizing but preserves the bivariate relationship exactly.
- **`single-value.md` tiles ranked by the third variable alongside the `scatter.md`** — a strip of the top-N entities at the side of the plot gives "the biggest bets" plus the relationship. Good for exec summaries.
- **`pivot-table.md` with columns for the three variables and heatmap-shaded** — loses spatial relationship but allows precise comparison on all three; best when the audience will want to look up specific entities.
- **Small multiples of `scatter.md`** faceted by a size-tier bin (`small / medium / large`) — preserves the bivariate plot, splits the "importance" dimension into comparable cohorts.

Choose bubble only when the "size at a glance" signal is worth more than the perceptual tax of area reading. For many audiences, the scatter + bar pair is the strictly better answer.

## Anti-patterns

- **Scaling by radius.** The most common bug; instant Lie Factor of ~2.
- **3D bubbles / spheres.** Extra projection distortion on top of the area/radius issue.
- **Every quadrant packed — "everything is a bubble here"**. The chart encodes nothing because nothing stands out.
- **No size legend.** The reader cannot calibrate the third variable; the chart is decorative.
- **Using the bubble for a precise third-variable reading** — a gauge in miniature disguised as a scatter. Promote the variable to an axis.
- **Mixing area scaling across facets** — same-sized bubbles mean different values in different panels.
- **Overplotting: a sea of overlapping opaque circles** — indistinguishable; switch to density or split.
- **Encoding a fourth variable with shape AND a fifth with colour AND a sixth with rotation** — past three aesthetics, facet.
- **Size encoding for a variable that can go negative** — area has no sign; misrepresents.
- **Axes with no zero or a truncated zero creating a misleading "everything clusters top-right" look** — choose the axis range to represent the real spread.
- **Labels on every bubble** — word cloud effect; direct-label the focal bubbles only.
- **Minimum bubble radius set so small that the smallest bubbles are invisible** — either floor the size (with a legend note) or split the data by tier.
- **Gradient fills inside bubbles** — implies interior structure that isn't there; flat translucent fill only.
- **Z-order set by semantic role instead of size** — `z: accent = 2, muted = 1` silently reverses the large-to-small rule whenever a large muted bubble sits behind a small accent. Large muted bubble now paints over the small accent; the accent vanishes. Layer by size; carry emphasis with hue/stroke/label, not `z`.
- **Large bubbles straddling a meaningful reference line** — a `$400M` bubble at `y = +6%` whose radius reaches down to `y = −15%` looks like negative growth; the same bubble with fixed-size dots would read unambiguously above zero. Cap max radius so the bubble stays on one side of the line, or extend the axis range to push the line inside the plot.

## Worked examples

### Growth × margin × revenue (portfolio quadrants)

Scatter of 12 product lines: x = YoY revenue growth (%), y = gross margin (%), bubble area = absolute revenue ($M). Quadrant lines at x = 0% growth and y = 60% margin (company-wide median). Largest bubbles sit in "low-growth / high-margin" (cash cows) and "high-growth / low-margin" (emerging bets); direct-labels on the top three. A side `bar.md` ranks all 12 products by revenue for precise lookup. The reader gets the strategic quadrant story plus the precise ranking, without asking the bubble chart to carry both.

### Cohort CAC × LTV × count

Marketing channels as points: x = CAC ($), y = LTV ($), bubble area = customer count. A reference line at y = 3x (canonical LTV/CAC target). Bubbles above the line are efficient; below it, not. Bubble size surfaces which channels are meaningful by volume — a wildly efficient channel with 12 customers matters less than a merely-OK channel with 40,000. Pair with a table of exact CAC/LTV/count per channel. The bubble chart alone would let a reader miss the 12-customer outlier; the table alone would bury the quadrant story.

## See also

- [`scatter.md`](scatter.md) — the base form; promote the third variable here when it matters
- [`bar.md`](bar.md) — companion for the size variable
- [`single-value.md`](single-value.md) — ranked tiles as "importance" side-strip
- [`../encode/visual-channels.md`](../encode/visual-channels.md) — why position beats area
- [`../encode/color.md`](../encode/color.md) — rules for a fourth variable via colour
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — area-proportional-to-value, matched dimensionality
- [`../00-mental-model.md`](../00-mental-model.md) — facet before a fourth aesthetic
