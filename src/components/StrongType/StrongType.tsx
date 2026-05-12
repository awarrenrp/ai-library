/**
 * StrongType — slash-command / mention menu that appears when the user types
 * `/` or `@` in the composer. Anchored above the input, grouped by category,
 * keyboard-navigable.
 *
 * This component renders the *menu* only. Trigger detection (watching the
 * input for `/` and `@`, extracting the query, opening/closing the menu) is
 * the responsibility of the host component — see
 * `src/examples/StrongTypeExample.tsx` for the canonical integration.
 *
 * A11y:
 * - Root is `role="listbox"` so it pairs with an `aria-controls` combobox input.
 * - Each row is `role="option"` with a stable id (used in `aria-activedescendant`).
 * - Group headers are `<h4>` linked to their option list via `aria-labelledby` so
 *   SR users hear "Knowledge, list, /policy".
 * - Keyboard nav (Up / Down / Enter / Escape) lives on the *input* side and
 *   updates `activeItemId` here — the menu itself never takes focus, which
 *   keeps composing fluent.
 */
import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import "./StrongType.css";

export const STRONG_TYPE_TRIGGERS = ["/", "@"] as const;
export type StrongTypeTrigger = (typeof STRONG_TYPE_TRIGGERS)[number];

export type StrongTypeItem = {
  id: string;
  /** The visible text without the trigger (e.g. "summarize" — no leading slash). */
  label: string;
  /** Optional one-line description shown to the right of the label. */
  description?: string;
  /** Trailing icon / glyph. Pass any ReactNode; sized to 18px in CSS. */
  icon?: ReactNode;
  /** Extra search terms — matched in addition to `label`. */
  keywords?: readonly string[];
};

export type StrongTypeGroup = {
  id: string;
  /** Section heading shown above its items (e.g. "Actions", "Knowledge"). */
  label: string;
  items: readonly StrongTypeItem[];
};

export type StrongTypeProps = {
  /** Active trigger character — drives the visible label prefix and ARIA name. */
  trigger: StrongTypeTrigger;
  /** All groups available under this trigger. Order is preserved. */
  groups: readonly StrongTypeGroup[];
  /**
   * Current filter text (everything the user typed *after* the trigger char).
   * Pass `""` to show every item. Matching is case-insensitive against label
   * and `keywords`.
   */
  query?: string;
  /** Id of the currently highlighted item. Required for aria-activedescendant. */
  activeItemId: string | null;
  onActiveItemChange: (id: string) => void;
  /** Fires when the user clicks (or presses Enter on) an item. */
  onSelect: (item: StrongTypeItem, trigger: StrongTypeTrigger) => void;
  /** Root id — used by the host input as `aria-controls`. */
  id: string;
  /** Footer hint slot (e.g. keyboard legend). */
  footer?: ReactNode;
  className?: string;
};

/** Public so hosts can flatten + filter the same way the menu does. */
export function filterStrongTypeGroups(
  groups: readonly StrongTypeGroup[],
  query: string,
): StrongTypeGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return groups.map((g) => ({ ...g }));
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => {
        if (item.label.toLowerCase().includes(q)) return true;
        return item.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false;
      }),
    }))
    .filter((g) => g.items.length > 0);
}

/** Public so hosts can compute the next/prev active id during keyboard nav. */
export function flattenStrongTypeItems(groups: readonly StrongTypeGroup[]): StrongTypeItem[] {
  return groups.flatMap((g) => g.items);
}

export function StrongType({
  trigger,
  groups,
  query = "",
  activeItemId,
  onActiveItemChange,
  onSelect,
  id,
  footer,
  className,
}: StrongTypeProps) {
  const filteredGroups = useMemo(() => filterStrongTypeGroups(groups, query), [groups, query]);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeItemId]);

  const empty = filteredGroups.length === 0;
  const classes = ["strong-type-menu", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      id={id}
      role="listbox"
      aria-label={trigger === "/" ? "Slash commands" : "Mention people"}
    >
      {empty ? (
        <p className="strong-type-menu__empty">
          No matches for <code>{trigger}{query}</code>
        </p>
      ) : (
        filteredGroups.map((group) => {
          const headingId = `${id}-group-${group.id}`;
          return (
            <section key={group.id} className="strong-type-menu__group" aria-labelledby={headingId}>
              <h4 id={headingId} className="strong-type-menu__group-label">
                {group.label}
              </h4>
              <ul className="strong-type-menu__list">
                {group.items.map((item) => {
                  const active = item.id === activeItemId;
                  return (
                    <li
                      key={item.id}
                      ref={active ? activeItemRef : undefined}
                      id={`${id}-option-${item.id}`}
                      role="option"
                      aria-selected={active}
                      className={[
                        "strong-type-menu__item",
                        active ? "strong-type-menu__item--active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onMouseEnter={() => onActiveItemChange(item.id)}
                      onMouseDown={(e) => {
                        // mousedown (not click) so we beat the composer input's blur.
                        e.preventDefault();
                        onSelect(item, trigger);
                      }}
                    >
                      {item.icon ? (
                        <span className="strong-type-menu__item-icon" aria-hidden>
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="strong-type-menu__item-label">
                        <span className="strong-type-menu__item-trigger" aria-hidden>
                          {trigger}
                        </span>
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="strong-type-menu__item-desc">{item.description}</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      )}
      {footer ? <div className="strong-type-menu__footer">{footer}</div> : null}
    </div>
  );
}
