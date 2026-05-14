import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { Composer } from "../Composer";
import { ExternalFileArtifact } from "./ExternalFileArtifact";
import "./ExternalArtifactInChatDemo.css";

export type ExternalArtifactInChatDemoMode = "side-chat" | "full-screen";

export type ExternalArtifactInChatDemoProps = {
  mode?: ExternalArtifactInChatDemoMode;
};

export function ExternalArtifactInChatDemo({
  mode = "side-chat",
}: ExternalArtifactInChatDemoProps) {
  const uid = useId();
  const surfaceId = `${uid}-surface`;

  return (
    <div className="ea-ic-demo" data-mode={mode}>
      <div
        id={surfaceId}
        className="ea-ic-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "External artifacts in full-screen AI workspace"
            : "External artifacts in side chat preview"
        }
      >
        <div className="ea-ic-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="ea-ic-demo__app-label">App surface</p>
          <p className="ea-ic-demo__app-body">
            Rippling AI opens from the right. The assistant surfaces externally-linked files
            directly in the thread so the user can open or review them without leaving the
            conversation.
          </p>
        </div>

        <div className="ea-ic-demo__chat-wrap">
          <div className="ea-ic-demo__chat">
            <ChatToolbar
              className="ea-ic-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />

            <div className="ea-ic-demo__thread">
              <p className="ea-ic-demo__bubble ea-ic-demo__bubble--user">
                Can you find the Q1 sales deck and the FY26 benefits overview?
              </p>

              <div className="ea-ic-demo__assistant-turn">
                <p className="ea-ic-demo__assistant-msg">
                  Found both. Here&apos;s the Q1 sales presentation from your Google Drive — it was
                  last updated by the Revenue team on March 14th and includes the regional
                  breakdown and pipeline forecasts for H1.
                </p>
                <div className="ea-ic-demo__artifact-embed">
                  <ExternalFileArtifact kind="ppt" layoutWidth="large" />
                </div>
                <p className="ea-ic-demo__assistant-msg">
                  And here&apos;s the FY26 benefits overview from the People team. This version was
                  shared company-wide in January and covers medical, dental, and the updated
                  401(k) match policy.
                </p>
                <div className="ea-ic-demo__artifact-embed">
                  <ExternalFileArtifact kind="pdf" layoutWidth="large" />
                </div>
                <p className="ea-ic-demo__assistant-msg">
                  Let me know if you want a summary of either, or if you need me to pull a
                  specific section.
                </p>
              </div>

              <p className="ea-ic-demo__bubble ea-ic-demo__bubble--user">
                Great — and the headcount planning spreadsheet?
              </p>

              <div className="ea-ic-demo__assistant-turn">
                <p className="ea-ic-demo__assistant-msg">
                  Found it. This is the Q2 headcount model owned by Finance — last edited
                  Tuesday. It has tabs for each department with approved headcount, open reqs,
                  and the projected end-of-year number.
                </p>
                <div className="ea-ic-demo__artifact-embed">
                  <ExternalFileArtifact kind="xls" layoutWidth="large" />
                </div>
                <p className="ea-ic-demo__assistant-msg">
                  The Engineering and Product tabs were updated most recently. Want me to pull
                  the delta from Q1 or flag any departments that are over budget?
                </p>
              </div>
            </div>

            <div className="ea-ic-demo__footer">
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
