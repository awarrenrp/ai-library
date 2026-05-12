/** Sparkle / AI action glyph. Used for slash commands like /summarize, /draft. */
import type { SVGProps } from "react";

export function IconSparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 2.5a.75.75 0 0 1 .71.5l1.3 3.74a3 3 0 0 0 1.85 1.86l3.74 1.3a.75.75 0 0 1 0 1.42l-3.74 1.3a3 3 0 0 0-1.86 1.85l-1.3 3.74a.75.75 0 0 1-1.41 0l-1.3-3.74a3 3 0 0 0-1.86-1.85l-3.74-1.3a.75.75 0 0 1 0-1.42l3.74-1.3a3 3 0 0 0 1.86-1.86l1.3-3.74a.75.75 0 0 1 .7-.5Z"
      />
    </svg>
  );
}
