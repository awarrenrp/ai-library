/**
 * Artifact tray — repeatable usage example.
 *
 * Live source rendered as the spec page snippet (Vite `?raw`), so it stays
 * type-checked at build time. Swap the import paths for your library when
 * copying into Rippling product code.
 */
import { useState } from "react";
import { ArtifactTray, type ArtifactTrayItem } from "../components/ArtifactTray";
import { IconFile, IconReport, IconWorkflow } from "../icons";

const TRAY_ITEMS: readonly ArtifactTrayItem[] = [
  { id: "workflow", title: "Workflow", icon: <IconWorkflow /> },
  { id: "policy-pdf", title: "New in-office policy.PDF", icon: <IconFile /> },
  { id: "attendance", title: "Office attendance", icon: <IconReport /> },
];

export function ArtifactTrayExample() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <ArtifactTray
      items={TRAY_ITEMS}
      onClose={() => setOpen(false)}
    />
  );
}
