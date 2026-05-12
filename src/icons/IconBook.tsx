/** Open book / handbook glyph. Used for /policy, /handbook commands. */
import type { SVGProps } from "react";

export function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M4 4.5h6a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h6a.75.75 0 0 1 .75.75v12.25a.75.75 0 0 1-.75.75h-6.25a1 1 0 0 0-.75.34l-.5.55a.75.75 0 0 1-1 0l-.5-.55a1 1 0 0 0-.75-.34H4a.75.75 0 0 1-.75-.75V5.25A.75.75 0 0 1 4 4.5Zm7 12V8a1.5 1.5 0 0 0-1.5-1.5h-4.75v10.5h5.5a2.5 2.5 0 0 1 .75.12Zm2 0a2.5 2.5 0 0 1 .75-.12h5.5V6.5h-4.75A1.5 1.5 0 0 0 13 8v8.5Z"
      />
    </svg>
  );
}
