import { useId, useRef, useState, type ReactNode } from "react";
import { useDismissOnOutsidePress } from "../../hooks/useDismissOnOutsidePress";
import "./RipplingArtifactShell.css";

/**
 * Visual variants of the artifact shell.
 *
 * - `"default"` — header + body. All actions live in the hover More menu.
 * - `"with-actions"` — adds a grey hover-revealed action bar pinned to the
 *   bottom of the card. The bar holds whatever JSX is passed in `actions`
 *   (buttons, links, inline form bits). The bar slides in on hover or
 *   keyboard focus and shares the card's bottom rounding so the surface
 *   reads as one piece.
 * - `"action-bar"` — always-visible action strip pinned between the header
 *   and the body. The strip has a warm neutral background and is shown at
 *   all times (no hover reveal). Use for artifacts where primary actions
 *   must remain permanently accessible — Figma AI-components 1129:19698.
 */
export type RipplingArtifactShellVariant = "default" | "with-actions" | "action-bar";

export type RipplingArtifactShellProps = {
  title: string;
  /** Rich body — charts, tables, source info, actions */
  children?: ReactNode;
  /** Shown on the hover row below the card (right side). */
  footerTimestamp?: string;
  className?: string;
  /** Visual variant — see {@link RipplingArtifactShellVariant}. Defaults to `"default"`. */
  variant?: RipplingArtifactShellVariant;
  /**
   * Action bar contents — rendered when `variant === "with-actions"` (hover-revealed
   * bottom bar) or `variant === "action-bar"` (always-visible strip between header and body).
   * The bar / strip is announced as `role="toolbar"` so consumers should pass focusable
   * controls (buttons, links). Pass a `<></>` to render an empty styled bar.
   */
  actions?: ReactNode;
  /**
   * Optional handlers for the hover More menu. The five rows always render in
   * two sections — pass handlers to wire them to product flows. Section 1
   * groups produce/modify actions (Download, Duplicate, Edit); section 2
   * groups anchor/inspect actions (Pin, View SQL).
   *
   * Visual + interaction parity with Figma `AI-components / Dropdown` 848:9499.
   */
  onDownload?: () => void;
  onDuplicate?: () => void;
  onEdit?: () => void;
  onPin?: () => void;
  onViewSql?: () => void;
  /**
   * When set, adds an “Add to dashboard” row (with plus icon) after Edit in the
   * More menu — Pebble Icons · Plus, 4881:292.
   */
  onAddToDashboard?: () => void;
  /**
   * Custom JSX rendered below a third divider in the More menu, in a slot
   * styled to match `.rippling-artifact-body` (12 16 16 padding). Drop
   * product-specific controls or notes here — they sit inside the menu's
   * `role="menu"` inside a labelled `role="group"` so they're announced as a
   * related set.
   */
  moreMenuSlot?: ReactNode;
  /**
   * Edit mode — Figma "Edit mode" section 1129:19972. When true:
   * - The header shows a persistent "Editing" pill chip after the title.
   * - The hover-only `…` / Expand cluster is replaced by always-visible
   *   `Cancel` and `Save` buttons (Save uses the Rippling primary fill).
   *
   * Edit mode is mutually exclusive with `variant: "with-actions"` — when
   * editing, the bottom action bar is suppressed because the header toolbar
   * already owns the primary commit/cancel intent.
   */
  editing?: boolean;
  /** Fired when the user clicks Cancel in edit mode. */
  onCancelEdit?: () => void;
  /** Fired when the user clicks Save in edit mode. */
  onSaveEdit?: () => void;
  /**
   * When true, the card swaps its default border for the
   * `--artifact-outline-active` focus token — matches the Figma
   * "click to enter edit mode" affordance where the selected artifact's
   * outline turns blue. Independent of `editing` so callers can highlight
   * artifacts that aren't yet in full edit mode.
   */
  selected?: boolean;
  /**
   * When true, forces the hover visual state — shows the action bar,
   * foot row, and header icon cluster as if the pointer were over the card.
   * Useful for demos and design-spec pages that need to snapshot the hover
   * appearance without relying on an actual pointer hover.
   */
  hover?: boolean;
};

/** Pencil/edit glyph used in the "Editing" pill — Figma 757:10345 `Left icon`. */
function IconEditingPencil() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M14.0755 4.7487L13.2515 3.9247C12.5355 3.2087 11.3749 3.2087 10.6589 3.9247L2.20752 12.376L1.38818 16.612L5.62418 15.7927L14.0755 7.34136C14.7915 6.62536 14.7915 5.4647 14.0755 4.7487Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Close glyph — Figma 757:10356 Cancel `Start icon`. */
function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden focusable="false">
      <path
        d="M11.5 3.5l-8 8M3.5 3.5l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Check glyph — Figma 757:10357 Save `Start icon`. */
function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden focusable="false">
      <path
        d="M2.5 7.5l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMoreHorizontal() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 10h1.5M9.25 10h1.5M14 10h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Expand — Figma AI-components · Icon Button instance · node 860:17473 */
function IconExpand() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M17.8332 11.3332H16.8332V7.87384L7.87384 16.8332H11.3332V17.8332H6.1665V12.6665H7.1665V16.1258L16.1258 7.1665H12.6665V6.1665H17.8332V11.3332Z"
      />
    </svg>
  );
}

/** Lucide thumbs-up (outline), scaled to 20×20 */
function IconThumbsUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 10v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Lucide thumbs-down (outline), scaled to 20×20 */
function IconThumbsDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M17 14V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
 * Menu-row icons — exported from Figma AI-components / Dropdown 848:9499.
 * Each icon is sourced from the matching "Dropdown Cell - Default" row's
 * `Left icon` frame, which Figma rendered at 16×18 with 2px top padding;
 * we crop the viewBox to `0 2 16 16` so the glyph itself fills a 16×16 box
 * without needing to re-author paths.
 */

function IconRowDownload() {
  return (
    <svg width="16" height="16" viewBox="0 2 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M10.9798 10.0635L8.49983 12.5435V3.41748H7.49983V12.5435L5.01983 10.0635L4.3125 10.7708L7.99917 14.4575L11.6858 10.7708L10.9785 10.0635H10.9798Z"
        fill="currentColor"
      />
      <path
        d="M3.1665 13.4168H2.1665V16.5835H13.8332V13.4168H12.8332V15.5835H3.1665V13.4168Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconRowDuplicate() {
  return (
    <svg width="16" height="16" viewBox="0 2 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M14.5 3.5H5.5V12.5H14.5V3.5ZM6.5 11.5V4.5H13.5V11.5H6.5Z"
        fill="currentColor"
      />
      <path
        d="M4.5 7.5H1.5V16.5H10.5V13.4793H9.5V15.5H2.5V8.5H4.5V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconRowEdit() {
  return (
    <svg width="16" height="16" viewBox="0 2 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M14.0755 4.7487L13.2515 3.9247C12.5355 3.2087 11.3749 3.2087 10.6589 3.9247L2.20752 12.376L1.38818 16.612L5.62418 15.7927L14.0755 7.34136C14.7915 6.62536 14.7915 5.4647 14.0755 4.7487ZM13.3682 6.6347L12.5209 7.48203L10.5182 5.47936L11.3655 4.63203C11.6909 4.3067 12.2189 4.3067 12.5442 4.63203L13.3682 5.45603C13.6935 5.78136 13.6935 6.30936 13.3682 6.6347ZM11.8135 8.18936L5.13352 14.8694L2.65085 15.3494L3.13085 12.8667L9.81085 6.1867L11.8135 8.18936Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconRowPin() {
  return (
    <svg width="16" height="16" viewBox="0 2 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M8.00002 2.98047L10.2887 7.5998L15.4107 8.34114L11.704 11.9405L12.5787 17.0198L8.00002 14.6218L3.42136 17.0198L4.29602 11.9405L0.589355 8.34114L5.71136 7.5998L8.00002 2.98047ZM8.00002 5.23314L6.37469 8.51447L2.74469 9.0398L5.37136 11.5905L4.75069 15.1945L8.00069 13.4925L11.2507 15.1945L10.63 11.5905L13.2567 9.0398L9.62669 8.51447L8.00069 5.23314H8.00002Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Pebble Plus — 16×16 for menu row · Pebble Icons Library 4881:292 (stroke). */
function IconRowPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRowViewSql() {
  return (
    <svg width="16" height="16" viewBox="0 2 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M8 11.3332C8.73667 11.3332 9.33333 10.7365 9.33333 9.99984C9.33333 9.26317 8.73667 8.6665 8 8.6665C7.26333 8.6665 6.66667 9.26317 6.66667 9.99984C6.66667 10.7358 7.26333 11.3332 8 11.3332Z"
        fill="currentColor"
      />
      <path
        d="M4.49064 9.9585C4.49064 8.02583 6.05797 6.4585 7.99064 6.4585C9.92331 6.4585 11.4906 8.02583 11.4906 9.9585C11.4906 11.8912 9.92331 13.4585 7.99064 13.4585C6.05797 13.4585 4.49064 11.8912 4.49064 9.9585ZM7.99064 7.4585C6.60997 7.4585 5.49064 8.57783 5.49064 9.9585C5.49064 11.3392 6.60997 12.4585 7.99064 12.4585C9.37131 12.4585 10.4906 11.3392 10.4906 9.9585C10.4906 8.57783 9.37131 7.4585 7.99064 7.4585Z"
        fill="currentColor"
      />
      <path
        d="M0.104004 9.99982L4.34667 5.75715C6.36467 3.73915 9.636 3.73915 11.6533 5.75715L15.896 9.99982L11.6533 14.2425C9.63534 16.2605 6.364 16.2605 4.34667 14.2425L0.104004 9.99982ZM1.518 9.99982L5.05334 13.5352C6.68067 15.1625 9.31867 15.1625 10.946 13.5352L14.4813 9.99982L10.946 6.46449C9.31867 4.83715 6.68067 4.83715 5.05334 6.46449L1.518 9.99982Z"
        fill="currentColor"
      />
    </svg>
  );
}

type MenuRow = {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

export function RipplingArtifactShell({
  title,
  children,
  footerTimestamp = "2:34 PM",
  className,
  variant = "default",
  actions,
  onDownload,
  onDuplicate,
  onEdit,
  onPin,
  onViewSql,
  onAddToDashboard,
  moreMenuSlot,
  editing = false,
  onCancelEdit,
  onSaveEdit,
  selected = false,
  hover = false,
}: RipplingArtifactShellProps) {
  const moreMenuId = useId();
  const moreBtnId = useId();
  const slotGroupId = useId();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreAnchorRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useDismissOnOutsidePress(
    moreOpen,
    (reason) => {
      setMoreOpen(false);
      if (reason === "escape") moreBtnRef.current?.focus();
    },
    (n) => moreAnchorRef.current?.contains(n) ?? false,
  );

  function runAction(fn?: () => void) {
    fn?.();
    setMoreOpen(false);
    moreBtnRef.current?.focus();
  }

  const primaryRows: MenuRow[] = [
    { id: "download", label: "Download", icon: <IconRowDownload />, onClick: onDownload },
    { id: "duplicate", label: "Duplicate", icon: <IconRowDuplicate />, onClick: onDuplicate },
    { id: "edit", label: "Edit", icon: <IconRowEdit />, onClick: onEdit },
    ...(onAddToDashboard
      ? [
          {
            id: "add-to-dashboard",
            label: "Add to dashboard",
            icon: <IconRowPlus />,
            onClick: onAddToDashboard,
          } satisfies MenuRow,
        ]
      : []),
  ];

  const secondaryRows: MenuRow[] = [
    { id: "pin", label: "Pin", icon: <IconRowPin />, onClick: onPin },
    { id: "view-sql", label: "View SQL", icon: <IconRowViewSql />, onClick: onViewSql },
  ];

  const withActions = variant === "with-actions" && !editing;
  const withActionStrip = variant === "action-bar" && !editing;

  return (
    <div
      className={["rippling-artifact-wrap", className].filter(Boolean).join(" ")}
      data-more-menu-open={moreOpen || undefined}
      data-variant={variant}
      data-editing={editing || undefined}
      data-selected={selected || undefined}
      data-hover={hover || undefined}
    >
      <article className="rippling-artifact">
        <header className="rippling-artifact-header">
          <h3 className="rippling-artifact-title">{title}</h3>
          {editing ? (
            <span className="rippling-artifact-edit-chip" aria-label="Editing">
              <IconEditingPencil />
              <span className="rippling-artifact-edit-chip__label">Editing</span>
            </span>
          ) : null}
          {editing ? (
            <div
              className="rippling-artifact-edit-actions"
              role="toolbar"
              aria-label="Edit mode actions"
            >
              <button
                type="button"
                className="rippling-artifact-edit-btn rippling-artifact-edit-btn--cancel"
                onClick={onCancelEdit}
              >
                <IconClose />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                className="rippling-artifact-edit-btn rippling-artifact-edit-btn--save"
                onClick={onSaveEdit}
              >
                <IconCheck />
                <span>Save</span>
              </button>
            </div>
          ) : (
            <div className="rippling-artifact-actions" role="toolbar" aria-label="Artifact actions">
              <div className="rippling-artifact-more-anchor" ref={moreAnchorRef}>
                <button
                  id={moreBtnId}
                  ref={moreBtnRef}
                  type="button"
                  className="rippling-artifact-icon-btn"
                  aria-label={moreOpen ? "Close artifact options" : "More artifact options"}
                  aria-haspopup="menu"
                  aria-expanded={moreOpen}
                  aria-controls={moreOpen ? moreMenuId : undefined}
                  onClick={() => setMoreOpen((o) => !o)}
                >
                  <IconMoreHorizontal />
                </button>
                {moreOpen ? (
                  <div
                    id={moreMenuId}
                    className="rippling-artifact-more-menu"
                    role="menu"
                    aria-labelledby={moreBtnId}
                  >
                    <div className="rippling-artifact-more-menu__group" role="group">
                      {primaryRows.map((row) => (
                        <button
                          key={row.id}
                          type="button"
                          role="menuitem"
                          className="rippling-artifact-more-menu__item"
                          onClick={() => runAction(row.onClick)}
                        >
                          <span className="rippling-artifact-more-menu__item-icon" aria-hidden>
                            {row.icon}
                          </span>
                          {row.label}
                        </button>
                      ))}
                    </div>
                    <hr className="rippling-artifact-more-menu__separator" role="separator" />
                    <div className="rippling-artifact-more-menu__group" role="group">
                      {secondaryRows.map((row) => (
                        <button
                          key={row.id}
                          type="button"
                          role="menuitem"
                          className="rippling-artifact-more-menu__item"
                          onClick={() => runAction(row.onClick)}
                        >
                          <span className="rippling-artifact-more-menu__item-icon" aria-hidden>
                            {row.icon}
                          </span>
                          {row.label}
                        </button>
                      ))}
                    </div>
                    {moreMenuSlot ? (
                      <>
                        <hr className="rippling-artifact-more-menu__separator" role="separator" />
                        <div
                          id={slotGroupId}
                          className="rippling-artifact-more-menu__slot"
                          role="group"
                          aria-label="Additional options"
                        >
                          {moreMenuSlot}
                        </div>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <button type="button" className="rippling-artifact-icon-btn" aria-label="Expand">
                <IconExpand />
              </button>
            </div>
          )}
        </header>

        {children ? <div className="rippling-artifact-body">{children}</div> : null}

        {withActionStrip ? (
          <div
            className="rippling-artifact-action-strip"
            role="toolbar"
            aria-label="Artifact actions"
          >
            {actions}
          </div>
        ) : null}

        {withActions ? (
          <div
            className="rippling-artifact-action-bar"
            role="toolbar"
            aria-label="Artifact actions"
          >
            <div className="rippling-artifact-action-bar__inner">{actions}</div>
          </div>
        ) : null}
      </article>

      <div className="rippling-artifact-foot" aria-label="Feedback and timestamp">
        <div className="rippling-artifact-reactions" role="toolbar" aria-label="Feedback">
          <button type="button" className="rippling-artifact-icon-btn" aria-label="Thumbs up">
            <IconThumbsUp />
          </button>
          <button type="button" className="rippling-artifact-icon-btn" aria-label="Thumbs down">
            <IconThumbsDown />
          </button>
        </div>
        <span className="rippling-artifact-timestamp">{footerTimestamp}</span>
      </div>
    </div>
  );
}
