/** Heart glyph. Used for /benefits, wellness-style commands. */
import type { SVGProps } from "react";

export function IconHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 20.5s-7.5-4.34-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.66-7.5 10-7.5 10Z"
      />
    </svg>
  );
}
