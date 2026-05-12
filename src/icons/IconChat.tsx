/** Speech-bubble chat glyph. Uses `currentColor` so it inherits parent text color. */
import type { SVGProps } from "react";

export function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M5 3.5h14a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H9.4l-4.07 3.39A.75.75 0 0 1 4.1 21.3l.65-3.8H5A2.5 2.5 0 0 1 2.5 15V6A2.5 2.5 0 0 1 5 3.5Z"
      />
    </svg>
  );
}
