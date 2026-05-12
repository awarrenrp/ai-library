import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import "./RipplingArtifactShell.css";

export type RipplingArtifactShellProps = {
  title: string;
  /** Rich body — charts, tables, source info, actions */
  children?: ReactNode;
  /** Shown on the hover row below the card (right side). */
  footerTimestamp?: string;
  className?: string;
  /**
   * Optional handlers for the hover More menu (… icon next to Expand).
   * The three rows always render; pass handlers to wire them to product flows.
   */
  onViewDetail?: () => void;
  onEditPage?: () => void;
  onDownload?: () => void;
  /**
   * Custom JSX rendered below the divider in the More menu, in a slot styled to
   * match `.rippling-artifact-body` (12px 16px 16px padding). Drop product-specific
   * controls, form bits, or notes here — they sit inside the menu's `role="menu"`
   * inside a labelled `role="group"` so they're announced as a related set.
   */
  moreMenuSlot?: ReactNode;
};

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

export function RipplingArtifactShell({
  title,
  children,
  footerTimestamp = "2:34 PM",
  className,
  onViewDetail,
  onEditPage,
  onDownload,
  moreMenuSlot,
}: RipplingArtifactShellProps) {
  const moreMenuId = useId();
  const moreBtnId = useId();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreAnchorRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      if (moreAnchorRef.current?.contains(e.target as Node)) return;
      setMoreOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMoreOpen(false);
        moreBtnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  function runAction(fn?: () => void) {
    fn?.();
    setMoreOpen(false);
    moreBtnRef.current?.focus();
  }

  return (
    <div
      className={["rippling-artifact-wrap", className].filter(Boolean).join(" ")}
      data-more-menu-open={moreOpen || undefined}
    >
      <article className="rippling-artifact">
        <header className="rippling-artifact-header">
          <h3 className="rippling-artifact-title">{title}</h3>
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
                  <button
                    type="button"
                    role="menuitem"
                    className="rippling-artifact-more-menu__item"
                    onClick={() => runAction(onViewDetail)}
                  >
                    View detail
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="rippling-artifact-more-menu__item"
                    onClick={() => runAction(onEditPage)}
                  >
                    Edit page
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="rippling-artifact-more-menu__item"
                    onClick={() => runAction(onDownload)}
                  >
                    Download
                  </button>
                  {moreMenuSlot ? (
                    <>
                      <hr className="rippling-artifact-more-menu__divider" aria-hidden />
                      <div
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
        </header>

        {children ? <div className="rippling-artifact-body">{children}</div> : null}
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
