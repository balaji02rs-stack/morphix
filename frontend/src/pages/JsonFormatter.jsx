import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatJson = async () => {
    if (!input.trim()) {
      alert("Please enter JSON.");
      return;
    }

    try {
      const response = await api.post("/dev/json/format", input, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

      setOutput(
  typeof response.data === "string"
    ? response.data
    : JSON.stringify(response.data, null, 2)
);
    } catch (error) {
      setOutput("Invalid JSON");
    }
  };

  const validateJson = async () => {
    if (!input.trim()) {
      alert("Please enter JSON.");
      return;
    }

    try {
      const response = await api.post("/dev/json/validate", input, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

      setOutput(response.data);
    } catch (error) {
      setOutput("Invalid JSON");
    }
  };

  const copyResult = async () => {
    if (!output) return;

    await navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>📄 JSON Formatter & Validator</h1>

        <p>Format and validate JSON instantly.</p>

        <textarea
          className="tool-output"
          placeholder='{"name":"John"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            className="tool-button"
            onClick={formatJson}
          >
            Format JSON
          </button>

          <button
            className="tool-button"
            onClick={validateJson}
          >
            Validate JSON
          </button>
        </div>

        {output && (
          <>
            <textarea
              className="tool-output"
              readOnly
              value={output}
            />

            <button
              className="tool-button copy-btn"
              onClick={copyResult}
            >
              Copy Result
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default JsonFormatter;