import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JsonFormatter from "./pages/JsonFormatter";

import "./styles/Global.css";

import App from "./App";

import DeveloperTools from "./pages/DeveloperTools";
import UUIDGenerator from "./pages/UUIDGenerator";
import PasswordGenerator from "./pages/PasswordGenerator";
import SHA256Generator from "./pages/SHA256Generator";
import Base64Tool from "./pages/Base64Tool";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/developer-tools" element={<DeveloperTools />} />
      <Route path="/developer-tools/uuid" element={<UUIDGenerator />} />
      <Route path="/developer-tools/password" element={<PasswordGenerator />} />
      <Route path="/developer-tools/sha256" element={<SHA256Generator />} />
      <Route path="/developer-tools/base64" element={<Base64Tool />} />
      <Route
  path="/developer-tools/json"
  element={<JsonFormatter />}
/>
    </Routes>
  </BrowserRouter>
);