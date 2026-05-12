/**
 * File / document glyph — Figma AI-components / Outline icon used on the file
 * row of the Artifact tray (node 1076:18366 → main component `Type=Outline`).
 * Folded-corner outline with three content lines inside.
 */
import type { SVGProps } from "react";

export function IconFile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...props}>
      <path fill="currentColor" d="M8 11.25H16V9.75H8V11.25Z" />
      <path fill="currentColor" d="M8 14.75H16V13.25H8V14.75Z" />
      <path fill="currentColor" d="M16 18.25H8V16.75H16V18.25Z" />
      <path
        fill="currentColor"
        d="M14.811 1.75H4.25V22.25H19.75V6.689L14.811 1.75ZM5.75 20.75V3.25H14V7.504H18.25V20.75H5.75Z"
      />
    </svg>
  );
}
