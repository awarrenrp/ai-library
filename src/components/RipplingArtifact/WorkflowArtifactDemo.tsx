import "./WorkflowArtifactDemo.css";

/** Block IDs callers can mark as the focused/selected node in edit mode. */
export type WorkflowArtifactBlockId = "when" | "what";

export type WorkflowArtifactDemoProps = {
  /**
   * Optional node to highlight as "selected" for the edit-mode preview.
   * Maps to the Figma "Editing individual node on canvas" frame 810:15346 —
   * the focused block gets an accent ring + tinted background so the user
   * can see which step they're editing.
   */
  selectedBlock?: WorkflowArtifactBlockId;
};

/** Workflow artifact body — Figma AI-components · node 878:13831 */
export function WorkflowArtifactDemo({ selectedBlock }: WorkflowArtifactDemoProps = {}) {
  return (
    <div className="workflow-artifact-demo">
      <div className="workflow-artifact-demo-source">
        <p className="workflow-artifact-demo-source-label">Source info</p>
        <p className="workflow-artifact-demo-source-desc">
          Here&apos;s some info about the report if you want to give some additional context to the viewers. Sometimes
          that might be longer than one line.
        </p>
      </div>

      <div className="workflow-artifact-demo-detail">
        <div className="workflow-artifact-demo-header">
          <p className="workflow-artifact-demo-eyebrow">When it will run</p>
          <p className="workflow-artifact-demo-title">Termination bonus alert</p>
        </div>

        <hr className="workflow-artifact-demo-rule" />

        <div
          className="workflow-artifact-demo-block"
          data-selected={selectedBlock === "when" || undefined}
          aria-selected={selectedBlock === "when" || undefined}
        >
          <p className="workflow-artifact-demo-eyebrow">When it will run</p>
          <p className="workflow-artifact-demo-body">
            Termination request submitted and termination type is involuntary
          </p>
        </div>

        <div
          className="workflow-artifact-demo-block"
          data-selected={selectedBlock === "what" || undefined}
          aria-selected={selectedBlock === "what" || undefined}
        >
          <p className="workflow-artifact-demo-eyebrow">What it will do</p>
          <p className="workflow-artifact-demo-body">
            Sends an email notification to Parker Conrad&apos;s team when a termination is submitted for an employee who
            received a termination bonus.
          </p>
        </div>

        <hr className="workflow-artifact-demo-rule" />

        <div className="workflow-artifact-demo-footer">
          <button type="button" className="workflow-artifact-demo-link">
            View workflow →
          </button>
        </div>
      </div>
    </div>
  );
}
