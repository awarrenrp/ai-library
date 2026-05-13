import { useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { IconSettings } from "../components/Composer/icons";
import {
  CHART_VARIANT_OPTIONS,
  ReportArtifactDemo,
  RipplingArtifactShell,
  RipplingNativeArtifactInChatDemo,
  type RipplingArtifactShellVariant,
  SimpleBarChartDemo,
  WorkflowArtifactDemo,
  type ChartDemoVariant,
} from "../components/RipplingArtifact";
import type { RipplingNativeArtifactInChatDemoMode } from "../components/RipplingArtifact";
import "../App.css";
import { useDismissOnOutsidePress } from "../hooks/useDismissOnOutsidePress";
import "./RipplingNativeArtifactsPage.css";

const SHELL_VARIANTS = ["default", "action-bar", "with-actions"] as const satisfies readonly RipplingArtifactShellVariant[];

const SHELL_VARIANT_LABELS: Record<RipplingArtifactShellVariant, string> = {
  default: "Default",
  "action-bar": "Action bar",
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

/**
 * Demo buttons for the `action-bar` variant — matches the Figma spec
 * (node 1129:19698): two small buttons (ghost + outlined) each with a
 * navy count badge, as used in data-heavy product artifacts.
 */
function DemoActionBarContent(): ReactNode {
  return (
    <>
      <button type="button" className="rna-strip-btn">
        Filters
        <span className="rna-strip-badge">3</span>
      </button>
      <button type="button" className="rna-strip-btn rna-strip-btn--outlined">
        Groups
        <span className="rna-strip-badge">1</span>
      </button>
    </>
  );
}

export function RipplingNativeArtifactsPage() {
  const [chartVariant, setChartVariant] = useState<ChartDemoVariant>("bar");
  const [shellVariant, setShellVariant] = useState<RipplingArtifactShellVariant>("default");
  const [contextMode, setContextMode] = useState<RipplingNativeArtifactInChatDemoMode>("side-chat");
  const [artifactSelected, setArtifactSelected] = useState(false);

  const pageMenuId = useId();
  const settingsBtnId = `rna-page-settings-btn-${pageMenuId}`;
  const settingsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useDismissOnOutsidePress(
    menuOpen,
    () => setMenuOpen(false),
    (n) => settingsRef.current?.contains(n) ?? false,
  );

  const demoActions = shellVariant === "with-actions" ? <DemoArtifactActions />
    : shellVariant === "action-bar" ? <DemoActionBarContent />
    : undefined;

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
        <h1 className="page-doc-title">Rippling-native artifacts</h1>
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
          "Add interactive content as an artifact of the system of record.",
        ]}
        dos={[
          "Use to represent content saved in the system of record.",
        ]}
        donts={[
          "Use as an ephemeral part of Rippling — artifacts should link back to persisted product objects.",
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
        <div className="demo-segments" role="group" aria-label="Artifact state" style={{ marginBottom: 16 }}>
          <button
            type="button"
            className="demo-segment"
            aria-pressed={!artifactSelected}
            onClick={() => setArtifactSelected(false)}
          >
            Default
          </button>
          <button
            type="button"
            className="demo-segment"
            aria-pressed={artifactSelected}
            onClick={() => setArtifactSelected(true)}
          >
            Selected
          </button>
        </div>
        <div className="rna-showcase">
          <RipplingArtifactShell
            title="Artifact title"
            variant={shellVariant}
            actions={demoActions}
            selected={artifactSelected}
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

      <section className="rna-section" aria-label="Examples">
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
            <RipplingArtifactShell title="Artifact title" variant={shellVariant} actions={demoActions} selected={artifactSelected}>
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
              <RipplingArtifactShell title="Report title" variant={shellVariant} actions={demoActions} selected={artifactSelected}>
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
              <RipplingArtifactShell title="Workflow" variant={shellVariant} actions={demoActions} selected={artifactSelected}>
                <WorkflowArtifactDemo />
              </RipplingArtifactShell>
            </div>
          </div>
        </div>
      </section>

      <hr className="page-section__divider" aria-hidden="true" />

      <section
        className="in-context-stage"
        id="rna-in-context"
        aria-labelledby="rna-in-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="rna-in-context-heading" className="in-context-stage__title">
              In context
            </h2>
            <p className="in-context-stage__lede">
              Rippling-native artifacts land inline in the thread — preview them in a side panel
              or see how they sit in a full-screen workspace.
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="Context view mode">
            {(["side-chat", "full-screen"] as const).map((m) => (
              <button
                key={m}
                type="button"
                className="demo-segment"
                aria-pressed={contextMode === m}
                onClick={() => setContextMode(m)}
              >
                {m === "side-chat" ? "Side chat" : "Full screen"}
              </button>
            ))}
          </div>
        </div>
        <RipplingNativeArtifactInChatDemo mode={contextMode} />
      </section>

    </main>
  );
}
