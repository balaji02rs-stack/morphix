import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/Global.css";

import App from "./App";
import DeveloperTools from "./pages/DeveloperTools";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/developer-tools" element={<DeveloperTools />} />
    </Routes>
  </BrowserRouter>
);