/** Close X glyph — Figma "V2 Close" mark, normalized to a 24x24 viewBox. */
import type { SVGProps } from "react";

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...props}>
      <path
        d="M6.75 6.75l10.5 10.5M17.25 6.75l-10.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
