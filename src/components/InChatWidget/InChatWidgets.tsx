import type { ReactNode } from "react";
import "./InChatWidgets.css";

function IconCreditCard({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 7h12" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function IconDocument({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M4 1.5h4.5L12 5v8.5A1.5 1.5 0 0 1 10.5 15h-7A1.5 1.5 0 0 1 2 13.5v-11A1.5 1.5 0 0 1 3.5 1H4Zm4 0V5h3.5L8 1.5Z"
      />
    </svg>
  );
}

/** Boxes — Figma AI-components · instance 883:13493 */
function IconDashboard({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 9"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M3.75 0H0V2.75H3.75V0Z" fill="currentColor" />
      <path d="M3.75 3.5H0V8.75H3.75V3.5Z" fill="currentColor" />
      <path d="M4.5 8.75H9.75V6L4.5 6L4.5 8.75Z" fill="currentColor" />
      <path d="M4.5 5.25L9.75 5.25V0H4.5L4.5 5.25Z" fill="currentColor" />
    </svg>
  );
}

function OpenButton() {
  return (
    <button type="button" className="icw-open-btn">
      Open
    </button>
  );
}

function PreviewChrome({
  icon,
  caption,
  children,
}: {
  icon: ReactNode;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="icw-preview">
      <div className="icw-preview-surface">
        <div className="icw-preview-head">
          <span className="icw-preview-icon" aria-hidden>
            {icon}
          </span>
          <span className="icw-preview-caption">{caption}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function SkeletonLines({ bars = 2 }: { bars?: number }) {
  return (
    <div className="icw-preview-bars" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className="icw-preview-bar" />
      ))}
    </div>
  );
}

function DashboardMiniPreview() {
  return (
    <div className="icw-dash-rows" aria-hidden>
      <div className="icw-dash-row">
        <span className="icw-dash-bar" />
        <span className="icw-dash-bar" />
        <span className="icw-dash-bar" />
      </div>
      <div className="icw-dash-row">
        <span className="icw-dash-bar" />
        <span className="icw-dash-bar" />
      </div>
    </div>
  );
}

const TABLE_HEADERS = ["Order ID", "Customer", "Category", "Order date", "Revenue"] as const;

const TABLE_ROWS: string[][] = [
  ["1234", "June Lee", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1233", "Mandy Moore", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Electronics", "Jan 23, 2024", "$1,234.00"],
];

function TableWidget() {
  return (
    <article className="icw-widget icw-widget--table" aria-label="Orders table preview">
      <div className="icw-table-wrap">
        <div className="icw-table">
          <div className="icw-table-row icw-table-row--head">
            {TABLE_HEADERS.map((h) => (
              <div key={h} className="icw-table-cell icw-table-cell--head">
                {h}
              </div>
            ))}
          </div>
          {TABLE_ROWS.map((cells, ri) => (
            <div key={ri} className="icw-table-row">
              {cells.map((c, ci) => (
                <div key={ci} className="icw-table-cell">
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function WidgetGroup({ category, children }: { category: string; children: ReactNode }) {
  return (
    <div className="icw-widget-group">
      <p className="icw-category-label">{category}</p>
      {children}
    </div>
  );
}

function LinkStyleWidget({
  title,
  previewCaption,
  previewIcon,
  previewBody,
}: {
  title: string;
  previewCaption: string;
  previewIcon: ReactNode;
  previewBody: ReactNode;
}) {
  return (
    <article className="icw-widget icw-widget--96">
      <div className="icw-widget-main">
        <p className="icw-widget-title">{title}</p>
        <OpenButton />
      </div>
      <PreviewChrome icon={previewIcon} caption={previewCaption}>
        {previewBody}
      </PreviewChrome>
    </article>
  );
}

export function InChatWidgets() {
  return (
    <section className="icw-showcase" aria-label="In-chat widget examples">
      <WidgetGroup category="Rippling link">
        <LinkStyleWidget
          title="View Spend Management"
          previewCaption="Spend"
          previewIcon={<IconCreditCard size={16} />}
          previewBody={<SkeletonLines bars={2} />}
        />
      </WidgetGroup>
      <WidgetGroup category="Document">
        <LinkStyleWidget
          title="View Offer Letter"
          previewCaption="Document"
          previewIcon={<IconDocument size={16} />}
          previewBody={<SkeletonLines bars={2} />}
        />
      </WidgetGroup>
      <WidgetGroup category="Dashboard">
        <LinkStyleWidget
          title="View New Starter Dashboard"
          previewCaption="Dashboard"
          previewIcon={<IconDashboard />}
          previewBody={<DashboardMiniPreview />}
        />
      </WidgetGroup>
      <WidgetGroup category="Table">
        <TableWidget />
      </WidgetGroup>
    </section>
  );
}
