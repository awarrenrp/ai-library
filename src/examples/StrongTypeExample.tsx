/**
 * StrongType — repeatable usage example.
 *
 * This file is the live source rendered as the spec page snippet (Vite `?raw`),
 * so it is type-checked at build time. Copy this pattern into product code:
 * the only swap is `from "../components/StrongType"` → your library path.
 */
import { StrongType } from "../components/StrongType";

/**
 * Inline label inside an assistant turn body. Use `tone="primary"` for product-
 * level scope (e.g. "AI"), `info` for state-of-the-art capability hints,
 * `critical` for restricted scope, and `positive` for completed actions.
 *
 * When the label communicates a *live state change* (e.g. "Live", "Approved")
 * pass `asStatus` so screen readers announce it via `role="status"`.
 *
 * Use `ariaLabel` whenever the visible text is abbreviated; assistive tech then
 * reads the full meaning instead of the abbreviation ("AI" → "AI generated").
 */
export function StrongTypeChatExample() {
  return (
    <section role="region" aria-label="Onboarding draft summary">
      <p>
        <StrongType tone="primary" size="sm" ariaLabel="AI generated">
          AI
        </StrongType>{" "}
        Drafted an onboarding plan for the new hire. The plan is{" "}
        <StrongType tone="info" size="sm">
          Beta
        </StrongType>{" "}
        — feedback welcome.
      </p>
      <p>
        Status:{" "}
        <StrongType tone="progress" size="sm" asStatus>
          In progress
        </StrongType>
        . Visibility:{" "}
        <StrongType tone="critical" variant="outlined" size="sm">
          Confidential
        </StrongType>
        .
      </p>
    </section>
  );
}
