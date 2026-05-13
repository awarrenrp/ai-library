import { useId, type ReactNode } from "react";
import { Button } from "../../pebbleButton";
import "./Links.css";

export function LinksTextLink({
  children,
  href = "#",
  onClick,
  variant = "internal",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** `external` shows a small outbound arrow after the label. */
  variant?: "internal" | "external";
}) {
  return (
    <a href={href} className="links-text-link" onClick={onClick}>
      <span className="links-text-link__label">{children}</span>
      {variant === "external" ? (
        <span className="links-text-link__suffix" aria-hidden>
          <IconArrowOut />
        </span>
      ) : null}
    </a>
  );
}

export function LinksChatLine({ children }: { children: ReactNode }) {
  return <div className="links-chat-line">{children}</div>;
}

export function LinksSourcesChip({ count }: { count: number }) {
  return (
    <div className="links-sources-chip">
      <span className="links-sources-chip-icon" aria-hidden>
        <IconSources />
      </span>
      Using {count} sources
    </div>
  );
}

/** PDF citation — Figma AI-components · 427:103998 (file glyph). */
function IconCitationPdf() {
  return (
    <svg width="16" height="16" viewBox="2.83 2.67 10.34 13.67" fill="none" aria-hidden>
      <path
        d="M2.83334 2.66663H9.87401L13.1667 5.95929V16.3333H2.83334V2.66663ZM9.66668 3.87396V6.16663H11.9593L9.66668 3.87396ZM5.33334 9.33329H10.6667V8.33329H5.33334V9.33329ZM10.6667 11.6666V10.6666H5.33334V11.6666H10.6667ZM5.33334 14H10.6667V13H5.33334V14Z"
        fill="var(--color-citation-pdf, #bb3d2a)"
      />
    </svg>
  );
}

/** Image citation — Figma AI-components · 427:104016 (file glyph). */
function IconCitationImage() {
  return (
    <svg width="16" height="16" viewBox="1.83 3.33 12.34 12.34" fill="none" aria-hidden>
      <path
        d="M14.1667 3.33337H1.83334V15.6667H14.1667V3.33337ZM10 10.5L13.1667 13.4027V14.6667H2.83334V11L5.00001 8.83337L8.33334 12.1667L10 10.5ZM11.3333 6.50004C11.3333 7.23671 10.7367 7.83337 10 7.83337C9.26334 7.83337 8.66668 7.23671 8.66668 6.50004C8.66668 5.76337 9.26334 5.16671 10 5.16671C10.7367 5.16671 11.3333 5.76337 11.3333 6.50004Z"
        fill="var(--color-citation-image, #512f3e)"
      />
    </svg>
  );
}

export type FileCitationVariant = "document" | "image";

export function LinksFileCitationRow({
  name,
  size,
  variant = "document",
}: {
  name: string;
  size: string;
  variant?: FileCitationVariant;
}) {
  const Icon = variant === "image" ? IconCitationImage : IconCitationPdf;
  return (
    <div className="links-file-row">
      <Button
        type={Button.TYPES.BUTTON}
        appearance={Button.APPEARANCES.OUTLINE}
        variant={Button.VARIANTS.NORMAL}
        size={Button.SIZES.S}
        isFluid
        fontInherit
      >
        <>
          <span className="links-file-icon">
            <Icon />
          </span>
          <span className="links-file-name">{name}</span>
          <span className="links-file-meta">{size}</span>
        </>
      </Button>
    </div>
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
  sourceInitial,
  showThumbnail = true,
}: {
  sourceName: string;
  dateLine: string;
  title: string;
  snippet: string;
  /** Single letter or short mark in the favicon slot (defaults to first letter of source name). */
  sourceInitial?: string;
  /** Omit in narrow side-chat thread; full-page / spec keeps the preview image (Figma AI-components · 427:103820). */
  showThumbnail?: boolean;
}) {
  const initial = (sourceInitial ?? sourceName).trim().slice(0, 1).toUpperCase();
  return (
    <div className={["links-rich-card", showThumbnail ? "" : "links-rich-card--text-only"].filter(Boolean).join(" ")}>
      <Button
        type={Button.TYPES.BUTTON}
        appearance={Button.APPEARANCES.OUTLINE}
        variant={Button.VARIANTS.NORMAL}
        size={Button.SIZES.M}
        isFluid
        fontInherit
      >
        <>
          <div className="links-rich-body">
            <div className="links-rich-meta">
              <span className="links-rich-meta-source">
                <span className="links-rich-favicon" aria-hidden>
                  {initial}
                </span>
                {sourceName}
              </span>
              <span aria-hidden>•</span>
              <span>{dateLine}</span>
            </div>
            <p className="links-rich-title">{title}</p>
            <p className="links-rich-snippet">{snippet}</p>
          </div>
          {showThumbnail ? (
            <span className="links-rich-thumb" aria-hidden>
              <span className="links-rich-thumb-visual">
                <IconArticleThumb />
              </span>
              <span className="links-rich-thumb-open">
                <span className="links-rich-thumb-open-inner">
                  <IconRichCardOpen />
                </span>
              </span>
            </span>
          ) : null}
        </>
      </Button>
    </div>
  );
}

export function LinksEmphasisButton({
  children,
  variant = "primary",
  badge,
  icon,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "info";
  badge?: string;
  /** Leading icon (per destination type). */
  icon?: ReactNode;
}) {
  const appearance =
    variant === "primary"
      ? Button.APPEARANCES.PRIMARY
      : variant === "info"
        ? Button.APPEARANCES.INFO
        : Button.APPEARANCES.OUTLINE;
  return (
    <Button type={Button.TYPES.BUTTON} appearance={appearance} variant={Button.VARIANTS.NORMAL} size={Button.SIZES.M}>
      <>
        {icon ? <span className="links-emphasis-btn__icon">{icon}</span> : null}
        <span className="links-emphasis-btn__label">{children}</span>
        {badge ? <span className="links-emphasis-badge">{badge}</span> : null}
      </>
    </Button>
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
      <LinksEmphasisButton variant="info">{actionLabel}</LinksEmphasisButton>
    </div>
  );
}

function IconArrowOut() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M9 6.5V9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M6 6h4V2M10 6 5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSources() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 4.5h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 2.5h7v7"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArticleThumb() {
  return (
    <svg className="links-rich-thumb-svg" width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="5" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      <circle cx="11" cy="14" r="2.25" fill="currentColor" opacity="0.35" />
      <path d="M9 22h14l-4.5-6-3 4-2.5-3L9 22Z" fill="currentColor" opacity="0.28" />
    </svg>
  );
}

/** Open in new tab — Figma AI-components · 427:103820 (Icon Button). */
function IconRichCardOpen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z"
        fill="#ffffff"
      />
      <path
        d="M16.126 7.40674H10.6667V6.40674H17.766V13.5061H16.766V8.18074L7.35333 17.5934L6.646 16.8861L16.126 7.40674Z"
        fill="#000000"
      />
    </svg>
  );
}

export function IconApproveCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.25 6.5 11 12.5 5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconDeclineLine() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

/** Help Center — Figma AI-components · node 870:14543 (Start icon). */
export function IconHelpBook() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M7.99996 1.16675C11.774 1.16675 14.8333 4.22608 14.8333 8.00008C14.8333 11.7741 11.774 14.8334 7.99996 14.8334C4.22596 14.8334 1.16663 11.7741 1.16663 8.00008C1.16663 4.22608 4.22596 1.16675 7.99996 1.16675ZM8.66663 10.5834C8.66663 10.2154 8.36796 9.91675 7.99996 9.91675C7.63196 9.91675 7.33329 10.2154 7.33329 10.5834C7.33329 10.9514 7.63196 11.2501 7.99996 11.2501C8.36796 11.2501 8.66663 10.9514 8.66663 10.5834ZM7.16663 6.58341C7.16663 6.10941 7.53529 5.75008 7.99996 5.75008C8.44863 5.75008 8.83329 6.12608 8.83329 6.61675C8.83329 6.86475 8.73396 7.06542 8.58063 7.20342C8.55863 7.22342 8.53529 7.24475 8.51063 7.26608C8.32863 7.42942 8.09929 7.63475 7.91463 7.86341C7.70129 8.12808 7.49929 8.48008 7.49929 8.91675H8.49929C8.49929 8.80141 8.55063 8.66742 8.69263 8.49142C8.82263 8.33008 8.98796 8.18208 9.17729 8.01142L9.25063 7.94542C9.61196 7.61942 9.83329 7.15008 9.83329 6.61608C9.83329 5.59675 9.02396 4.74941 7.99996 4.74941C6.99196 4.74941 6.16663 5.54741 6.16663 6.58275H7.16663V6.58341Z"
        fill="var(--color-primary, #7a005d)"
      />
    </svg>
  );
}

/** Talk to sales — Figma AI-components · node 870:14570 (Start icon). */
export function IconSalesBriefcase() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.43516 5.14311C2.43516 3.89644 1.81746 2.86511 0.670303 2H3.33964C4.27722 2.74044 4.8508 3.87378 4.8508 5.14311C4.8508 6.41244 4.27722 7.542 3.33964 8.28622C4.20736 8.65644 4.70005 9.56311 4.70005 10.8627V13.3333H2.28073V10.8627C2.28073 9.62733 1.70715 8.76222 0.666626 8.28622C1.81378 7.42111 2.43148 6.38978 2.43148 5.14311H2.43516ZM7.67456 5.14311C7.67456 3.89644 7.06054 2.86511 5.90971 2H8.57905C9.51663 2.74044 10.0902 3.87378 10.0902 5.14311C10.0902 6.41244 9.51663 7.542 8.57905 8.28622C9.44677 8.65644 9.93946 9.56311 9.93946 10.8627V13.3333H7.52014V10.8627C7.52014 9.62733 6.94656 8.76222 5.90603 8.28622C7.05319 7.42111 7.67089 6.38978 7.67089 5.14311H7.67456ZM12.9177 5.14311C12.9177 3.89644 12.3036 2.86511 11.1528 2H13.8221C14.7597 2.74044 15.3333 3.87378 15.3333 5.14311C15.3333 6.41244 14.7597 7.542 13.8221 8.28622C14.6899 8.65644 15.1825 9.56311 15.1825 10.8627V13.3333H12.7632V10.8627C12.7632 9.62733 12.1896 8.76222 11.1491 8.28622C12.2963 7.42111 12.914 6.38978 12.914 5.14311H12.9177Z"
        fill="var(--color-primary, #7a005d)"
      />
    </svg>
  );
}

/** View Rippling Spend — Figma AI-components · node 870:14576 (Start icon). */
export function IconSpendCard() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip0 = `links-spend-0-${uid}`;
  const clip1 = `links-spend-1-${uid}`;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath={`url(#${clip0})`}>
        <path
          d="M13.5 0H2.5C1.11929 0 0 1.11929 0 2.5V13.5C0 14.8807 1.11929 16 2.5 16H13.5C14.8807 16 16 14.8807 16 13.5V2.5C16 1.11929 14.8807 0 13.5 0Z"
          fill="var(--color-primary, #7a005d)"
        />
        <g clipPath={`url(#${clip1})`}>
          <path
            d="M3.72534 5.9999C3.72534 5.3923 4.21774 4.8999 4.82534 4.8999H11.2253C11.8329 4.8999 12.3253 5.3923 12.3253 5.9999V6.6999H3.72534V5.9999Z"
            fill="#ffffff"
          />
          <path
            d="M3.72534 7.2999V9.9999C3.72534 10.6075 4.21774 11.0999 4.82534 11.0999H11.2253C11.8329 11.0999 12.3253 10.6075 12.3253 9.9999V7.2999H3.72534Z"
            fill="#ffffff"
          />
        </g>
      </g>
      <defs>
        <clipPath id={clip0}>
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath id={clip1}>
          <rect width="9.6" height="9.6" fill="white" transform="translate(3.22534 3.19995)" />
        </clipPath>
      </defs>
    </svg>
  );
}
