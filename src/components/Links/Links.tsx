import type { ReactNode } from "react";
import "./Links.css";

export function LinksTextLink({
  children,
  href = "#",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} className="links-text-link" onClick={onClick}>
      {children}
    </a>
  );
}

export function LinksChatLine({ children }: { children: ReactNode }) {
  return <div className="links-chat-line">{children}</div>;
}

export function LinksSourcesChip({ count }: { count: number }) {
  return (
    <div className="links-sources-chip">
      <span className="links-sources-chip-dot" aria-hidden />
      Using {count} sources
    </div>
  );
}

function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 2h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.5 7.25 9 8.75 6.5 10.25v-3Z" fill="currentColor" />
    </svg>
  );
}

export type FileCitationVariant = "document" | "video";

export function LinksFileCitationRow({
  name,
  size,
  variant = "document",
}: {
  name: string;
  size: string;
  variant?: FileCitationVariant;
}) {
  const Icon = variant === "video" ? IconVideo : IconDoc;
  return (
    <button type="button" className="links-file-row">
      <span className="links-file-icon">
        <Icon />
      </span>
      <span className="links-file-name">{name}</span>
      <span className="links-file-meta">{size}</span>
    </button>
  );
}

export function LinksFileBlock({
  kind,
  children,
}: {
  kind: string;
  children: ReactNode;
}) {
  return (
    <div className="links-file-block">
      <p className="links-file-kind">{kind}</p>
      {children}
    </div>
  );
}

export function LinksRichArticleCard({
  sourceName,
  dateLine,
  title,
  snippet,
}: {
  sourceName: string;
  dateLine: string;
  title: string;
  snippet: string;
}) {
  return (
    <button type="button" className="links-rich-card">
      <div className="links-rich-body">
        <div className="links-rich-meta">
          <span className="links-rich-meta-source">
            <span className="links-rich-favicon" aria-hidden />
            {sourceName}
          </span>
          <span aria-hidden>•</span>
          <span>{dateLine}</span>
        </div>
        <p className="links-rich-title">{title}</p>
        <p className="links-rich-snippet">{snippet}</p>
      </div>
      <span className="links-rich-thumb" aria-hidden />
    </button>
  );
}

export function LinksEmphasisButton({
  children,
  variant = "primary",
  badge,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  badge?: string;
}) {
  return (
    <button
      type="button"
      className={[
        "links-emphasis-btn",
        variant === "primary" ? "links-emphasis-btn--primary" : "links-emphasis-btn--secondary",
      ].join(" ")}
    >
      {children}
      {badge ? <span className="links-emphasis-badge">{badge}</span> : null}
    </button>
  );
}

export function LinksBelowChatStack({
  children,
  instruction,
}: {
  children: ReactNode;
  instruction?: string;
}) {
  return (
    <div className="links-below-stack">
      <div className="links-below-actions">{children}</div>
      {instruction ? <p className="links-instruction">{instruction}</p> : null}
    </div>
  );
}

export function LinksHandoffCard({
  title,
  body,
  actionLabel,
}: {
  title: string;
  body: string;
  actionLabel: string;
}) {
  return (
    <div className="links-handoff">
      <p className="links-handoff-title">{title}</p>
      <p className="links-handoff-body">{body}</p>
      <LinksEmphasisButton variant="primary">{actionLabel}</LinksEmphasisButton>
    </div>
  );
}
