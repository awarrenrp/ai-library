/**
 * External artifact — repeatable usage example.
 *
 * Live source rendered as the spec page snippet (Vite `?raw`), so it's
 * type-checked at build time. Swap the import path for your library.
 */
import {
  ExternalFileArtifact,
  type ExternalFileKind,
} from "../components/ExternalArtifact";

export type ExternalAttachment = {
  id: string;
  kind: ExternalFileKind;
  title: string;
  dateLabel: string;
};

const EXAMPLE_FILES: readonly ExternalAttachment[] = [
  { id: "ppt-q1", kind: "ppt", title: "Sales results Q1 2026", dateLabel: "April 4th, 2026" },
  { id: "pdf-benefits", kind: "pdf", title: "FY26 benefits overview", dateLabel: "March 19th, 2026" },
];

/**
 * Side-panel citation list. `layoutWidth="small"` collapses each row to
 * icon + title + Open — no Drive button, no file-type chip.
 */
export function ExternalCitations({ files }: { files: readonly ExternalAttachment[] }) {
  return (
    <ul aria-label="Cited files" style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {files.map((file) => (
        <li key={file.id}>
          <ExternalFileArtifact
            kind={file.kind}
            title={file.title}
            dateLabel={file.dateLabel}
            layoutWidth="small"
          />
        </li>
      ))}
    </ul>
  );
}

export function ExternalArtifactExample() {
  const [primary, ...rest] = EXAMPLE_FILES;
  return (
    <>
      <ExternalFileArtifact kind={primary!.kind} title={primary!.title} dateLabel={primary!.dateLabel} />
      <ExternalCitations files={rest} />
    </>
  );
}
