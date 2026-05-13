/**
 * Editing — product-frame prototype (Analytics · Payroll mix).
 * Mirrors Figma Edit mode 802:14409; top nav 802:14410 · AI-components.
 */
import { useEffect, useRef, useState } from "react";
import { ChatComposerHat, ChatToolbar } from "../Chat/Chat";
import "../Chat/Chat.css";
import { Composer } from "../Composer";
import { RipplingArtifactShell, SimpleBarChartDemo } from "../RipplingArtifact";
import { InChatLinkWidget } from "../InChatWidget/InChatWidgets";
import "./EditingPrototypeMock.css";
import { FigmaLink } from "../FigmaLink";

const FIGMA_PROTOTYPE =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=802-14409";

/** Title on the in-chat donut artifact (matches chart footer label + composer chip when selected). */
const CHAT_ARTIFACT_TITLE = "Q3 revenue by segment";

/** Title on the in-chat form artifact (forms mode). */
const CHAT_FORM_ARTIFACT_TITLE = "New medical plan";

/** Report-level editing context before the user picks a specific touchpoint. */
const DEFAULT_EDIT_CONTEXT = "Payroll mix by department";

/** Default context label for the forms mode. */
const FORMS_EDIT_CONTEXT = "Benefits enrollment form";

const DASHBOARD_VISUALS = [
  { id: "headcount", title: "Open headcount by department" },
  { id: "expenses", title: "Expenses by type" },
] as const;

/** Form field rows for the Benefits Admin mock. */
const FORM_FIELDS = [
  { id: "plan-name", label: "Plan name", value: "New medical plan", type: "text" },
  { id: "plan-type", label: "Plan type", value: "Medical", type: "select" },
  { id: "coverage", label: "Coverage level", value: "Employee + family", type: "select" },
  { id: "carrier", label: "Carrier", value: "Anthem Blue Cross", type: "text" },
  { id: "effective", label: "Effective date", value: "Jan 1, 2025", type: "text" },
  { id: "open-enrollment", label: "Open enrollment", value: "Oct 15 – Nov 1, 2024", type: "text" },
] as const;

/** Icon for the medical plan document link widget. */
function IconMedicalPlan() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

/** Simple form field row used in the forms workspace. */
function FormField({ label, value, type }: { label: string; value: string; type: "text" | "select" }) {
  return (
    <div className="editing-prototype__form-field">
      <label className="editing-prototype__form-label">{label}</label>
      <div className={`editing-prototype__form-input${type === "select" ? " editing-prototype__form-input--select" : ""}`}>
        <span className="editing-prototype__form-value">{value}</span>
        {type === "select" && <span className="editing-prototype__form-chevron" aria-hidden>›</span>}
      </div>
    </div>
  );
}

type EditFocus =
  | { kind: "none" }
  | { kind: "dashboard"; vizId: (typeof DASHBOARD_VISUALS)[number]["id"] }
  | { kind: "chat" };

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

function IconProtoSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <circle cx="6.75" cy="6.75" r="4.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
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

export function EditingPrototypeMock({
  variant = "default",
  contentType = "dashboards",
}: {
  variant?: "default" | "animated";
  contentType?: "dashboards" | "forms";
}) {
  const vizButtonRefs = useRef<Partial<Record<(typeof DASHBOARD_VISUALS)[number]["id"], HTMLButtonElement | null>>>(
    {},
  );
  const [editFocus, setEditFocus] = useState<EditFocus>({ kind: "none" });

  const selectedVizId = editFocus.kind === "dashboard" ? editFocus.vizId : null;

  const editContextLabel =
    contentType === "forms"
      ? FORMS_EDIT_CONTEXT
      : editFocus.kind === "dashboard"
        ? DASHBOARD_VISUALS.find((v) => v.id === editFocus.vizId)?.title ?? DEFAULT_EDIT_CONTEXT
        : editFocus.kind === "chat"
          ? CHAT_ARTIFACT_TITLE
          : DEFAULT_EDIT_CONTEXT;

  useEffect(() => {
    if (editFocus.kind !== "dashboard") return;
    vizButtonRefs.current[editFocus.vizId]?.focus();
  }, [editFocus]);

  return (
    <div className="editing-prototype" aria-label="Editing prototype mock — Analytics workspace with AI chat">
      <header className="editing-prototype__top-bar">
        <div className="editing-prototype__top-bar-left">
          <div className="editing-prototype__logo-dot" aria-hidden />
          <span className="editing-prototype__top-bar-divider" aria-hidden />
          <button type="button" className="editing-prototype__suite-select">
            <span>Analytics</span>
            <span className="editing-prototype__suite-chevron" aria-hidden />
          </button>
          <span className="editing-prototype__top-bar-divider" aria-hidden />
        </div>

        <div className="editing-prototype__search" role="search">
          <span className="editing-prototype__search-icon" aria-hidden>
            <IconProtoSearch />
          </span>
          <span className="editing-prototype__search-text">Search or jump to...</span>
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
            {contentType === "forms" ? (
              <div className="editing-prototype__main-canvas">
                <div className="editing-prototype__form-header">
                  <p className="editing-prototype__dash-caption">Benefits Admin · Plan configuration</p>
                </div>
                <div className="editing-prototype__form-body">
                  {FORM_FIELDS.map((f) => (
                    <FormField key={f.id} label={f.label} value={f.value} type={f.type} />
                  ))}
                </div>
              </div>
            ) : (
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

                <div
                  className="editing-prototype__chart-grid"
                  role="radiogroup"
                  aria-label="Select a visualization to edit"
                >
                  {DASHBOARD_VISUALS.map((viz) => {
                    const selected = editFocus.kind === "dashboard" && editFocus.vizId === viz.id;
                    return (
                      <button
                        key={viz.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        tabIndex={
                          selectedVizId === null
                            ? viz.id === DASHBOARD_VISUALS[0].id
                              ? 0
                              : -1
                            : selected
                              ? 0
                              : -1
                        }
                        className={
                          "editing-prototype__chart-panel editing-prototype__chart-panel--selectable" +
                          (viz.id === "headcount" ? " editing-prototype__chart-panel--tall" : "") +
                          (selected ? " editing-prototype__chart-panel--selected" : "")
                        }
                        onClick={() => setEditFocus({ kind: "dashboard", vizId: viz.id })}
                        ref={(el) => {
                          vizButtonRefs.current[viz.id] = el;
                        }}
                        onKeyDown={(e) => {
                          const currentId = editFocus.kind === "dashboard" ? editFocus.vizId : null;
                          const idx = currentId == null ? -1 : DASHBOARD_VISUALS.findIndex((v) => v.id === currentId);
                          const from = idx < 0 ? 0 : idx;
                          if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                            e.preventDefault();
                            const next = Math.min(from + 1, DASHBOARD_VISUALS.length - 1);
                            setEditFocus({ kind: "dashboard", vizId: DASHBOARD_VISUALS[next].id });
                          } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                            e.preventDefault();
                            const prev = Math.max(from - 1, 0);
                            setEditFocus({ kind: "dashboard", vizId: DASHBOARD_VISUALS[prev].id });
                          }
                        }}
                      >
                        <p className="editing-prototype__chart-heading">{viz.title}</p>
                        <div
                          className={
                            "editing-prototype__chart-surface" +
                            (viz.id === "headcount" ? " editing-prototype__chart-surface--fill" : "")
                          }
                        >
                          <SimpleBarChartDemo
                            variant={viz.id === "headcount" ? "stacked-bar" : "bar"}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
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
              {contentType === "forms" ? (
                <>
                  <blockquote className="editing-prototype__user-bubble">
                    Can you help me set up the new medical plan for open enrollment?
                  </blockquote>
                  <p className="editing-prototype__assistant-intro">
                    I’ve drafted the new medical plan configuration. Review the details and open to edit before publishing.
                  </p>
                  <div className="editing-prototype__chat-artifact-host editing-prototype__chat-artifact-host--open">
                    <InChatLinkWidget
                      title={CHAT_FORM_ARTIFACT_TITLE}
                      previewCaption="Benefits Admin"
                      previewIcon={<IconMedicalPlan />}
                      previewBody={null}
                      selected
                    />
                  </div>
                </>
              ) : (
                <>
                  <blockquote className="editing-prototype__user-bubble">
                    Show me how many people started in the company over the past few months.
                  </blockquote>
                  <p className="editing-prototype__assistant-intro">
                    Here’s a concise read on recent hiring and staffing from your People analytics data.
                  </p>
                  <div
                    className="editing-prototype__chat-artifact-host"
                    onClick={(e) => {
                      const el = e.target as HTMLElement;
                      if (el.closest("button, a, [role='menu'], [role='menuitem'], input, textarea")) return;
                      setEditFocus({ kind: "chat" });
                    }}
                  >
                    <RipplingArtifactShell
                      title={CHAT_ARTIFACT_TITLE}
                      footerTimestamp="Just now"
                      selected={editFocus.kind === "chat"}
                      onAddToDashboard={() => {}}
                    >
                      <SimpleBarChartDemo variant="donut" />
                    </RipplingArtifactShell>
                  </div>
                </>
              )}
            </div>

            <div className="editing-prototype__ai-composer-wrap">
              {variant === "animated" ? (
                <ChatComposerHat
                  contextLabel={editContextLabel}
                  autoStart
                  className={[
                    "editing-prototype__ai-hat",
                    editFocus.kind !== "none" ? "editing-prototype__ai-hat--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              ) : null}
              <Composer
                width="fill"
                version="alternate"
                surfaceState={variant === "animated" ? undefined : "edit"}
                editContextLabel={variant === "animated" ? undefined : editContextLabel}
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
        <FigmaLink href={FIGMA_PROTOTYPE} />
      </p>
    </div>
  );
}
