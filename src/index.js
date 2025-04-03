import React from "react";
import { createRoot } from "react-dom/client";
import GoogleMap from "./GoogleMap";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <GoogleMap />
  </React.StrictMode>
);
