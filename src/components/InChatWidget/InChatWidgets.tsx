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

/** Body rows — alignment with Figma Table · 883:13314 */
const TABLE_ROWS: readonly (readonly string[])[] = [
  ["1234", "June Lee", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1233", "Mandy Moore", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Electronics", "Jan 23, 2024", "$1,234.00"],
  ["1222", "Customer", "Electronics", "Jan 23, 2024", "$1,234.00"],
];

export type InChatTablePreviewProps = {
  /**
   * Accessible name for the table — used for the visually hidden caption.
   * Defaults to a generic sample label so SR users still hear what the grid contains.
   */
  ariaLabel?: string;
};

/** Full table preview — Figma Table frame 883:13314 (not link-style chrome). */
export function InChatTablePreview({
  ariaLabel = "Sample in-chat table widget: orders by customer, category, date, and revenue.",
}: InChatTablePreviewProps = {}) {
  return (
    <div className="icw-table-preview-wrap">
      <table className="icw-table-preview">
        <caption className="visually-hidden">{ariaLabel}</caption>
        <thead>
          <tr>
            {TABLE_HEADERS.map((label) => (
              <th key={label} scope="col" className="icw-table-preview__th">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((cells, ri) => (
            <tr key={ri}>
              {cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={[
                    "icw-table-preview__td",
                    ci === TABLE_HEADERS.length - 1 ? "icw-table-preview__td--numeric" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WidgetGroup({ category, children }: { category: string; children: ReactNode }) {
  return (
    <div className="icw-widget-group" role="group" aria-label={category}>
      <h3 className="icw-category-label">{category}</h3>
      {children}
    </div>
  );
}

export type InChatLinkWidgetProps = {
  title: string;
  previewCaption: string;
  previewIcon: ReactNode;
  previewBody: ReactNode;
  /** Click handler for the "Open" affordance. */
  onOpen?: () => void;
  /** Accessible name for the "Open" affordance; defaults to `Open {title}` so SR users hear which destination. */
  openAriaLabel?: string;
};

/**
 * Link-style in-chat widget — title row + preview tile + Open button.
 * Public surface; backs both the Widget previews on the spec page and product wiring.
 */
export function InChatLinkWidget({
  title,
  previewCaption,
  previewIcon,
  previewBody,
  onOpen,
  openAriaLabel,
}: InChatLinkWidgetProps) {
  return (
    <article className="icw-widget icw-widget--96" aria-label={title}>
      <div className="icw-widget-main">
        <p className="icw-widget-title">{title}</p>
        <button
          type="button"
          className="icw-open-btn"
          onClick={onOpen}
          aria-label={openAriaLabel ?? `Open ${title}`}
        >
          Open
        </button>
      </div>
      <PreviewChrome icon={previewIcon} caption={previewCaption}>
        {previewBody}
      </PreviewChrome>
    </article>
  );
}

export type InChatTableWidgetProps = InChatTablePreviewProps;

/** Table in-chat widget · Figma 883:13314 — grid only (no link-style title/Open chrome). */
export function InChatTableWidget(props: InChatTableWidgetProps = {}) {
  return <InChatTablePreview {...props} />;
}

/**
 * Canonical example widgets — one per category. Both the Specs section
 * (`InChatWidgets`) and the In-context demo (`InChatWidgetDemo`) consume these
 * so a single edit propagates to both surfaces.
 */
export function SpendLinkWidget(props: Pick<InChatLinkWidgetProps, "onOpen" | "openAriaLabel"> = {}) {
  return (
    <InChatLinkWidget
      title="View Spend Management"
      previewCaption="Spend"
      previewIcon={<IconCreditCard size={16} />}
      previewBody={<SkeletonLines bars={2} />}
      {...props}
    />
  );
}

export function OfferLetterDocumentWidget(
  props: Pick<InChatLinkWidgetProps, "onOpen" | "openAriaLabel"> = {},
) {
  return (
    <InChatLinkWidget
      title="View Offer Letter"
      previewCaption="Document"
      previewIcon={<IconDocument size={16} />}
      previewBody={<SkeletonLines bars={2} />}
      {...props}
    />
  );
}

export function NewStarterDashboardWidget(
  props: Pick<InChatLinkWidgetProps, "onOpen" | "openAriaLabel"> = {},
) {
  return (
    <InChatLinkWidget
      title="View New Starter Dashboard"
      previewCaption="Dashboard"
      previewIcon={<IconDashboard />}
      previewBody={<DashboardMiniPreview />}
      {...props}
    />
  );
}

export function InChatWidgets() {
  return (
    <section className="icw-showcase" aria-label="In-chat widget examples">
      <WidgetGroup category="Rippling link">
        <SpendLinkWidget />
      </WidgetGroup>
      <WidgetGroup category="Document">
        <OfferLetterDocumentWidget />
      </WidgetGroup>
      <WidgetGroup category="Dashboard">
        <NewStarterDashboardWidget />
      </WidgetGroup>
      <WidgetGroup category="Table">
        <InChatTableWidget />
      </WidgetGroup>
    </section>
  );
}
