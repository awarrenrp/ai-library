import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

/** Catches render errors so a failed UI subtree shows a message instead of a blank `#root`. */
export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RootErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "0 auto" }}>
          <h1 style={{ margin: "0 0 12px", fontSize: 20 }}>Something went wrong</h1>
          <p style={{ margin: "0 0 16px", color: "#555", lineHeight: 1.5 }}>
            The docs UI crashed. Copy the stack below if you file a bug. You can also try{" "}
            <strong>reload the page</strong> after clearing the Vite cache:{" "}
            <code style={{ fontSize: 13 }}>rm -rf node_modules/.vite</code> then{" "}
            <code style={{ fontSize: 13 }}>npm run dev</code>.
          </p>
          <pre
            style={{
              margin: 0,
              padding: 16,
              background: "#f4f4f4",
              overflow: "auto",
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          >
            {this.state.error.stack ?? this.state.error.message}
          </pre>
          <button
            type="button"
            style={{
              marginTop: 20,
              padding: "10px 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
