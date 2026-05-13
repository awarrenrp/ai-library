import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { Composer } from "../Composer";
import { Prompt } from "./Prompt";
import type { PromptSurface } from "./Prompt";
import "./PromptsInChatDemo.css";

export type PromptsInChatDemoMode = "side-chat" | "full-screen";

export type PromptsInChatDemoProps = {
  mode?: PromptsInChatDemoMode;
  surface?: PromptSurface;
  subtextOn?: boolean;
};

const SAMPLE_PROMPTS = [
  { id: "p1", title: "Summarize recent policy changes", subtext: "HR Manager" },
  { id: "p2", title: "Show open headcount by department" },
  { id: "p3", title: "Draft candidate feedback for last week's interviews", subtext: "Recruiter" },
  { id: "p4", title: "What's changed in payroll this cycle?" },
] as const;

export function PromptsInChatDemo({
  mode = "side-chat",
  surface = "filled",
  subtextOn = true,
}: PromptsInChatDemoProps) {
  const uid = useId();

  return (
    <div className="prompts-ic-demo" data-mode={mode}>
      <div
        id={`${uid}-surface`}
        className="prompts-ic-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "Prompts in full-screen AI workspace"
            : "Prompts in side chat preview"
        }
      >
        <div className="prompts-ic-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="prompts-ic-demo__app-label">App surface</p>
          <p className="prompts-ic-demo__app-body">
            Personalized prompts surface in the empty thread before the user types — the
            assistant surfaces tasks and scopes relevant to the user's role.
          </p>
        </div>

        <div className="prompts-ic-demo__chat-wrap">
          <div className="prompts-ic-demo__chat">
            <ChatToolbar
              className="prompts-ic-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />

            <div className="prompts-ic-demo__thread">
              <div className="prompts-ic-demo__empty-state" aria-label="Start a conversation">
                <p className="prompts-ic-demo__empty-heading">What can I help you with?</p>
                <div className="prompts-ic-demo__prompt-grid">
                  {SAMPLE_PROMPTS.map((p) => (
                    <Prompt
                      key={p.id}
                      title={p.title}
                      subtext={subtextOn && "subtext" in p ? p.subtext : undefined}
                      surface={surface}
                      className="prompts-ic-demo__prompt"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="prompts-ic-demo__footer">
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
