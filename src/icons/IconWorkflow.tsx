/**
 * Workflow glyph — Figma AI-components / Outline icon used on the Workflow row
 * of the Artifact tray (node 1076:18365 → main component `Type=Outline`).
 * Renders as a lightning-bolt outline; the Figma payload uses one filled path
 * with an inner cut-out for the outline effect.
 */
import type { SVGProps } from "react";

export function IconWorkflow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M14.3722 0.321045L13.1542 9.25004H20.7772L9.62717 23.679L10.8452 14.75H3.22217L14.3722 0.321045ZM6.27717 13.25H12.5632L11.8712 18.321L17.7212 10.75H11.4352L12.1262 5.67904L6.27717 13.25Z"
      />
    </svg>
  );
}
