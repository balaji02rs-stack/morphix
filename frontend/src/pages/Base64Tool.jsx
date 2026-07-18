import { useState } from "react";
import {
  FaExchangeAlt,
  FaCopy,
  FaTrash,
  FaCode
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/DeveloperTool.css";

function Base64Tool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    if (!text.trim()) {
      toast.warning(
        mode === "encode"
          ? "Please enter text to encode."
          : "Please enter Base64 text to decode."
      );
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        mode === "encode"
          ? "/dev/base64/encode"
          : "/dev/base64/decode";

      const response = await api.get(endpoint, {
        params: { text },
      });

      setResult(response.data);

      toast.success(
        mode === "encode"
          ? "Encoded successfully!"
          : "Decoded successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        mode === "encode"
          ? "Encoding failed."
          : "Invalid Base64 text."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    toast.success("Copied successfully!");
  };

  const clearAll = () => {
    setText("");
    setResult("");
    toast.info("Cleared.");
  };

  return (
    <div className="developer-tool-page">
      <div className="developer-tool-card">

        <h1>
          <FaExchangeAlt />
          Base64 Encoder / Decoder
        </h1>

        <p className="tool-description">
          Convert plain text to Base64 or decode Base64 back to readable text.
        </p>

        <div className="setting-group">

          <label>Conversion Mode</label>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            <button
              className={mode === "encode" ? "primary-btn" : "secondary-btn"}
              onClick={() => setMode("encode")}
            >
              Encode
            </button>

            <button
              className={mode === "decode" ? "primary-btn" : "secondary-btn"}
              onClick={() => setMode("decode")}
            >
              Decode
            </button>
          </div>

          <label>Input</label>

          <textarea
            className="tool-textarea"
            placeholder={
              mode === "encode"
                ? "Enter plain text..."
                : "Enter Base64 text..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#94a3b8",
              fontSize: "14px",
              marginTop: "-10px",
              marginBottom: "20px",
            }}
          >
            <span>Characters: {text.length}</span>
            <span>
              {mode === "encode"
                ? "Encoding Mode"
                : "Decoding Mode"}
            </span>
          </div>

        </div>

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={convert}
            disabled={loading}
          >
            <FaExchangeAlt />
            {loading ? "Converting..." : "Convert"}
          </button>

          <button
            className="secondary-btn"
            onClick={copyResult}
            disabled={!result}
          >
            <FaCopy />
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

        {result && (
          <>
            <div
              style={{
                marginTop: "35px",
                marginBottom: "10px",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Output
            </div>

            <div className="output-box">
              {result}
            </div>

            <div
              style={{
                textAlign: "right",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Output Length: {result.length} characters
            </div>
          </>
        )}

        <div className="info-card">

          <h3>
            <FaCode />
            About Base64
          </h3>

          <ul>
            <li>Encode plain text into Base64.</li>
            <li>Decode Base64 back to readable text.</li>
            <li>Frequently used in APIs and web development.</li>
            <li>Base64 is an encoding method, not encryption.</li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default Base64Tool;