/**
 * StrongType — full composer integration example.
 *
 * Live source rendered as the spec page snippet (Vite `?raw`), so it's
 * type-checked at build time. Copy this pattern into product code:
 * - Swap `from "../components/StrongType"` for your library path.
 * - Replace the `COMMAND_GROUPS` / `MENTION_GROUPS` fixtures with data from
 *   your backend (e.g. user search results, available actions).
 *
 * Behavior contract:
 * - Typing `/` or `@` at the start of a token opens the menu in that mode.
 * - Continuing to type filters the menu live (label + keywords).
 * - Up / Down cycles items. Enter selects. Escape closes.
 * - Selecting an item replaces the in-progress token (`/sum` → `/summarize `)
 *   and closes the menu.
 */
import { useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  IconBook,
  IconHeart,
  IconPencil,
  IconPerson,
  IconSparkle,
  IconTeam,
} from "../icons";
import {
  StrongType,
  filterStrongTypeGroups,
  flattenStrongTypeItems,
} from "../components/StrongType";
import type {
  StrongTypeGroup,
  StrongTypeItem,
  StrongTypeTrigger,
} from "../components/StrongType";

const COMMAND_GROUPS: readonly StrongTypeGroup[] = [
  {
    id: "actions",
    label: "Actions",
    items: [
      {
        id: "summarize",
        label: "summarize",
        description: "Condense a thread",
        icon: <IconSparkle />,
        keywords: ["tldr", "shorten"],
      },
      {
        id: "draft",
        label: "draft",
        description: "Compose a reply",
        icon: <IconPencil />,
        keywords: ["write", "compose"],
      },
    ],
  },
  {
    id: "knowledge",
    label: "Knowledge",
    items: [
      {
        id: "policy",
        label: "policy",
        description: "Search HR policy",
        icon: <IconBook />,
        keywords: ["handbook", "rules"],
      },
      {
        id: "benefits",
        label: "benefits",
        description: "FY26 benefits docs",
        icon: <IconHeart />,
        keywords: ["health", "perks"],
      },
    ],
  },
];

const MENTION_GROUPS: readonly StrongTypeGroup[] = [
  {
    id: "people",
    label: "People",
    items: [
      { id: "jordan-lee", label: "Jordan Lee", description: "Engineering", icon: <IconPerson /> },
      { id: "ariel-park", label: "Ariel Park", description: "People Ops", icon: <IconPerson /> },
    ],
  },
  {
    id: "teams",
    label: "Teams",
    items: [
      { id: "team-eng", label: "engineering", description: "12 members", icon: <IconTeam /> },
      { id: "team-people", label: "people-ops", description: "6 members", icon: <IconTeam /> },
    ],
  },
];

type OpenState = {
  trigger: StrongTypeTrigger;
  /** Cursor position where the trigger char lives. */
  triggerIndex: number;
  /** Text typed after the trigger char (no leading `/` or `@`). */
  query: string;
};

/** Look backwards from the caret for a `/` or `@` that starts a fresh token. */
function detectTrigger(value: string, caret: number): OpenState | null {
  for (let i = caret - 1; i >= 0; i--) {
    const ch = value[i];
    if (ch === " " || ch === "\n") return null;
    if (ch === "/" || ch === "@") {
      const startOfToken = i === 0 || value[i - 1] === " " || value[i - 1] === "\n";
      if (!startOfToken) return null;
      return { trigger: ch, triggerIndex: i, query: value.slice(i + 1, caret) };
    }
  }
  return null;
}

export function StrongTypeComposerExample() {
  const menuId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState<OpenState | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sourceGroups = open?.trigger === "@" ? MENTION_GROUPS : COMMAND_GROUPS;
  const filteredGroups = useMemo(
    () => (open ? filterStrongTypeGroups(sourceGroups, open.query) : []),
    [open, sourceGroups],
  );
  const flatItems = useMemo(() => flattenStrongTypeItems(filteredGroups), [filteredGroups]);

  const refreshOpenState = (next: string, caret: number) => {
    const detected = detectTrigger(next, caret);
    setOpen(detected);
    if (detected) {
      const first = flattenStrongTypeItems(filterStrongTypeGroups(sourceGroups, detected.query))[0];
      setActiveId((prev) => (prev && flatItems.some((i) => i.id === prev) ? prev : first?.id ?? null));
    } else {
      setActiveId(null);
    }
  };

  const commitItem = (item: StrongTypeItem, trigger: StrongTypeTrigger) => {
    if (!open) return;
    const before = value.slice(0, open.triggerIndex);
    const after = value.slice(open.triggerIndex + 1 + open.query.length);
    const inserted = `${trigger}${item.label} `;
    const nextValue = `${before}${inserted}${after}`;
    setValue(nextValue);
    setOpen(null);
    setActiveId(null);
    queueMicrotask(() => {
      const el = inputRef.current;
      if (!el) return;
      const nextCaret = (before + inserted).length;
      el.focus();
      el.setSelectionRange(nextCaret, nextCaret);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!open || flatItems.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const idx = flatItems.findIndex((i) => i.id === activeId);
      const nextIdx = (idx + dir + flatItems.length) % flatItems.length;
      setActiveId(flatItems[nextIdx]!.id);
    } else if (e.key === "Enter") {
      const item = flatItems.find((i) => i.id === activeId) ?? flatItems[0]!;
      e.preventDefault();
      commitItem(item, open.trigger);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(null);
      setActiveId(null);
    }
  };

  return (
    <div className="strong-type-example">
      {open && filteredGroups.length > 0 ? (
        <div className="strong-type-example__menu-anchor">
          <StrongType
            id={menuId}
            trigger={open.trigger}
            groups={filteredGroups}
            query={open.query}
            activeItemId={activeId}
            onActiveItemChange={setActiveId}
            onSelect={commitItem}
            footer={
              <>
                <span>
                  <kbd>↑</kbd>
                  <kbd>↓</kbd> Navigate · <kbd>↵</kbd> Select · <kbd>esc</kbd> Dismiss
                </span>
                <span>{open.trigger === "/" ? "Commands" : "Mentions"}</span>
              </>
            }
          />
        </div>
      ) : null}

      <label htmlFor={`${menuId}-input`} className="strong-type-example__label">
        Compose
      </label>
      <textarea
        id={`${menuId}-input`}
        ref={inputRef}
        rows={3}
        className="strong-type-example__input"
        value={value}
        placeholder="Type / for commands, @ for people"
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          refreshOpenState(next, e.target.selectionStart ?? next.length);
        }}
        onKeyUp={(e) => {
          if (e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End") {
            const el = e.currentTarget;
            refreshOpenState(el.value, el.selectionStart ?? el.value.length);
          }
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setOpen(null)}
        role="combobox"
        aria-expanded={open !== null && filteredGroups.length > 0}
        aria-controls={menuId}
        aria-autocomplete="list"
        aria-activedescendant={activeId ? `${menuId}-option-${activeId}` : undefined}
      />
    </div>
  );
}
