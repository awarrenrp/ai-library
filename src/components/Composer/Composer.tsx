/**
 * Composer — primary AI input (Rippling AI-components).
 * Figma: https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=1-6915
 * Add menu: https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=72-4451
 *
 * Typography: Inter (variable, loaded in index.html).
 */

import type { ReactNode } from "react";
import { useId, useRef, useState } from "react";
import { useDismissOnOutsidePress } from "../../hooks/useDismissOnOutsidePress";
import "./Composer.css";
import {
  IconAddAgents,
  IconAddAttach,
  IconAddEffort,
  IconAddGlobe,
  IconAddPlugins,
  IconAddSkills,
  IconArrowUp,
  IconChevronDown,
  IconChevronRight,
  IconComposerChipClose,
  IconComposerChipLead,
  IconMic,
  IconPlus,
} from "./icons";

/**
 * Figma Add menu (72:4451) — visible rows in source order. Hidden rows from
 * Figma (Footer, Country flag, Avatar) are intentionally omitted. Items
 * marked `hasSubmenu` render with a trailing chevron, matching the design.
 *
 * Separators are inserted between groups via the `separatorBefore` flag so
 * the rendering can stay declarative.
 */
type ComposerAddMenuItem = {
  id: string;
  label: string;
  /** Render an inline icon to the left of the label (16×16). */
  icon: ReactNode;
  /** When true, render a trailing right-chevron to indicate a nested menu. */
  hasSubmenu?: boolean;
  /** When true, render a divider row above this item before the cell. */
  separatorBefore?: boolean;
};

const COMPOSER_ADD_MENU_ITEMS: readonly ComposerAddMenuItem[] = [
  { id: "files", label: "Add photos & files", icon: <IconAddAttach /> },
  { id: "web", label: "Web search", icon: <IconAddGlobe />, separatorBefore: true },
  { id: "skills", label: "Skills", icon: <IconAddSkills />, hasSubmenu: true },
  { id: "plugins", label: "Plugins", icon: <IconAddPlugins />, hasSubmenu: true },
  { id: "agents", label: "Agents", icon: <IconAddAgents />, hasSubmenu: true },
  { id: "effort", label: "Effort", icon: <IconAddEffort />, hasSubmenu: true, separatorBefore: true },
];

export type ComposerWidth = "large" | "medium" | "small" | "fill";

/** Shell chrome — default border vs edit (focus-style outline + Chip - Regular context chip · 782:20530). Edit is alternate-only; standard ignores `edit`. */
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

/**
 * Composer intents shown as a segmented switcher on the **alternate** variant.
 * Replaces the legacy Fast dropdown when `version="alternate"`.
 */
export const COMPOSER_INTENTS = ["ask", "agent", "plan"] as const;
export type ComposerIntent = (typeof COMPOSER_INTENTS)[number];
export const COMPOSER_INTENT_LABELS: Record<ComposerIntent, string> = {
  ask: "Ask",
  agent: "Agent",
  plan: "Plan",
};

export type ComposerProps = {
  /** Matches Figma `Width=` variants (fixed outer width). */
  width?: ComposerWidth;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /**
   * Fired when the user submits the message (clicks the send button or presses
   * Enter without Shift). Receives the trimmed value. After invoking, the
   * uncontrolled value is cleared automatically; controlled callers should
   * mirror that behavior in their `onChange` if desired.
   */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Initial speed mode for the split control / `alternate` speed switcher (defaults to `Fast`). */
  defaultMode?: ComposerMode;
  /** Initial intent for the `alternate` switcher (defaults to `ask`). Ignored on the `standard` variant. */
  defaultIntent?: ComposerIntent;
  className?: string;
  inputId?: string;
  /** Accessible name for the composer region landmark. */
  ariaComposerLabel?: string;
  /** Text for the visually hidden label on the message field. */
  ariaMessageLabel?: string;
  /** Styling variant (defaults to `standard`). */
  version?: ComposerVersion;
  /** `edit` uses blue shell border (replaces gray; no duplicate outline) and Chip - Regular · 782:20530. */
  surfaceState?: ComposerSurfaceState;
  /** Shown in the edit chip when `surfaceState` is `edit` (e.g. artifact or thread being edited). */
  editContextLabel?: string;
  /**
   * Override for the send button glyph. Used by the animated chat composer
   * to swap in the Pebble Arrow Up Mini icon. Defaults to the standard
   * stroked `IconArrowUp` defined in this package.
   */
  sendIcon?: ReactNode;
  /**
   * Picks which dropdown sits in the inline action row:
   *   - `speed`  — Fast/Pro speed dropdown (default; matches the existing
   *                Figma `standard` composer).
   *   - `intent` — Ask/Plan/Agent intent dropdown (the same control the
   *                `alternate` variant exposes, but available independently
   *                so the animated chat composer can use it on the standard
   *                shell). The trigger renders as a ghost (no border)
   *                button — see `composer-ghost-btn`.
   *
   * The `alternate` variant always renders the intent dropdown regardless
   * of this prop (and additionally surfaces the speed dropdown below the
   * field), so this prop only affects `version="standard"`.
   */
  controls?: "speed" | "intent";
  /**
   * Called when the user clicks the × inside the edit context chip.
   * When provided, the chip renders a dismiss button. Only used when
   * `surfaceState="edit"` on the `alternate` variant.
   */
  onDismissEditContext?: () => void;
};

export function Composer({
  width = "large",
  value: valueProp,
  defaultValue = "",
  onChange,
  onSubmit,
  placeholder = "Ask, make, or searching anything...",
  defaultMode = "Fast",
  defaultIntent = "ask",
  className,
  inputId: inputIdProp,
  ariaComposerLabel = "AI composer",
  ariaMessageLabel = "Message to Rippling AI",
  version = "standard",
  surfaceState = "default",
  editContextLabel,
  sendIcon,
  controls = "speed",
  onDismissEditContext,
}: ComposerProps) {
  const autoId = useId();
  const modeMenuId = useId();
  const intentMenuId = useId();
  const speedMenuId = useId();
  const addMenuId = useId();
  const inputId = inputIdProp ?? `composer-input-${autoId}`;
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolled;
  const [mode, setMode] = useState<ComposerMode>(defaultMode);
  const [intent, setIntent] = useState<ComposerIntent>(defaultIntent);
  const [modeMenuOpen, setModeMenuOpen] = useState(false);
  const [intentMenuOpen, setIntentMenuOpen] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const fastAnchorRef = useRef<HTMLDivElement>(null);
  const intentAnchorRef = useRef<HTMLDivElement>(null);
  const speedAnchorRef = useRef<HTMLDivElement>(null);
  const addAnchorRef = useRef<HTMLDivElement>(null);
  const isAlternate = version === "alternate";

  const closeAllMenus = () => {
    setModeMenuOpen(false);
    setIntentMenuOpen(false);
    setSpeedMenuOpen(false);
    setAddMenuOpen(false);
  };

  const setValue = (next: string) => {
    onChange?.(next);
    if (!isControlled) setUncontrolled(next);
  };

  const canSend = value.trim().length > 0;

  const submit = () => {
    if (!canSend) return;
    const trimmed = value.trim();
    onSubmit?.(trimmed);
    // Always reset the local field after submit; controlled callers can
    // re-set their value if they want to keep it (rare for chat composers).
    if (!isControlled) setUncontrolled("");
    else onChange?.("");
  };

  const anyComposerMenuOpen = modeMenuOpen || intentMenuOpen || speedMenuOpen || addMenuOpen;
  useDismissOnOutsidePress(
    anyComposerMenuOpen,
    () => {
      closeAllMenus();
    },
    (n) =>
      Boolean(
        fastAnchorRef.current?.contains(n) ||
          intentAnchorRef.current?.contains(n) ||
          speedAnchorRef.current?.contains(n) ||
          addAnchorRef.current?.contains(n),
      ),
  );

  const fastBtnLabel = `${mode} mode, ${modeMenuOpen ? "close menu" : "open menu"}`;

  // Show the Ask/Plan/Agent intent dropdown when (a) the alternate variant
  // is active, or (b) the consumer explicitly opted in via `controls`.
  // Standard variant + `controls="speed"` keeps the legacy Fast/Pro split.
  const showIntentControl = isAlternate || controls === "intent";

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
        {/* Stable status node so SRs reliably announce the edit-chip transition (audit: composer/role-status). */}
        <div className="composer-edit-bar" role="status" aria-live="polite" aria-atomic="true" hidden={!showEditChrome}>
          {showEditChrome ? (
            <span className="composer-edit-chip">
              <span className="composer-edit-chip__icon" aria-hidden>
                <IconComposerChipLead />
              </span>
              <span className="composer-edit-chip__label">{editContextLabel ?? "Editing"}</span>
              {onDismissEditContext ? (
                <button
                  type="button"
                  className="composer-edit-chip__dismiss"
                  aria-label="Dismiss edit context"
                  onClick={onDismissEditContext}
                >
                  <IconComposerChipClose />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
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
            onKeyDown={(e) => {
              // Enter (without Shift) submits — Shift+Enter inserts a newline.
              if (e.key === "Enter" && !e.shiftKey && canSend) {
                e.preventDefault();
                submit();
              }
            }}
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
                <ul className="composer-add-menu__list" role="none">
                  {COMPOSER_ADD_MENU_ITEMS.map((item) => (
                    <li key={item.id} className="composer-add-menu__group" role="none">
                      {item.separatorBefore ? (
                        <hr className="composer-add-menu__sep" role="separator" aria-hidden />
                      ) : null}
                      <button
                        type="button"
                        role="menuitem"
                        className="composer-add-menu__row"
                        aria-haspopup={item.hasSubmenu ? "menu" : undefined}
                        onClick={() => setAddMenuOpen(false)}
                      >
                        <span className="composer-add-menu__row-icon" aria-hidden>
                          {item.icon}
                        </span>
                        <span className="composer-add-menu__row-label">{item.label}</span>
                        {item.hasSubmenu ? (
                          <span className="composer-add-menu__row-chevron" aria-hidden>
                            <IconChevronRight />
                          </span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {showIntentControl ? (
            <div className="composer-intent-anchor" ref={intentAnchorRef}>
              <button
                type="button"
                className="composer-ghost-btn composer-intent-trigger"
                aria-label={`Composer intent: ${COMPOSER_INTENT_LABELS[intent]}, ${intentMenuOpen ? "close menu" : "open menu"}`}
                aria-expanded={intentMenuOpen}
                aria-haspopup="menu"
                aria-controls={intentMenuOpen ? intentMenuId : undefined}
                onClick={() => {
                  setIntentMenuOpen((o) => !o);
                  setModeMenuOpen(false);
                  setAddMenuOpen(false);
                  setSpeedMenuOpen(false);
                }}
              >
                <span className="composer-ghost-btn__label">{COMPOSER_INTENT_LABELS[intent]}</span>
                <IconChevronDown />
              </button>
              {intentMenuOpen ? (
                <div
                  id={intentMenuId}
                  className="composer-mode-menu composer-mode-menu--up"
                  role="menu"
                  aria-label="Composer intent"
                >
                  {COMPOSER_INTENTS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={intent === id}
                      className={[
                        "composer-mode-option",
                        intent === id ? "composer-mode-option--active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setIntent(id);
                        setIntentMenuOpen(false);
                      }}
                    >
                      {COMPOSER_INTENT_LABELS[id]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
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
          )}

          <div className="composer-spacer" aria-hidden />

          <button type="button" className="composer-icon-btn composer-voice" aria-label="Voice input">
            <IconMic />
          </button>

          <button
            type="button"
            className="composer-send"
            disabled={!canSend}
            aria-label={canSend ? "Send message" : "Send message (enter text to enable)"}
            onClick={submit}
          >
            {sendIcon ?? <IconArrowUp />}
          </button>
        </div>
      </div>

      {isAlternate ? (
        <div className="composer-speed-row">
          <div className="composer-speed-anchor" ref={speedAnchorRef}>
            <button
              type="button"
              className="composer-ghost-btn composer-ghost-btn--xs composer-speed-trigger"
              aria-label={`Response speed: ${mode}, ${speedMenuOpen ? "close menu" : "open menu"}`}
              aria-expanded={speedMenuOpen}
              aria-haspopup="menu"
              aria-controls={speedMenuOpen ? speedMenuId : undefined}
              onClick={() => {
                setSpeedMenuOpen((o) => !o);
                setIntentMenuOpen(false);
                setModeMenuOpen(false);
                setAddMenuOpen(false);
              }}
            >
              <span className="composer-ghost-btn__label">{mode}</span>
              <IconChevronDown />
            </button>
            {speedMenuOpen ? (
              <div
                id={speedMenuId}
                className="composer-mode-menu composer-mode-menu--up composer-mode-menu--xs"
                role="menu"
                aria-label="Response speed"
              >
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
                      setSpeedMenuOpen(false);
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
