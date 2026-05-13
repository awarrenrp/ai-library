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
                  Found both — here&apos;s the Q1 sales presentation from your Google Drive:
                </p>
                <div className="ea-ic-demo__artifact-embed">
                  <ExternalFileArtifact kind="ppt" layoutWidth="large" />
                </div>
                <p className="ea-ic-demo__assistant-msg">
                  And the benefits overview for FY26:
                </p>
                <div className="ea-ic-demo__artifact-embed">
                  <ExternalFileArtifact kind="pdf" layoutWidth="large" />
                </div>
              </div>

              <p className="ea-ic-demo__bubble ea-ic-demo__bubble--user">
                Great — and the headcount planning spreadsheet?
              </p>

              <div className="ea-ic-demo__assistant-turn">
                <p className="ea-ic-demo__assistant-msg">
                  Here it is — last updated last week:
                </p>
                <div className="ea-ic-demo__artifact-embed">
                  <ExternalFileArtifact kind="xls" layoutWidth="large" />
                </div>
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
