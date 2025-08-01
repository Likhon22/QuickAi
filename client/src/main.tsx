import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QuickAiConfig } from "./config/index.ts";
import { ClerkProvider } from "@clerk/clerk-react";

if (!QuickAiConfig.clerkApi) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={QuickAiConfig.clerkApi}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
