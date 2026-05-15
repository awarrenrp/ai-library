import type { ReactNode } from "react";
import { SpecPageHeader } from "../SpecPageHeader/SpecPageHeader";
import "./ExamplePageLayout.css";

export type ExamplePageLayoutProps = {
  backTo: string;
  backLabel: string;
  children: ReactNode;
  headerActions?: ReactNode;
};

export function ExamplePageLayout({ backTo, backLabel, children, headerActions }: ExamplePageLayoutProps) {
  return (
    <main className="example-page">
      <SpecPageHeader
        componentName={backLabel}
        specPath={backTo}
        examplePath={`${backTo}/example`}
        activeTab="prototype"
      />
      {headerActions ? (
        <div className="example-page__toolbar">{headerActions}</div>
      ) : null}
      <div className="example-page__content">{children}</div>
    </main>
  );
}
