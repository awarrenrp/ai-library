import { useId, useState } from "react";
import { Disambiguation } from "./Disambiguation";
import type { DisambiguationInputType, DisambiguationOption } from "./Disambiguation";
import "./DisambiguationInChatDemo.css";

export type DisambiguationInChatDemoProps = {
  question: string;
  subtitle?: string;
  step?: { current: number; total: number };
  inputType: DisambiguationInputType;
  options: DisambiguationOption[];
};

export function DisambiguationInChatDemo({
  question,
  subtitle,
  step,
  inputType,
  options,
}: DisambiguationInChatDemoProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const introId = useId();

  return (
    <div className="disambig-demo">
      <p id={introId} className="disambig-demo__intro">
        Side chat enters from the right; when clarification is needed, the disambiguation sheet rises from the bottom and
        covers the composer area—matching how it sits over the chat input in product.
      </p>
      <button
        type="button"
        className={[
          "disambig-demo__trigger",
          demoOpen ? "disambig-demo__trigger--outline" : "demo-segment",
        ].join(" ")}
        aria-expanded={demoOpen}
        aria-controls="disambig-demo-surface"
        onClick={() => setDemoOpen((o) => !o)}
      >
        {demoOpen ? "Hide example" : "Show example"}
      </button>
      <div
        id="disambig-demo-surface"
        className="disambig-demo__surface"
        role="region"
        aria-label="Disambiguation in side chat preview"
        aria-describedby={introId}
      >
        <div className="disambig-demo__app">
          <p className="disambig-demo__app-label">App surface</p>
          <p className="disambig-demo__app-body">
            The main product UI stays on the left. Rippling AI opens as a side panel; clarifying questions appear above the
            composer without living inside the transcript.
          </p>
        </div>
        <div
          className={["disambig-demo__chat-wrap", demoOpen ? "disambig-demo__chat-wrap--open" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden={!demoOpen}
        >
          <div className="disambig-demo__chat">
            <div className="disambig-demo__chat-head">Rippling AI</div>
            <div className="disambig-demo__thread">
              <p className="disambig-demo__bubble disambig-demo__bubble--ai">
                I found more than one Jordan. Say which profile you want to change and I&apos;ll pull up their manager
                field.
              </p>
              <p className="disambig-demo__bubble disambig-demo__bubble--user">Update Jordan&apos;s manager.</p>
            </div>
            <div
              className={["disambig-demo__footer", demoOpen ? "disambig-demo__footer--demo-open" : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="disambig-demo__composer-mock">Ask Rippling AI anything…</div>
              <div
                className={["disambig-demo__sheet", demoOpen ? "disambig-demo__sheet--open" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="disambig-demo__sheet-card">
                  <Disambiguation
                    key={`${inputType}-${step?.current ?? 0}-${question}`}
                    className="disambiguation--in-chat"
                    question={question}
                    subtitle={subtitle}
                    step={step}
                    inputType={inputType}
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
