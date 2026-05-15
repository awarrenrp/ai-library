import type { ReactNode } from "react";
import { Link } from "react-router-dom";
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
      <nav className="example-page__nav">
        <Link to={backTo} className="example-page__back">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {backLabel}
        </Link>
        <span className="example-page__badge">Example</span>
        {headerActions && (
          <div className="example-page__header-actions">{headerActions}</div>
        )}
      </nav>
      <div className="example-page__content">{children}</div>
    </main>
  );
}
