/**
 * Artifact tray — Figma node 1410:14813 (AI-components / Artifact tray).
 *
 * A compact card listing AI artifacts from the current conversation so users
 * can recall and reopen them. One section: "Artifacts" heading + item list.
 * Each item has a coloured 24×24 icon badge (white icon inside) and a title.
 * A close/collapse button using the Figma pin icon sits at the bottom.
 *
 * Tokens (from Figma 1410:14813):
 *   - Card bg:     #f9f7f6 (warm neutral)
 *   - Card stroke: rgb(0 0 0 / 20%) · 1px
 *   - Card radius: 16px
 *   - Padding:     16px
 *   - Heading:     Basel Grotesk Medium 16/24
 *   - Item text:   Basel Grotesk Regular 14/20
 *   - Row radius:  6px · 2px padding · gap 8px
 *   - Icon badge:  24×24 · 4px radius · white icon (12×12) inside
 */

import type { ReactNode } from "react";
import { useId } from "react";
import "./ArtifactTray.css";

/* ── Figma-sourced SVG icons ────────────────────────────────────────────── */

/** Pin/tack icon — used on the close button (Figma 1410:14846 vector path). */
function IconPin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 16.663 16.663"
      fill="currentColor"
      aria-hidden
    >
      <path d="M 10.147500038146973 0.0008334716320096016 L 16.663331985473633 6.5166669340382315 L 16.22166633605957 6.9583337839710016 C 15.105833013852438 8.074167127465223 13.519999782244366 8.432500771618283 12.102499802907309 8.034167443004119 L 10.168333848317465 9.96833343449263 C 11.070833802223206 12.034166883530435 10.677499969800314 14.529999970427946 8.985833326975506 16.22166664552519 L 8.544166882832846 16.663333892822266 L 4.714166323343913 12.833333260267258 L 1.6208332777023315 15.926668153060664 L 0.7366665204366049 15.042500782880962 L 3.8299997647603354 11.94916747954478 L 0 8.119166846989772 L 0.4416666428248088 7.677499599692697 C 2.1325000127156577 5.985832924595454 4.629166920979818 5.593333549711589 6.695000330607097 6.495000247884737 L 8.629167079925537 4.560833461667614 C 8.231667081514994 3.1441667282383396 8.589166899522146 1.5583333670357713 9.705833594004314 0.4416666512506165 L 10.147500038146973 0 L 10.147500038146973 0.0008334716320096016 Z" />
    </svg>
  );
}

function IconLightning({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 8.778 11.679"
      fill="currentColor"
      aria-hidden
    >
      <path d="M 4.965999603271484 4.4644999504089355 L 5.574999809265137 0 L 0 7.2144999504089355 L 3.811499834060669 7.2144999504089355 L 3.202500104904175 11.679000854492188 L 8.77750015258789 4.4644999504089355 L 4.965999603271484 4.4644999504089355 Z" />
    </svg>
  );
}

function IconFile({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 7.75 10.25"
      fill="currentColor"
      aria-hidden
    >
      <path d="M 0 0 L 5.2804999351501465 0 L 7.75 2.4695000648498535 L 7.75 10.25 L 0 10.25 L 0 0 Z M 5.125 0.905500054359436 L 5.125 2.625 L 6.844499588012695 2.625 L 5.125 0.905500054359436 Z M 1.875 5 L 5.875 5 L 5.875 4.25 L 1.875 4.25 L 1.875 5 Z M 5.875 6.75 L 5.875 6 L 1.875 6 L 1.875 6.75 L 5.875 6.75 Z M 1.875 8.5 L 5.875 8.5 L 5.875 7.75 L 1.875 7.75 L 1.875 8.5 Z" />
    </svg>
  );
}

function IconBarChart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 9.75 9.75"
      fill="currentColor"
      aria-hidden
    >
      <path d="M 9.75 0 L 7 0 L 7 9.75 L 9.75 9.75 L 9.75 0 Z" />
      <path d="M 6.25 2.5 L 3.5 2.5 L 3.5 9.75 L 6.25 9.75 L 6.25 2.5 Z" />
      <path d="M 2.75 4.5 L 0 4.5 L 0 9.75 L 2.75 9.75 L 2.75 4.5 Z" />
    </svg>
  );
}

/* ── Component types ────────────────────────────────────────────────────── */

export type ArtifactTrayItem = {
  id: string;
  title: string;
  /** Icon rendered inside the coloured 24×24 badge. */
  icon?: ReactNode;
  /** Background colour for the icon badge (e.g. "#7a005d", "#bc2c00"). */
  iconBg?: string;
  onSelect?: () => void;
};

export type ArtifactTrayProps = {
  items: readonly ArtifactTrayItem[];
  /**
   * Visual state of the tray:
   *   - `default`: subtle baseline shadow.
   *   - `hover`:   `--shadow-md` lift. For spec previews.
   */
  state?: "default" | "hover";
  /** Force a row into hover state for spec screenshots. */
  hoveredId?: string;
  /** Fires when the close/collapse button is pressed. */
  onClose?: () => void;
  ariaLabel?: string;
  className?: string;
};

/* ── Component ──────────────────────────────────────────────────────────── */

export function ArtifactTray({
  items,
  state = "default",
  hoveredId,
  onClose,
  ariaLabel,
  className,
}: ArtifactTrayProps) {
  const autoId = useId();
  const headingId = `${autoId}-artifacts`;

  return (
    <div
      className={["artifact-tray", className].filter(Boolean).join(" ")}
      data-state={state}
      role="region"
      aria-label={ariaLabel ?? "Artifacts"}
    >
      {/* Header: title + pin/close button in the top-right corner */}
      <header className="artifact-tray__header">
        <h3 id={headingId} className="artifact-tray__section-title">
          Artifacts
        </h3>
        {onClose ? (
          <button
            type="button"
            className="artifact-tray__close-btn"
            aria-label="Close artifact tray"
            onClick={onClose}
          >
            <IconPin className="artifact-tray__close-btn-icon" />
          </button>
        ) : null}
      </header>

      <ul className="artifact-tray__list" role="list" aria-labelledby={headingId}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="artifact-tray__item"
              data-hovered={item.id === hoveredId || undefined}
              onClick={item.onSelect}
            >
              {item.icon ? (
                <span
                  className="artifact-tray__item-badge"
                  style={item.iconBg ? { background: item.iconBg } : undefined}
                  aria-hidden
                >
                  {item.icon}
                </span>
              ) : null}
              <span className="artifact-tray__item-title">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Named icon exports for consumers ──────────────────────────────────── */
export { IconLightning as ArtifactTrayIconWorkflow };
export { IconFile as ArtifactTrayIconFile };
export { IconBarChart as ArtifactTrayIconReport };
