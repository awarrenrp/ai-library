---
name: chart-dot-plot
description: Produce chart.geom (dot-plot) — ranking where differences are subtle and a non-zero baseline is honest.
governs: chart.geom (dot-plot)
consumes: dashboard.palette, dashboard.category-order
---

# Dot plot

A dot plot shows one dot per category, positioned on a quantitative axis. It is the preferred form for nominal comparison and ranking **whenever the zero baseline would waste most of the plot** — when the values live in a narrow band far from zero, a bar chart starting at zero crushes all the interesting variation into bars that look nearly identical. Because position (not length) encodes the value, non-zero baselines are not an integrity violation: the reader judges by where the dot sits on the axis, not how long a mark extends from a baseline.

In the grammar: `stat=identity + geom=point` with a categorical y-axis (or x-axis) and a continuous position axis. The same data that would produce a bar chart with `geom=bar` produces a dot plot with `geom=point` — a geom swap that preserves the mapping.

## When to use

- **Ranking or nominal comparison with subtle differences** that a zero-baseline bar chart would flatten. Classic Few example: response times across APIs — 120ms, 122ms, 118ms, 125ms. A bar chart at zero-baseline makes all four bars look the same height. A dot plot with the axis starting at 115ms shows the differences crisply.
- **Any ranking where the data lives far from zero.** Test scores bunched in 85–95, tenure of 4–6 years, net promoter scores of 30–60. The interesting action is in the top portion of the scale; a zero baseline wastes 85% of the plot area.
- **When you'd want a bar chart but the values are close to each other.** The dot plot is the bar chart's proper substitute in this regime — not a truncated-baseline bar (which lies).
- **Alongside reference lines** — target, mean, prior period, industry benchmark. Vertical rules through the dots make deviation from reference obvious.
- **Cleveland dot plots for many categories.** With horizontal orientation, a dot plot comfortably handles 15–30 categories on one chart — more than a bar chart at the same height, because dots are much smaller than bars.
- **Deviation plots.** A dot plot of "actual − target" per category, with a zero reference line, shows variance cleanly without the optical drama of gain/loss bars.

## When NOT to use

- **When the values include or meaningfully approach zero.** If zero is in the natural range of the data, a bar chart is at least as good and more familiar. The dot plot's strength is non-zero baselines.
- **For time series.** Floating points without a connecting line lose the continuity of time. Use a line chart. A dot plot on a time axis invites the viewer to connect the dots in their head, which is what a line chart does honestly.
- **For part-to-whole.** A dot plot doesn't encode shares or composition — use bars or a stacked form.
- **When the audience expects a bar chart** and the values start at zero anyway. No upside to the form swap; you're just asking the audience to learn a new convention for no payoff.
- **When there are fewer than ~4 categories.** Too sparse; a bar chart or even a single-value pair carries the same information more obviously.

## Rules

### Non-zero baseline is OK — position encodes value

The central rule that makes dot plots useful. The x-axis (or y-axis for vertical dot plots) can start well above zero because the reader judges the **position** of each dot, not the **length** of a mark from a baseline. This is the single legitimate exit from the "bar charts must start at zero" rule — a dot plot is what you use when zero starts the axis, not where the data lives.

- **Pick the axis range to give the data room to vary.** A rough rule: the data range should occupy 60–80% of the axis span, with a small buffer on each side.
- **Don't over-zoom.** Cropping the axis so that a 1% variation fills the plot magnifies noise into signal. The axis range should still pass an honest-scale gut check.
- **State the axis range clearly.** Because the non-zero start breaks a convention the audience has internalized from bar charts, label it explicitly — "Response time (ms), axis starts at 115ms" — and annotate if the start point is arbitrary vs. meaningful.

### Sort, always

- **Sort by value** unless a natural order exists (chronological, ordinal, convention).
- **Descending for ranking "who's best"**, ascending for "who's worst." The focal end of the ranking goes at the top when the plot is horizontal.
- **Consistent sort across related dot plots.** If a dashboard has three dot plots for the same set of categories, sort them all by the same key (or by the primary chart's order) so the viewer can track categories across plots.

### Color and emphasis

- **Single accent color, everything else gray.** This is the accent-on-gray pattern. Color one or two focal dots to make them pop; render the rest in a muted gray.
- **Do not color every dot differently.** That's rainbow land — nothing stands out.
- **Color-encode a second variable carefully.** If color is encoding (say) region alongside a value on x, use a categorical palette of 3–4 hues max, and keep saturation subtle. Don't layer size, shape, and color simultaneously.
- **Shape variation** (open vs. filled dot, circle vs. square) can distinguish categories of categories — e.g., "current reps" as filled dots, "new reps" as open dots — without relying on color.

### Reference lines

One of the dot plot's strongest features is the ease of overlaying reference marks:

- **Mean / median / target** as a vertical rule. Label the line directly ("Target: 200ms") rather than with a legend.
- **Prior-period dot** — a smaller, grayer dot per category at the prior value, connected to the current value by a thin line. This turns the dot plot into a mini-slopegraph per row and makes change readable at a glance.
- **Tolerance band / acceptable range** — a light-shaded vertical band behind the dots.

### Layout

- **Horizontal orientation (categorical axis on y) is usually the right default.** Long category labels read naturally left-to-right; many categories fit in a tall narrow chart.
- **Small dots, not large ones.** The dot is a position marker, not a visual weight. Large dots imply area encoding.
- **Light horizontal gridlines** at round values are appropriate here — unlike a bar chart, a dot plot benefits from visual alignment cues because there's no bar edge to read against.
- **Axis labels, units, and data source** are standard integrity apparatus.

### Dot plot variants worth naming

- **Cleveland dot plot** — the classic ranked single-axis form.
- **Paired dot plot (dumbbell plot)** — two dots per category (e.g., before vs. after) connected by a line segment. Reads as a per-row slopegraph. Useful when comparing two time points across many categories if a slopegraph would be too crowded.
- **Range dot plot** — dot at the median with a line to min/max or to Q1/Q3. A degenerate box plot, but useful when precise quartiles aren't needed.

## Simpler alternatives

A bar chart with a zero baseline is what dot plots exist to improve on — so there's no clean substitute when the zero-baseline regime is exactly the problem. Options when you must avoid the dot plot form anyway:

1. **`horizontal-bar` with zero baseline** — the honest but less readable alternative. Bars will look nearly identical because the subtle differences are a small fraction of the total bar length. Add data labels on each bar so the reader can still recover the values from the numbers. This is more readable than a truncated-baseline bar (which is dishonest) but visually duller than a real dot plot.
2. **`pivot-table` of category and value, sorted by value, with conditional formatting.** Precision wins; loses visual ranking speed. For small N (≤20 rows) and when the user cares about exact numbers, this may be the best fallback.
3. **`single-value` with a delta** when there are only one or two focal categories. "API X: 122ms (+2ms vs. baseline 120ms)" captures the subtle-comparison case without any chart at all.
4. **`scatter` with a constant categorical x-axis** — one point per category at y = value, forced onto a quantitative y-axis. This is a dot plot in disguise, but the tool treats it as a scatter. Works if the scatter primitive allows categorical x.
5. **`combination`** with a bar and an overlaid reference line — acceptable when the user wants bar-like familiarity with a target line; still constrained to zero baseline.

Do not use a **truncated-baseline bar chart** as a fallback. That's the pattern dot plots exist to replace, and truncation is a graphical integrity violation. If zero baseline makes the bar chart unreadable, the correct move is a dot plot (when available) or a table (when not) — not a lying bar.

## Anti-patterns

- **Truncated-baseline bar as a "dot plot replacement."** Lying bars are the disease; dot plots are the cure.
- **Using a dot plot for time series.** No continuity; the eye wants a line. Use a line chart instead.
- **Alphabetical ordering.** Kills the ranking story.
- **Oversized dots.** Implies area encoding and crowds adjacent categories.
- **Multiple overlaid dots per category without distinguishing encoding.** Reads as noise. Use a paired/dumbbell dot plot with explicit pairs or facet.
- **Rainbow color per dot.** Nothing stands out; no accent.
- **Zero baseline on a dot plot.** Not wrong, but wastes the entire reason to use the form. If zero is in the data range, switch to a bar chart.
- **Reading the dot as encoding anything other than position.** A "big dot for important categories" mixes position-encoding with size-encoding and confuses the channel.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — the zero-baseline rule and its legitimate escape hatch (dot plot)
- [`../00-mental-model.md`](../00-mental-model.md) — perceptual hierarchy: position is the most accurate channel; a geom swap from bar to point preserves accuracy while freeing the baseline
- [`../craft/emphasis.md`](../craft/emphasis.md) — accent-on-gray, reference lines, direct labels (when added)
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — nominal comparison and ranking question shapes
- [`slopegraph.md`](slopegraph.md) — when two time points are compared, the paired/dumbbell dot plot is a close cousin
- [`box-plot.md`](box-plot.md) — when spread matters alongside the central value
