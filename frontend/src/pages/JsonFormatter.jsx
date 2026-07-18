import { useState } from "react";
import {
  FaCode,
  FaCheckCircle,
  FaTimesCircle,
  FaMagic,
  FaClipboard,
  FaTrash
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/DeveloperTool.css";

function JsonFormatter() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const formatJson = async () => {

    if (!input.trim()) {
      toast.warning("Please enter JSON.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        "/dev/json/format",
        input,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      const formatted =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2);

      setOutput(formatted);
      setStatus("valid");

      toast.success("JSON formatted successfully.");

    } catch (error) {

      console.error(error);

      setOutput("Invalid JSON");
      setStatus("invalid");

      toast.error("Invalid JSON.");

    } finally {

      setLoading(false);

    }

  };

  const validateJson = async () => {

    if (!input.trim()) {
      toast.warning("Please enter JSON.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        "/dev/json/validate",
        input,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      setOutput(response.data);
      setStatus("valid");

      toast.success("JSON is valid.");

    } catch (error) {

      console.error(error);

      setOutput("Invalid JSON");
      setStatus("invalid");

      toast.error("Invalid JSON.");

    } finally {

      setLoading(false);

    }

  };

  const copyOutput = async () => {

    if (!output) return;

    await navigator.clipboard.writeText(output);

    toast.success("Copied successfully!");

  };

  const clearAll = () => {

    setInput("");
    setOutput("");
    setStatus("");

    toast.info("Cleared.");

  };

  return (

    <div className="developer-tool-page">

      <div className="developer-tool-card">

        <h1>
          <FaCode />
          JSON Formatter & Validator
        </h1>

        <p className="tool-description">
          Beautify and validate JSON instantly for APIs and development.
        </p>

        <div className="setting-group">

          <label>Input JSON</label>

          <textarea
            className="tool-textarea"
            placeholder='{"name":"Morphix","version":"1.0"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#94a3b8",
              marginTop: "-10px",
              marginBottom: "20px",
              fontSize: "14px"
            }}
          >
            <span>Characters: {input.length}</span>

            <span>
              {status === "valid"
                ? "Ready"
                : status === "invalid"
                ? "Needs Fixing"
                : "Waiting"}
            </span>

          </div>

        </div>

        {status && (

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              color:
                status === "valid"
                  ? "#22c55e"
                  : "#ef4444",
              fontWeight: 600
            }}
          >

            {status === "valid"
              ? <FaCheckCircle />
              : <FaTimesCircle />}

            {status === "valid"
              ? "Valid JSON"
              : "Invalid JSON"}

          </div>

        )}

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={formatJson}
            disabled={loading}
          >
            <FaMagic />
            {loading ? "Formatting..." : "Beautify"}
          </button>

          <button
            className="secondary-btn"
            onClick={validateJson}
          >
            <FaCheckCircle />
            Validate
          </button>

          <button
            className="secondary-btn"
            onClick={copyOutput}
            disabled={!output}
          >
            <FaClipboard />
            Copy
          </button>

          <button
            className="secondary-btn"
            onClick={clearAll}
          >
            <FaTrash />
            Clear
          </button>

        </div>

        {output && (

          <>

            <div
              style={{
                marginTop: "35px",
                marginBottom: "10px",
                color: "#fff",
                fontWeight: 600
              }}
            >
              Output
            </div>

            <div className="output-box">

              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit"
                }}
              >
                {output}
              </pre>

            </div>

          </>

        )}

        <div className="info-card">

          <h3>

            <FaCode />

            About JSON

          </h3>

          <ul>

            <li>Beautifies raw JSON into a readable format.</li>

            <li>Validates JSON syntax instantly.</li>

            <li>Useful for REST APIs and debugging.</li>

            <li>Supports nested JSON objects and arrays.</li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default JsonFormatter;