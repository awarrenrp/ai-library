/**
 * In-chat widgets — repeatable usage example.
 *
 * This file is the live source rendered as the spec page snippet (Vite `?raw`),
 * so it is type-checked at build time. Copy this pattern into product code:
 * the only swap is `from "../components/InChatWidget"` → your library path.
 */
import {
  InChatLinkWidget,
  InChatTableWidget,
} from "../components/InChatWidget";

/** Document glyph — replace with a real icon from your product icon set. */
function IconDocument() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M4 1.5h4.5L12 5v8.5A1.5 1.5 0 0 1 10.5 15h-7A1.5 1.5 0 0 1 2 13.5v-11A1.5 1.5 0 0 1 3.5 1H4Zm4 0V5h3.5L8 1.5Z"
      />
    </svg>
  );
}

/** Skeleton lines — drop in a real preview body in product (chart, table, KPI, …). */
function SkeletonLines() {
  return (
    <div aria-hidden style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ display: "block", width: "85%", height: 3, background: "#d4d4d4", borderRadius: 4 }} />
      <span style={{ display: "block", width: "62%", height: 3, background: "#d4d4d4", borderRadius: 4 }} />
    </div>
  );
}

export type ApprovalsTurnProps = {
  onOpenSpend: () => void;
  onOpenOfferLetter: () => void;
};

/**
 * Composes one assistant turn that uses both widget categories:
 * - `InChatLinkWidget` — title + preview tile + Open affordance (Open button gets
 *   `aria-label="Open {title}"` by default; override via `openAriaLabel` when the title
 *   alone is ambiguous out of context).
 * - `InChatTableWidget` — grid only, no Open chrome (pass `ariaLabel` so the table has
 *   a real accessible name — rendered as a visually hidden `<caption>`).
 *
 * The wrapping `<section role="region" aria-label>` gives the whole assistant turn a
 * landmark so SR users can jump between turns.
 */
export function ApprovalsTurn({ onOpenSpend, onOpenOfferLetter }: ApprovalsTurnProps) {
  return (
    <section role="region" aria-label="Pending approvals">
      <p>You have 13 pending approvals. Here are the destinations and the table preview.</p>

      <InChatLinkWidget
        title="View Spend Management"
        previewCaption="Spend"
        previewIcon={<IconDocument />}
        previewBody={<SkeletonLines />}
        onOpen={onOpenSpend}
        openAriaLabel="Open Spend Management dashboard"
      />

      <InChatLinkWidget
        title="View Offer Letter"
        previewCaption="Document"
        previewIcon={<IconDocument />}
        previewBody={<SkeletonLines />}
        onOpen={onOpenOfferLetter}
        openAriaLabel="Open Offer Letter document"
      />

      <InChatTableWidget ariaLabel="Pending approvals by type, employee, and amount." />
    </section>
  );
}

/** Mounted by the spec page to prove the example renders end-to-end. */
export function InChatWidgetExample() {
  return (
    <ApprovalsTurn
      onOpenSpend={() => console.info("open spend")}
      onOpenOfferLetter={() => console.info("open offer letter")}
    />
  );
}
