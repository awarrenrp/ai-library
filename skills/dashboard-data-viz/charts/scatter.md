---
name: scatter
description: Produce chart.geom (scatter) — two continuous variables plotted as points (correlation, outlier detection).
governs: chart.geom (scatter)
consumes: dashboard.palette
---

# Scatter

Scatter is the strongest-perceiving chart in the palette: both axes encode values as position on a common scale, which sits at the top of the perceptual hierarchy. When the question is "do these two continuous variables relate?" or "where are the outliers in a two-dimensional space?", scatter is the right tool. Unlike donut / funnel / gauge, the literature endorses scatter — this recipe is about rendering it well, not about talking the user out of it. The real risks are overplotting (points pile up and hide density), aspect ratio (the chart shape can exaggerate or flatten correlation), and third-variable encoding that pushes the chart beyond its carrying capacity.

## When to use

- **Investigating correlation** between two continuous variables — "does marketing spend correlate with signups?", "price vs. rating", "tenure vs. salary".
- **Identifying outliers** in a two-dimensional space — "which customers are high-spend but low-retention?".
- **Showing a distribution** across two dimensions (density of orders by size × fulfillment time).
- **Quadrant analysis** where the chart divides into meaningful regions by two thresholds (e.g., "win rate vs. deal size" with quadrants for each combination).
- A **third quantitative variable** can be layered on color or size when the scatter is sparse enough to preserve the primary points — but push beyond that and facet instead.

## When NOT to use (and alternatives in the palette)

- **One variable is categorical.** Use `bar` (categorical vs. continuous), or a strip plot / dot plot if you want to show individual observations within categories.
- **One variable is time**, and the question is "how has this changed?". Use `line`. Scatter across time hides continuity and invites the reader to see patterns that a connected line would make obvious.
- **Two aggregate values per category** (like revenue vs. profit for 10 regions). A labeled scatter works, but for 10 or fewer points a `pivot-table` with both columns is more precise.
- **Three+ quantitative aesthetics on one chart.** 2D position + size + color + shape saturates the viewer; facet instead (small multiples), or split into two scatters.
- **Heavy overplotting** with thousands of points piling up. Use a heatmap or a density plot; as a fallback, bin the data and render with `pivot-table` conditional formatting, or use alpha-blending (see rules below).

## Rules (how to render a scatter well)

### Aspect ratio

- **Render roughly square** (1:1) unless the data demands otherwise. This is the one major exception to's 1.5:1-wide default — for scatter, a square aspect ratio treats both axes equally and prevents the visual from overstating one variable at the expense of the other.
- Do not stretch to fill a wide panel; center a square plot and use the surplus width for annotations, a small marginal distribution, or a caption.
- A rectangular scatter is not a fatal error, but the chart's perceived correlation slope will warp with the aspect ratio. If you must render wide, state it in the caption and avoid reading a slope into the result.

### Axes and scales

- **Zero baselines are not required.** Scatter encodes via position, not length. Letting the axes fit the data range tightly — with a modest margin — is usually right.
- **Do not zoom so tightly that noise looks like signal.** A pair of variables that range from 0.95 to 1.05 rendered as a full-panel plot exaggerates minor variation. Pick axis limits that give a truthful sense of the data's spread.
- **Log scale both axes** when the variables span multiple orders of magnitude (e.g., revenue across companies from $10K to $10B). Label the axes as log clearly.
- **Unit labels** on both axes (`$`, `%`, `ms`, `per 1,000`).
- Use a light gridline at each major tick to aid reading 2D positions.

### Points and overplotting

Overplotting is scatter's most common failure. Several points stacked on the same coordinates render as a single point, hiding density. Apply **at least one** of these when point count rises:

- **Alpha / transparency.** Render each point at ~30–60% opacity so stacked points darken naturally. Dense regions read as darker, sparse regions as lighter.
- **Jittering.** For pairs where one axis is discrete-like (e.g., rating 1–5 vs. price), add a small random offset to the discrete axis so stacked points spread into a readable cloud. Document the jitter in the caption so the reader doesn't misread exact positions.
- **Density contours** layered behind the points for very dense scatters (thousands of points).
- **Smaller point size** (2–4 px) in dense regions, slightly larger (4–6 px) in sparse cases.
- **Bin and heatmap** when density is the real message — switch chart types rather than fighting the scatter.

If the point count exceeds ~2,000 and none of the above are applied, the chart is likely lying about density. Pick one.

### Trend lines

- **Add a trend line** (linear regression or loess smoother) when the overall relationship is the message and the user will read direction/strength from it.
- **Do not add a trend line** when the story is the outliers, a subgroup difference, or "no relationship". A trend line forced onto noise invites over-interpretation.
- Render the trend line in a muted color distinct from the points (e.g., soft blue line over gray points) and label it (`linear fit: y = 0.34x + 2.1, R² = 0.18`) so the reader knows what's overlaid.
- **Never extrapolate the trend line beyond the data range.** Clip to the observed x-range.
- Do not use a high-order polynomial that overfits the scatter to "make the curve look nice." Stick to linear or a loess with a large enough span that it doesn't chase individual points.

### Labels and annotations

- **Axis labels with units** on both axes.
- **Direct-label important outliers** — the single customer driving the anomaly, the data point that changes the story. Do not label every point.
- **Annotate the story** in plain text near the relevant region ("upper-right quadrant: 5 customers, $4.2M combined ARR"). Scatter is the chart type where annotation does the most work — the points are pre-attentive, but "what do I make of it?" is the sentence the annotation carries.
- **Quadrant lines** for quadrant analysis, drawn in a lighter shade than the data, with each quadrant labeled at a corner (`high value · low effort`, etc.).
- **Reference lines** for thresholds (target, SLA, median) drawn as dashed light lines with a short inline label.

### Third variable (color, size, shape)

Scatter invites layering a third variable. Each addition costs precision, so lift them in order:

- **Color by a categorical variable** (e.g., segment, cohort). Use up to 3–4 distinct hues. Direct-label the groups at a representative point rather than with a legend, or include a compact legend near the top-right.
- **Color by a continuous variable.** Use a sequential color ramp (lightness variation on a single hue) — not a rainbow. Rainbow palettes are not perceptually ordered; the reader cannot rank by color. Include a color-bar legend.
- **Size (bubble) by a third quantitative variable.** Bubble scales must be done by **area** (the visual size), not by radius. If radius is scaled by the value, a 2× value looks 4× larger — a dimensionality / lie-factor violation. See bubble.md for the full treatment. Use bubble only when (a) precise reading of the third variable is not required, and (b) the scatter is sparse enough that bubbles don't overlap catastrophically.
- **Shape** for a small categorical variable (≤4 levels) when color is already taken. Shape is a weaker channel than color; prefer faceting for strong distinctions.

Cap at **2 aesthetics beyond x and y**. If a fourth variable matters, facet into small multiples, not another channel.

## Palette alternatives to suggest

Scatter is usually the right tool for correlation — the palette alternatives are narrow:

- **`line`** when one axis is time and continuity matters.
- **`pivot-table`** when the point count is small (≤20) and precise values matter more than the shape.
- **`horizontal-bar`** when one of the variables turns out to be categorical-like (e.g., 10 discrete segments).
- **`combination`** (line + bar) when one variable is an aggregate total and the other is a derived rate — but resist the dual-axis temptation; it invites causal misreading.

No "don't ship this" steer for scatter under normal conditions. The only time to redirect is when the data is not actually two continuous variables.

## Anti-patterns

- **Rainbow color** for a continuous third variable. Perceptually unordered; the reader cannot rank by hue. Use sequential lightness on a single hue.
- **3D scatter.** Depth perception on a 2D screen is illusory; points in the "back" appear smaller and higher, distorting apparent position. Integrity violation.
- **Bubble size by radius** instead of area. Quadratic exaggeration of the third variable.
- **Decorative background images** or colored plot-area fills. Chartjunk; compete with points.
- **Trend line extrapolated past the data range.** Implies prediction where you have none.
- **High-order polynomial "fit"** that snakes through every point. Overfitting disguised as insight.
- **Labeling every point** in a 500-point scatter. Direct-label outliers only.
- **Wide or tall aspect ratio** used to exaggerate a slope. "This variable is exploding" when you stretched the chart 3:1.
- **Rendering thousands of points opaque** — the density signal is lost in a solid blob. Use alpha, bin, or heatmap.
- **Uncritical "correlation is causation"** annotation. State the observed relationship, not the inferred cause.
- **R² reported without sample size or data range.** An R² of 0.78 on 5 points is not the same as on 5,000. Report n alongside any goodness-of-fit.
- **Categorical axis rendered as if continuous** — e.g., customer tier encoded as 1/2/3 and placed on a numeric x-axis, with the trend line implying a per-unit-tier slope that doesn't exist. Use box plots, strip plots, or a bar chart.

## Common failures to catch

- Overplotting hiding a bimodal distribution — the cloud looks like a single cluster at first glance; alpha blending or density contours reveal two.
- Outliers pulling the trend line but not labeled, so the reader sees a correlation that's one-datum-wide.
- Units missing from the axes, so the reader has to infer whether x is dollars or thousands.
- The third variable (size or color) carrying the actual story but rendered so subtly that the reader reads only the x-y pattern.
- A square aspect ratio enforced at a size too small to resolve the points — render at least 320 px square.
- Trend line color matching a focal point's color, creating confusion about which is data and which is overlay.
- Axis range that includes a distant outlier, compressing the main cloud into a corner. Clip the outlier with a labeled annotation or split into an inset.

## Worked example

Request: "Is there a relationship between account tenure (months) and annual recurring revenue (ARR, $K) across our 400 accounts? Flag outliers."

- Two continuous variables, ~400 points — a classic scatter use case.
- Render 380 px square (1:1 aspect ratio) so neither axis is visually emphasized.
- X-axis: `tenure (months)`, linear scale 0–60. Y-axis: `ARR ($K)`, log scale — ARR spans from $2K to $900K, multiple orders of magnitude.
- Points at ~50% opacity to reveal density in the main cluster without losing outliers.
- Loess smoother (not linear, because the data plateaus after month ~24) as a muted blue line over gray points. Annotate: `loess · ARR plateaus after 2 years`.
- Label the 4 outliers in the upper-right (accounts with short tenure but high ARR, likely enterprise land-and-expand) with their account names and a short callout: `4 enterprise logos drive the upper-right cluster`.
- Unit labels on both axes; light horizontal gridlines only; no chart border.
- Subtitle: `Account tenure vs. ARR · n=412 · as of 2026-04-19`.

Counter-example: the user wanted to see how average ARR changes month-over-month for the full portfolio. That's a `line` chart of aggregate-over-time, not a scatter of account-level observations.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — dimensionality, area-vs-radius, lie factor for bubbles
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — correlation routing
- [`../encode/color.md`](../encode/color.md) — sequential vs. categorical color for the third variable
- [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md) — log scales when variables span orders of magnitude
- [`../craft/annotations.md`](../craft/annotations.md) — labeling outliers and the quadrant story
- `bubble.md` — scatter with a third variable encoded as point area
