---
name: map
description: Produce chart.geom (map) — choropleth, proportional-symbol, or flow maps when location is the organizing principle.
governs: chart.geom (map)
consumes: dashboard.palette
---

# Map (geospatial chart)

Maps are the right form when geography is part of the question, not decoration. Three sub-forms cover most business and analytic needs:

- **Choropleth** — regions (countries, states, postcodes) coloured by a metric value.
- **Proportional-symbol** — point markers (typically circles) at locations, sized by a metric value.
- **Flow map** — lines between origin and destination pairs, scaled by flow volume.

Maps are perceptually compelling and politically powerful — readers infer stories from spatial pattern that a bar chart would never imply. That power demands discipline: wrong normalisation, wrong projection, or wrong colour scale can make a map confidently lie.

## When to use

- **Spatial pattern is the question.** Regional demand, territory performance, incident clustering, routing. If "where" matters to the decision, the map is honest.
- **The reader already has a mental model of the geography.** Sales by US state for a US sales team; customer density by EMEA country for a European rollout. For unfamiliar geographies, pair with a bar or table — the map alone will fail readers who can't locate the regions.
- **Choropleth:** a normalised metric varies meaningfully across regions — per-capita income, incidence rate per 100k, conversion rate.
- **Proportional-symbol:** values vary by orders of magnitude and region areas are inconsistent (a tiny but high-value city gets drowned on a choropleth; a bubble over the city pops).
- **Flow map:** origin-destination pairs with a flow magnitude — migration, trade routes, freight, supply-chain lanes.
- **Paired with a ranked bar chart or grid** for precise lookup; the map gives the pattern, the table gives the number.

## Choosing the sub-form

- **Choropleth** when the metric is a rate or density (per-capita, per-area, percentage) and regions are comparable in size and familiarity. Readers intuit "darker = more".
- **Proportional-symbol** when regions vary greatly in size (a dense urban area plus rural hinterland) or when the metric is an absolute count that shouldn't be visually inflated by region area. Small circle on a big empty state doesn't mislead; a dark-shaded big empty state does.
- **Flow map** when origin-destination pairs and flow magnitude matter. Not for regional totals, which are a choropleth/symbol question.
- **Hybrid** (choropleth + symbol) when you have both a rate (colour the region) and a count (symbol on the region): rate of adoption × number of active users. Make the legend bulletproof so readers aren't confused which variable is which.

## When NOT to use

- Geography is incidental — if the story is "product A vs product B", the map is decoration that steals space from the real chart.
- Regions vary so much in area that size-of-region dominates the visual and masks the metric — the classic "big empty states look like the story" failure on US maps.
- Only a handful of regions with no meaningful adjacency — use `bar.md` sorted descending; the map adds nothing.
- The audience doesn't know the geography and there's no drilldown — a named-region bar chart is clearer.
- Precise value comparison across regions is the primary task — colour intensity is a weak quantitative channel. Use the map plus a ranked table.
- The data is a single number per country of which 95% lives in one region — a `bar.md` or `single-value.md` + "rest" is more honest than a map with one dark country.

## Rules

### Choropleth

- **Normalise, almost always.** Raw counts by region encode population and area as much as they encode the metric. A raw-count choropleth of "customers by state" is a population map wearing a disguise. Always render per-capita / per-area / rate-per-10k unless the metric is genuinely absolute and you state it in the title.
- **Sequential palette for monotone metrics**; **diverging palette for metrics with a meaningful midpoint** (over vs under target, growth vs decline). Lightness variation in a single hue is the canonical sequential choice; colourblind-safe palettes (ColorBrewer) are the default.
- **Never categorical/rainbow palettes for a continuous metric.** Hue has no quantitative ordering — the reader cannot read "orange > purple".
- **Bin thoughtfully.** Quantile bins emphasise distribution; equal-interval bins emphasise magnitude. Pick based on the story and state the scheme in the legend.
- **Legend with explicit numeric ranges.** "0–10 / 10–25 / 25–50 / 50+" with units. A continuous gradient needs labelled endpoints and a midpoint.
- **Handle missing data explicitly** — a visually distinct fill (diagonal hatch, very light grey with a legend entry "no data"), never the lowest colour on the scale. Readers will otherwise read absence as zero.
- **Region labels (state names, country codes, value annotations) must contrast with the choropleth fill.** Text painted directly on a region defaults to one color across every region, so the darkest fills lose the labels and the palest fills lose any white-text labels. Compute the text-color flip per [`../encode/color.md`](../encode/color.md) *Text on quantitative fills* — WCAG contrast at design time, per-region text color computed from the fill index. Same rule that applies to heatmap cells; choropleth regions are heatmap cells with irregular shapes.

### Proportional-symbol

- **Circles sized by area, not radius**. The same bubble-chart rule: scaling radius by value quadruples the apparent size. Set area proportional to value and expose a size legend with 2–3 reference symbols.
- **Choose when regions are highly uneven in size.** A choropleth makes a tiny city-state invisible; a proportional-symbol on the city's centroid doesn't.
- **Translucent fills (40–60% alpha)** so overlapping symbols remain readable and the underlying base map is still legible.
- **Cap the maximum radius** to avoid a symbol swallowing the continent; if data range demands it, log-scale the area and label the scaling.
- **Layer largest-first** so small focal symbols aren't hidden.

### Flow map

- **Line weight or saturation encodes flow magnitude.** Weight is the stronger channel; saturation is fallback when weights would collide.
- **Limit the number of flows before noise overwhelms signal.** Top-N flows (often top 10–20) rendered clearly beats "all flows" rendered as a tangle; offer a filter to the reader.
- **Curved lines** help separate overlapping straight flows; avoid great-circle renderings that arc over the pole unless the geography genuinely spans the globe.
- **Arrowheads or directional encoding** when origin-destination direction matters; a bidirectional flow needs two arrows or a summed magnitude with a split legend.
- **Pair with a ranked table of flows** — the table carries precise values, the map the spatial relationships.

### Projection

- **Choose a projection appropriate to the story.**
  - **Equal-area** (Albers, Mollweide, equal-area cylindrical) when comparing magnitudes across regions — the whole point is that visual area is proportional to real area.
  - **Conformal** (Mercator) only for navigation, small areas, or web tiling. Never for global area comparison — Greenland is not the size of Africa.
- **Match projection across linked maps** on the same dashboard. A Mercator main map beside an equal-area supplementary map silently distorts.

### Base map

- **Muted base layer.** Country or region boundaries in light grey; roads/labels only when relevant. The metric layer is the signal; the base map is context.
- **Remove unnecessary base-map features.** Terrain tiles, satellite imagery, hydrology — include only when the story requires them. Default map tiles bring graphical noise that competes with the data.
- **Region borders thin.** Thick borders turn a choropleth into a stained-glass window; the colour inside each region should be the reading, not the outline.

### Legend and annotation

- **Legend is mandatory.** Colour scale (choropleth), symbol-size scale (proportional-symbol), or line-weight scale (flow map). Reference values labelled.
- **Title states the metric, normalisation, period, and source.** "Customer acquisitions per 10k residents, 2025 Q1 — source: CRM." Implicit normalisation is an integrity bug waiting to happen.
- **Annotate focal regions** — the reader needs to be told what to look at; label the top 3 or the outlier directly.
- **Scale bar** when absolute distance is part of the story (flow maps); omit when it would be decoration (national choropleths).
- **Interaction:** hover tooltips with precise per-region values, click-to-drill, regional filter. The map is the overview; interaction delivers the precision.

### Honesty

- **Normalise or caveat.** A non-normalised choropleth must state this in the title and acknowledge it in the caption; for most metrics, the normalised version is the right default.
- **No 3D globe skew** when a flat projection would suffice.
- **Consistent scales across faceted maps** (small multiples by quarter, by region) — else shape-of-the-metric appears to change with the scale.
- **Account for missing regions.** If a country has no data, do not colour it at the lowest value; use an explicit "no data" fill.

## Simpler alternatives

- **`pivot-table.md` with rows = region, columns = metrics, conditional formatting by region.** The default fallback: carries all the numbers, uses heatmap colour to surface magnitude. Loses spatial adjacency and pattern entirely but preserves precise reading.
- **`bar.md` sorted descending by region.** When the question is "which regions are biggest / smallest", a sorted bar chart is strictly more accurate than a choropleth — length is a stronger channel than colour intensity. Loses the "where" story; answers the "which" story better. Often paired with a map as a companion chart.
- **`grid.md` with a regional hierarchy and conditional colour**, for reference-mode dashboards.
- **Small multiples of `bar.md`** grouped by super-region (continent, time zone) — approximates spatial grouping without a map.
- **`single-value.md` tiles per region** for a small set of top regions — works when geography is ornamental and the per-region number is the story.

None of these reproduce spatial pattern. If the decision turns on adjacency, clustering, or routes, the map is the only honest form — use it. The alternatives above are what to reach for when the question's dominant dimension is something else (precise value ⇒ table; ranking ⇒ bar).

## Anti-patterns

- **Raw counts on a choropleth** ("cases by state" as totals) — encodes population, not the metric.
- **Mercator for global-area comparison** — built-in Lie Factor at high latitudes.
- **Categorical/rainbow palette** for a continuous metric — reader cannot rank colours.
- **Proportional symbols sized by radius** — Lie Factor ≈ 2.
- **Missing data rendered as lowest-value colour** — silently reads as zero.
- **No legend; gradient with no endpoints labelled**.
- **Flow map with every flow drawn** — tangle where nothing reads; filter to top-N.
- **Thick region borders dominating the fill** — stained-glass effect hides the metric.
- **Satellite / terrain base map** behind data where it isn't part of the story — chartjunk.
- **3D globes** for comparative data — projection distortion for no gain.
- **Inconsistent projections or scales across linked maps** — silently changes the data's shape.
- **A map because "geo data exists"** when the story isn't spatial — decorative map, wasted tile.

## Worked examples

### US state choropleth

Metric: customer acquisitions per 10,000 residents, 2025 Q1. Sequential blue palette (light → dark), five quantile bins, legend with explicit ranges. States with no data shaded in diagonal hatch grey, legend entry "no data". Albers equal-area projection (standard for contiguous US). Title: "Q1 2025 customer acquisitions per 10,000 residents — source: CRM + Census population." A ranked `bar.md` to the right gives the top-10 and bottom-10 states with precise rates — the map shows clustering (concentrated in the Sun Belt) and the bar shows who exactly is ahead.

### Global proportional-symbol

Metric: active subscriptions per country, six orders of magnitude in range. Circles at country centroids, area proportional to subscription count (log-scaled, documented in legend with three reference symbols: "10k / 100k / 1M"). Robinson equal-area projection. Translucent fills at 50% alpha. The US and India circles dominate visually but do not swallow the map because of the log scale; smaller markets remain legible. Paired with a ranked `grid.md` below.

### Trade flow map

Top 20 origin-destination freight lanes, curved lines between city-pairs, line weight proportional to tonnage. Line colour muted; weight carries the signal. Top three lanes labelled directly; the rest revealed by hover. Additional annotation: a small inset showing the same 20 lanes as a `bar.md` ranked by tonnage, for readers who want the number.

## See also

- [`bar.md`](bar.md) — primary fallback for "which regions" ranking
- [`pivot-table.md`](pivot-table.md) — fallback with conditional formatting by region
- [`grid.md`](grid.md) — lookup form with regional rows
- [`scatter.md`](scatter.md) — a map is, in the end, a spatial scatter; rules on area encoding transfer
- [`../encode/color.md`](../encode/color.md) — sequential, diverging, categorical palettes
- [`../encode/visual-channels.md`](../encode/visual-channels.md) — colour intensity on the perceptual hierarchy
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — normalisation, matched dimensionality, consistent scales
- [`../dashboard/interactivity.md`](../dashboard/interactivity.md) — tooltips and drill as the map's partner
