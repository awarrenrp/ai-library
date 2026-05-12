import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import {
  CHART_VARIANT_OPTIONS,
  ReportArtifactDemo,
  RipplingArtifactShell,
  SimpleBarChartDemo,
  WorkflowArtifactDemo,
  type ChartDemoVariant,
} from "../components/RipplingArtifact";
import "../App.css";
import "./RipplingNativeArtifactsPage.css";

export function RipplingNativeArtifactsPage() {
  const [chartVariant, setChartVariant] = useState<ChartDemoVariant>("bar");

  return (
    <main className="demo-wrap rna-page">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header className="rna-page-intro">
        <p className="rna-page-kicker">Rippling | In partnership with Pebble · AI-components · Artifacts</p>
        <h1 className="rna-page-title">Rippling-native artifacts</h1>
        <p className="rna-page-lede">
          Surfaces built with Rippling UI patterns—employee cards, policy snippets, workflows, and actions that feel
          native to the shell rather than generic chat blocks.
        </p>
      </header>

      <ComponentIntentPanel
        when="An AI-created or AI-edited object that becomes part of the Rippling product surface, such as a report, dashboard, workflow, custom app, skill, or agent config."
        designIntent="— A preview of a Rippling-native artifact, to give the user confirmation or a preview of the content they are creating or referring to."
      />

      <section className="rna-section" aria-labelledby="rna-shell-heading">
        <h2 id="rna-shell-heading" className="rna-section-title">
          Shell
        </h2>
        <p className="rna-section-lede">
          Container, header (artifact title + hover actions), and body slot. Hover the artifact and
          open the <strong>…</strong> menu to see the fixed actions plus a custom JSX slot styled
          to match the body slot.
        </p>
        <div className="rna-showcase">
          <RipplingArtifactShell
            title="Artifact title"
            moreMenuSlot={
              <p className="rna-slot-placeholder rna-slot-placeholder--menu">
                Custom slot — any JSX, styled like the body slot.
              </p>
            }
          >
            <p className="rna-slot-placeholder">Body slot — drop charts, tables, or actions here.</p>
          </RipplingArtifactShell>
        </div>
      </section>

      <section className="rna-section" aria-labelledby="rna-examples-heading">
        <h2 id="rna-examples-heading" className="rna-section-title">
          Examples
        </h2>
        <p className="rna-section-lede">
          Rippling-native artifact previews using the shell — chart, report table, and workflow patterns from
          AI-components.
        </p>

        <div className="rna-example">
          <h3 id="rna-chart-example" className="rna-example-title">
            Chart
          </h3>
          <p className="rna-section-lede rna-example-lede">
            Visualization variants — switch chart type to match AI-components specs.
          </p>
          <div className="demo-preview-surface demo-preview-surface--stack" role="region" aria-label="Chart interactive preview">
          <div className="demo-toolbar rna-chart-toolbar" aria-label="Chart type">
            <div className="demo-group">
              <p className="demo-label" id="rna-chart-type-label">
                Chart type
              </p>
              <div className="demo-segments" role="group" aria-labelledby="rna-chart-type-label">
                {CHART_VARIANT_OPTIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className="demo-segment"
                    aria-pressed={chartVariant === id}
                    onClick={() => setChartVariant(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="rna-showcase">
            <RipplingArtifactShell title="Artifact title">
              <SimpleBarChartDemo variant={chartVariant} />
            </RipplingArtifactShell>
          </div>
          <p className="demo-meta rna-chart-meta" aria-live="polite">
            Showing <strong>{CHART_VARIANT_OPTIONS.find((o) => o.id === chartVariant)?.label}</strong>
          </p>
          </div>
        </div>

        <div className="rna-example">
          <h3 id="rna-report-example" className="rna-example-title">
            Report
          </h3>
          <p className="rna-section-lede rna-example-lede">
            Report preview — surface column headers and grid cells aligned with production report cards (AI-components Figma
            250:9964).
          </p>
          <div className="demo-preview-surface" role="region" aria-label="Report preview">
            <div className="rna-showcase">
              <RipplingArtifactShell title="Report title">
                <ReportArtifactDemo />
              </RipplingArtifactShell>
            </div>
          </div>
        </div>

        <div className="rna-example">
          <h3 id="rna-workflow-example" className="rna-example-title">
            Workflow
          </h3>
          <p className="rna-section-lede rna-example-lede">Workflow preview.</p>
          <div className="demo-preview-surface" role="region" aria-label="Workflow preview">
            <div className="rna-showcase">
              <RipplingArtifactShell title="Workflow">
                <WorkflowArtifactDemo />
              </RipplingArtifactShell>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
