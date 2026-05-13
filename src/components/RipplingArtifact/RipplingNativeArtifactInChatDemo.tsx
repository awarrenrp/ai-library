import { useId } from "react";
import { ChatToolbar } from "../Chat";
import { Composer } from "../Composer";
import { RipplingArtifactShell } from "./RipplingArtifactShell";
import { SimpleBarChartDemo } from "./SimpleBarChartDemo";
import "./RipplingNativeArtifactInChatDemo.css";

export type RipplingNativeArtifactInChatDemoMode = "side-chat" | "full-screen";

export type RipplingNativeArtifactInChatDemoProps = {
  mode?: RipplingNativeArtifactInChatDemoMode;
};

export function RipplingNativeArtifactInChatDemo({
  mode = "side-chat",
}: RipplingNativeArtifactInChatDemoProps) {
  const uid = useId();

  return (
    <div className="rna-ic-demo" data-mode={mode}>
      <div
        id={`${uid}-surface`}
        className="rna-ic-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "Rippling-native artifacts in full-screen AI workspace"
            : "Rippling-native artifacts in side chat preview"
        }
      >
        <div className="rna-ic-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="rna-ic-demo__app-label">App surface</p>
          <p className="rna-ic-demo__app-body">
            Rippling-native artifacts land inline in the thread — the user sees a preview
            in context and can open into the full product object with one click.
          </p>
        </div>

        <div className="rna-ic-demo__chat-wrap">
          <div className="rna-ic-demo__chat">
            <ChatToolbar
              className="rna-ic-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />

            <div className="rna-ic-demo__thread">
              <p className="rna-ic-demo__bubble rna-ic-demo__bubble--user">
                Show me payroll expenses by department for Q3.
              </p>
              <div className="rna-ic-demo__assistant-turn">
                <p className="rna-ic-demo__assistant-msg">
                  Here's a breakdown of Q3 payroll by department — open the report for full
                  detail and export options.
                </p>
                <div className="rna-ic-demo__artifact-slot">
                  <RipplingArtifactShell
                    title="Q3 payroll by department"
                    footerTimestamp="Just now"
                  >
                    <SimpleBarChartDemo variant="bar" />
                  </RipplingArtifactShell>
                </div>
              </div>

              <p className="rna-ic-demo__bubble rna-ic-demo__bubble--user">
                Can you break that down as a trend over the last 6 months?
              </p>
              <div className="rna-ic-demo__assistant-turn">
                <p className="rna-ic-demo__assistant-msg">
                  Here's the trend — Engineering and Sales both moved above target in August.
                </p>
                <div className="rna-ic-demo__artifact-slot">
                  <RipplingArtifactShell
                    title="Payroll trend — last 6 months"
                    footerTimestamp="Just now"
                  >
                    <SimpleBarChartDemo variant="line" />
                  </RipplingArtifactShell>
                </div>
              </div>
            </div>

            <div className="rna-ic-demo__footer">
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
