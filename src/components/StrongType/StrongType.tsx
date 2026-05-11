/**
 * StrongType — heavyweight label / pill component for AI surfaces.
 *
 * Used for high-impact labels that mark status, capability, or scope inside the
 * conversation (e.g. "Beta", "Live", "AI", "Confidential"). Heavier than a tag
 * or chip; meant to be visually loud without being a button.
 *
 * A11y:
 * - Inline `<span>` by default. Pass `asStatus` to render as `role="status"`
 *   for state changes that should be announced (e.g. "Live"). Don't use
 *   `asStatus` for static labels — it pollutes the SR experience.
 * - Tone colors all clear WCAG 1.4.3 AA (≥4.5:1) for the label text against
 *   the fill; see `StrongType.css` for the contrast table.
 */
import type { ReactNode } from "react";
import "./StrongType.css";

export const STRONG_TYPE_TONES = [
  "primary",
  "info",
  "neutral",
  "critical",
  "positive",
  "progress",
] as const;
export type StrongTypeTone = (typeof STRONG_TYPE_TONES)[number];

export const STRONG_TYPE_VARIANTS = ["filled", "outlined"] as const;
export type StrongTypeVariant = (typeof STRONG_TYPE_VARIANTS)[number];

export const STRONG_TYPE_SIZES = ["sm", "md"] as const;
export type StrongTypeSize = (typeof STRONG_TYPE_SIZES)[number];

export const STRONG_TYPE_TONE_LABELS: Record<StrongTypeTone, string> = {
  primary: "Primary",
  info: "Info",
  neutral: "Neutral",
  critical: "Critical",
  positive: "Positive",
  progress: "Progress",
};

export type StrongTypeProps = {
  children: ReactNode;
  /** Color treatment. Defaults to `neutral`. */
  tone?: StrongTypeTone;
  /** Filled (heavy) or outlined (chip-style). Defaults to `filled`. */
  variant?: StrongTypeVariant;
  /** `sm` = 11px label / 20px tall; `md` = 12px label / 24px tall. Defaults to `md`. */
  size?: StrongTypeSize;
  /** Optional leading icon (decorative — pass an `aria-hidden` SVG). */
  icon?: ReactNode;
  /** Override the wrapper element. Use `"button"` only when the label is interactive. */
  as?: "span" | "div" | "button";
  /** When the label communicates a live state change (e.g. "Live"), render `role="status"`. */
  asStatus?: boolean;
  /** Explicit accessible name when children alone aren't enough (e.g. abbreviated text like "AI"). */
  ariaLabel?: string;
  className?: string;
};

export function StrongType({
  children,
  tone = "neutral",
  variant = "filled",
  size = "md",
  icon,
  as = "span",
  asStatus = false,
  ariaLabel,
  className,
}: StrongTypeProps) {
  const Tag = as;
  const classes = [
    "strong-type",
    `strong-type--${variant}`,
    `strong-type--${tone}`,
    `strong-type--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      className={classes}
      role={asStatus ? "status" : undefined}
      aria-live={asStatus ? "polite" : undefined}
      aria-label={ariaLabel}
    >
      {icon ? (
        <span className="strong-type__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="strong-type__label">{children}</span>
    </Tag>
  );
}
