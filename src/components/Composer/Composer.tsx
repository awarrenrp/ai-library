/**
 * Composer — primary AI input (Rippling AI-components).
 * Figma: https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=1-6915
 * Add menu: https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=72-4451
 *
 * Typography: Inter (variable, loaded in index.html).
 */

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Button, IconButton, iconTypes } from "../../pebbleButton";
import "./Composer.css";
import {
  IconAddAgents,
  IconAddAttach,
  IconAddEffort,
  IconAddGlobe,
  IconAddPlugins,
  IconAddSkills,
  IconArrowUp,
  IconChevronRight,
  IconComposerChipLead,
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
  /** `edit` uses blue shell border (replaces gray; no duplicate outline) and Chip Regular · 865:10482. */
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

  useEffect(() => {
    const anyOpen = modeMenuOpen || intentMenuOpen || speedMenuOpen || addMenuOpen;
    if (!anyOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (fastAnchorRef.current?.contains(t)) return;
      if (intentAnchorRef.current?.contains(t)) return;
      if (speedAnchorRef.current?.contains(t)) return;
      if (addAnchorRef.current?.contains(t)) return;
      closeAllMenus();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAllMenus();
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [modeMenuOpen, intentMenuOpen, speedMenuOpen, addMenuOpen]);

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
            <IconButton
              icon={iconTypes.ADD}
              aria-label={addMenuOpen ? "Close add menu" : "Add attachment"}
              aria-expanded={addMenuOpen}
              aria-haspopup="dialog"
              aria-controls={addMenuOpen ? addMenuId : undefined}
              appearance={IconButton.APPEARANCES.OUTLINE}
              size={IconButton.SIZES.M}
              onClick={() => {
                setAddMenuOpen((o) => !o);
                setModeMenuOpen(false);
              }}
            />
            {addMenuOpen ? (
              <div id={addMenuId} className="composer-add-menu" role="group" aria-label="Add to message">
                <ul className="composer-add-menu__list" role="none">
                  {COMPOSER_ADD_MENU_ITEMS.map((item) => (
                    <li key={item.id} className="composer-add-menu__group" role="none">
                      {item.separatorBefore ? (
                        <hr className="composer-add-menu__sep" role="separator" aria-hidden />
                      ) : null}
                      <div className="composer-add-menu__pebble-wrap">
                        <Button
                          type={Button.TYPES.BUTTON}
                          variant={Button.VARIANTS.TEXT}
                          appearance={Button.APPEARANCES.GHOST}
                          isFluid
                          fontInherit
                          size={Button.SIZES.M}
                          aria-haspopup={item.hasSubmenu ? "dialog" : undefined}
                          onClick={() => setAddMenuOpen(false)}
                        >
                          <>
                            <span className="composer-add-menu__row-icon" aria-hidden>
                              {item.icon}
                            </span>
                            <span className="composer-add-menu__row-label">{item.label}</span>
                            {item.hasSubmenu ? (
                              <span className="composer-add-menu__row-chevron" aria-hidden>
                                <IconChevronRight />
                              </span>
                            ) : null}
                          </>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {showIntentControl ? (
            <div className="composer-intent-anchor" ref={intentAnchorRef}>
              <Button
                type={Button.TYPES.BUTTON}
                variant={Button.VARIANTS.TEXT}
                appearance={Button.APPEARANCES.GHOST}
                fontInherit
                size={Button.SIZES.M}
                icon={{
                  type: iconTypes.V2_CHEVRON_DOWN,
                  alignment: Button.ICON_ALIGNMENTS.RIGHT,
                }}
                aria-label={`Composer intent: ${COMPOSER_INTENT_LABELS[intent]}, ${intentMenuOpen ? "close menu" : "open menu"}`}
                aria-expanded={intentMenuOpen}
                aria-haspopup="dialog"
                aria-controls={intentMenuOpen ? intentMenuId : undefined}
                onClick={() => {
                  setIntentMenuOpen((o) => !o);
                  setModeMenuOpen(false);
                  setAddMenuOpen(false);
                  setSpeedMenuOpen(false);
                }}
              >
                {COMPOSER_INTENT_LABELS[intent]}
              </Button>
              {intentMenuOpen ? (
                <div
                  id={intentMenuId}
                  className="composer-mode-menu composer-mode-menu--up"
                  role="group"
                  aria-label="Composer intent"
                >
                  {COMPOSER_INTENTS.map((id) => (
                    <Button
                      key={id}
                      type={Button.TYPES.BUTTON}
                      variant={Button.VARIANTS.TEXT}
                      appearance={intent === id ? Button.APPEARANCES.ACTIVE : Button.APPEARANCES.GHOST}
                      isFluid
                      fontInherit
                      size={Button.SIZES.M}
                      onClick={() => {
                        setIntent(id);
                        setIntentMenuOpen(false);
                      }}
                    >
                      {COMPOSER_INTENT_LABELS[id]}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="composer-fast-anchor" ref={fastAnchorRef}>
              <Button
                type={Button.TYPES.BUTTON}
                variant={Button.VARIANTS.TEXT}
                appearance={Button.APPEARANCES.GHOST}
                fontInherit
                size={Button.SIZES.M}
                icon={{
                  type: iconTypes.V2_CHEVRON_DOWN,
                  alignment: Button.ICON_ALIGNMENTS.RIGHT,
                }}
                aria-label={fastBtnLabel}
                aria-expanded={modeMenuOpen}
                aria-haspopup="dialog"
                aria-controls={modeMenuOpen ? modeMenuId : undefined}
                onClick={() => {
                  setModeMenuOpen((o) => !o);
                  setAddMenuOpen(false);
                }}
              >
                {mode}
              </Button>
              {modeMenuOpen && (
                <div id={modeMenuId} className="composer-mode-menu" role="group" aria-label="Response mode">
                  {COMPOSER_MODES.map((m) => (
                    <Button
                      key={m}
                      type={Button.TYPES.BUTTON}
                      variant={Button.VARIANTS.TEXT}
                      appearance={mode === m ? Button.APPEARANCES.ACTIVE : Button.APPEARANCES.GHOST}
                      isFluid
                      fontInherit
                      size={Button.SIZES.M}
                      onClick={() => {
                        setMode(m);
                        setModeMenuOpen(false);
                      }}
                    >
                      {m}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="composer-spacer" aria-hidden />

          <IconButton
            icon={iconTypes.MICROPHONE_OUTLINE}
            aria-label="Voice input"
            appearance={IconButton.APPEARANCES.OUTLINE}
            size={IconButton.SIZES.M}
          />

          <Button
            type={Button.TYPES.BUTTON}
            appearance={Button.APPEARANCES.PRIMARY}
            size={Button.SIZES.M}
            isDisabled={!canSend}
            aria-label={canSend ? "Send message" : "Send message (enter text to enable)"}
            onClick={submit}
          >
            {sendIcon ?? <IconArrowUp />}
          </Button>
        </div>
      </div>

      {isAlternate ? (
        <div className="composer-speed-row">
          <div className="composer-speed-anchor" ref={speedAnchorRef}>
            <Button
              type={Button.TYPES.BUTTON}
              variant={Button.VARIANTS.TEXT}
              appearance={Button.APPEARANCES.GHOST}
              fontInherit
              size={Button.SIZES.S}
              icon={{
                type: iconTypes.V2_CHEVRON_DOWN,
                alignment: Button.ICON_ALIGNMENTS.RIGHT,
              }}
              aria-label={`Response speed: ${mode}, ${speedMenuOpen ? "close menu" : "open menu"}`}
              aria-expanded={speedMenuOpen}
              aria-haspopup="dialog"
              aria-controls={speedMenuOpen ? speedMenuId : undefined}
              onClick={() => {
                setSpeedMenuOpen((o) => !o);
                setIntentMenuOpen(false);
                setModeMenuOpen(false);
                setAddMenuOpen(false);
              }}
            >
              {mode}
            </Button>
            {speedMenuOpen ? (
              <div
                id={speedMenuId}
                className="composer-mode-menu composer-mode-menu--up composer-mode-menu--xs"
                role="group"
                aria-label="Response speed"
              >
                {COMPOSER_MODES.map((m) => (
                  <Button
                    key={m}
                    type={Button.TYPES.BUTTON}
                    variant={Button.VARIANTS.TEXT}
                    appearance={mode === m ? Button.APPEARANCES.ACTIVE : Button.APPEARANCES.GHOST}
                    isFluid
                    fontInherit
                    size={Button.SIZES.S}
                    onClick={() => {
                      setMode(m);
                      setSpeedMenuOpen(false);
                    }}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
