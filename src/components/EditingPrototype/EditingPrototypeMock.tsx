/**
 * Editing — product-frame prototype (Analytics · Payroll mix).
 * Mirrors Figma `Edit mode` 802:14409 · AI-components.
 */
import { useState } from "react";
import { ChatToolbar } from "../Chat/Chat";
import "../Chat/Chat.css";
import { Composer } from "../Composer";
import {
  ChartDashboardDemo,
  type ChartDashboardTileId,
  RipplingArtifactShell,
  SimpleBarChartDemo,
} from "../RipplingArtifact";
import "./EditingPrototypeMock.css";

const FIGMA_PROTOTYPE =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=802-14409";

function ProtoGhostIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button type="button" className="editing-prototype__ghost-icon" aria-label={label}>
      {children}
    </button>
  );
}

/** Decorative 16×16 toolbar glyphs — standalone mock, not Pebble icon pack. */
function IconProtoComment() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M3.5 12V4.5A1 1 0 014.5 3.5h7A1 1 0 0112.5 4.5v6a1 1 0 01-1 1H6.2L3.5 14v-2z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconProtoBell() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path
        d="M8 2.5a3.25 3.25 0 00-3.25 3.25v2.2L4 10.5h8l-.75-2.55V5.75A3.25 3.25 0 008 2.5zM6.5 12.5h3a1.5 1.5 0 01-3 0z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconProtoUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <circle cx="8" cy="5.5" r="2.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M3.5 13.2v-.2c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5v.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconProtoShare() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <circle cx="12" cy="4" r="1.4" fill="currentColor" />
      <circle cx="4" cy="8" r="1.4" fill="currentColor" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <path d="M5.2 7.3l5.1-2.4M5.2 8.7l5.1 2.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function IconProtoPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function IconProtoMore() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <circle cx="3.5" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="12.5" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function EditingPrototypeMock() {
  const [dashSelection, setDashSelection] = useState<ChartDashboardTileId>("headcount-by-dept");

  return (
    <div className="editing-prototype" aria-label="Editing prototype mock — Analytics workspace with AI chat">
      <header className="editing-prototype__top-bar">
        <div className="editing-prototype__top-bar-left">
          <div className="editing-prototype__logo-dot" aria-hidden />
          <span className="editing-prototype__suite-divider" aria-hidden />
          <button type="button" className="editing-prototype__suite-select">
            <span>Analytics</span>
            <span className="editing-prototype__suite-chevron" aria-hidden />
          </button>
        </div>

        <div className="editing-prototype__search" role="search">
          <span className="editing-prototype__search-prefix" aria-hidden />
          Search or jump to…
        </div>

        <div className="editing-prototype__top-bar-right">
          <div className="editing-prototype__quick-actions">
            <ProtoGhostIcon label="Comments">
              <IconProtoComment />
            </ProtoGhostIcon>
            <ProtoGhostIcon label="Notifications">
              <IconProtoBell />
            </ProtoGhostIcon>
            <ProtoGhostIcon label="Directory">
              <IconProtoUser />
            </ProtoGhostIcon>
            <ProtoGhostIcon label="Share">
              <IconProtoShare />
            </ProtoGhostIcon>
            <ProtoGhostIcon label="Create">
              <IconProtoPlus />
            </ProtoGhostIcon>
          </div>
          <span className="editing-prototype__profile-divider" aria-hidden />
          <div className="editing-prototype__profile">
            <span className="editing-prototype__profile-name">Acme, Inc.</span>
            <span className="editing-prototype__avatar" aria-hidden>
              C
            </span>
          </div>
        </div>
      </header>

      <div className="editing-prototype__body">
        <section className="editing-prototype__workspace" aria-label="Analytics dashboard workspace">
          <div className="editing-prototype__page-toolbar">
            <div className="editing-prototype__page-toolbar-start">
              <span className="editing-prototype__page-toolbar-more">
                <ProtoGhostIcon label="Page options">
                  <IconProtoMore />
                </ProtoGhostIcon>
              </span>
              <div className="editing-prototype__page-title-stack">
                <p className="editing-prototype__breadcrumb">
                  People analytics<span className="editing-prototype__bc-sep">›</span>Dashboards
                </p>
                <div className="editing-prototype__title-row">
                  <h2 className="editing-prototype__page-heading">Payroll mix by department</h2>
                  <span className="editing-prototype__editing-pill">
                    <span className="editing-prototype__editing-dot" aria-hidden />
                    Editing
                  </span>
                  <span className="editing-prototype__editing-lock" aria-label="Editing locked (prototype)">
                    Editing locked
                  </span>
                </div>
              </div>
            </div>

            <div className="editing-prototype__page-toolbar-end">
              <span className="editing-prototype__page-toolbar-actions">
                <ProtoGhostIcon label="Add content">
                  <IconProtoComment />
                </ProtoGhostIcon>
              </span>
              <button type="button" className="editing-prototype__btn editing-prototype__btn--outline">
                Cancel
              </button>
              <button type="button" className="editing-prototype__btn editing-prototype__btn--primary">
                Save
              </button>
            </div>
          </div>

          <hr className="editing-prototype__rule" />

          <div className="editing-prototype__canvas">
            <aside className="editing-prototype__rail" aria-hidden />

            <aside className="editing-prototype__inspector">
              <p className="editing-prototype__inspector-heading">Dashboard context</p>
              <dl className="editing-prototype__fields">
                <div className="editing-prototype__field">
                  <dt>Dashboard name</dt>
                  <dd>
                    <div className="editing-prototype__fake-field">People analytics</div>
                  </dd>
                </div>
                <div className="editing-prototype__field">
                  <dt>Default view</dt>
                  <dd>
                    <div className="editing-prototype__fake-field">Compact</div>
                  </dd>
                </div>
                <div className="editing-prototype__field">
                  <dt>Date</dt>
                  <dd>
                    <div className="editing-prototype__fake-field">Last 30 days</div>
                  </dd>
                </div>
                <div className="editing-prototype__field">
                  <dt>Cohort</dt>
                  <dd>
                    <div className="editing-prototype__fake-field">All employees</div>
                  </dd>
                </div>
                <div className="editing-prototype__field editing-prototype__field--stretch">
                  <dt>Work location</dt>
                  <dd>
                    <div className="editing-prototype__fake-field">California, United States</div>
                  </dd>
                </div>
              </dl>
              <button type="button" className="editing-prototype__add-chip">
                <span aria-hidden>+</span> Add
              </button>
            </aside>

            <div className="editing-prototype__main-canvas">
              <div className="editing-prototype__dash-meta">
                <p className="editing-prototype__dash-caption">Executive summary</p>
                <div className="editing-prototype__kpi-row">
                  <div className="editing-prototype__kpi">
                    <span className="editing-prototype__kpi-label">Open headcount</span>
                    <span className="editing-prototype__kpi-value">42</span>
                    <span className="editing-prototype__kpi-delta editing-prototype__kpi-delta--up">+8%</span>
                  </div>
                  <div className="editing-prototype__kpi">
                    <span className="editing-prototype__kpi-label">Avg. days approval</span>
                    <span className="editing-prototype__kpi-value">6.2</span>
                    <span className="editing-prototype__kpi-delta">Target 5</span>
                  </div>
                  <div className="editing-prototype__kpi">
                    <span className="editing-prototype__kpi-label">Payroll variance</span>
                    <span className="editing-prototype__kpi-value">$1.24M</span>
                    <span className="editing-prototype__kpi-delta editing-prototype__kpi-delta--down">−3%</span>
                  </div>
                </div>
              </div>

              <div className="editing-prototype__chart-grid">
                <div className="editing-prototype__chart-panel">
                  <p className="editing-prototype__chart-heading">Tiles — select focus (edit preview)</p>
                  <ChartDashboardDemo selectedTileId={dashSelection} onSelectTile={setDashSelection} />
                </div>
                <div className="editing-prototype__chart-panel editing-prototype__chart-panel--tall">
                  <p className="editing-prototype__chart-heading">Open headcount by department</p>
                  <div className="editing-prototype__chart-surface editing-prototype__chart-surface--fill">
                    <SimpleBarChartDemo variant="stacked-bar" />
                  </div>
                </div>
                <div className="editing-prototype__chart-panel">
                  <p className="editing-prototype__chart-heading">Expenses by type</p>
                  <div className="editing-prototype__chart-surface">
                    <SimpleBarChartDemo variant="bar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="editing-prototype__splitter" aria-hidden>
          <span className="editing-prototype__splitter-handle" />
        </div>

        <aside className="editing-prototype__ai-panel" aria-label="Rippling AI">
          <div className="editing-prototype__ai-inner">
            <ChatToolbar
              className="editing-prototype__ai-toolbar"
              title="Rippling AI"
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />

            <div className="editing-prototype__ai-thread">
              <blockquote className="editing-prototype__user-bubble">
                Show me how many people started in the company over the past few months.
              </blockquote>
              <p className="editing-prototype__assistant-intro">I created these tiles for your dashboard preview.</p>
              <RipplingArtifactShell selected title="Headcount snapshots" footerTimestamp="Just now">
                <div className="editing-prototype__ai-shell-chart">
                  <ChartDashboardDemo />
                </div>
              </RipplingArtifactShell>
            </div>

            <div className="editing-prototype__ai-composer-wrap">
              <Composer
                width="fill"
                version="alternate"
                surfaceState="edit"
                editContextLabel="Payroll mix chart"
                ariaComposerLabel="Editing assistant"
                ariaMessageLabel="Message to Rippling AI"
                placeholder="Describe the change…"
              />
              <p className="editing-prototype__ai-disclaimer">
                Rippling AI results may be inaccurate. Review before acting.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <p className="editing-prototype__figma-caption">
        Layout reference ·{" "}
        <a href={FIGMA_PROTOTYPE} target="_blank" rel="noreferrer">
          Figma Edit mode (802:14409)
        </a>
      </p>
    </div>
  );
}
