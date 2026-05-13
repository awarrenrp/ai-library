import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { StrongTypeComposerExample } from "../../examples/StrongTypeExample";
import "./StrongTypeInChatDemo.css";

export type StrongTypeInChatDemoMode = "side-chat" | "full-screen";

export type StrongTypeInChatDemoProps = {
  mode?: StrongTypeInChatDemoMode;
};

export function StrongTypeInChatDemo({ mode = "side-chat" }: StrongTypeInChatDemoProps) {
  const uid = useId();

  return (
    <div className="st-ic-demo" data-mode={mode}>
      <div
        id={`${uid}-surface`}
        className="st-ic-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "Strong type in full-screen AI workspace"
            : "Strong type in side chat preview"
        }
      >
        <div className="st-ic-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="st-ic-demo__app-label">App surface</p>
          <p className="st-ic-demo__app-body">
            The slash-command and mention menus open directly from the composer at the
            bottom of the chat panel. Type <code>/</code> or <code>@</code> to try it.
          </p>
        </div>

        <div className="st-ic-demo__chat-wrap">
          <div className="st-ic-demo__chat">
            <ChatToolbar
              className="st-ic-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />

            <div className="st-ic-demo__thread">
              <p className="st-ic-demo__bubble st-ic-demo__bubble--user">
                Who should I loop in on the Q4 headcount plan?
              </p>
              <p className="st-ic-demo__assistant-msg">
                Loop in your HRBP and finance BP — they'll both need sign-off before the plan
                goes to leadership. You can mention them directly below with{" "}
                <code>@</code>.
              </p>
            </div>

            <div className="st-ic-demo__footer">
              <StrongTypeComposerExample />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
