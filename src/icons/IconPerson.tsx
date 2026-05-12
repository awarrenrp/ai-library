/** Single-person glyph. Used for @-mentions (people) and /manager-style commands. */
import type { SVGProps } from "react";

export function IconPerson(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0 .75.75 0 0 1-.75.75H5.25A.75.75 0 0 1 4.5 20Z"
      />
    </svg>
  );
}
