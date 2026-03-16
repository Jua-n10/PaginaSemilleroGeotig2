import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("❌ ErrorBoundary capturó un error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#f9fafb",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Algo salió mal
          </h1>
          <p style={{ color: "#6b7280", marginBottom: 16, maxWidth: 320 }}>
            Ocurrió un error inesperado. Por favor recarga la página.
          </p>

          {/* Error visible siempre para diagnóstico */}
          <pre
            style={{
              marginBottom: 20,
              padding: 12,
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: 8,
              fontSize: 11,
              color: "#b91c1c",
              textAlign: "left",
              maxWidth: "90vw",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {errorMsg}
          </pre>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => {
                try { navigator.clipboard.writeText(errorMsg); } catch {}
              }}
              style={{
                background: "#374151",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📋 Copiar error
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#0d9488",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🔄 Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
