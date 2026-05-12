import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChatToolbar } from "../components/Chat";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { Composer } from "../components/Composer";
import { IconSettings } from "../components/Composer/icons";
import {
  CHART_VARIANT_OPTIONS,
  ChartDashboardDemo,
  type ChartDashboardTileId,
  ReportArtifactDemo,
  RipplingArtifactShell,
  type RipplingArtifactShellVariant,
  SimpleBarChartDemo,
  WorkflowArtifactDemo,
  type WorkflowArtifactBlockId,
  type ChartDemoVariant,
} from "../components/RipplingArtifact";
import "../App.css";
import "./RipplingNativeArtifactsPage.css";

/**
 * State configuration for the Editing demo. One entry per artifact type;
 * each entry holds the 3-step progression matching the Figma frames:
 *
 *  - Step 1 — default / nothing selected (Figma 802:14409)
 *  - Step 2 — whole artifact selected (Figma 757:10334 / 1129:19972)
 *  - Step 3 — sub-element selected (Figma 810:15346)
 *
 * Driving the UI from data lets the segmented controls render label text
 * specific to the active artifact type while keeping a single render path
 * in the JSX.
 */
type EditArtifact = "chart" | "workflow";

type EditStep = {
  id: 1 | 2 | 3;
  label: string;
  chip?: string;
  shellSelected: boolean;
  /** Set when a sub-tile inside the chart dashboard is selected. */
  tileSelected?: ChartDashboardTileId;
  /** Set when a block inside the workflow is selected. */
  blockSelected?: WorkflowArtifactBlockId;
};

type EditFlow = {
  artifactTitle: string;
  shellAriaLabel: string;
  steps: readonly [EditStep, EditStep, EditStep];
};

const EDIT_FLOWS: Record<EditArtifact, EditFlow> = {
  chart: {
    artifactTitle: "New hires from Jan – Aug 2025",
    shellAriaLabel: "Hiring dashboard",
    steps: [
      { id: 1, label: "Default", shellSelected: false },
      {
        id: 2,
        label: "Report selected",
        chip: "New hires from Jan – Aug 2025",
        shellSelected: true,
      },
      {
        id: 3,
        label: "Chart selected",
        chip: "Headcount by department",
        shellSelected: false,
        tileSelected: "headcount-by-dept",
      },
    ],
  },
  workflow: {
    artifactTitle: "Termination bonus alert",
    shellAriaLabel: "Workflow",
    steps: [
      { id: 1, label: "Default", shellSelected: false },
      {
        id: 2,
        label: "Workflow selected",
        chip: "Termination bonus alert",
        shellSelected: true,
      },
      {
        id: 3,
        label: "Node selected",
        chip: "What it will do",
        shellSelected: false,
        blockSelected: "what",
      },
    ],
  },
};

const EDIT_ARTIFACT_OPTIONS: { id: EditArtifact; label: string }[] = [
  { id: "chart", label: "Chart" },
  { id: "workflow", label: "Workflow" },
];

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
  const [editArtifact, setEditArtifact] = useState<EditArtifact>("chart");
  const [editStepId, setEditStepId] = useState<1 | 2 | 3>(1);

  const pageMenuId = useId();
  const settingsBtnId = `rna-page-settings-btn-${pageMenuId}`;
  const settingsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeFlow = EDIT_FLOWS[editArtifact];
  const activeStep = activeFlow.steps.find((s) => s.id === editStepId) ?? activeFlow.steps[0];

  /**
   * Switching artifact types resets the step to 1 so the user always begins
   * each flow at the default state — otherwise a user inspecting "Workflow ·
   * Node" would jump to "Chart · Chart" and miss the start of the new flow.
   */
  function selectArtifact(next: EditArtifact) {
    setEditArtifact(next);
    setEditStepId(1);
  }

  /**
   * Click handlers wired to the live preview — clicking inside the mock
   * advances the user through the demo without forcing them to use the
   * segmented controls. Mirrors the Figma click affordances:
   *   • Click on the artifact shell → step 2 (whole artifact selected)
   *   • Click on a chart tile / workflow block → step 3 (sub-element)
   */
  function selectShell() {
    setEditStepId(2);
  }
  function selectChartTile(id: ChartDashboardTileId) {
    if (id === "headcount-by-dept") setEditStepId(3);
  }

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

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 id="rna-editing-heading" className="page-section__title">
        Editing
      </h2>

      <section className="rna-section" aria-labelledby="rna-editing-heading">
        <p className="rna-section-lede">
          How a user enters edit mode on a Rippling-native artifact. Pick an artifact type, then
          step through the flow — clicking the artifact selects it (outline switches to the focus
          token, composer gains a context chip); clicking a sub-element narrows the selection.
          Source frames:{" "}
          <a
            href="https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=802-14409"
            target="_blank"
            rel="noreferrer"
            className="rna-figma-link"
          >
            Default (802:14409)
          </a>
          ,{" "}
          <a
            href="https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=757-10334"
            target="_blank"
            rel="noreferrer"
            className="rna-figma-link"
          >
            Report selected (757:10334)
          </a>
          ,{" "}
          <a
            href="https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=810-15346"
            target="_blank"
            rel="noreferrer"
            className="rna-figma-link"
          >
            Chart selected (810:15346)
          </a>
          .
        </p>

        <div
          className="demo-preview-surface demo-preview-surface--no-toolbar-divider rna-edit-flow"
          role="region"
          aria-label="Editing flow preview"
        >
          {/*
           * Toolbar — top toggle picks the artifact type; the second group
           * is a step indicator that doubles as a clickable stepper. The
           * step labels are derived from the active flow so they read
           * "Default / Report selected / Chart selected" for charts and
           * "Default / Workflow selected / Node selected" for workflows.
           */}
          <div className="demo-toolbar" aria-label="Editing flow controls">
            <div className="demo-group">
              <p className="demo-label" id="rna-edit-artifact-label">
                Artifact
              </p>
              <div
                className="demo-segments"
                role="group"
                aria-labelledby="rna-edit-artifact-label"
              >
                {EDIT_ARTIFACT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="demo-segment"
                    aria-pressed={editArtifact === opt.id}
                    onClick={() => selectArtifact(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="demo-group">
              <p className="demo-label" id="rna-edit-step-label">
                State
              </p>
              <div className="demo-segments" role="group" aria-labelledby="rna-edit-step-label">
                {activeFlow.steps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    className="demo-segment"
                    aria-pressed={editStepId === step.id}
                    onClick={() => setEditStepId(step.id)}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/*
           * Two-pane stage — left "app surface" holds the artifact under
           * edit, right column is the AI panel (chat content + composer).
           * The composer's `surfaceState="edit"` chrome + chip update from
           * the active step's data; clicking inside the left pane advances
           * the step so the demo works without reaching for the controls.
           */}
          <div className="rna-edit-flow__stage">
            <div className="rna-edit-flow__canvas">
              <p className="rna-edit-flow__canvas-label">App surface</p>
              {editArtifact === "chart" ? (
                <RipplingArtifactShell
                  key={`chart-${editStepId}`}
                  title={activeFlow.artifactTitle}
                  selected={activeStep.shellSelected}
                  editing={editStepId !== 1}
                  onCancelEdit={() => setEditStepId(1)}
                  onSaveEdit={() => setEditStepId(1)}
                  className="rna-edit-flow__shell"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    className="rna-edit-flow__shell-hit"
                    onClick={selectShell}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectShell();
                      }
                    }}
                    aria-label="Select dashboard for editing"
                  >
                    <ChartDashboardDemo
                      selectedTileId={activeStep.tileSelected}
                      onSelectTile={selectChartTile}
                    />
                  </div>
                </RipplingArtifactShell>
              ) : (
                <RipplingArtifactShell
                  key={`workflow-${editStepId}`}
                  title={activeFlow.artifactTitle}
                  selected={activeStep.shellSelected}
                  editing={editStepId !== 1}
                  onCancelEdit={() => setEditStepId(1)}
                  onSaveEdit={() => setEditStepId(1)}
                  className="rna-edit-flow__shell"
                >
                  <div
                    role="button"
                    tabIndex={0}
                    className="rna-edit-flow__shell-hit"
                    onClick={selectShell}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectShell();
                      }
                    }}
                    aria-label="Select workflow for editing"
                  >
                    <WorkflowArtifactDemo selectedBlock={activeStep.blockSelected} />
                  </div>
                </RipplingArtifactShell>
              )}
            </div>

            <aside className="rna-edit-flow__panel" aria-label="Rippling AI chat panel">
              <ChatToolbar
                className="rna-edit-flow__panel-head"
                title="Rippling AI"
                onMenuClick={() => {}}
                onAddCommentClick={() => {}}
                onExpandClick={() => {}}
                onCloseClick={() => {}}
              />
              <div className="rna-edit-flow__panel-thread">
                <p className="rna-edit-flow__bubble rna-edit-flow__bubble--user">
                  Help me update this dashboard.
                </p>
                <p className="rna-edit-flow__assistant">
                  {activeStep.id === 1
                    ? "Click the artifact you'd like to change and I'll guide you through the edit."
                    : activeStep.chip
                      ? `Got it — I'll help you edit “${activeStep.chip}.” What should change?`
                      : "Got it. What should change?"}
                </p>
              </div>
              <div className="rna-edit-flow__panel-footer">
                <Composer
                  width="fill"
                  version="alternate"
                  surfaceState={activeStep.chip ? "edit" : "default"}
                  editContextLabel={activeStep.chip}
                  ariaComposerLabel="Editing composer"
                  ariaMessageLabel="Message to Rippling AI"
                  placeholder="Describe the change you want…"
                />
                <p className="rna-edit-flow__disclaimer">
                  Rippling AI results may be inaccurate. Review before acting.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
