import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import {
  IconApproveCheck,
  IconDeclineLine,
  IconHelpBook,
  IconSalesBriefcase,
  IconSpendCard,
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
  "Rippling AI chat supports three kinds of destinations: links inside the assistant message (linked text or citation chips), emphasized patterns directly below the chat (agent handoff and external web previews), and Rippling-specific actions that route into product, help, sales, or approvals.";

const LINKS_DESIGN_INTENT = (
  <>
    <p>
      There are a few patterns for links that we provide: links within the message, below the chat, and Rippling links.
      We split them so lightweight navigation can stay inside the answer, thread-adjacent moments get their own surface,
      and in-product next steps stay unmistakable as CTAs.
    </p>
    <div>
      <p className="component-intent-panel__dos-donts-label">Dos</p>
      <ul className="component-intent-panel__dos-list">
        <li>
          Only one primary CTA, with the fewest number of buttons as possible. If we want to provide additional links, we
          can use regular text links.
        </li>
      </ul>
    </div>
    <div>
      <p className="component-intent-panel__dos-donts-label">Don&apos;ts</p>
      <ul className="component-intent-panel__dont-list">
        <li>Crowd responses with multiple paths. We don&apos;t want to confuse users.</li>
      </ul>
    </div>
  </>
);

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
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>
          Links
        </h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Chat supports three link families: <strong style={{ fontWeight: "var(--font-weight-heading)", color: "#000000" }}>in the message</strong>{" "}
          (linked text or chips), <strong style={{ fontWeight: "var(--font-weight-heading)", color: "#000000" }}>below the chat</strong>{" "}
          (agent handoff and external web previews), and <strong style={{ fontWeight: "var(--font-weight-heading)", color: "#000000" }}>Rippling links</strong>{" "}
          (in-product routes such as approvals, Help, sales, and product entry).
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <a href={FIGMA_SPEC} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Figma · AI-components (Links)
          </a>
        </p>
      </header>

      <ComponentIntentPanel when={LINKS_WHEN} designIntent={LINKS_DESIGN_INTENT} />

      <nav className="links-spec-toc" aria-label="On this page">
        <p className="links-spec-toc-label">On this page</p>
        <ul className="links-spec-toc-list">
          <li>
            <a href="#links-inline">In the message</a>
          </li>
          <li>
            <a href="#links-below">Below the chat</a>
          </li>
          <li>
            <a href="#links-rippling">Rippling links</a>
          </li>
        </ul>
      </nav>

      <section className="links-spec-section" aria-labelledby="links-inline-heading" id="links-inline">
        <h2 id="links-inline-heading">In the message</h2>
        <p>
          Inline destinations are either <strong style={{ fontWeight: "var(--font-weight-heading)", color: "#000000" }}>linked text</strong>{" "}
          (body style—plum, underlined) or <strong style={{ fontWeight: "var(--font-weight-heading)", color: "#000000" }}>chips</strong>{" "}
          such as sources counts and compact file citation rows.
        </p>

        <div className="links-spec-stage">
          <div className="links-spec-example">
            <LinksChatLine>
              You can review accruals any time in the{" "}
              <LinksTextLink href="#">Time Off dashboard</LinksTextLink> before approving requests. For benchmarks, see the{" "}
              <LinksTextLink href="#" variant="external">
                Industry HR report (PDF)
              </LinksTextLink>
              .
            </LinksChatLine>
          </div>

          <div className="links-spec-example">
            <h3 className="links-spec-subhead" style={{ marginTop: 0 }}>
              Source / citation (in context)
            </h3>
            <p className="links-spec-example-desc">
              Bundle provenance in-thread: a compact sources chip plus file rows that match attachment conventions (icon,
              truncated name, size).
            </p>
            <LinksSourcesChip count={2} />
            <LinksFileBlock kind="PDF">
              <LinksFileCitationRow name="Magnificent_Blue_W....pdf" size="446.6 KB" variant="document" />
            </LinksFileBlock>
          <LinksFileBlock kind="Image">
            <LinksFileCitationRow name="Magnificent_Blue_W....png" size="446.6 KB" variant="image" />
          </LinksFileBlock>
          </div>
        </div>
      </section>

      <section className="links-spec-section" aria-labelledby="links-below-heading" id="links-below">
        <h2 id="links-below-heading">Below the chat</h2>
        <p>
          Patterns that sit under the scrollable thread—not mixed into body copy—when the next step should feel deliberate:
          handing off to a human agent, or leaving Rippling for the open web with an{" "}
          <strong style={{ fontWeight: "var(--font-weight-heading)", color: "#000000" }}>external link</strong> preview
          card (source, date, headline, snippet, thumbnail).
        </p>

        <div className="links-spec-stage">
          <div className="links-spec-example" id="links-below-handoff">
            <p className="links-spec-example-title">Agent handoff</p>
            <p className="links-spec-example-desc">Support shell with info-style primary action.</p>
            <LinksHandoffCard
              title="This needs a support agent"
              body="Okay, I'm transferring you to Naomi, a payroll specialist. I'll share this conversation so you won't need to repeat yourself."
              actionLabel="Chat with an Agent"
            />
          </div>

          <div className="links-spec-example" id="links-below-external">
            <p className="links-spec-example-title">External link</p>
            <p className="links-spec-example-desc">
              Rich preview before navigating away: publication initial on the source badge; generic thumb illustration when no
              image URL is wired.
            </p>
            <LinksRichArticleCard
              sourceName="TechCrunch"
              sourceInitial="T"
              dateLine="April 4th, 2025"
              title="Blue whales, the largest animals to have ever existed on Earth"
              snippet="Blue whales, the largest animals to have ever existed on Earth, are awe-inspiring creatures that continue to captivate scientists and nature enthusiasts alike…."
            />
          </div>
        </div>
      </section>

      <section className="links-spec-section" aria-labelledby="links-rippling-heading" id="links-rippling">
        <h2 id="links-rippling-heading">Rippling links</h2>
        <p>
          In-product destinations surfaced as emphasized actions—bulk workflows, Help Center, sales, and dedicated product
          entry. Pair stacks with a short instruction line when the destination needs framing.
        </p>

        <div className="links-spec-stage">
          <div className="links-spec-example" id="links-rippling-bulk">
            <p className="links-spec-example-title">Bulk actions</p>
            <p className="links-spec-example-desc">Primary workflow CTAs with optional count badges.</p>
            <LinksBelowChatStack instruction="Time Off dashboard">
              <LinksEmphasisButton variant="primary" icon={<IconApproveCheck />}>
                Approve all requests
              </LinksEmphasisButton>
              <LinksEmphasisButton variant="secondary" icon={<IconDeclineLine />}>
                Decline all requests
              </LinksEmphasisButton>
            </LinksBelowChatStack>
          </div>

          <div className="links-spec-example" id="links-rippling-help">
            <p className="links-spec-example-title">Help &amp; resources</p>
            <p className="links-spec-example-desc">Secondary actions with destination-specific icons.</p>
            <LinksBelowChatStack instruction="Questions? Or check out Rippling Spend">
              <LinksEmphasisButton variant="secondary" icon={<IconHelpBook />}>
                Help Center
              </LinksEmphasisButton>
            </LinksBelowChatStack>
          </div>

          <div className="links-spec-example" id="links-rippling-sales">
            <p className="links-spec-example-title">Sales</p>
            <LinksBelowChatStack instruction="Questions? Connect with your Account Manager">
              <LinksEmphasisButton variant="secondary" icon={<IconSalesBriefcase />}>
                Talk to sales
              </LinksEmphasisButton>
            </LinksBelowChatStack>
          </div>

          <div className="links-spec-example" id="links-rippling-product">
            <p className="links-spec-example-title">Product entry</p>
            <LinksBelowChatStack instruction="Questions? Connect with your Account Manager">
              <LinksEmphasisButton variant="secondary" icon={<IconSpendCard />}>
                View Rippling Spend
              </LinksEmphasisButton>
            </LinksBelowChatStack>
          </div>
        </div>
      </section>
    </main>
  );
}
