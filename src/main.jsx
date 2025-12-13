import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/main.css";
const AppRouter = lazy(() => import("./routes/AppRouter"));
const AuthProvider = lazy(() => import("./providers/AuthProvider"));
const QueryProvider = lazy(() => import("./providers/QueryProvider"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
