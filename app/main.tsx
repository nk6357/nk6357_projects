import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Portfolio } from "./Portfolio";
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/animations.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
