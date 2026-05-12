import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { Composer } from "../Composer";
import {
  InChatTableWidget,
  NewStarterDashboardWidget,
  OfferLetterDocumentWidget,
  SpendLinkWidget,
} from "./InChatWidgets";
import "./InChatWidgetDemo.css";

export type InChatWidgetDemoMode = "side-chat" | "full-screen";

export type InChatWidgetDemoProps = {
  /** Surface mode controlled by the spec page. Defaults to `side-chat`. */
  mode?: InChatWidgetDemoMode;
};

/**
 * In-chat widget preview — a multi-turn assistant conversation that embeds
 * every widget category (Rippling link, Document, Dashboard, Table) so the
 * in-context render of each is visible side by side with its Specs row.
 * Rendered in either a side-chat panel or a full-screen workspace.
 */
export function InChatWidgetDemo({ mode = "side-chat" }: InChatWidgetDemoProps) {
  const uid = useId();
  const surfaceId = `${uid}-surface`;

  return (
    <div className="ica-demo" data-mode={mode}>
      <div
        id={surfaceId}
        className="ica-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "In-chat widgets in full-screen AI workspace"
            : "In-chat widgets side panel preview"
        }
      >
        <div className="ica-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="ica-demo__app-label">App surface</p>
          <p className="ica-demo__app-body">
            The assistant can embed compact widgets as entry points into the full report, document,
            dashboard, or sheet in product.
          </p>
        </div>
        <div className="ica-demo__chat-wrap">
          <div className="ica-demo__chat">
            <ChatToolbar
              className="ica-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />
            <div className="ica-demo__thread">
              <p className="ica-demo__bubble ica-demo__bubble--user">Show me recent orders by revenue.</p>
              <div className="ica-demo__assistant-msg">
                Here&apos;s a snapshot—open it for sortable columns and the full dataset.
                <div className="ica-demo__widget-slot">
                  <InChatTableWidget />
                </div>
              </div>

              <p className="ica-demo__bubble ica-demo__bubble--user">
                Pull up spend management and the new starter offer letter too.
              </p>
              <div className="ica-demo__assistant-msg">
                Both pinned below — open either in product.
                <div className="ica-demo__widget-slot ica-demo__widget-slot--stack">
                  <SpendLinkWidget />
                  <OfferLetterDocumentWidget />
                </div>
              </div>

              <p className="ica-demo__bubble ica-demo__bubble--user">
                And the new starter onboarding dashboard?
              </p>
              <div className="ica-demo__assistant-msg">
                Here&apos;s the current view.
                <div className="ica-demo__widget-slot">
                  <NewStarterDashboardWidget />
                </div>
              </div>
            </div>
            <div className="ica-demo__footer">
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
