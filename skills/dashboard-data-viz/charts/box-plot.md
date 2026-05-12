---
name: chart-box-plot
description: Produce chart.geom (box-plot) — compare distributions across 3+ groups (median, spread, outliers).
governs: chart.geom (box-plot)
consumes: dashboard.palette, dashboard.category-order, chart.reference-line (label placement per craft/annotations.md)
---

# Box plot (box-and-whisker)

A box plot summarizes a distribution with five numbers — minimum, first quartile, median, third quartile, maximum — drawn as a box with whiskers and, typically, individually plotted outlier points. One box per group on a shared quantitative axis turns "comparing distributions across groups" into a dense, position-encoded chart that bars cannot match.

In the grammar: `stat=boxplot + geom=boxplot` (a single-layer chart where the stat computes the five-number summary and the geom renders the composite mark). The boxplot stat must be location-scale invariant — shifting or rescaling the data shifts or rescales the box accordingly.

## When to use

- **Comparing distributions across 3+ groups.** The canonical use. Response times per region, order sizes per channel, salaries per role. Each group gets one box; the viewer compares medians, spreads, and outliers at a glance.
- **When median and IQR matter more than full shape.** Box plots compress shape into five numbers — you lose modality and fine structure but gain compactness and comparability.
- **When outliers are a part of the story.** The standard box plot explicitly plots points beyond the whisker threshold (typically 1.5 × IQR from the box). This exposes extreme values without letting them dominate the axis.
- **When the range of N per group varies.** A box plot handles unequal group sizes gracefully; the box still represents the same summary statistics regardless of N (annotate the N).
- **As small multiples of box plots faceted by a second categorical.** "Salary distribution by role, faceted by region" — a richer breakdown than a single panel can carry.

## When NOT to use

- **Audience is not visualization-literate.** Box plots are NOT beginner-friendly. The five-number summary is a statistical construct and the whisker convention is not self-evident. If the audience isn't fluent, either annotate heavily ("the box is the middle 50%, the line inside is the median") or switch form.
- **Single distribution.** One box alone wastes the form. Use a histogram or a frequency polygon instead.
- **Small N per group (<10).** The five-number summary is unstable and the box plot implies precision the data doesn't support. Use a **strip plot** (one point per observation, jittered) or a dot plot.
- **Distributions with important modality.** A bimodal distribution and a uniform distribution can produce identical box plots. If modality is the story, use overlaid frequency polygons or faceted histograms.
- **For trend over time.** A box plot per time-bucket works but reads slowly; a range band around a median line is usually clearer.
- **When exact values matter.** Box plots show quartiles, not every value. Supplement with a table or `pivot-table` of the actual summary statistics if precision reading is required.

## Rules

### The five-number summary and the whisker rule

- **Show median, Q1, Q3, min, max, outliers.** The canonical composition; anything less is a degraded box plot.
- **Use the Tukey 1.5×IQR convention by default.** Whiskers extend to the furthest point within Q1 − 1.5·IQR and Q3 + 1.5·IQR; anything beyond is plotted as an individual outlier mark. Other conventions exist (full min/max whiskers, 5th/95th percentile whiskers) — pick one and state it in a footnote.
- **Be consistent across boxes in the same chart.** Mixing whisker conventions within one chart is a design-variation-masquerading-as-data-variation error.
- **The box carries the 25th-to-75th percentile.** The median is drawn as a line (not a dot) inside the box — a common confusion is to read the median as the mean.

### Ordering and orientation

- **Sort boxes by median when ranking is part of the story**. Alphabetical ordering hides the pattern the chart is meant to reveal. Natural order (time, ordinal categories) overrides this.
- **Horizontal box plots for long category labels.** Same rule as horizontal bars — "salaries by role" with 12 role names reads better horizontally.
- **Vertical box plots when the quantitative axis is naturally vertical** (e.g., aligning the box axis with a same-scale bar chart above).

### When groups exceed ~10

A single panel with more than ~10 boxes gets crowded. Two alternatives:

1. **Small multiples** — facet by a secondary variable and show a handful of boxes per panel with shared axes.
2. **Collapse to a summary plot** — plot just the median and IQR as a range plot with one row per group, ordered by median. This is closer to a dot plot with error bars and reads faster than many boxes.

### Annotation and labels

- **Label axes clearly.** Quantitative axis with units; categorical axis with group names. No ambiguity.
- **Annotate the whisker convention** — "Whiskers: Q1/Q3 ± 1.5·IQR; dots are outliers beyond that range" in a footnote or caption. Many readers will not know the convention by heart.
- **Annotate N per group** if group sizes vary. A box plot from N=5 and one from N=5000 look equally decisive but are not equally reliable.
- **Highlight the focal group** with accent color; render the rest in gray.
- **Call out notable outliers by name** when they carry the story — "customer X, $2.1M order, 4× the next highest".
- **Horizontal reference lines (median, mean, target) cross the boxes by construction — the label belongs in the right margin, not inside the plot.** The reference value sits inside the data range, so at least one box's Q1–Q3 straddles the reference line, and an `insideEndTop`-style label lands on that box. Reserve extra right-margin on the grid and push the label outside the box group. This is the single most common integrity/readability failure on reference-lined box plots. Full rule in [`../craft/annotations.md`](../craft/annotations.md) *Reference-line labels sit in the axis margin*.

### Visual weight and clutter

- **Thin box outlines, muted fill.** The box is a composite mark; heavy ink obscures the median line and the whiskers.
- **Outlier marks as small, open circles** so they read as distinct from the box without dominating it.
- **No gridlines behind the boxes** unless the chart is being used as a precise lookup; the axis alone is sufficient.
- **Do not shade the box with a gradient or 3D fill** — chartjunk and a graphical integrity violation.

### The quartile plot — a minimal alternative

A minimal **quartile plot** (a single vertical line with the median marked as a gap, Q1/Q3 as tick marks, and min/max as dots) that achieves the same encoding with a higher data-ink ratio. If available, prefer it over the standard box-and-whisker. The standard form is the pragmatic default because it's what most audiences expect.

## Simpler alternatives

When box plots aren't the right fit for the audience or space, options in priority order, none ideal:

1. **A `pivot-table` of summary statistics** — one row per group with columns for `median`, `Q1`, `Q3`, `min`, `max`, `IQR`, `N`. Honest and precise; loses the visual comparison but gives the reader exact numbers.
2. **A `horizontal-bar` of medians with data labels** — sorted by median. Shows ranking but loses spread and outlier information entirely. **Do not use this as a substitute for comparing distributions** — it strips out everything that made the box plot the right choice. Use only when the user explicitly wants "typical value per group" and doesn't care about spread.
3. **Error-bar-style rendering via `combination` or dual lines** — if the tool allows, render a median with a min/max range overlaid. Closer to a range plot than a box plot; still missing quartiles.
4. **A `scatter` of raw points, x = group, y = value, with jitter** — a strip plot. When N per group is modest (≤100), this is more honest than a misleading bar-of-medians because the reader sees the actual spread. Sort groups by median.
5. **Small multiples of histograms** — full shape per group at the cost of more space.

The critical warning: a **grouped bar chart of medians is NOT a distribution chart**. It looks quantitative and precise but actively hides variance, skew, and outliers — the three things a box plot is for. If distributions are the user's real question, use the box plot; don't pretend a bar chart of medians is a substitute.

## Anti-patterns

- **A single box plot instead of a histogram.** One distribution should be a histogram — box plots are for comparison.
- **Alphabetical ordering of boxes.** Hides the ranking story.
- **Hidden outliers.** Suppressing outlier points because "they make the chart ugly" loses the part of the chart that matters most for detection.
- **Whisker convention not stated.** Readers will assume min/max and misinterpret the 1.5·IQR points as the extremes.
- **Color-coded boxes without a reason.** Reserve color for accent-on-gray emphasis, not decoration.
- **Replacing a box plot with a bar of means.** Different statistic (mean ≠ median), different story, and no spread information.
- **3D or gradient-filled boxes.** Integrity violation and chartjunk.
- **Reading the box width as encoding something.** Standard box plots use equal widths; varying widths to encode N (as in "notched" or "variable-width" variants) is a legitimate extension only if labeled clearly. Unlabeled width variation is deceptive.

## See also

- [`histogram.md`](histogram.md) — for single distribution shape; complements box plots when both comparison and shape matter
- [`dot-plot.md`](dot-plot.md) — median/value ranking without distribution info, when the shape isn't the question
- [`../00-mental-model.md`](../00-mental-model.md) — the boxplot stat as a composable grammar piece
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — consistent scale and convention across boxes; matched dimensionality
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — muting the box outline; accent-on-gray for the focal group
- [`../encode/small-multiples.md`](../encode/small-multiples.md) — faceting when group count exceeds a single panel (when added)
