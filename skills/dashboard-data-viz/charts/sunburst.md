---
name: sunburst
description: Produce chart.geom (sunburst) — radial hierarchy. Compounds angle-reading weakness; prefer treemap or nested table.
governs: chart.geom (sunburst)
consumes: dashboard.palette
---

# Sunburst

A sunburst is a donut made hierarchical: the center ring is the root split into top-level categories, and each outer ring subdivides the ring inside it. Each segment encodes its value as an angle, so every perceptual weakness of a donut applies here — and it applies at every level of the hierarchy simultaneously. The reader cannot precisely compare two children of different parents (different anchor angles), and ring-over-ring lookup has no aligned baseline. The chart still has audiences who expect it — product managers who've seen the form on filesystem visualizers, finance teams looking at budget breakdowns. This recipe is about rendering it well when it's the right call, and steering to the better palette members when flexibility exists.

## When to use

A sunburst is acceptable — with caveats — when **all** of these hold:

- The hierarchy is **small and clean**. Roughly 2–6 top-level categories, each with 2–6 children. Beyond that, outer-ring segments collapse into unreadable slivers.
- The hierarchy is **≤ 2 levels deep**. Three levels multiplies angle-reading errors and produces outer rings thin enough to lose their labels.
- Only **rough proportion** is needed at each level. The reader should not be asked to rank children across parents or to read a precise value.
- The user wants to see **composition at each level simultaneously** (e.g., "show me how the budget splits by department, and within each department by function"). If only one level matters, drop to a sorted `horizontal-bar` or a `donut` for that level.
- The audience is **fluent** with the form. Unfamiliar readers will need a sentence explaining how to read it. Unfamiliar chart types carry a tutorial tax.

A good fit: a 2-level budget breakdown for a finance review deck where the audience has seen the form before and the message is "most spend is in Engineering, and within Engineering most of it is Infrastructure." A bad fit: a 4-level org hierarchy where the goal is to compare leaf-level team sizes.

## When NOT to use (and alternatives in the palette)

- **More than 2 levels deep.** Each additional ring compounds the angle tax and shrinks the outermost segments. Use a **`pivot-table`** with indented row labels and heatmap-style conditional formatting on the value column — the hierarchy is explicit in the indentation, and the magnitudes are exact.
- **Precise comparison within a level, especially across parents.** A child of parent A at 15% of A is a different arc length than a child of parent B at 15% of B, because the parent anchors differ. Use **grouped bars** (small multiples) with one facet per parent, each facet sorted by child value.
- **Audience isn't fluent in the form.** Switch to a `pivot-table` with conditional formatting, or to 2-level `horizontal-stacked` bars. Do not make the reader learn a chart form to read one data point.
- **Hierarchy changes over time.** Sunbursts are snapshots. Use faceted `horizontal-stacked` bars across time periods, or a `pivot-table` with a column per period.
- **Part count per level is very unbalanced** (one big parent with 15 children, another parent with 2 children). The children of the small parent get thin slices of a big angle, and the children of the big parent get tiny slices of an already-split angle. Use a **treemap** or nested bars.
- **Leaf-level ranking is the point.** Flatten to a single level and use sorted **`horizontal-bar`** — the hierarchy becomes a grouping color or a faceting variable, not a ring.

## Rules (how to render a sunburst well when you do ship one)

### Structural

- **Cap at 2 levels.** Inner ring = top-level categories; outer ring = children. If the data has more levels, either aggregate upward (combine the deepest level into its parent) or switch forms.
- **Cap at ~6 top-level categories.** More, and the inner ring already has small slivers; the outer ring explodes. Aggregate a tail into `Other` at the top level before going wide.
- **Sort slices by value within each parent**, largest to smallest, starting at 12 o'clock and proceeding clockwise. Consistent ordering at both levels gives the reader a predictable scan path.
- **Align children to their parent's angular extent.** This is the structural default, but some libraries allow "flat" mode where outer segments are sized relative to the whole, not to the parent — do not use that mode; it breaks the visual relationship between ring and parent.
- **No 3D, no tilt.** Integrity violation. See [`../02-graphical-integrity.md`](../02-graphical-integrity.md).
- **No exploded segments.** Exploding breaks the angle anchor; in a sunburst this is catastrophic because the outer ring loses its alignment with the parent.

### Color

- **Color by top-level category.** All children of the "Engineering" parent share the Engineering hue; variation within that family goes on **lightness** (darker at the parent, lighter at the children, or vice versa).
- This is the one case in the palette where a rainbow-style multi-hue scheme is justified — you need 2–6 clearly-distinct top-level colors. Cap at 6 hues; if you need more, aggregate into `Other`.
- Reserve one strong accent hue for the focal parent if there is a focal story; render the rest in muted grays with lightness variation to distinguish children.
- Colorblind-safe palette. Do not rely on red/green for the top-level split.

### Labels

- **Direct-label segments that are large enough** to carry the label at body-text size inside the segment. Smaller segments get an external leader line to a label in the whitespace around the ring.
- **Label the value** (percentage of parent or absolute number) alongside the category name. This defeats the angle-reading weakness at the ring level — if the label says `32%`, the reader doesn't have to estimate.
- **Clarify which ring is what level.** A short caption — "inner ring: department; outer ring: function" — or a small ring-label glyph at the right edge prevents the reader from inventing their own mapping.
- **State the total** in a subtitle or footer (`Total: $18.4M annualized`) so the part-to-whole framing is explicit.
- **No separate legend for children.** Direct labels only. If a child is too small to label, it's too small to matter — aggregate.

### Size and layout

- Sunbursts need more room than donuts because the outer ring has to fit child labels. Minimum render size ~340 pixels square; prefer 400+.
- If the sunburst is one card in a larger dashboard, do not undersize it to fit the grid — swap to a `pivot-table` or `horizontal-stacked` for a smaller footprint.
- Accept the square aspect ratio. Pair with a taller text block (story caption, key takeaways) to balance the layout.

## Palette alternatives to suggest

When flexibility exists, nudge toward one of these:

- **`pivot-table` with indented row labels and heatmap-style conditional formatting.** Hierarchy is explicit in the indentation; magnitude is encoded in both the exact number and the cell color. This is the most precise rendering of hierarchical part-to-whole the palette offers.
- **`horizontal-stacked` (100%) with one row per top-level category.** Each row is a parent, each segment a child. The reader can compare same-colored children across rows precisely (aligned positions within each row). Works best with ≤4 children per parent.
- **Grouped `horizontal-bar` via small multiples.** One facet per parent, bars sorted by child value within each facet. This is the literature's preferred approach for 2-level hierarchies with precise reading.
- **Treemap.** The literature-preferred hierarchical form. Area encoding is still below position/length, but area-in-a-rectangle reads more accurately than angle-in-a-ring, and treemaps handle unbalanced hierarchies gracefully. See [`treemap.md`](treemap.md).
- **Nested `donut` (single level).** If the inner level is decorative context and only the outer level matters, a plain `donut` of the outer level with a text subtitle summarizing the inner level often communicates the same story with less chart.

Phrasing: "This is renderable as a sunburst. Given the two-level hierarchy and the audience likely wanting to compare child segments across parents, a pivot-table with indented rows and conditional formatting would preserve precision — want that instead?" Render what the user asked for; offer the upgrade.

## Anti-patterns

- **3 or more levels deep.** The outermost ring collapses to unreadable slivers; angle tax compounds per level.
- **Rainbow across every leaf segment** instead of inheriting the parent's hue. Visual noise; breaks the "all Engineering things are this color" affordance.
- **3D / tilted sunburst.** Integrity violation.
- **Legend with every leaf category.** Exceeds preattentive capacity (working memory holds 3–4 chunks); forces constant legend-to-ring lookup.
- **Outer-ring segments sized proportionally to the whole** (not to their parent). Breaks the hierarchy-as-angle relationship; readers will assume "flat" semantics and misread.
- **Sunburst of a non-hierarchical dataset.** If the grouping is categorical but not a hierarchy (e.g., flat tags), use sorted `horizontal-bar`.
- **Ranking / top-N rendered as sunburst.** Use sorted `horizontal-bar`.
- **Interactive click-to-zoom into a child** as the primary affordance. Works in explorer tools but fails in dashboards — the reader doesn't know which segment to click or that clicking does anything. See [`../dashboard/interactivity.md`](../dashboard/interactivity.md) when present: interactions should reveal detail, never hide the top-level point.
- **Sunburst with a big "Other" bucket** on the inner ring eating 40%+ of the arc. Means the hierarchy wasn't modeled well; reconsider the top-level groupings before rendering.

## Common failures to catch

- Child percentages that don't sum to their parent's percentage — data error or omission.
- Leaf segments too thin to label at body-text size and no external leader lines, so the labels collide.
- Inner ring ordered alphabetically, outer ring ordered by value — inconsistent sort.
- An `Other` bucket on the outer ring larger than one of the named top-level categories on the inner ring — aggregate up to the top level instead.
- Same hue used for two different top-level categories because the default palette recycled.

## Worked example

Request: "Show FY25 planned opex by department, and within each department by function." Four departments (Engineering $18M, GTM $12M, G&A $6M, Product $4M), each with 3 function children.

- Two levels, 4 parents × 3 children = 12 outer segments. Within the recipe's range but tight.
- Inner ring: 4 slices sorted largest to smallest starting at 12 o'clock. Engineering (45%) is the focal parent.
- Outer ring: within each parent, children sorted by value. Each child inherits the parent's hue at a step lighter.
- Engineering uses the accent color family (darkest in the center, lightest at the outer). GTM / G&A / Product in muted gray families at three different lightnesses of gray.
- Direct-label children with ≥4% share of the total. Label Engineering's three children inline; use leader lines for the G&A children, which are too thin for inline labels.
- Subtitle: `FY25 planned opex · inner: department · outer: function · total $40M`.
- Caption: `Engineering accounts for 45% of planned spend, with Infrastructure the largest single function.` — tells the reader the story that the chart gestures at.

Counter-example: same question but 3 levels deep (department → function → team). The outermost ring collapses into slivers; labels don't fit; child-across-parent comparison is impossible. Switch to a `pivot-table` with indented rows and conditional-formatted value column.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — dimensionality, 3D, proportional encoding
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — hierarchical part-to-whole routing
- [`../encode/color.md`](../encode/color.md) — hue-by-category with lightness for depth
- [`donut.md`](donut.md) — the single-level sibling; most of the same rules apply
- [`stacked.md`](stacked.md) — the preferred 2-level composition form
- [`pivot-table.md`](pivot-table.md) — the preferred precise hierarchical form
