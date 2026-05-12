/**
 * Reports glyph — Figma AI-components / `Reports Outline` icon used on the
 * Reports row of the Artifact tray (node 1076:18367). Three outlined columns
 * of varying height (short / tall / medium) anchored at the same baseline.
 */
import type { SVGProps } from "react";

export function IconReport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M14.75 2.25H9.25V21.75H14.75V2.25ZM13.25 3.75V20.25H10.75V3.75H13.25Z"
      />
      <path
        fill="currentColor"
        d="M21.75 7.25H16.25V21.75H21.75V7.25ZM20.25 8.75V20.25H17.75V8.75H20.25Z"
      />
      <path
        fill="currentColor"
        d="M7.75 11.25H2.25V21.75H7.75V11.25ZM3.75 20.25V12.75H6.25V20.25H3.75Z"
      />
    </svg>
  );
}
