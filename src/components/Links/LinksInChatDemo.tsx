import { useId, useState } from "react";
import { Composer } from "../Composer";
import {
  IconApproveCheck,
  IconDeclineLine,
  LinksBelowChatStack,
  LinksEmphasisButton,
  LinksFileCitationRow,
  LinksHandoffCard,
  LinksRichArticleCard,
} from "./Links";
import "./LinksInChatDemo.css";

/**
 * Side chat preview — prose wraps the same link surfaces documented on this page (file citation row,
 * handoff card, web preview card, Rippling emphasis actions). Footer uses the shared Composer component (`width="fill"`).
 */
export function LinksInChatDemo() {
  const [demoOpen, setDemoOpen] = useState(true);
  const uid = useId();
  const introId = `${uid}-intro`;
  const surfaceId = `${uid}-surface`;

  return (
    <div className="links-ic-demo">
      <p id={introId} className="links-ic-demo__intro">
        Bracketed examples in the spec map to these primitives—not body underline links: inline file citation, agent handoff
        shell, external article preview, and Rippling emphasis buttons. Assistant copy sits flush in the thread; the footer uses
        the same Composer as the Composer and Chat demos.
      </p>
      <button
        type="button"
        className={[
          "links-ic-demo__trigger",
          demoOpen ? "links-ic-demo__trigger--outline" : "demo-segment",
        ].join(" ")}
        aria-expanded={demoOpen}
        aria-controls={surfaceId}
        onClick={() => setDemoOpen((o) => !o)}
      >
        {demoOpen ? "Hide example" : "Show example"}
      </button>
      <div
        id={surfaceId}
        className="links-ic-demo__surface"
        role="region"
        aria-label="Links in side chat preview"
        aria-describedby={introId}
      >
        <div className="links-ic-demo__app">
          <p className="links-ic-demo__app-label">App surface</p>
          <p className="links-ic-demo__app-body">
            Rippling AI opens from the right. Inline citations and cards mirror the standalone sections below on this page;
            the Composer stays pinned under the thread.
          </p>
        </div>
        <div
          className={["links-ic-demo__chat-wrap", demoOpen ? "links-ic-demo__chat-wrap--open" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden={!demoOpen}
        >
          <div className="links-ic-demo__chat">
            <div className="links-ic-demo__chat-head">Rippling AI</div>
            <div className="links-ic-demo__thread">
              <p className="links-ic-demo__bubble links-ic-demo__bubble--user">
                How should I handle Q4 time-off approvals before payroll lock?
              </p>
              <div className="links-ic-demo__assistant-turn">
                <div className="links-ic-demo__assistant-msg">
                  Review balances in{" "}
                  <span className="links-ic-demo__inline-embed">
                    <LinksFileCitationRow name="PTO_Policy_2025.pdf" size="312 KB" variant="document" />
                  </span>
                  .
                </div>
                <div className="links-ic-demo__assistant-msg">
                  Here&apos;s some info about your options. Looks like this query needs some additional help.
                  <br />
                  <span className="links-ic-demo__block-embed">
                    <LinksHandoffCard
                      title="Want payroll to double-check?"
                      body="I can connect you with Payroll Ops—they’ll see this thread."
                      actionLabel="Chat with an Agent"
                    />
                  </span>
                </div>
                <div className="links-ic-demo__assistant-msg">
                  Here&apos;s what I found across the web about this topic.
                  <br />
                  <span className="links-ic-demo__block-embed">
                    <LinksRichArticleCard
                      showThumbnail={false}
                      sourceName="TechCrunch"
                      sourceInitial="T"
                      dateLine="April 4th, 2025"
                      title="Why async PTO approvals reduce payroll errors"
                      snippet="Teams that batch approvals before lock see fewer amendments—and clearer audit trails for HRIS sync."
                    />
                  </span>
                </div>
                <div className="links-ic-demo__assistant-msg">
                  It looks like you have 13 pending approvals. There are 3 time sheet approvals, 6 time off requests, and 4
                  expenses that require your approval.
                  <br />
                  <span className="links-ic-demo__block-embed links-ic-demo__block-embed--actions">
                    <LinksBelowChatStack instruction="Time Off dashboard · bulk approve window">
                      <LinksEmphasisButton variant="primary" icon={<IconApproveCheck />}>
                        Approve all pending
                      </LinksEmphasisButton>
                      <LinksEmphasisButton variant="secondary" icon={<IconDeclineLine />}>
                        Reject all
                      </LinksEmphasisButton>
                    </LinksBelowChatStack>
                  </span>
                </div>
              </div>
            </div>
            <div className="links-ic-demo__footer">
              <Composer
                width="fill"
                ariaComposerLabel="Chat composer"
                ariaMessageLabel="Message to Rippling AI"
                placeholder="Ask Rippling AI anything…"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
