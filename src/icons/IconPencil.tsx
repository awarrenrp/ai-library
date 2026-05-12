/** Pencil / edit glyph. Used for slash commands like /draft, /rewrite. */
import type { SVGProps } from "react";

export function IconPencil(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="m14.06 4.94 4 4-9.6 9.6a2 2 0 0 1-.9.52l-3.7 1.1a.75.75 0 0 1-.93-.93l1.1-3.7a2 2 0 0 1 .52-.9l9.51-9.69Zm5.06 2.94-1.94-1.94a2.5 2.5 0 0 0-3.54 0L12.2 7.46l5.13 5.13 1.49-1.5a2.5 2.5 0 0 0 0-3.54L19.12 7.88Z"
      />
    </svg>
  );
}
