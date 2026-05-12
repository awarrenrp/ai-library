---
name: dashboard-archetypes
description: Pick a canonical dashboard layout by mode and use case — single-hero, KPI strip + detail grid, small-multiples grid, narrative column, master-detail.
governs: dashboard.archetype
consumes: strategic.mode
---

# Dashboard archetypes

A handful of layouts solve most dashboard problems. Pick the archetype before the charts — switching archetype mid-design is expensive; switching charts within an archetype is cheap.

## Single-hero layout

**Mode:** explanatory. **Use for:** executive readouts, board decks, quarterly reviews.

One hero tile in the top-left 6–8 columns. A row of 3–4 small single-value tiles along the top edge for context. Supporting detail charts in a 2×2 or 3×2 grid below.

The KPI row here is a frequent default, not a mandate. Before drafting the strip, answer the four composition questions in [`kpi-row.md`](kpi-row.md) — role with respect to the detail, metric selection, count and hierarchy, whether the strip should exist at all. Skipping that reasoning is the most common way a single-hero layout ends up with a strip of habit-picked tiles competing with its hero.

## KPI strip + detail grid

**Mode:** reference. **Use for:** ops dashboards, finance reconciliation, product health monitoring.

Horizontal strip of 4–6 `single-value` tiles across the top showing key metrics with deltas and thresholds. Below: a grid of supporting charts and tables.

The strip *is* the archetype here, so it has to do real work. Reason about it explicitly — role, metric selection, count, hierarchy — per [`kpi-row.md`](kpi-row.md). In particular: if most of your candidate tiles carry targets and bands, a vertical `bullet` stack may serve better than a strip of single-value tiles.

## Small-multiples grid

**Mode:** exploratory or reference. **Use for:** cohort analysis, per-region performance, per-customer drill views.

A `grid` filling most of the canvas, showing the same chart type faceted by a category. Especially powerful with 4–20 facets; above that, consider pagination or filters. The canonical high-density form.

## Narrative column

**Mode:** explanatory. **Use for:** dashboards intended to be read like a report; narrow viewports; PDF exports.

A single column of charts, read top-to-bottom, each answering one question that leads to the next.

## Master-detail

**Mode:** exploratory. **Use for:** customer, region, or account dashboards.

A primary selector (table, list, map) on the left; charts responding to selection on the right. The reader picks an entity and sees its view.

## See also

- [`audience-purpose.md`](audience-purpose.md) — mode (exploratory / explanatory / reference) drives archetype choice
- [`kpi-row.md`](kpi-row.md) — composition reasoning for the KPI strip that single-hero and KPI-strip archetypes both invoke
- [`structure.md`](structure.md) — grid, tile sizing, alignment within whatever archetype you pick
- [`consistency.md`](consistency.md) — cross-chart consistency inside the archetype
- [`chrome.md`](chrome.md) — page chrome around the archetype
- [`narrative.md`](narrative.md) — narrative-column archetype's reading logic
