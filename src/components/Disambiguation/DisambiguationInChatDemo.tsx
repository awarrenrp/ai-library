import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { Disambiguation } from "./Disambiguation";
import type {
  DisambiguationInputType,
  DisambiguationOption,
  DisambiguationVariant,
} from "./Disambiguation";
import "./DisambiguationInChatDemo.css";

export type DisambiguationInChatDemoMode = "side-chat" | "full-screen";

export type DisambiguationInChatDemoProps = {
  question: string;
  subtitle?: string;
  step?: { current: number; total: number };
  inputType: DisambiguationInputType;
  variant?: DisambiguationVariant;
  options: DisambiguationOption[];
  /** Surface mode controlled by the spec page. Defaults to `side-chat`. */
  mode?: DisambiguationInChatDemoMode;
};

/**
 * Side chat / full-screen preview — the disambiguation sheet rises over the
 * composer area in both modes. Surface chrome differs:
 *
 *   - `side-chat`: app surface mock on the left, 440px chat panel right.
 *   - `full-screen`: chat fills the viewport; app surface mock is hidden.
 */
export function DisambiguationInChatDemo({
  question,
  subtitle,
  step,
  inputType,
  variant = "default",
  options,
  mode = "side-chat",
}: DisambiguationInChatDemoProps) {
  const uid = useId();
  const surfaceId = `${uid}-surface`;

  return (
    <div className="disambig-demo" data-mode={mode}>
      <div
        id={surfaceId}
        className="disambig-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "Disambiguation in full-screen AI workspace"
            : "Disambiguation in side chat preview"
        }
      >
        <div className="disambig-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="disambig-demo__app-label">App surface</p>
          <p className="disambig-demo__app-body">
            The main product UI stays on the left. Rippling AI opens as a side panel; clarifying
            questions appear above the composer without living inside the transcript.
          </p>
        </div>
        <div className="disambig-demo__chat-wrap">
          <div className="disambig-demo__chat">
            <ChatToolbar
              className="disambig-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />
            <div className="disambig-demo__thread">
              <p className="disambig-demo__bubble disambig-demo__bubble--ai">
                I found more than one Jordan. Say which profile you want to change and I&apos;ll pull up their manager
                field.
              </p>
              <p className="disambig-demo__bubble disambig-demo__bubble--user">Update Jordan&apos;s manager.</p>
            </div>
            <div className="disambig-demo__footer">
              <div className="disambig-demo__composer-mock">Ask Rippling AI anything…</div>
              <div className="disambig-demo__sheet">
                <div className="disambig-demo__sheet-card">
                  <Disambiguation
                    key={`${inputType}-${step?.current ?? 0}-${question}-${variant}-${mode}`}
                    className="disambiguation--in-chat"
                    question={question}
                    subtitle={subtitle}
                    step={step}
                    inputType={inputType}
                    variant={variant}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
