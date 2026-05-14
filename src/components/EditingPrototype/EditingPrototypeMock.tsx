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
import { useDismissOnOutsidePress } from "../../hooks/useDismissOnOutsidePress";
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
const FORMS_EDIT_CONTEXT = "New medical plan";

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

/* ─── Chat history panel ─────────────────────────────────────────── */

type ChatHistoryItem = {
  id: string;
  text: string;
  active?: boolean;
  running?: boolean;
  unread?: boolean;
};

type ChatHistorySection = {
  id: string;
  label: string;
  items: ChatHistoryItem[];
};

const CHAT_HISTORY: readonly ChatHistorySection[] = [
  {
    id: "running",
    label: "Running",
    items: [
      { id: "r1", text: "What's the progress on the Vega initiative?", running: true },
      { id: "r2", text: "How often has Rivera processed the bi-weekly payments?", unread: true },
    ],
  },
  {
    id: "yesterday",
    label: "Yesterday",
    items: [
      { id: "y1", text: "Who is @parker conrad?" },
      { id: "y2", text: "How often has Rivera processed the bi-weekly payments?" },
      { id: "y3", text: "When did sarah get the updated onboarding documents be ready?" },
    ],
  },
  {
    id: "2days",
    label: "2 days ago",
    items: [
      { id: "d1", text: "What's the status of the annual report?" },
      { id: "d2", text: "Can you tell me how many times Patel has run payroll this year?", active: true },
      { id: "d3", text: "When did sarah get the updated onboarding documents be ready?" },
      { id: "d4", text: "Who works in legal?" },
      { id: "d5", text: "What's @como's PR count this week?" },
    ],
  },
  {
    id: "lastweek",
    label: "Last Week",
    items: [
      { id: "lw1", text: "How many designers are there?" },
      { id: "lw2", text: "What is our PTO policy?" },
    ],
  },
  {
    id: "lastmonth",
    label: "Last Month",
    items: [
      { id: "lm1", text: "What is the company org chart?" },
      { id: "lm2", text: "How do I submit and track expenses?" },
      { id: "lm3", text: "What are the upcoming company holidays?" },
      { id: "lm4", text: "How do I change my direct deposit info?" },
      { id: "lm5", text: "Where can I find the employee handbook?" },
      { id: "lm6", text: "How do I enroll in benefits?" },
      { id: "lm7", text: "What is the policy on remote work?" },
      { id: "lm8", text: "How do I request a leave of absence?" },
    ],
  },
] as const;

function IconHistoryClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M8 7.06 12.53 2.53l.94.94L8.94 8l4.53 4.53-.94.94L8 8.94l-4.53 4.53-.94-.94L7.06 8 2.53 3.47l.94-.94L8 7.06Z"
      />
    </svg>
  );
}

function IconHistorySpinner() {
  return (
    <svg className="editing-prototype__chat-history-spinner" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="25 10" />
    </svg>
  );
}

function IconHistoryArchive() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        d="M2 4.5h12v2H2v-2Zm1 2v6h10v-6H3Zm2.5 2.5h5"
      />
    </svg>
  );
}

function ChatHistoryPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="editing-prototype__chat-history" role="dialog" aria-modal="true" aria-label="Chat history">
      <div className="editing-prototype__chat-history-header">
        <h2 className="editing-prototype__chat-history-title">Chats</h2>
        <button
          type="button"
          className="editing-prototype__chat-history-close"
          aria-label="Close chat history"
          onClick={onClose}
        >
          <IconHistoryClose />
        </button>
      </div>

      <div className="editing-prototype__chat-history-scroll">
        {CHAT_HISTORY.map((section, idx) => (
          <div key={section.id}>
            <p className="editing-prototype__chat-history-section-label">{section.label}</p>
            {section.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={[
                  "editing-prototype__chat-history-item",
                  item.active ? "editing-prototype__chat-history-item--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="editing-prototype__chat-history-item-text">{item.text}</span>
                {item.running ? <IconHistorySpinner /> : null}
                {item.unread ? <span className="editing-prototype__chat-history-unread" aria-label="Unread" /> : null}
              </button>
            ))}
            {/* Hairline separator after the Running section */}
            {idx === 0 ? <div className="editing-prototype__chat-history-divider" aria-hidden /> : null}
          </div>
        ))}
      </div>

      <div className="editing-prototype__chat-history-footer">
        <button type="button" className="editing-prototype__chat-history-delete-btn">
          <IconHistoryArchive />
          Delete all chats
          <span className="editing-prototype__chat-history-badge">1</span>
        </button>
      </div>
    </div>
  );
}

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
  // Forms: left panel only opens once the user clicks the artifact in chat.
  const [formOpen, setFormOpen] = useState(false);
  // Default editing style only: chip can be dismissed.
  const [chipDismissed, setChipDismissed] = useState(false);
  // Chat history overlay.
  const [chatHistoryOpen, setChatHistoryOpen] = useState(false);
  // Notification bell dropdown.
  const [notifOpen, setNotifOpen] = useState(false);
  const notifAnchorRef = useRef<HTMLDivElement>(null);
  const notifBtnRef = useRef<HTMLButtonElement>(null);

  useDismissOnOutsidePress(
    notifOpen,
    (reason) => {
      setNotifOpen(false);
      if (reason === "escape") notifBtnRef.current?.focus();
    },
    (n) => notifAnchorRef.current?.contains(n) ?? false,
  );

  const selectedVizId = editFocus.kind === "dashboard" ? editFocus.vizId : null;

  const editContextLabel =
    contentType === "forms"
      ? FORMS_EDIT_CONTEXT
      : editFocus.kind === "dashboard"
        ? DASHBOARD_VISUALS.find((v) => v.id === editFocus.vizId)?.title ?? DEFAULT_EDIT_CONTEXT
        : editFocus.kind === "chat"
          ? CHAT_ARTIFACT_TITLE
          : DEFAULT_EDIT_CONTEXT;

  // Default editing style: chip shows only when there's an active focus and hasn't been dismissed.
  const showEditChip =
    variant !== "animated" &&
    !chipDismissed &&
    (contentType === "forms" ? formOpen : true);

  // Animated hat: same context condition as the chip, minus the dismissal state
  // (the hat has no dismiss affordance). For forms, hide the context label until
  // the user has opened an artifact so the hat's idle state matches the chip.
  const hatContextLabel =
    (contentType === "forms" ? formOpen : true) ? editContextLabel : undefined;

  function handleSetEditFocus(focus: EditFocus) {
    setEditFocus(focus);
    setChipDismissed(false);
  }

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
            <div className="editing-prototype__notif-anchor" ref={notifAnchorRef}>
              <button
                ref={notifBtnRef}
                type="button"
                className="editing-prototype__ghost-icon editing-prototype__ghost-icon--notif"
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={notifOpen}
                onClick={() => setNotifOpen((o) => !o)}
              >
                <IconProtoBell />
                <span className="editing-prototype__notif-badge" aria-hidden />
              </button>
              {notifOpen && (
                <div className="editing-prototype__notif-dropdown" role="dialog" aria-label="Notifications">
                  <div className="editing-prototype__notif-header">
                    <span className="editing-prototype__notif-header-title">Notifications</span>
                  </div>
                  <div className="editing-prototype__notif-item">
                    <span className="editing-prototype__notif-dot" aria-hidden />
                    <div className="editing-prototype__notif-body">
                      <p className="editing-prototype__notif-msg">You&rsquo;re out of credits for the month</p>
                      <p className="editing-prototype__notif-sub">Upgrade your plan to continue using Rippling AI</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  {contentType === "forms"
                    ? <>Benefits Admin<span className="editing-prototype__bc-sep">›</span>Plan configuration</>
                    : <>People analytics<span className="editing-prototype__bc-sep">›</span>Dashboards</>
                  }
                </p>
                <div className="editing-prototype__title-row">
                  <h2 className="editing-prototype__page-heading">
                    {contentType === "forms" ? "New medical plan" : "Payroll mix by department"}
                  </h2>
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
              formOpen ? (
                <div className="editing-prototype__main-canvas editing-prototype__main-canvas--slide-in">
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
                <div className="editing-prototype__canvas-empty" aria-label="Select an artifact to begin editing" />
              )
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
                        onClick={() => handleSetEditFocus({ kind: "dashboard", vizId: viz.id })}
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
                            handleSetEditFocus({ kind: "dashboard", vizId: DASHBOARD_VISUALS[next].id });
                          } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                            e.preventDefault();
                            const prev = Math.max(from - 1, 0);
                            handleSetEditFocus({ kind: "dashboard", vizId: DASHBOARD_VISUALS[prev].id });
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
              onMenuClick={() => setChatHistoryOpen(true)}
              onAddCommentClick={() => {}}
              onExpandClick={() => {}}
              onCloseClick={() => {}}
            />

            {chatHistoryOpen ? (
              <ChatHistoryPanel onClose={() => setChatHistoryOpen(false)} />
            ) : null}

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
                      selected={formOpen}
                      onOpen={() => {
                        setFormOpen(true);
                        setChipDismissed(false);
                      }}
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
                      handleSetEditFocus({ kind: "chat" });
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
                  contextLabel={hatContextLabel}
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
                surfaceState={showEditChip ? "edit" : "default"}
                editContextLabel={showEditChip ? editContextLabel : undefined}
                onDismissEditContext={variant !== "animated" ? () => setChipDismissed(true) : undefined}
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
