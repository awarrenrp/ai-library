import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { IconSettings } from "../components/Composer/icons";
import {
  CHART_VARIANT_OPTIONS,
  ReportArtifactDemo,
  RipplingArtifactShell,
  type RipplingArtifactShellVariant,
  SimpleBarChartDemo,
  WorkflowArtifactDemo,
  type ChartDemoVariant,
} from "../components/RipplingArtifact";
import "../App.css";
import "./RipplingNativeArtifactsPage.css";

const SHELL_VARIANTS = ["default", "with-actions"] as const satisfies readonly RipplingArtifactShellVariant[];

const SHELL_VARIANT_LABELS: Record<RipplingArtifactShellVariant, string> = {
  default: "Default",
  "with-actions": "With actions",
};

/** Open arrow — used for the demo "Open" action in the with-actions bar. */
function IconActionOpen() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden focusable="false">
      <path
        d="M4.083 3.5h6.417v6.417m0-6.417L3.5 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Share arrow — used for the demo "Share" action in the with-actions bar. */
function IconActionShare() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden focusable="false">
      <path
        d="M9.917 4.667a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM9.917 12.833a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM4.083 8.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM5.594 6.131l2.812-1.762M5.594 7.369l2.812 1.762"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Sample action cluster rendered inside the `with-actions` variant of the
 * artifact shell. Each demo instance on this page gets the same cluster so
 * the variant comparison stays apples-to-apples.
 */
function DemoArtifactActions(): ReactNode {
  return (
    <>
      <button type="button" className="rna-action-btn">
        <IconActionShare />
        Share
      </button>
      <button type="button" className="rna-action-btn rna-action-btn--primary">
        <IconActionOpen />
        Open
      </button>
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
        <button
          id={settingsBtnId}
          type="button"
          className="composer-page-settings-btn"
          aria-label="Artifact shell variant"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={pageMenuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <IconSettings />
        </button>
        {menuOpen ? (
          <div
            id={pageMenuId}
            className="composer-page-settings-menu"
            role="menu"
            aria-labelledby={settingsBtnId}
          >
            {SHELL_VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                role="menuitemradio"
                aria-checked={shellVariant === v}
                className={[
                  "composer-page-settings-option",
                  shellVariant === v ? "composer-page-settings-option--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
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
