/**
 * Composer — primary AI input (Rippling AI-components).
 * Figma: https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=1-6915
 * Add menu: https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=72-4451
 *
 * Typography: Inter (variable, loaded in index.html).
 */

import { useEffect, useId, useRef, useState } from "react";
import "./Composer.css";
import { IconArrowUp, IconChevronDown, IconMic, IconPlus } from "./icons";

/** Figma Add menu (72:4451) — demo rows until wiring to real attach flows. */
const COMPOSER_ADD_MENU_ITEMS = [
  { id: "file", title: "Attach file", description: "PDF, images, spreadsheets" },
  { id: "link", title: "Add link", description: "Reference a page or doc by URL" },
  { id: "artifact", title: "Insert artifact", description: "Report, dashboard, or workflow preview" },
  { id: "prompt", title: "Use saved prompt", description: "Start from a team template" },
] as const;

export type ComposerWidth = "large" | "medium" | "small" | "fill";

/** Shell chrome — default border vs edit (focus-style outline + optional context chip). Edit is alternate-only; standard ignores `edit`. */
export const COMPOSER_SURFACE_STATES = ["default", "edit"] as const;
export type ComposerSurfaceState = (typeof COMPOSER_SURFACE_STATES)[number];

/** Visual / implementation variants (e.g. demo page switches via page-level settings). */
export const COMPOSER_VERSIONS = ["standard", "alternate"] as const;
export type ComposerVersion = (typeof COMPOSER_VERSIONS)[number];

export const COMPOSER_VERSION_LABELS: Record<ComposerVersion, string> = {
  standard: "Standard",
  alternate: "Alternate",
};

/** Fixed Figma widths; `fill` uses 100% of the parent (e.g. chat footer track). */
export const WIDTH_PX: Record<Exclude<ComposerWidth, "fill">, number> = {
  large: 712,
  medium: 446,
  small: 320,
};

/** Model / response speed modes shown in the Fast split control. */
export const COMPOSER_MODES = ["Pro", "Fast"] as const;
export type ComposerMode = (typeof COMPOSER_MODES)[number];

export type ComposerProps = {
  /** Matches Figma `Width=` variants (fixed outer width). */
  width?: ComposerWidth;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Initial mode for the split control (defaults to `Fast`). */
  defaultMode?: ComposerMode;
  className?: string;
  inputId?: string;
  /** Accessible name for the composer region landmark. */
  ariaComposerLabel?: string;
  /** Text for the visually hidden label on the message field. */
  ariaMessageLabel?: string;
  /** Styling variant (defaults to `standard`). */
  version?: ComposerVersion;
  /** `edit` uses focus-style shell outline and may show {@link editContextLabel} in a chip (alternate composer only). */
  surfaceState?: ComposerSurfaceState;
  /** Shown in the edit chip when `surfaceState` is `edit` (e.g. artifact or thread being edited). */
  editContextLabel?: string;
};

export function Composer({
  width = "large",
  value: valueProp,
  defaultValue = "",
  onChange,
  placeholder = "Ask, make, or searching anything...",
  defaultMode = "Fast",
  className,
  inputId: inputIdProp,
  ariaComposerLabel = "AI composer",
  ariaMessageLabel = "Message to Rippling AI",
  version = "standard",
  surfaceState = "default",
  editContextLabel,
}: ComposerProps) {
  const autoId = useId();
  const modeMenuId = useId();
  const addMenuId = useId();
  const inputId = inputIdProp ?? `composer-input-${autoId}`;
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolled;
  const [mode, setMode] = useState<ComposerMode>(defaultMode);
  const [modeMenuOpen, setModeMenuOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const fastAnchorRef = useRef<HTMLDivElement>(null);
  const addAnchorRef = useRef<HTMLDivElement>(null);

  const setValue = (next: string) => {
    onChange?.(next);
    if (!isControlled) setUncontrolled(next);
  };

  const canSend = value.trim().length > 0;

  useEffect(() => {
    if (!modeMenuOpen && !addMenuOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (fastAnchorRef.current?.contains(t)) return;
      if (addAnchorRef.current?.contains(t)) return;
      setModeMenuOpen(false);
      setAddMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModeMenuOpen(false);
        setAddMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [modeMenuOpen, addMenuOpen]);

  const fastBtnLabel = `${mode} mode, ${modeMenuOpen ? "close menu" : "open menu"}`;

  const showEditChrome = version === "alternate" && surfaceState === "edit";

  return (
    <section
      className={[
        "composer",
        version === "alternate" ? "composer--alternate" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaComposerLabel}
      style={{
        width: width === "fill" ? "100%" : WIDTH_PX[width],
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className={[
          "composer-surface",
          showEditChrome ? "composer-surface--edit" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {showEditChrome ? (
          <div className="composer-edit-bar" role="status" aria-live="polite">
            <span className="composer-edit-chip">{editContextLabel ?? "Editing"}</span>
          </div>
        ) : null}
        <div className="composer-field">
          <label htmlFor={inputId} className="visually-hidden">
            {ariaMessageLabel}
          </label>
          <textarea
            id={inputId}
            className="composer-input"
            rows={1}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div
          className="composer-actions"
          role="toolbar"
          aria-orientation="horizontal"
          aria-label="Composer actions"
        >
          <div className="composer-add-anchor" ref={addAnchorRef}>
            <button
              type="button"
              className="composer-icon-btn"
              aria-label={addMenuOpen ? "Close add menu" : "Add attachment"}
              aria-expanded={addMenuOpen}
              aria-haspopup="menu"
              aria-controls={addMenuOpen ? addMenuId : undefined}
              onClick={() => {
                setAddMenuOpen((o) => !o);
                setModeMenuOpen(false);
              }}
            >
              <IconPlus />
            </button>
            {addMenuOpen ? (
              <div id={addMenuId} className="composer-add-menu" role="menu" aria-label="Add to message">
                <div className="composer-add-menu__header">
                  <p className="composer-add-menu__section">Add</p>
                  <label className="composer-add-menu__search-label visually-hidden" htmlFor={`${addMenuId}-search`}>
                    Search attachments
                  </label>
                  <input
                    id={`${addMenuId}-search`}
                    type="search"
                    className="composer-add-menu__search"
                    placeholder="Search"
                    autoComplete="off"
                  />
                </div>
                <div className="composer-add-menu__list">
                  {COMPOSER_ADD_MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      className="composer-add-menu__row"
                      onClick={() => setAddMenuOpen(false)}
                    >
                      <span className="composer-add-menu__row-title">{item.title}</span>
                      <span className="composer-add-menu__row-desc">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="composer-fast-anchor" ref={fastAnchorRef}>
            <button
              type="button"
              className="composer-fast"
              aria-label={fastBtnLabel}
              aria-expanded={modeMenuOpen}
              aria-haspopup="menu"
              aria-controls={modeMenuOpen ? modeMenuId : undefined}
              onClick={() => {
                setModeMenuOpen((o) => !o);
                setAddMenuOpen(false);
              }}
            >
              <span className="composer-fast-label">{mode}</span>
              <IconChevronDown />
            </button>
            {modeMenuOpen && (
              <div id={modeMenuId} className="composer-mode-menu" role="menu" aria-label="Response mode">
                {COMPOSER_MODES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="menuitemradio"
                    aria-checked={mode === m}
                    className={[
                      "composer-mode-option",
                      mode === m ? "composer-mode-option--active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      setMode(m);
                      setModeMenuOpen(false);
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="composer-spacer" aria-hidden />

          <button type="button" className="composer-icon-btn composer-voice" aria-label="Voice input">
            <IconMic />
          </button>

          <button
            type="button"
            className="composer-send"
            disabled={!canSend}
            aria-label={canSend ? "Send message" : "Send message (enter text to enable)"}
          >
            <IconArrowUp />
          </button>
        </div>
      </div>
    </section>
  );
}
