import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import {
  CHART_VARIANT_OPTIONS,
  ReportArtifactDemo,
  RipplingArtifactShell,
  type RipplingArtifactShellVariant,
  SimpleBarChartDemo,
  WorkflowArtifactDemo,
  type ChartDemoVariant,
} from "../components/RipplingArtifact";
import { Button, IconButton, iconTypes } from "../pebbleButton";
import "../App.css";
import "./RipplingNativeArtifactsPage.css";

const SHELL_VARIANTS = ["default", "with-actions"] as const satisfies readonly RipplingArtifactShellVariant[];

const SHELL_VARIANT_LABELS: Record<RipplingArtifactShellVariant, string> = {
  default: "Default",
  "with-actions": "With actions",
};

/**
 * Sample action cluster rendered inside the `with-actions` variant of the
 * artifact shell. Each demo instance on this page gets the same cluster so
 * the variant comparison stays apples-to-apples.
 */
function DemoArtifactActions(): ReactNode {
  return (
    <>
      <Button
        type={Button.TYPES.BUTTON}
        appearance={Button.APPEARANCES.OUTLINE}
        size={Button.SIZES.M}
        icon={{
          type: iconTypes.SHARE_OUTLINE,
          alignment: Button.ICON_ALIGNMENTS.LEFT,
        }}
      >
        Share
      </Button>
      <Button
        type={Button.TYPES.BUTTON}
        appearance={Button.APPEARANCES.PRIMARY}
        size={Button.SIZES.M}
        icon={{
          type: iconTypes.ARROW_UP_RIGHT,
          alignment: Button.ICON_ALIGNMENTS.LEFT,
        }}
      >
        Open
      </Button>
    </>
  );
}

export function RipplingNativeArtifactsPage() {
  const [chartVariant, setChartVariant] = useState<ChartDemoVariant>("bar");
  const [shellVariant, setShellVariant] = useState<RipplingArtifactShellVariant>("default");

  const pageMenuId = useId();
  const settingsBtnId = `rna-page-settings-btn-${pageMenuId}`;
  const settingsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = settingsRef.current;
      if (el && !el.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const demoActions = shellVariant === "with-actions" ? <DemoArtifactActions /> : undefined;

  return (
    <main className="demo-wrap rna-page">
      <div className="composer-page-settings" ref={settingsRef}>
        <span id={settingsBtnId} className="composer-page-settings-trigger">
          <IconButton
            icon={iconTypes.SETTINGS_OUTLINE}
            aria-label="Artifact shell variant"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={pageMenuId}
            appearance={IconButton.APPEARANCES.OUTLINE}
            size={IconButton.SIZES.M}
            onClick={() => setMenuOpen((o) => !o)}
          />
        </span>
        {menuOpen ? (
          <div
            id={pageMenuId}
            className="composer-page-settings-menu"
            role="group"
            aria-label="Artifact shell variant options"
          >
            {SHELL_VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={shellVariant === v}
                onClick={() => {
                  setShellVariant(v);
                  setMenuOpen(false);
                }}
              >
                {SHELL_VARIANT_LABELS[v]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

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
        when={[
          "The assistant produced or edited a Rippling product object — report, dashboard, workflow, app, skill, or agent.",
          "The object belongs in the product, not just in chat.",
        ]}
        designIntent={[
          "Preview the native artifact inside the thread so the user can confirm what was made.",
          "Match Rippling's product UI — header, hover actions, body slot — so it feels native.",
          "Open into the real product object when the user commits.",
        ]}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <section className="rna-section" aria-labelledby="rna-shell-heading">
        <h3 id="rna-shell-heading" className="rna-section-title">
          Shell
        </h3>
        <p className="rna-section-lede">
          Container, header (artifact title + hover actions), body slot, and an optional hover
          action bar pinned to the bottom edge. Use the gear (upper right) to switch between{" "}
          <strong>Default</strong> and <strong>With actions</strong>. Hover the artifact to reveal
          the bar plus the existing <strong>…</strong> menu.
        </p>
        <div className="rna-showcase">
          <RipplingArtifactShell
            title="Artifact title"
            variant={shellVariant}
            actions={demoActions}
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

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 id="rna-examples-heading" className="page-section__title">Examples</h2>

      <section className="rna-section" aria-labelledby="rna-examples-heading">
        <p className="rna-section-lede">
          Rippling-native artifact previews using the shell — chart, report table, and workflow patterns from
          AI-components.
        </p>

        <div className="rna-example">
          <h3 id="rna-chart-example" className="rna-example-title">
            Chart
          </h3>
          <p className="rna-section-lede rna-example-lede">
            Visualization variants — bars, trend, share, and a single-value KPI. Defaults follow the dashboard
            data-viz skill ({" "}
            <code className="rna-skill-code">skills/dashboard-data-viz/</code>): zero baseline on bars, no
            point markers on lines, accent-on-grey for donut slices, and unit-symbol-on-the-number for KPIs.
          </p>
          <div className="demo-preview-surface demo-preview-surface--stack" role="region" aria-label="Chart interactive preview">
          <div className="demo-toolbar rna-chart-toolbar" aria-label="Chart type">
            <div className="demo-group">
              <p className="demo-label" id="rna-chart-type-label">
                Chart type
              </p>
              <div className="demo-segments" role="group" aria-labelledby="rna-chart-type-label">
                {CHART_VARIANT_OPTIONS.map(({ id, label }) => (
                  <Button
                    key={id}
                    type={Button.TYPES.BUTTON}
                    appearance={chartVariant === id ? Button.APPEARANCES.PRIMARY : Button.APPEARANCES.OUTLINE}
                    size={Button.SIZES.M}
                    aria-pressed={chartVariant === id}
                    onClick={() => setChartVariant(id)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="rna-showcase">
            <RipplingArtifactShell title="Artifact title" variant={shellVariant} actions={demoActions}>
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
              <RipplingArtifactShell title="Report title" variant={shellVariant} actions={demoActions}>
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
              <RipplingArtifactShell title="Workflow" variant={shellVariant} actions={demoActions}>
                <WorkflowArtifactDemo />
              </RipplingArtifactShell>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
