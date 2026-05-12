---
name: encode-color
description: Produce dashboard.palette (principles): earn-its-place test, accent-on-gray, palette families, dashboard-wide consistency, colorblindness.
governs: dashboard.palette (principles)
---

# Color — principles

Color is the most misused visual channel and the most powerful when used sparingly. This file governs the *decisions*: whether to use color, what it means, how to keep it accessible and consistent. For the *choices* — which ColorBrewer palette, what hex values, what to default each chart component to — load [`color-palettes.md`](color-palettes.md).

## The first question: should color encode anything at all?

Default to *no*. Render the chart in grayscale first; add color only where it earns its place.

Color earns its place when it does one of three things:

1. **Highlights particular data** — one element draws the eye against a muted background.
2. **Groups items** — a categorical variable maps to hue so the reader can see the groups.
3. **Encodes quantitative values** — magnitude maps to lightness on a sequential or diverging scale.

Color that does none of the above is decoration. Delete it.

> "Whenever you're tempted to add color to a data display, ask yourself these questions: 'What purpose will this color serve?' and 'Will it serve this purpose effectively?'"

## Color-in-context (what surrounds the color matters)

The eye perceives color relative to its surroundings, not absolutely. The same gray square looks darker on a light background and lighter on a dark one. Two practical rules follow:

- **Keep backgrounds consistent.** Same-colored objects only look the same when the color around them is the same. Avoid background gradients, fills that change under parts of the chart, or decorative panels behind data.
- **Contrast object against background.** Dark text on a dark-red heatmap cell is unreadable; so is a light-blue bar on a pale-blue panel. If you use color-filled cells (heatmaps, conditional-formatted tables), switch text to white on dark fills and black on light fills.

## Accent on gray (the default pattern)

When in doubt, design the whole chart in shades of gray and add **one** accent color for the focal data.

- Gray carries everything that's context.
- Accent color carries the message.
- The more things made different, the less any one thing stands out — limit the accent to ≤10% of the chart's ink.

This is the single highest-leverage pattern. Apply to:

- **Top-N bar charts** — accent the top bar(s), gray the rest.
- **Multi-line charts** — accent the focal series, gray the others.
- **Dashboards** — gray everywhere; one consistent accent color for the highlighted story across all charts.

The accent should not rely on red-vs-green perception. A safe default is blue on gray; orange on gray is the next choice.

## The three palette families (overview)

Pick one family per variable. Don't mix. Details and concrete palette names in [`color-palettes.md`](color-palettes.md).

- **Sequential** — for ordered data with a single direction (small → large). Single hue, lightness ramp. Use for heatmaps, shaded maps, sequential points.
- **Diverging** — for ordered data with a meaningful midpoint (positive vs. negative, above vs. below target). Two hues, each ramping from a neutral center. Use for variance-from-plan, deviation charts.
- **Categorical (qualitative)** — for nominal groups with no inherent order. Distinct hues, similar lightness. Use when variables are truly unordered categories.

Hard rules:

- **Sequential data gets a sequential palette.** Never use categorical color for ordered quantities — it destroys the perceptual cue of "more color = more value".
- **Lightness, not hue, encodes magnitude**. Hue is free to be chosen for aesthetics or colorblind safety.
- **Avoid rainbow / jet palettes for sequential data.** They're perceptually nonuniform (equal data steps don't look equal) and colorblind-hostile.

## Consistency across a dashboard

If two charts on the same dashboard both use color, the same variable must get the same color everywhere.

- Region A is blue in chart 1 → blue in chart 2, 3, 4.
- Positive variance is blue everywhere; negative is orange everywhere.
- The dashboard's accent color is the same hue across every chart that highlights the focal story.

Inconsistent color across a dashboard forces the reader to re-learn the legend on every chart. That's cognitive load for no payoff.

**Resolve the palette once, at dashboard scope, before any chart is rendered.** Define the mapping from each series name (or semantic role — "positive variance", "focal", "Cursor", "EMEA") to a specific hex value, and hold it fixed for every chart on that dashboard. Chart-specific recipes (`charts/line.md`, `charts/bar.md`, etc.) assign color **by consulting that resolved mapping** — they do not invent hues at render time. The common failure mode is a generator that picks colors per chart ("Cursor is blue here, green over there because that chart seemed to need a different palette") — the reader has to re-learn the mapping on every chart. Chart recipes should explicitly remind the generator to check the dashboard-scope palette before assigning color.

When the palette is composed from more than one source (ColorBrewer + Okabe-Ito + brand hex; common for compound encodings — see [`color-palettes.md`](color-palettes.md) *Compound palettes*), the same resolve-once rule applies **per role, not per source**. Each semantic role resolves to exactly one hex, and the source choice for that role is a recorded dashboard-scope decision, not an implicit per-chart fallback. A role that silently pulls `#E69F00` (Okabe-Ito) on one chart and `#FE9929` (ColorBrewer YlOrBr) on another — both plausible ambers — is the same failure as picking colors per chart: the reader feels the drift without being able to name it. The palette artifact should carry `{role → hex, source}` tuples, and the coherence audit in [`color-palettes.md`](color-palettes.md) operates on that artifact.

## A categorical flag on a sequential-fill chart needs a strong channel, not just the axis label

A related failure that is not about hue collision but about channel strength: a chart encodes its primary data with sequential color (heatmap cells, conditional-formatted pivot, choropleth region fills), AND the generator marks a subset of rows/columns/entities as "flagged" using an accent hue. The natural place to put the flag is the axis label — recolor the flagged department's label orange. The result is that the cell fills are central, high-saturation, and large; the axis labels are peripheral, low-saturation, and small. The cells shout, the labels whisper. The flag is invisible in the squint test.

This is not fixed by color discipline (the orange label is a legitimate accent hue) or by the one-hue-one-meaning rule (orange means exactly one thing — "flagged"). It's a **channel mismatch**: a categorical flag that must hold its own against a high-saturation quantitative encoding needs a channel with comparable perceptual weight:

- **Row/column outline in the plot area** — an accent-color stroke around the flagged row, drawn *in* the plot (graphic overlay, not axis decoration). Strongest; survives any cell fill.
- **Edge bar / gutter tint outside the axis labels** — a thin accent-color strip immediately inside or outside the label column, spanning the flagged row's full height. Gestalt enclosure.
- **Small accent marker (●, ▶, filled triangle) adjacent to the label** — shape + color, redundant encoding, survives grayscale.
- **Pale accent-color fill behind the label text** (extending the label band past the cells) — raises the label's visual weight into the cells' neighborhood.

Axis-label text color alone is weaker than any of these. Use it as *reinforcement* on top of one of the above, not as the signal.

Governance: this applies any time the chart's primary encoding is a quantitative fill (heatmap, conditional-formatted pivot, choropleth) and the flag is a categorical overlay. See [`../charts/heatmap.md`](../charts/heatmap.md) *Marking flagged rows or columns* for the heatmap-specific application and the squint-test check. Also applies to the vertical-logic rule in [`../dashboard/narrative.md`](../dashboard/narrative.md) — if the subtitle promises "orange box marks X," the plot must actually render a box, not just orange axis labels.

## One hue, one meaning per dashboard

The dashboard-consistency rule above ("same series → same color") has a counterpart: **each hue carries exactly one meaning on a given dashboard.** Hues acquire role bindings as the palette resolves — "Cursor = blue", "Claude Code = orange", "positive direction = blue", "negative direction = orange" are all role bindings. A hue bound to two roles reads ambiguously: the reader can't tell which meaning the color is carrying in any given instance.

The most common collision: the dashboard uses blue and orange as the **categorical** palette for two data series, AND also reaches for "blue = positive / orange = negative" for **favourability** — the colorblind-safer substitute for green/red recommended under *Semantic conventions* below. Both uses are defensible in isolation; together on one dashboard they conflict. A blue `+12%` delta on a tile titled *Weekly active · Cursor* now means either "this is about Cursor" or "this moved up", and the reader can't tell which.

When a semantic-role hue would collide with a categorical hue on the same dashboard, **fall back to neutral grey and carry the role with a non-color channel** — a direction glyph (↑ ↓ or + −) for favourability, a bold weight for focal, a reference-line shape for target. The glyph/shape carries the role; the color carries only the series identity. See [`../charts/single-value.md`](../charts/single-value.md) for the KPI-tile application.

The inverse collision also applies: don't reuse the dashboard's accent hue to mean "focal series" on chart A and "exceeds target" on chart B. Each hue, one role — resolve the conflict at palette-resolution time, not at render time.

**Verification step — and what counts as "fixed".** After every revision, re-walk the resolved palette: each hex must map to exactly one role across all tiles. **Reducing the *count* of bars accented in a colliding hue does not resolve the collision** — a single bar painted Cursor-blue still binds blue to two roles. The fix is one of: (a) repaint the colliding role in a non-categorical hue (neutral grey, the dashboard's reserved accent); (b) carry the role with a non-color channel (glyph, weight, shape) and let the hue go back to its original role; (c) restructure the chart so the second role isn't needed. A revision that touches only the count and not the hue leaves the rule violated.

## Palette is consumed, not just resolved

Resolving the palette ("Cursor = `#3182BD`") is only half the job. Most rendering libraries expose **multiple color slots per series** — stroke color for lines, fill color for bars, item color for markers and legend swatches, tooltip indicator color, emphasis/hover color, endLabel color. Setting one slot doesn't set the others; the remaining slots fall back to the library's default palette and render in colors you didn't choose.

Consequences for the generator:

- When assigning a series' color, apply the resolved palette value to **every slot the library exposes for that series** — not just the most obvious one (the line stroke, the bar fill).
- Audit interactive and secondary renderings — tooltip indicators, legend swatches, endpoint labels, hover states — against the resolved palette. If any render in a color other than the resolved hue, a slot was missed.
- The "series→color" mapping is a dashboard-scope commitment; library slot-plumbing is implementation of that commitment, not an independent decision per slot.

Typical failure mode: a line chart where `lineStyle.color` is set to the palette blue but `itemStyle.color` is unset — the line is blue, the legend swatch and tooltip indicator are default-palette purple. Same series, three colors.

## Text on quantitative fills

Heatmaps, choropleths, conditional-formatted pivot cells, treemap fills — anywhere text sits inside a quantitative-color cell — text readability against the cell fill is a *consumed-not-declared* concern. The dashboard implicitly declares "labels readable"; the library defaults to a single static text color across the series; the darkest cells render dark-on-dark (or the lightest cells pale-on-pale) and labels become illegible. Same shape as the palette / typography / layout family in [`../03-composition.md`](../03-composition.md) verification step.

The fix is fully deterministic at design time — no render needed:

1. **Compute WCAG contrast** between text color and each fill hex: `ratio = (L_lighter + 0.05) / (L_darker + 0.05)`, where `L` is relative luminance from sRGB. Threshold: 4.5:1 for normal text, 3:1 for large or bold (≥18pt or ≥14pt bold). APCA `Lc` is a more modern alternative with the same shape; either works.
2. **Flip text color when contrast falls below threshold** to the inverse extreme — white text on dark fills, dark text on light fills. The dashboard usually has one "dark text" hex (e.g., `#252525`) and one "light text" hex (`#FFFFFF` or near-white); the flip selects between those two.
3. **Precompute the crossover once per palette + text-color pair.** For a sequential ramp like `Blues[5]` against `#252525` text, contrast against the ramp drops below 4.5:1 between `#6BAED6` and `#3182BD` — every cell whose fill index sits at or past `#3182BD` gets white text. Cache the crossover index; apply per-cell at spec time. Diverging palettes like `RdBu` need the check at *both* extremes — the darkest red and the darkest blue both fail dark text.
4. **Library plumbing.** ECharts per-cell `series.data[i].label.color`; Plotly heatmap annotation-per-cell `font.color`; D3 bind text color via the same data join as the cell fill. Defaults are usually one label color across the series — overriding requires per-cell text-color arrays computed at spec time, alongside the per-cell fills.

**Verification step.** Once the dashboard is rendered, walk every cell-labeled fill (heatmap cells, choropleth regions, conditional-formatted pivot cells, treemap labels) and confirm WCAG ≥4.5:1 between the rendered text color and the rendered cell fill. The failure is silent — the library renders dark-on-dark cells without warning — so the audit must look at actual cell colors, not at the spec's intent. Inputs are the resolved sequential ramp + the resolved text-color hex; the check fires per cell. This step is also the canonical home for the contrast check listed in [`../03-composition.md`](../03-composition.md) verification step and runs alongside the *Palette coherence audit* in [`color-palettes.md`](color-palettes.md).

## Semantic conventions

These read fast because readers already know them. Use, with caveats.

- **Green = good, red = bad.** Common in Western business contexts. But red/green is the biggest colorblindness pitfall. Either:
  - Pair with shape or icon (up-arrow + green, down-arrow + red), or
  - Use **blue / orange** (or **blue / red**) instead, which encodes the same polarity without the accessibility penalty.
- **Amber / yellow = warning.** Works as a middle state in sequential or diverging scales.
- **Black = total, highlighted, or most important.** Often stronger than any color for "look here".

Cultural conventions vary (red is prosperity in China, mourning in South Africa). For international audiences, prefer blue/orange + iconography.

## Colorblindness

~10% of males and ~1% of females have abnormal color vision; the vast majority cannot distinguish red and green.

- **Never encode critical data with color alone.** Pair with shape, position, pattern, or label.
- **Avoid red + green as the sole distinction.** If forced, supplement with lightness difference (dark red vs. light green) and redundant encoding (shape, +/- signs).
- **Safe two-color pairings:** blue + orange, blue + red (recommended substitute for red/green in heatmaps), purple + yellow. All survive common colorblind transformations.
- **Test your palette** with a color-blindness simulator before shipping. Many ColorBrewer palettes are explicitly marked colorblind-safe on [colorbrewer2.org](https://colorbrewer2.org); use that as a filter.
- **Lightness contrast** (figure against background) matters more than hue for legibility.
- **The problem is broader than red/green.** Under strong CVD, red + green + brown + orange can all collapse to brown; blue and purple can collapse to blue. The stronger form of the rule: don't use red, green, brown, and orange in the same encoding.

## When red/green is mandated

Sometimes you can't avoid red/green. Client demands it. Corporate style guide locks it in. Domain uses stoplight conventions (SLA, traffic, Mali flag). Subject matter is the thing itself (ecology). The default advice — "use blue/orange instead" — collides with the constraint.

Six workarounds in order of cheapness. Each assumes red/green is fixed and asks "how do we make the chart still work?"

1. **Is color the only encoding?** If the data's primary channel is bar length, position, or text, red vs. green confusion is less damaging — the reader can still read the magnitudes. Color confusion is only harmful when color *alone* carries the distinction (a red/green-only heatmap; a green-up-arrow vs. red-down-arrow where the arrow glyph is absent). If the chart has a strong non-color channel, you can ship red/green with eyes open. This is a check, not a fix; but it may be all you need.

2. **Add redundant non-color encoding.** Arrows (▲/▼), icons, text labels, shape. A `+3.0 pp` delta rendered as `+3.0 pp ▲` in green survives CVD because the glyph carries the signal even when the hue collapses. This is the workhorse — cheap, generalizes to anything, keeps the client's color intact.

3. **Provide a reader-configurable palette swap.** Default to red/green (satisfies the client); expose a "colorblind-friendly" toggle that swaps to blue/orange. Persist the choice per-user. Works well on interactive dashboards serving a mixed audience where any single palette is no-win.

4. **Use light/dark contrast between the hues.** CVD confuses *hue*, not *lightness*. A very light green + medium yellow + very dark red remain distinguishable under simulation because the lightness ramp is preserved (dark/medium/light), even if the hues collapse to "three shades of brown." Works for categorical palettes only; diverging palettes already use lightness and can't stack the trick.

5. **Leverage blue inside the green.** Shift pure green (#0D9E49) toward a bluish-green (#83C79B). Blue channels survive CVD intact, so the bluish-green gains distinguishability from red. Works when the client will accept "green-ish" as satisfying their brief — you're staying within the spirit of the convention while quietly fixing the accessibility problem.

6. **Swap the whole palette to a validated colorblind-safe one.** When you have the latitude: Maureen Stone's Tableau palette, Okabe-Ito. Blue and orange as the primary pair, gray and black for accents. See [`color-palettes.md`](color-palettes.md).

### Verify before shipping

Simulate the palette under protanopia and deuteranopia at minimum — the two common forms, which together affect ~8% of males. Tritanopia is rare (<0.5%) but cheap to check as a third pass. Free simulators exist as browser extensions and as built-in features of major design software.

## Lightness > hue for quantitative encoding

When encoding magnitude with color, variation in lightness is read as "more / less" more reliably than variation in hue.

- Sequential: one hue, lightness light → dark.
- Diverging: two hues, each ramping from the neutral center's lightness to dark at the extremes.
- Heatmaps: lightness is doing the quantitative work; hue is window dressing.

This is why rainbow palettes fail for sequential data: the hue-cycle doesn't map to a lightness ramp, so equal data steps look unequal.

## Small vs. large objects

Color perception depends on the size of the colored region:

- **Small objects** (thin lines, small points, small text) need **darker, more saturated** colors to remain visible. Line charts usually want bold/dark hues.
- **Large objects** (bar fills, background shading, filled areas) need **lighter, less saturated** colors so they don't overwhelm the data. Bar fills want medium hues, not fully-saturated primaries.
- **Non-data elements** (axes, gridlines, borders) want **light pale grays** — visible enough to function, quiet enough not to compete with data.

Maintain three standard palettes per brand — bright/dark, medium, light/pale — each for a specific purpose. See [`color-palettes.md`](color-palettes.md) for the concrete workflow.

## ≤4 hues per chart

Hard ceiling on distinct hues in a single chart, justified by working memory holding ~3–4 chunks.

- A chart with 10 categories in 10 colors forces the reader to refer to the legend constantly.
- Alternatives: (a) highlight one or two with accent, gray the rest; (b) facet into small multiples; (c) aggregate to ≤4 groups; (d) use a sequential lightness ramp if the categories are actually ordered.

## Nine rules (compact checklist)

Compact checklist of color rules:

1. Keep backgrounds consistent so same-colored objects look the same.
2. Use a background color that contrasts sufficiently with the objects.
3. Use color only when it serves a particular communication goal.
4. Use different colors only when they correspond to differences of meaning in the data.
5. Use soft/natural colors for most information; bright/dark colors to highlight.
6. For sequential quantitative values, stick with a single hue (or a small set of closely related hues) and vary intensity.
7. Non-data components should be displayed just visibly enough to perform their role — no more.
8. Avoid red + green in the same display for colorblind viewers.
9. Avoid visual effects in graphs (3D, shadows, glow, gradients).

## Common violations to catch

- Every line in a multi-line chart a different hue, none muted → spaghetti chart.
- Rainbow palette on a heatmap → perceptually nonuniform.
- Red/green as the only distinction between positive and negative → colorblind-hostile.
- Same hue used for two different variables across charts on the same dashboard → reader has to re-learn the legend.
- Bar chart in 6 fully-saturated primaries → vibrates, no focal point.
- Color used purely for decoration → chartjunk.
- Sequential encoding using hue alone, no lightness ramp → reads as categorical.
- Background gradient behind a chart → same bars appear different depending on their position.
- Categorical flag (orange axis labels on flagged departments) sitting on top of a high-saturation sequential-fill chart → the flag disappears next to the cell colors. Needs an in-plot channel (row outline, edge bar), not just label color. See *A categorical flag on a sequential-fill chart* above.

## Quick decisions

- **Should I use color?** Only if it highlights, groups, or encodes quantity. Otherwise: grayscale.
- **One focal element among many?** Accent-on-gray with a single hue.
- **Ordered magnitude?** Sequential lightness ramp. See [`color-palettes.md`](color-palettes.md).
- **Positive vs. negative with a midpoint?** Diverging palette, blue/red or blue/orange.
- **Unordered categories (≤4)?** Qualitative palette, similar lightness.
- **Unordered categories (>4)?** Reduce to ≤4 or facet — don't hand out more colors.
- **Dashboard with multiple charts?** One accent hue used consistently; context in gray.

## See also

- [`color-palettes.md`](color-palettes.md) — concrete palette choices (ColorBrewer names, hex defaults, per-component colors)
- [`visual-channels.md`](visual-channels.md) — why lightness > hue for magnitude
- [`../craft/emphasis.md`](../craft/emphasis.md) — accent color as an attention tool
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — color as decoration is chartjunk
- [`../dashboard/consistency.md`](../dashboard/consistency.md) — dashboard-wide palette consistency
- [`../00-mental-model.md`](../00-mental-model.md) — perceptual hierarchy behind color's ranking
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — why proportionality wins and rainbow/3D loses
