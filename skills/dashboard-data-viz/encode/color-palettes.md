---
name: encode-color-palettes
description: Produce dashboard.palette (concrete defaults): ColorBrewer palette names, hex values, per-component colors.
governs: dashboard.palette (concrete defaults)
---

# Color palettes — picking guide

This is a decision guide for selecting a named palette. Full hex tables for every ColorBrewer palette at every class count (plus Okabe-Ito) live in [`colorbrewer.json`](colorbrewer.json) — load that when emitting concrete colors. For the *principles* (when color earns its place, accent-on-gray, consistency), load [`color.md`](color.md).

## Pick by task

Start here. Most requests resolve in one row.

| Task                                              | Default palette                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| Heatmap / choropleth, single-direction intensity  | **YlOrRd** (heat semantics) or **Viridis** (continuous, perceptual)    |
| Heatmap / map, neutral magnitude                  | **Blues**                                                              |
| Diverging around zero (variance, delta-to-target) | **RdBu** (positive=blue, negative=red)                                 |
| Shaded bar ramp by magnitude                      | **Blues** or **Greys**                                                 |
| Categorical bars, ≤3 categories                   | **Set2** first 3, or accent-on-gray                                    |
| Categorical bars, 4–8 categories                  | **Set2**                                                               |
| Multi-line chart, ≤3 lines                        | **Dark2** (thin marks need saturation)                                 |
| Focal line + context lines                        | `#BDBDBD` for context + one accent hue                                 |
| Positive/negative single number                   | Blue `#2166AC` positive, red `#B2182B` negative                        |
| Target-vs-actual bullet                           | **Greys** 3-class bands + accent actual + black target                 |
| One highlighted bar, rest context                 | Accent hue for one + `#BDBDBD` for rest                                |
| Public-facing / accessibility-critical categorical | **Okabe-Ito** (designed for CVD, not just "safe-ish")                 |

## Deviation rules per family

For each palette family, a single default. Deviate only for a specific reason listed below.

### Sequential, single-hue → default **Blues**

Deviate when:
- **Grayscale output or "color would distract"** → Greys.
- **Positive-only growth semantic** → Greens.
- **Warning / attention semantic** → Oranges.
- **Risk / loss / heat semantic** (and red isn't carrying too much load already) → Reds.

Ignore Purples unless brand dictates.

### Sequential, multi-hue → default **YlOrRd** (heat) or **YlGnBu** (cool/density)

Deviate when:
- **Continuous scale, perceptual uniformity matters, or grayscale-print required** → **Viridis** (not ColorBrewer; from matplotlib).
- **Colorblind-safe is critical** → YlGnBu or Viridis.
- **Earth / natural / soil semantic** → YlOrBr.

The remaining 9 multi-hue ColorBrewer palettes (BuPu, GnBu, OrRd, PuBu, PuBuGn, PuRd, RdPu, BuGn, YlGn) exist in [`colorbrewer.json`](colorbrewer.json) for branding needs but have no picking advantage over the defaults.

### Diverging → default **RdBu**

RdBu is canonical for signed data. Deviate when:
- **Natural / dry-vs-wet semantic** → BrBG.
- **Need strong contrast without red** → PuOr.
- **Midpoint should draw the eye ("target is interesting")** → RdYlBu (yellow-centered).
- **Traffic-light semantics are strictly required and audience isn't CVD-sensitive** → RdYlGn — but this is the only case; prefer RdYlBu otherwise.

Avoid Spectral (rainbow, not monotonic perceptually), PiYG/PRGn (red-green), and RdGy (only useful when one side is uninteresting).

### Qualitative → default **Set2**

Deviate when:
- **Thin lines / small points** (Set2 washes out) → **Dark2**.
- **Colorblind safety is load-bearing** → **Okabe-Ito**.
- **Categories come in natural pairs** (actual vs. forecast, region A/A', …) → **Paired**.
- **Backgrounds / de-emphasized fills** → Pastel2.
- **Bold emphatic primaries needed** (rare; consider if you actually have ≤3 categories and should use accent-on-gray instead) → Set1.

Ignore Set3, Pastel1, Accent unless a specific constraint forces them.

## Per-component default colors

Non-data chart apparatus. Tune per brand, but these are safe starting points.

| Component            | Default                                        | Why                                             |
| -------------------- | ---------------------------------------------- | ----------------------------------------------- |
| Chart background     | `#FFFFFF` or `#FAFAFA`                         | No tint that shifts perceived data colors       |
| Plot border          | usually none, or `#E0E0E0`                     | Gestalt closure makes borders unnecessary       |
| Gridlines            | `#EEEEEE`–`#DDDDDD`                            | Visible if you squint, invisible while reading  |
| Axis line, ticks     | `#BDBDBD`–`#969696`                            | Present, not loud                               |
| Axis labels          | `#525252`                                      | High contrast; softer than pure black           |
| Body text            | `#252525`–`#333333`                            | Readable; softer than pure black                |
| Title                | `#000000` or body-text color                   | Most prominent text                             |
| Annotation text      | gray matching axis label                       | Secondary; quieter than data                    |
| Context / muted data | `#BDBDBD`–`#D9D9D9`                            | Still readable, visibly subordinate             |
| Accent               | single brand primary (typical `#4A90E2` blue)  | Reserved for focal data                         |
| Positive             | `#2166AC` (RdBu blue end)                      | Colorblind-safer than green                     |
| Negative             | `#B2182B` (RdBu red end) or `#D95F02` orange   | Colorblind-safer than green                     |

## Accessibility

- **Categorical + CVD critical** → Okabe-Ito. Set2 is "reasonable" but not validated.
- **Sequential + CVD critical** → Blues, YlGnBu, or Viridis.
- **Diverging + CVD critical** → RdBu, BrBG, or PuOr. Avoid RdYlGn, PiYG, PRGn, Spectral.
- **Okabe-Ito caveats**: yellow `#F0E442` has low contrast on white (outline fills, or skip); reserve black for "total/reference" and start series at orange.

## Dashboard-level consistency

When building a system of dashboards, fix these once:

1. One **accent** hue across all dashboards (brand primary or neutral blue).
2. One **sequential** palette for all quantitative encodings.
3. One **diverging** palette for all signed encodings (RdBu is the default).
4. **Gray tiers**: light (gridlines), medium (axis/muted), dark (body text).
5. **Positive/negative** colors consistent across every delta chart.

Muscle memory does the rest — blue always means the same thing.

## Compound palettes

Some encodings are bivariate: a top-level categorical split (in-band vs out-of-band, on-track vs at-risk, actual vs forecast) with within-group ordering (Q1→Q4 inside the band, severity levels inside the flag, confidence inside the forecast). No single ColorBrewer palette expresses both — sequentials give ordering but one hue family; diverging gives two hues but a single neutral midpoint; qualitative gives neither. The answer is a **compound palette**: one hue family per top-level category, each carrying its own sequential ramp.

Recipe:

1. **Decompose the encoding.** Name the top-level categorical variable and the within-group ordinal variable. Three levels of nesting is too much for color alone — split into small multiples or offload one level to a non-color channel.
2. **Hue family per top-level category.** Blue for neutral/safe, warm for flag/attention, gray for context. The hue split itself carries the categorical variable; readers get "blue = in, warm = out" without a legend.
3. **Sequential ramp within each family.** Prefer ColorBrewer sequentials where they fit (`Blues`, `OrRd`). When ColorBrewer doesn't supply the needed hue (a CVD-safe amber that harmonizes with saturated blues → Okabe-Ito `#E69F00`), reach outside ColorBrewer and **record the source** alongside the hex.
4. **Resolve each sub-palette once at dashboard scope**, bound to named roles (`palette.in-band-ramp`, `palette.flag.below`, `palette.flag.above-severity`). Charts consume roles by name; nothing re-resolves.
5. **Audit the composed palette** before shipping — see *Palette coherence audit* below.

Worked example — pay-band dashboard, in-band quartiles + out-of-band flags:

| Role                              | Hex       | Source                                                                                      |
|-----------------------------------|-----------|---------------------------------------------------------------------------------------------|
| `in-band-ramp[0..3]` (Q1–Q4)      | `#BDD7E7 #6BAED6 #3182BD #08519C` | ColorBrewer `Blues[5]` without the lightest step                    |
| `flag.below-min`                  | `#E69F00` | Okabe-Ito — ColorBrewer ambers too yellow/light next to saturated blues; Okabe-Ito is CVD-safe |
| `flag.above-severity[0..2]`       | `#FDBB84 #D6604D #B2182B`         | ColorBrewer `OrRd[3]` + `RdBu[8]` + `RdBu[6]`                        |

Mixed provenance is fine when each role pins to one source and one hex. The failure mode is picking near-identical hexes from different sources for the same role (`#E69F00` on one chart, `#FE9929` on another) — the reader feels the drift without being able to name it.

Common compound patterns worth naming up front:

| Pattern                         | Top-level split            | Within-group ordering       |
|---------------------------------|----------------------------|------------------------------|
| Band with out-of-band flags     | in-band vs out-of-band     | Q1→Q4; flag severity         |
| Actual with forecast confidence | actual vs forecast         | age; confidence band (p10→p90) |
| Category with severity          | per category               | severity level within category |

## Palette coherence audit

Role-by-role resolution (one role → one hex, one recorded source) doesn't guarantee the *set* harmonizes. ColorBrewer palettes are internally coherent by construction; composing across them loses the guarantee. This audit runs on the resolved `dashboard.palette` hex set before shipping — verification phase of [`../03-composition.md`](../03-composition.md). Numerical where possible (operates on hexes, no render required); squint test is the human backstop.

Convert every resolved hex to **OKLCH** (L = lightness 0–1, C = chroma, H = hue angle 0–360°). Then:

- [ ] **Monotonicity on ordered ramps.** For roles that form a ramp (Q1→Q4, severity[0..n], confidence p10→p90), OKLCH L must be monotonic across steps. Any reversal is a ramp break.
- [ ] **Hue-arc bounds within a family.** Hexes in the same hue family should sit within ~30° of OKLCH H of each other. Wider arc reads as two families — retune toward family-median H, or record the categorical break as an explicit decision.
- [ ] **Lightness delta between adjacent ramp steps ≥ ~0.08 in L.** ColorBrewer ramps sit around 0.10–0.15 per step. Steps too close in L merge on screen.
- [ ] **Saturation hierarchy matches role attention.** Attention roles (flags, focal) should have higher OKLCH C than recede roles (context, muted). If a "focal" role has lower C than a "context" role, the reader's eye lands on the wrong place.
- [ ] **Squint test on the composed swatch strip.** Lay all hexes out grouped by family, downscale to thumbnail. Families should read as distinct; within a family, ramps should read as ordered. If one hex pops out of family or a ramp step looks out of order, retune.

When a check fails, the remedy points back to the design rules above: retune toward the family, swap the source, or record the deliberate mismatch (Okabe-Ito amber chosen for CVD despite the hue break against ColorBrewer warms is a legitimate decision — written down, not implicit).

The first four checks are computable on the hex set alone (standard color-library OKLCH conversion). The fifth is the eye-check backstop when the numerics pass but something still feels off.

## Cheat sheet (no-context defaults)

**Grays (ColorBrewer Greys):** `#FFFFFF #F0F0F0 #D9D9D9 #BDBDBD #969696 #737373 #525252 #252525`
**Sequential (Blues, 5-class):** `#EFF3FF #BDD7E7 #6BAED6 #3182BD #08519C`
**Diverging (RdBu, 5-class):** `#CA0020 #F4A582 #F7F7F7 #92C5DE #0571B0` (neg → pos)
**Categorical (Set2, 4-class):** `#66C2A5 #FC8D62 #8DA0CB #E78AC3`
**Okabe-Ito (CVD-safe, 8):** `#000000 #E69F00 #56B4E9 #009E73 #F0E442 #0072B2 #D55E00 #CC79A7`

## See also

- [`color.md`](color.md) — when to use color at all; accent-on-gray; nine rules
- [`colorbrewer.json`](colorbrewer.json) — full hex tables, all palettes and class counts
- [`visual-channels.md`](visual-channels.md) — perceptual hierarchy (lightness > hue for quantity)
- [`../charts/heatmap.md`](../charts/heatmap.md) — sequential and diverging palettes in use
- [`../charts/map.md`](../charts/map.md) — choropleth palette rules
- [`../craft/emphasis.md`](../craft/emphasis.md) — using the accent color to direct attention
- [`../dashboard/consistency.md`](../dashboard/consistency.md) — dashboard-wide palette consistency
