import type { SVGProps } from "react";

/** Inline SVGs aligned to AI-components composer (Figma node 1:6915). */

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 4.167v11.666M4.167 10h11.666"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 14.17a3.33 3.33 0 0 0 3.33-3.33V5.42a3.33 3.33 0 0 0-6.66 0v5.42a3.33 3.33 0 0 0 3.33 3.33Zm-5-5V8.75a5 5 0 0 0 10 0v.42"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M10 14.17v3.33M6.67 17.5h6.66" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

/** Bars — Chip · Regular · AI-components · 865:10482 (leading visual). */
export function IconComposerChipLead(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M4 13V9M8 13V5M12 13v-4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrowUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 15.83V4.17M4.17 9.17 10 3.33 15.83 9.17"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Overlapping pages — copy-to-clipboard affordance. */
export function IconCopy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="9"
        y="9"
        width="13"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Filled arrow-up — Pebble Icons Library "Arrow Up Mini" (Figma `1151:27114`
 * inner glyph `4877:1653`). Used by the animated chat composer in place of
 * the default stroked `IconArrowUp`. Rendered in `currentColor` so the
 * primary-purple send button can drive its white fill via the parent button.
 *
 * Source: 10.285×11.999 vector centered in a 16×16 frame
 * (offset ≈ 2.857, 2.000).
 */
export function IconArrowUpMini(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        transform="translate(2.857 2)"
        d="M5.143 0 0 4.406 1.204 5.437 4.291 2.792V12H5.994V2.792L9.081 5.437 10.285 4.406 5.143 0Z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Add menu icons — Figma "Add menu" (72:4451). Vectors copied 1:1 from each
 * row's icon component (E Attach, Globe outline, Report outline, Third Party
 * Data, Opsgenie, Courses outline, Chevron Right). Each icon is sized to fit
 * a 16×16 frame and uses `currentColor` so the menu can color them via CSS.
 * ----------------------------------------------------------------------- */

/** Paperclip — Figma `E Attach` (main 72:2486). Source 18.5×20.55 in 24×24. */
export function IconAddAttach(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M16.37 2.13c-.84-.84-2.2-.84-3.04 0L2.55 12.9c-1.41 1.41-1.41 3.69 0 5.1 1.41 1.4 3.69 1.4 5.1 0l9.23-9.24 1.06 1.06-9.23 9.23c-1.99 1.99-5.22 1.99-7.21 0-1.99-2-1.99-5.23 0-7.22L12.27 1.07c1.42-1.43 3.74-1.43 5.16 0 1.43 1.43 1.43 3.74 0 5.17L6.66 17.01c-.86.86-2.25.86-3.11 0-.86-.86-.86-2.25 0-3.11l9.23-9.23 1.06 1.06-9.23 9.23c-.27.27-.27.72 0 .99.27.28.71.28.99 0L16.37 5.17c.84-.84.84-2.2 0-3.04z"
      />
    </svg>
  );
}

/** Globe outline — Figma `Globe / Type=Outline` (main 9:10484). 20.5×20.5 in 24×24. */
export function IconAddGlobe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        transform="translate(1.75 1.75)"
        d="M0 10.25C0 15.91 4.59 20.5 10.25 20.5S20.5 15.91 20.5 10.25C20.5 4.595 15.92.01 10.27 0h-.04C4.58.01 0 4.595 0 10.25zM7.262 9.5c.072-2.248.461-4.24 1.034-5.692.319-.808.68-1.411 1.043-1.8.357-.382.662-.505.902-.508h.02c.24.003.545.126.902.508.363.389.724.992 1.043 1.8.573 1.452.962 3.444 1.034 5.692H7.264zm5.976 1.5c-.072 2.248-.461 4.24-1.034 5.692-.319.808-.68 1.411-1.043 1.8-.362.387-.671.508-.911.508s-.55-.121-.911-.508c-.363-.389-.724-.992-1.043-1.8-.573-1.452-.963-3.444-1.034-5.692h5.976zm1.501 0h4.23c-.302 3.558-2.733 6.509-6.015 7.574.24-.4.455-.848.646-1.331.654-1.656 1.067-3.842 1.139-6.243zM18.968 9.5h-4.23c-.072-2.4-.486-4.587-1.14-6.243-.191-.483-.406-.931-.645-1.331 3.281 1.065 5.712 4.016 6.015 7.574zM5.761 9.5H1.532C1.834 5.942 4.265 2.991 7.546 1.926c-.24.4-.455.848-.645 1.331-.654 1.656-1.068 3.842-1.14 6.243zm0 1.5c.072 2.4.486 4.587 1.14 6.243.191.483.406.931.646 1.331C4.266 17.509 1.834 14.558 1.532 11h4.229z"
      />
    </svg>
  );
}

/** Document/notebook — Figma `Report / Type=Outline` (main 72:3875). 15.5×21 in 24×24, used for "Skills". */
export function IconAddSkills(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        transform="translate(4.25 1.5)"
        d="M3.25 16.5h9V15h-9v1.5zM3.25 12.5h9V11h-9v1.5zM3.25 8.5h9V7h-9v1.5zM11 1.5V0H4.5v1.5H0V21h15.5V1.5H11zM6 1.5h3.5V3H6V1.5zM14 19.5H1.5V3h3v1.5H11V3h3v16.5z"
      />
    </svg>
  );
}

/** Plug network — Figma `Third Party Data` (main 72:3879). ~20×21 in 24×24. */
export function IconAddPlugins(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <g fill="currentColor" transform="translate(2.167 1.542)">
        <path d="M11.75 2c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z" />
        <path d="M8.95 5.062C7.459 5.062 6.25 6.271 6.25 7.762V8.5h7v-.738c0-1.491-1.209-2.7-2.7-2.7H8.95z" />
        <path d="M9 10v3.567L5.91 15.351l.75 1.299L9.749 14.866l3.089 1.784.75-1.299-3.089-1.784V10H9z" />
        <path d="M0 18c0-1.519 1.231-2.75 2.75-2.75S5.5 16.481 5.5 18s-1.231 2.75-2.75 2.75S0 19.519 0 18zm2.75-1.25c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25S4 18.69 4 18s-.56-1.25-1.25-1.25z" />
        <path d="M16.833 15.25c-1.565 0-2.833 1.269-2.833 2.833 0 1.564 1.269 2.833 2.833 2.833s2.833-1.269 2.833-2.833c0-1.564-1.269-2.833-2.833-2.833zM15.5 18.083c0-.736.597-1.333 1.333-1.333s1.333.597 1.333 1.333-.597 1.333-1.333 1.333-1.333-.597-1.333-1.333z" />
      </g>
    </svg>
  );
}

/** Helmet/agent — Figma `Opsgenie` (main 72:3881). ~15×18 in 24×24, used for "Agents". */
export function IconAddAgents(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <g fill="currentColor" transform="translate(4.466 3.015)">
        <path d="M7.556 8.964c2.475 0 4.482-2.007 4.482-4.482S10.031 0 7.556 0 3.074 2.007 3.074 4.482s2.007 4.482 4.482 4.482z" />
        <path d="M3.433 14.859C2.122 13.543.986 12.06.058 10.43c-.126-.251-.042-.544.209-.67h.041l3.393-1.675c.251-.126.545-.042.67.209.862 1.45 1.934 2.742 3.17 3.85 1.231-1.107 2.293-2.399 3.155-3.85.126-.251.419-.335.67-.209l3.393 1.675h.042c.251.126.335.419.209.67-.928 1.63-2.064 3.113-3.375 4.429.008.004.016.008.024.011-1.131 1.131-2.346 2.136-3.686 2.974-.149.085-.297.127-.44.126-.143.001-.291-.041-.44-.126-1.34-.838-2.555-1.843-3.686-2.974.008-.004.017-.008.025-.011z" />
      </g>
    </svg>
  );
}

/** Pencil over rule — Figma `Courses / Type=Outline` (main 72:3886). ~19.5×21 in 24×24, used for "Effort". */
export function IconAddEffort(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        transform="translate(2.25 1.5)"
        d="M7.072 0c1.095 0 2.055.524 2.679 1.33C10.375.523 11.335 0 12.43 0c1.875 0 3.356 1.536 3.426 3.399 1.424.443 2.435 1.81 2.435 3.389 0 .416-.07.817-.199 1.191.859.647 1.408 1.692 1.408 2.859 0 .984-.39 1.881-1.027 2.526.255.496.399 1.06.399 1.658 0 1.842-1.378 3.398-3.18 3.53-.442 1.407-1.719 2.449-3.263 2.449-1.095 0-2.055-.524-2.679-1.33-.624.807-1.584 1.33-2.679 1.33-1.544 0-2.821-1.042-3.263-2.449C1.806 18.42.428 16.864.428 15.022c0-.597.144-1.162.399-1.658C.191 12.719-.2 11.823-.2 10.838c0-1.167.55-2.212 1.408-2.859C1.079 7.606 1.009 7.205 1.009 6.788c0-1.578 1.011-2.946 2.435-3.389C3.515 1.536 4.995 0 6.87 0h.202zM5.143 3.539c0 .119.01.235.028.349l.13.803-.811.066c-.97.077-1.78.935-1.78 2.033 0 .407.112.783.303 1.098l.44.726-.775.347c-.682.306-1.178 1.023-1.178 1.878 0 .746.377 1.388.926 1.742l.707.456-.534.65c-.292.356-.471.821-.471 1.335 0 1.155.892 2.039 1.929 2.039.085 0 .168-.006.248-.017l.765-.108.086.768c.115 1.036.952 1.798 1.916 1.798 1.035 0 1.925-.88 1.929-2.031l-.003-.132V3.663l.003-.131C8.997 2.381 8.107 1.501 7.072 1.501c-1.037 0-1.929.883-1.929 2.038zm9.216 0c0-1.155-.892-2.039-1.929-2.039-1.035 0-1.925.88-1.929 2.031l.003.131v13.674l-.003.132c.004 1.151.895 2.031 1.929 2.031.964 0 1.8-.761 1.916-1.798l.085-.768.765.108c.08.011.162.017.248.017 1.037 0 1.929-.884 1.929-2.039 0-.515-.179-.979-.471-1.335l-.534-.65.707-.455c.549-.354.926-.996.926-1.742 0-.856-.496-1.573-1.178-1.878l-.775-.347.44-.726c.191-.315.303-.691.303-1.098 0-1.098-.81-1.956-1.78-2.033l-.811-.065.13-.803c.018-.113.028-.23.028-.349z"
      />
    </svg>
  );
}

/** Chevron right — Figma `Chevron Right` (used for submenu indicators in the Add menu). */
export function IconChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        transform="translate(5.205 3.469)"
        d="M1.061 9.062 0 8.001 3.47 4.531 0 1.061 1.061 0l4.53 4.53-4.53 4.53V9.062z"
      />
    </svg>
  );
}

/** Gear — subtle settings affordance for composer version (top-right). */
export function IconSettings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
