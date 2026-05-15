import { Link, useLocation } from "react-router-dom";
import "./SpecPageHeader.css";

export type SpecPageHeaderProps = {
  /** Display name shown after "AI components /". */
  componentName: string;
  /** Route of the spec / Definition page. */
  specPath: string;
  /** Route of the Prototype / Example page. Omit for pages without an example. */
  examplePath?: string;
  /**
   * Which tab is active. Defaults to auto-detection based on the current URL:
   * exact match on `specPath` → "definition", otherwise → "prototype".
   */
  activeTab?: "definition" | "prototype";
};

export function SpecPageHeader({
  componentName,
  specPath,
  examplePath,
  activeTab,
}: SpecPageHeaderProps) {
  const { pathname } = useLocation();

  const resolved: "definition" | "prototype" =
    activeTab ?? (pathname === specPath ? "definition" : "prototype");

  return (
    <header className="spec-page-header">
      {/* Breadcrumb */}
      <nav className="spec-page-header__breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="spec-page-header__breadcrumb-link">
          AI components
        </Link>
        <span className="spec-page-header__breadcrumb-sep" aria-hidden>/</span>
        <span className="spec-page-header__breadcrumb-current">{componentName}</span>
      </nav>

      {/* Right side: tabs */}
      <div className="spec-page-header__right">
        {examplePath ? (
          <div className="spec-page-header__tabs" role="tablist" aria-label="Page view">
            <Link
              to={specPath}
              role="tab"
              aria-selected={resolved === "definition"}
              className="spec-page-header__tab"
              data-active={resolved === "definition"}
            >
              Definition
            </Link>
            <Link
              to={examplePath}
              role="tab"
              aria-selected={resolved === "prototype"}
              className="spec-page-header__tab"
              data-active={resolved === "prototype"}
            >
              Prototype
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
