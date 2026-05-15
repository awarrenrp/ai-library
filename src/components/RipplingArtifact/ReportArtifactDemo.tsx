import type { CSSProperties } from "react";
import "./ReportArtifactDemo.css";

function IconChevronDown() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AvatarCell({ initials, hue }: { initials: string; hue: number }) {
  const bg: CSSProperties = {
    background: `color-mix(in srgb, hsl(${hue}deg 42% 82%) 62%, #ffffff)`,
  };
  return (
    <div className="report-artifact-avatar" style={bg}>
      <span className="report-artifact-avatar__ring" aria-hidden />
      <span className="report-artifact-avatar__label">{initials}</span>
    </div>
  );
}

type TaskRow = {
  name: string;
  subtitle: string;
  initials: string;
  hue: number;
  task: string;
  taskSub: string;
  status: "in-progress" | "not-started" | "complete";
  employees: string;
  action: string;
};

const ROWS: TaskRow[] = [
  {
    name: "Richard Sutherland",
    subtitle: "Designer",
    initials: "RS",
    hue: 210,
    task: "Register Rippling account",
    taskSub: "New hire onboarding",
    status: "in-progress",
    employees: "23 employees",
    action: "Resend invite",
  },
  {
    name: "June Lee",
    subtitle: "Engineering",
    initials: "JL",
    hue: 280,
    task: "Job offer",
    taskSub: "Pre-hire tasks",
    status: "not-started",
    employees: "3 employees",
    action: "Update expiration",
  },
  {
    name: "Mandy Moore",
    subtitle: "Sales",
    initials: "MM",
    hue: 340,
    task: "Agreements",
    taskSub: "Compliance",
    status: "not-started",
    employees: "23 employees",
    action: "Resend invite",
  },
  {
    name: "Alex Rivera",
    subtitle: "People",
    initials: "AR",
    hue: 160,
    task: "Personal information",
    taskSub: "Employee profile",
    status: "not-started",
    employees: "23 employees",
    action: "Update expiration",
  },
  {
    name: "Sam Okafor",
    subtitle: "Finance",
    initials: "SO",
    hue: 42,
    task: "Direct deposit",
    taskSub: "Payroll setup",
    status: "in-progress",
    employees: "7 employees",
    action: "Resend invite",
  },
  {
    name: "Priya Nair",
    subtitle: "Marketing",
    initials: "PN",
    hue: 195,
    task: "Benefits enrollment",
    taskSub: "New hire onboarding",
    status: "complete",
    employees: "11 employees",
    action: "View details",
  },
  {
    name: "Tom Deluca",
    subtitle: "Engineering",
    initials: "TD",
    hue: 260,
    task: "Equipment request",
    taskSub: "IT onboarding",
    status: "not-started",
    employees: "5 employees",
    action: "Resend invite",
  },
];

const STATUS_LABELS: Record<TaskRow["status"], string> = {
  "in-progress": "In progress",
  "not-started": "Not started",
  complete: "Complete",
};

export type ReportArtifactDemoProps = {
  /**
   * `artifact-shell` — negative margins align with RipplingArtifactShell body padding.
   * `standalone` — full width inside parent (e.g. in-chat widget); parent handles outer inset.
   */
  embed?: "artifact-shell" | "standalone";
};

export function ReportArtifactDemo({ embed = "artifact-shell" }: ReportArtifactDemoProps) {
  return (
    <div
      className={["report-artifact-demo", embed === "standalone" && "report-artifact-demo--standalone"]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Table */}
      <div className="report-artifact-table-wrap">
        <table className="report-artifact-table">
          <caption className="visually-hidden">
            Onboarding tasks: employee, task, status, and affected employees.
          </caption>
          <thead>
            <tr>
              <th className="report-artifact-th report-artifact-th--check" scope="col" aria-label="Select" />
              <th className="report-artifact-th report-artifact-th--person" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-title">Employee</span>
                  <IconChevronDown />
                </div>
              </th>
              <th className="report-artifact-th report-artifact-th--task" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-title">Task</span>
                  <IconChevronDown />
                </div>
              </th>
              <th className="report-artifact-th report-artifact-th--status" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-required" aria-hidden>*</span>
                  <span className="report-th-title">Status</span>
                </div>
              </th>
              <th className="report-artifact-th report-artifact-th--employees" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-title">Employees</span>
                </div>
              </th>
              <th className="report-artifact-th report-artifact-th--actions" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-title">Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.name}>
                <td className="report-artifact-td report-artifact-td--check">
                  <input type="checkbox" className="report-artifact-checkbox" aria-label={`Select ${row.name}`} />
                </td>
                <td className="report-artifact-td report-artifact-td--person">
                  <div className="report-person-cell">
                    <AvatarCell initials={row.initials} hue={row.hue} />
                    <div className="report-person-cell__text">
                      <span className="report-person-cell__name">{row.name}</span>
                      <span className="report-person-cell__sub">{row.subtitle}</span>
                    </div>
                  </div>
                </td>
                <td className="report-artifact-td report-artifact-td--task">
                  <span className="report-task-cell__name">{row.task}</span>
                  <span className="report-task-cell__sub">{row.taskSub}</span>
                </td>
                <td className="report-artifact-td report-artifact-td--status">
                  <span className={`report-status report-status--${row.status}`}>
                    {STATUS_LABELS[row.status]}
                  </span>
                </td>
                <td className="report-artifact-td report-artifact-td--employees">
                  <button type="button" className="report-employee-link">
                    {row.employees}
                  </button>
                </td>
                <td className="report-artifact-td report-artifact-td--actions">
                  <button type="button" className="report-action-btn">
                    {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
