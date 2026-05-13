import { useState } from "react";
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
  LinksInChatDemo,
  type LinksInChatDemoMode,
  LinksRichArticleCard,
  LinksSourcesChip,
  LinksTextLink,
} from "../components/Links";
import { Button } from "../pebbleButton";
import "../App.css";

const FIGMA_SPEC =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=427-103840";

const LINKS_WHEN = [
  "The answer needs a destination — citation, next step, or external reference.",
  "The destination is one of: inline link, below-chat pattern, or Rippling product route.",
];

const LINKS_DESIGN_INTENT = [
  "Inline links stay lightweight and live inside the answer.",
  "Below-chat patterns give thread-adjacent moments (handoff, external preview) their own surface.",
  "Rippling links read as unmistakable CTAs into the product.",
];

const LINKS_DOS = [
  "Only one primary CTA, with the fewest number of buttons as possible. If we want to provide additional links, we can use regular text links.",
];

const LINKS_DONTS = ["Crowd responses with multiple paths. We don\u2019t want to confuse users."];

export function LinksPage() {
  const [contextMode, setContextMode] = useState<LinksInChatDemoMode>("side-chat");
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

      <ComponentIntentPanel
        when={LINKS_WHEN}
        designIntent={LINKS_DESIGN_INTENT}
        dos={LINKS_DOS}
        donts={LINKS_DONTS}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

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
        <div className="links-spec-surface">
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
        </div>
      </section>

      <section className="links-spec-section" aria-labelledby="links-below-heading" id="links-below">
        <div className="links-spec-surface">
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
        </div>
      </section>

      <section className="links-spec-section" aria-labelledby="links-rippling-heading" id="links-rippling">
        <div className="links-spec-surface">
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
        </div>
      </section>

      <hr className="page-section__divider" aria-hidden="true" />

      <section
        className="in-context-stage"
        id="links-in-context"
        aria-labelledby="links-in-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="links-in-context-heading" className="in-context-stage__title">
              In context
            </h2>
            <p className="in-context-stage__lede">
              Same conversation, two surface modes. Toggle to compare how the link patterns sit in a
              side panel versus a full-screen workspace.
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="Links surface mode">
            <Button
              type={Button.TYPES.BUTTON}
              appearance={contextMode === "side-chat" ? Button.APPEARANCES.PRIMARY : Button.APPEARANCES.OUTLINE}
              size={Button.SIZES.M}
              aria-pressed={contextMode === "side-chat"}
              onClick={() => setContextMode("side-chat")}
            >
              Side chat
            </Button>
            <Button
              type={Button.TYPES.BUTTON}
              appearance={contextMode === "full-screen" ? Button.APPEARANCES.PRIMARY : Button.APPEARANCES.OUTLINE}
              size={Button.SIZES.M}
              aria-pressed={contextMode === "full-screen"}
              onClick={() => setContextMode("full-screen")}
            >
              Full screen
            </Button>
          </div>
        </div>
        <LinksInChatDemo mode={contextMode} />
      </section>
    </main>
  );
}
