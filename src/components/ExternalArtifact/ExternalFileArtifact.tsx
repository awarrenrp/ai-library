import type { ComposerWidth } from "../Composer";
import "./ExternalArtifact.css";

/**
 * External file row — Figma AI-components
 * File-type mini card: 885:14528 (Frame 1618872008 → 1618872009)
 * Row / icons: 878:7092 · PPT 909:8436 · PDF 909:8454 · XLS 909:8471 · DOC 909:8488
 */
export type ExternalFileKind = "ppt" | "pdf" | "xls" | "doc";

const FILE_META: Record<
  ExternalFileKind,
  { ext: string; accent: string; figmaIcon: string }
> = {
  ppt: { ext: "PPT", accent: "#e39d02", figmaIcon: "909:8436" },
  pdf: { ext: "PDF", accent: "#bb3d2a", figmaIcon: "909:8454" },
  xls: { ext: "XLS", accent: "#20968f", figmaIcon: "909:8471" },
  doc: { ext: "DOC", accent: "#47669f", figmaIcon: "909:8488" },
};

const SAMPLE_TITLE_BY_KIND: Record<ExternalFileKind, string> = {
  ppt: "Sales results Q1 2026",
  pdf: "FY26 benefits overview",
  xls: "Headcount planning FY26",
  doc: "Offer letter — Taylor Morgan",
};

/** Document glyph — 16×16 artboard (File icons / Document in file). */
function IconDocumentVector({ color, size = 16 }: { color: string; size?: 16 | 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill={color}
        d="M4 1.5h4.5L12 5v8.5A1.5 1.5 0 0 1 10.5 15h-7A1.5 1.5 0 0 1 2 13.5v-11A1.5 1.5 0 0 1 3.5 1H4Zm4 0V5h3.5L8 1.5Z"
      />
    </svg>
  );
}

/**
 * Google Drive logo — Wikimedia Commons “Google Drive icon (2020)”
 * @see https://commons.wikimedia.org/wiki/File:Google_Drive_icon_(2020).svg
 */
function IconGoogleDrive() {
  return (
    <svg
      className="external-file-artifact-drive-svg"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#0066da"
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
      />
      <path
        fill="#00ac47"
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
      />
      <path
        fill="#ea4335"
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
      />
      <path fill="#00832d" d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" />
      <path
        fill="#2684fc"
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
      />
      <path
        fill="#ffba00"
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
      />
    </svg>
  );
}

export type ExternalFileArtifactProps = {
  kind?: ExternalFileKind;
  title?: string;
  dateLabel?: string;
  /** When `small`, compact row: icon + title (+ date); Open only (no Drive, no file-type label). */
  layoutWidth?: ComposerWidth;
  className?: string;
};

export function ExternalFileArtifact({
  kind = "ppt",
  title: titleProp,
  dateLabel = "April 4th, 2026",
  layoutWidth = "large",
  className,
}: ExternalFileArtifactProps) {
  const meta = FILE_META[kind];
  const title = titleProp ?? SAMPLE_TITLE_BY_KIND[kind];
  const compact = layoutWidth === "small";

  return (
    <div
      className={[
        "external-file-artifact-scroll",
        compact ? "external-file-artifact-scroll--fit" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <article
        className={["external-file-artifact", compact ? "external-file-artifact--compact" : ""].filter(Boolean).join(" ")}
        aria-label={`External file: ${title}`}
      >
        {!compact ? (
          <div className="external-file-artifact-thumb">
            <div className="external-file-artifact-thumb-surface">
              <div className="external-file-artifact-thumb-surface-inner">
                <div className="external-file-artifact-thumb-head">
                  <span className="external-file-artifact-icon-wrap">
                    <IconDocumentVector color={meta.accent} size={16} />
                  </span>
                  <span className="external-file-artifact-ext">{meta.ext}</span>
                </div>
                <div className="external-file-artifact-bars" aria-hidden>
                  <span className="external-file-artifact-bar" />
                  <span className="external-file-artifact-bar" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="external-file-artifact-compact-main">
            <span className="external-file-artifact-compact-icon" aria-hidden>
              <IconDocumentVector color={meta.accent} size={16} />
            </span>
            <div className="external-file-artifact-compact-text">
              <p className="external-file-artifact-title">{title}</p>
              <p className="external-file-artifact-date">{dateLabel}</p>
            </div>
          </div>
        )}

        {!compact ? (
          <div className="external-file-artifact-main">
            <p className="external-file-artifact-title">{title}</p>
            <p className="external-file-artifact-date">{dateLabel}</p>
          </div>
        ) : null}

        <div className="external-file-artifact-actions">
          {!compact ? (
            <button type="button" className="external-file-artifact-icon-btn" aria-label="Open in Google Drive">
              <IconGoogleDrive />
            </button>
          ) : null}
          <button type="button" className="external-file-artifact-primary">
            Open
          </button>
        </div>
      </article>
    </div>
  );
}
