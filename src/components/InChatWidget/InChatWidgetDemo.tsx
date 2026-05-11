import { useId, useState } from "react";
import { Composer } from "../Composer";
import { InChatTableWidget } from "./InChatWidgets";
import "./InChatWidgetDemo.css";

/**
 * Side chat preview — table widget in the thread with the shared Composer (`width="fill"`),
 * mirroring the Links page “In context” pattern.
 */
export function InChatWidgetDemo() {
  const [demoOpen, setDemoOpen] = useState(true);
  const uid = useId();
  const introId = `${uid}-intro`;
  const surfaceId = `${uid}-surface`;

  return (
    <div className="ica-demo">
      <p id={introId} className="ica-demo__intro">
        Rippling AI opens from the right. Structured widgets such as the table preview match the row patterns above; inline
        copy stays flush in the thread with the same Composer as the Composer and Chat demos.
      </p>
      <button
        type="button"
        className={[
          "ica-demo__trigger",
          demoOpen ? "ica-demo__trigger--outline" : "demo-segment",
        ].join(" ")}
        aria-expanded={demoOpen}
        aria-controls={surfaceId}
        onClick={() => setDemoOpen((o) => !o)}
      >
        {demoOpen ? "Hide example" : "Show example"}
      </button>
      <div
        id={surfaceId}
        className="ica-demo__surface"
        role="region"
        aria-label="In-chat widget side panel preview"
        aria-describedby={introId}
      >
        <div className="ica-demo__app">
          <p className="ica-demo__app-label">App surface</p>
          <p className="ica-demo__app-body">
            The assistant can embed a compact table widget as an entry point into the full report or sheet in product.
          </p>
        </div>
        <div
          className={["ica-demo__chat-wrap", demoOpen ? "ica-demo__chat-wrap--open" : ""].filter(Boolean).join(" ")}
          aria-hidden={!demoOpen}
        >
          <div className="ica-demo__chat">
            <div className="ica-demo__chat-head">Rippling AI</div>
            <div className="ica-demo__thread">
              <p className="ica-demo__bubble ica-demo__bubble--user">Show me recent orders by revenue.</p>
              <div className="ica-demo__assistant-msg">
                Here&apos;s a snapshot—open it for sortable columns and the full dataset.
                <div className="ica-demo__widget-slot">
                  <InChatTableWidget />
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
