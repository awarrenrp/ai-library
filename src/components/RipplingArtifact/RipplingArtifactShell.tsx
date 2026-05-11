import type { ReactNode } from "react";
import "./RipplingArtifactShell.css";

export type RipplingArtifactShellProps = {
  title: string;
  /** Rich body — charts, tables, source info, actions */
  children?: ReactNode;
  /** Shown on the hover row below the card (right side). */
  footerTimestamp?: string;
  className?: string;
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
}: RipplingArtifactShellProps) {
  return (
    <div className={["rippling-artifact-wrap", className].filter(Boolean).join(" ")}>
      <article className="rippling-artifact">
        <header className="rippling-artifact-header">
          <h3 className="rippling-artifact-title">{title}</h3>
          <div className="rippling-artifact-actions" role="toolbar" aria-label="Artifact actions">
            <button type="button" className="rippling-artifact-icon-btn" aria-label="More actions">
              <IconMoreHorizontal />
            </button>
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
