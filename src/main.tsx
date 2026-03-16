import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { app } from "./firabase.ts";

// Verificación silenciosa de Firebase (sin console.log en producción)
if (import.meta.env.DEV) {
  console.log("Firebase listo:", app);
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

