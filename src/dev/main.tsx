import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { PlaygroundApp } from "./PlaygroundApp";
import "./playground.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Playground root element was not found.");
}

createRoot(container).render(
  <StrictMode>
    <PlaygroundApp />
  </StrictMode>,
);
