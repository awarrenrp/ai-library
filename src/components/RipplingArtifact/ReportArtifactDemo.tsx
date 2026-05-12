import type { CSSProperties } from "react";
import "./ReportArtifactDemo.css";

function IconTip() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth={1.25}
      />
      <path d="M8 11V8M8 6h.01" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" />
    </svg>
  );
}

function IconChevronDownMini() {
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

type PersonRow = {
  name: string;
  subtitle: string;
  initials: string;
  hue: number;
  dept: string;
  status: string;
  start: string;
};

const ROWS: PersonRow[] = [
  {
    name: "Richard Sutherland",
    subtitle: "Designer",
    initials: "RS",
    hue: 210,
    dept: "Product",
    status: "Active",
    start: "Jan 23, 2024",
  },
  {
    name: "June Lee",
    subtitle: "Engineering",
    initials: "JL",
    hue: 280,
    dept: "Engineering",
    status: "Active",
    start: "Jan 21, 2024",
  },
  {
    name: "Mandy Moore",
    subtitle: "Sales",
    initials: "MM",
    hue: 340,
    dept: "Sales",
    status: "Invite sent",
    start: "Jan 18, 2024",
  },
  {
    name: "Alex Rivera",
    subtitle: "People",
    initials: "AR",
    hue: 160,
    dept: "People",
    status: "Active",
    start: "Jan 12, 2024",
  },
];

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
      <div className="report-artifact-table-wrap">
        <table className="report-artifact-table">
          <caption className="visually-hidden">
            Sample report: employees with department, status, and start date.
          </caption>
          <thead>
            <tr>
              <th className="report-artifact-th report-artifact-th--rich" scope="col">
                <div className="report-th-rich">
                  <div className="report-th-copy">
                    <span className="report-th-title">Employee</span>
                    <span className="report-th-sub">Legal name</span>
                  </div>
                  <button type="button" className="report-th-icon-btn" aria-label="Column info">
                    <IconTip />
                  </button>
                  <button type="button" className="report-th-chevron" aria-label="Column options">
                    <IconChevronDownMini />
                  </button>
                </div>
              </th>
              <th className="report-artifact-th" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-title">Department</span>
                </div>
              </th>
              <th className="report-artifact-th" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-required" aria-hidden>
                    *
                  </span>
                  <span className="report-th-title">Status</span>
                </div>
              </th>
              <th className="report-artifact-th report-artifact-th--numeric" scope="col">
                <div className="report-th-simple">
                  <span className="report-th-title">Start date</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.name}>
                <td className="report-artifact-td report-artifact-td--person">
                  <div className="report-person-cell">
                    <AvatarCell initials={row.initials} hue={row.hue} />
                    <div className="report-person-cell__text">
                      <span className="report-person-cell__name">{row.name}</span>
                      <span className="report-person-cell__sub">{row.subtitle}</span>
                    </div>
                  </div>
                </td>
                <td className="report-artifact-td">{row.dept}</td>
                <td className="report-artifact-td">{row.status}</td>
                <td className="report-artifact-td report-artifact-td--numeric">{row.start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
