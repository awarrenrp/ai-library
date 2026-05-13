/**
 * Figma link badge — Figma mark + "Figma link" label. Intended for page
 * headers on component-doc pages; use one per page.
 */
export function FigmaLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="figma-link">
      {/* Figma mark — 16×24 viewBox, standard brand colours */}
      <svg
        className="figma-link__icon"
        width="10"
        height="15"
        viewBox="0 0 16 24"
        fill="none"
        aria-hidden
        focusable="false"
      >
        <path d="M8 8H4A4 4 0 0 1 4 0H8Z" fill="#F24E1E" />
        <path d="M8 0H12A4 4 0 0 1 12 8H8Z" fill="#FF7262" />
        <path d="M8 16H4A4 4 0 0 1 4 8H8Z" fill="#A259FF" />
        <circle cx="12" cy="12" r="4" fill="#1ABCFE" />
        <path d="M8 24H4A4 4 0 0 1 4 16H8Z" fill="#0ACF83" />
      </svg>
      <span>Figma link</span>
    </a>
  );
}
