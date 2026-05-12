/** Three-person team glyph. Used for /team, group-scope commands. */
import type { SVGProps } from "react";

export function IconTeam(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M9 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19a5.5 5.5 0 0 1 11 0v.5H2V19Zm12.5.5V19c0-1.8-.6-3.46-1.62-4.8A5.5 5.5 0 0 1 22 19v.5h-7.5Z"
      />
    </svg>
  );
}
