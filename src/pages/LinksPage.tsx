import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import {
  LinksBelowChatStack,
  LinksChatLine,
  LinksEmphasisButton,
  LinksFileBlock,
  LinksFileCitationRow,
  LinksHandoffCard,
  LinksRichArticleCard,
  LinksSourcesChip,
  LinksTextLink,
} from "../components/Links";
import "../App.css";

const FIGMA_SPEC =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=427-103840";

const LINKS_WHEN =
  "When Rippling AI cites web or file sources, routes users into product flows, or needs a clear next step—links appear either inline in the assistant message or as emphasized actions outside the scrollable thread (typically directly under the chat / composer).";

const LINKS_DESIGN_INTENT =
  "Inline links stay typographic (text links, citation chips, compact file rows) so they read as part of the answer. Actions that complete a workflow—approve/deny, open Help Center, transfer to an agent, talk to sales—use button affordances and optional instruction lines beneath them when extra context helps. Rich external URLs can show a preview card with source, date, title, snippet, and thumbnail. Keep hierarchy obvious: inline = lightweight navigation; below-chat = deliberate emphasis.";

export function LinksPage() {
  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Links
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>Links</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Patterns for destinations surfaced by Rippling AI—inline in the thread, as citations, as rich previews, and as
          emphasized actions below the chat when the next step should feel deliberate.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <a href={FIGMA_SPEC} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Figma · AI-components (Links)
          </a>
        </p>
      </header>

      <ComponentIntentPanel when={LINKS_WHEN} designIntent={LINKS_DESIGN_INTENT} />

      <section className="links-spec-section" aria-labelledby="links-inline-heading">
        <h2 id="links-inline-heading">In the message (inline)</h2>
        <p>
          Text links sit on the body style—plum, underlined—so they scan as tappable without overpowering the answer.
        </p>
        <div className="links-spec-stage">
          <div className="links-spec-label-row">
            <span className="links-spec-pill">Text link</span>
            <span className="links-spec-pill">Internal link</span>
          </div>
          <LinksChatLine>
            You can review accruals any time in the{" "}
            <LinksTextLink href="#">Time Off dashboard</LinksTextLink> before approving requests.
          </LinksChatLine>
        </div>

        <h3 className="links-spec-subhead">Source / citation (in context)</h3>
        <p>
          Bundle provenance in-thread: a compact sources chip plus file rows that match attachment conventions (icon,
          truncated name, size).
        </p>
        <div className="links-spec-stage">
          <LinksSourcesChip count={2} />
          <LinksFileBlock kind="PDF">
            <LinksFileCitationRow name="Magnificent_Blue_W....pdf" size="446.6 KB" variant="document" />
          </LinksFileBlock>
          <LinksFileBlock kind="Video">
            <LinksFileCitationRow name="Magnificent_Blue_W....pdf" size="446.6 KB" variant="video" />
          </LinksFileBlock>
        </div>
      </section>

      <section className="links-spec-section" aria-labelledby="links-rich-heading">
        <h2 id="links-rich-heading">Rich external preview</h2>
        <p>
          When the model references the open web, a preview card summarizes the page—source, date, headline, and
          snippet—before the user leaves Rippling.
        </p>
        <div className="links-spec-stage">
          <div className="links-spec-label-row">
            <span className="links-spec-pill">External link</span>
            <span className="links-spec-pill">Action</span>
          </div>
          <LinksRichArticleCard
            sourceName="Techcrunch"
            dateLine="April 4th, 2025"
            title="Blue whales, the largest animals to have ever existed on Earth"
            snippet="Blue whales, the largest animals to have ever existed on Earth, are awe-inspiring creatures that continue to captivate scientists and nature enthusiasts alike…."
          />
        </div>
      </section>

      <section className="links-spec-section" aria-labelledby="links-below-heading">
        <h2 id="links-below-heading">Below the chat (emphasis)</h2>
        <p>
          Use the area under the conversation when the user should notice a primary workflow—approvals, handoffs, Help
          Center, sales, or product entry points. Pair actions with a short instruction line when the destination needs
          framing.
        </p>
        <div className="links-spec-stage">
          <LinksBelowChatStack instruction="Time Off dashboard">
            <LinksEmphasisButton variant="primary" badge="1">
              Approve all requests
            </LinksEmphasisButton>
            <LinksEmphasisButton variant="secondary" badge="1">
              Decline all requests
            </LinksEmphasisButton>
          </LinksBelowChatStack>

          <LinksHandoffCard
            title="This needs a support agent"
            body="Okay, I'm transferring you to Naomi, a payroll specialist. I'll share this conversation so you won't need to repeat yourself."
            actionLabel="Chat with an Agent"
          />

          <LinksBelowChatStack instruction="Questions? Or check out Rippling Spend">
            <LinksEmphasisButton variant="secondary">Help Center</LinksEmphasisButton>
          </LinksBelowChatStack>

          <LinksBelowChatStack instruction="Questions? Connect with your Account Manager">
            <LinksEmphasisButton variant="secondary">Talk to sales</LinksEmphasisButton>
          </LinksBelowChatStack>

          <LinksBelowChatStack instruction="Questions? Connect with your Account Manager">
            <LinksEmphasisButton variant="secondary">View Rippling Spend</LinksEmphasisButton>
          </LinksBelowChatStack>
        </div>
      </section>
    </main>
  );
}
