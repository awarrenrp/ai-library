import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { Composer } from "../Composer";
import {
  IconApproveCheck,
  IconDeclineLine,
  IconHelpBook,
  IconSalesBriefcase,
  IconSpendCard,
  LinksBelowChatStack,
  LinksEmphasisButton,
  LinksFileCitationRow,
  LinksHandoffCard,
  LinksRichArticleCard,
} from "./Links";
import "./LinksInChatDemo.css";

export type LinksInChatDemoMode = "side-chat" | "full-screen";

export type LinksInChatDemoProps = {
  mode?: LinksInChatDemoMode;
};

/**
 * Side chat / full-screen preview — the same conversation content rendered in
 * two surface modes. The mode is controlled by the parent (spec page) so the
 * surrounding "In context" toggle drives the layout.
 */
export function LinksInChatDemo({ mode = "side-chat" }: LinksInChatDemoProps) {
  const uid = useId();
  const surfaceId = `${uid}-surface`;

  return (
    <div className="links-ic-demo" data-mode={mode}>
      <div
        id={surfaceId}
        className="links-ic-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "Links in full-screen AI workspace"
            : "Links in side chat preview"
        }
      >
        <div className="links-ic-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="links-ic-demo__app-label">App surface</p>
          <p className="links-ic-demo__app-body">
            Rippling AI opens from the right. Inline citations and cards mirror the standalone
            sections above; the Composer stays pinned under the thread.
          </p>
        </div>
        <div className="links-ic-demo__chat-wrap">
          <div className="links-ic-demo__chat">
            <ChatToolbar
              className="links-ic-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />
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
              <p className="links-ic-demo__bubble links-ic-demo__bubble--user">
                Anything else I should know about Rippling Spend before rolling it out?
              </p>
              <div className="links-ic-demo__assistant-turn">
                <div className="links-ic-demo__assistant-msg">
                  Start with the Help Center—the guides cover policy setup, approvals, and card issuance.
                  <br />
                  <span className="links-ic-demo__block-embed">
                    <LinksBelowChatStack instruction="Questions? Or check out Rippling Spend">
                      <LinksEmphasisButton variant="secondary" icon={<IconHelpBook />}>
                        Help Center
                      </LinksEmphasisButton>
                    </LinksBelowChatStack>
                  </span>
                </div>
                <div className="links-ic-demo__assistant-msg">
                  If you&apos;d like to talk through plans, pricing, or rollout timing, your Account Manager can help.
                  <br />
                  <span className="links-ic-demo__block-embed">
                    <LinksBelowChatStack instruction="Questions? Connect with your Account Manager">
                      <LinksEmphasisButton variant="secondary" icon={<IconSalesBriefcase />}>
                        Talk to sales
                      </LinksEmphasisButton>
                    </LinksBelowChatStack>
                  </span>
                </div>
                <div className="links-ic-demo__assistant-msg">
                  Ready to set things up? Jump straight into Spend to configure your first policy.
                  <br />
                  <span className="links-ic-demo__block-embed">
                    <LinksBelowChatStack instruction="Open Rippling Spend">
                      <LinksEmphasisButton variant="secondary" icon={<IconSpendCard />}>
                        View Rippling Spend
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
