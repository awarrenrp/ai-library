import { useEffect, useRef } from "react";

/**
 * Close floating UI when the user presses outside or hits Escape.
 *
 * `onDismiss` receives **outside** (pointer outside `containsTarget`) or **escape**.
 *
 * Listeners attach on the next macrotask so the same gesture that opened the UI
 * does not immediately count as an outside press.
 */
export function useDismissOnOutsidePress(
  active: boolean,
  onDismiss: (reason: "outside" | "escape") => void,
  containsTarget: (target: Node) => boolean,
): void {
  const dismissRef = useRef(onDismiss);
  const containsRef = useRef(containsTarget);
  dismissRef.current = onDismiss;
  containsRef.current = containsTarget;

  useEffect(() => {
    if (!active) return;
    let disposed = false;
    let removeListeners: (() => void) | undefined;

    const timer = window.setTimeout(() => {
      if (disposed) return;
      function onPointerDown(e: PointerEvent) {
        if (containsRef.current(e.target as Node)) return;
        dismissRef.current("outside");
      }
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") dismissRef.current("escape");
      }
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKey);
      removeListeners = () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKey);
      };
    }, 0);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      removeListeners?.();
    };
  }, [active]);
}
