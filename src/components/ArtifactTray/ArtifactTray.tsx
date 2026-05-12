/**
 * Artifact tray — Figma node 1076:18510 (AI-components / Artifact tray).
 *
 * A compact card that lists recently-touched AI artifacts so users can recall
 * and reopen them. Two states are defined today: `default` (no row hovered)
 * and `hover` (a single row carries the hover affordance). Hover state is
 * normally driven by the browser (mouse / keyboard focus); the `hoveredId`
 * prop is provided so spec docs can force a row's hover state for screenshots.
 *
 * Tokens:
 *   - Card stroke: rgb(0 0 0 / 10%) · 1px
 *   - Card radius: 16px
 *   - Default shadow: 0 1px 1px rgb(0 0 0 / 5%)
 *   - Hover (card-level) shadow: var(--shadow-md)
 *   - Row hover bg: var(--artifact-overlay-hover) (rgb(0 0 0 / 10%))
 *   - Row radius: 8px
 */

import type { ReactNode } from "react";
import { useId } from "react";
import { IconClose } from "../../icons";
import "./ArtifactTray.css";

export type ArtifactTrayItem = {
  /** Stable id — used for keys, hover targeting, and as the option element id. */
  id: string;
  title: string;
  /** 24×24 outline glyph rendered on the left. `currentColor` recommended. */
  icon?: ReactNode;
  onSelect?: () => void;
};

export type ArtifactTrayProps = {
  /** Heading text (Figma default: "Artifacts"). */
  title?: string;
  items: readonly ArtifactTrayItem[];
  /**
   * Visual state of the tray as a whole:
   *   - `default`: subtle 1px shadow.
   *   - `hover`:   `--shadow-md` lift on the card. Useful for spec previews; in
   *                real usage prefer letting `:hover` on the card drive this.
   */
  state?: "default" | "hover";
  /**
   * Force a specific row into the hover state. Lets spec pages show the hover
   * visual without simulating a real pointer. Leave unset in product code —
   * `:hover` and `:focus-visible` handle it.
   */
  hoveredId?: string;
  /** Fires when the X is pressed. The tray dismiss flow is the consumer's. */
  onClose?: () => void;
  ariaLabel?: string;
  className?: string;
};

export function ArtifactTray({
  title = "Artifacts",
  items,
  state = "default",
  hoveredId,
  onClose,
  ariaLabel,
  className,
}: ArtifactTrayProps) {
  const autoId = useId();
  const headingId = `artifact-tray-heading-${autoId}`;

  return (
    <section
      className={["artifact-tray", className].filter(Boolean).join(" ")}
      data-state={state}
      aria-labelledby={ariaLabel ? undefined : headingId}
      aria-label={ariaLabel}
    >
      <header className="artifact-tray__header">
        <h3 id={headingId} className="artifact-tray__title">
          {title}
        </h3>
        <button
          type="button"
          className="artifact-tray__close"
          aria-label="Close artifact tray"
          onClick={onClose}
        >
          <IconClose className="artifact-tray__close-icon" />
        </button>
      </header>
      <ul className="artifact-tray__list" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="artifact-tray__item"
              data-hovered={item.id === hoveredId || undefined}
              onClick={item.onSelect}
            >
              {item.icon ? (
                <span className="artifact-tray__item-icon" aria-hidden>
                  {item.icon}
                </span>
              ) : null}
              <span className="artifact-tray__item-title">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
