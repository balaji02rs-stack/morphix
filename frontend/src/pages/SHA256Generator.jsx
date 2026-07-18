import { useState } from "react";
import {
  FaLock,
  FaCopy,
  FaTrash,
  FaFingerprint
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/DeveloperTool.css";

function SHA256Generator() {

  const [text, setText] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const generateHash = async () => {

    if (!text.trim()) {
      toast.warning("Please enter some text.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.get("/dev/sha256", {
        params: {
          text
        }
      });

      setHash(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to generate SHA-256 hash.");

    } finally {

      setLoading(false);

    }

  };

  const copyHash = async () => {

    if (!hash) return;

    await navigator.clipboard.writeText(hash);

    toast.success("Hash copied successfully!");

  };

  const clearAll = () => {

    setText("");
    setHash("");

    toast.info("Cleared.");

  };

  return (

    <div className="developer-tool-page">

      <div className="developer-tool-card">

        <h1>
          <FaLock />
          SHA-256 Generator
        </h1>

        <p className="tool-description">
          Generate secure SHA-256 hashes for any text or message.
        </p>

        <div className="setting-group">

          <label>Input Text</label>

          <textarea
            className="tool-textarea"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
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
            <span>Characters: {text.length}</span>

            <span>
              {text.length === 0
                ? "Ready"
                : "Click Generate"}
            </span>

          </div>

        </div>

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={generateHash}
            disabled={loading}
          >
            <FaFingerprint />

            {loading
              ? "Generating..."
              : "Generate Hash"}

          </button>

          <button
            className="secondary-btn"
            onClick={copyHash}
            disabled={!hash}
          >
            <FaCopy />

            Copy Hash

          </button>

          <button
            className="secondary-btn"
            onClick={clearAll}
          >
            <FaTrash />

            Clear

          </button>

        </div>

        {hash && (

          <>

            <div
              style={{
                marginTop: "35px",
                marginBottom: "10px",
                color: "#fff",
                fontWeight: 600
              }}
            >
              SHA-256 Output
            </div>

            <div className="output-box">

              {hash}

            </div>

            <div
              style={{
                color: "#94a3b8",
                textAlign: "right",
                fontSize: "14px"
              }}
            >
              Hash Length: {hash.length} characters
            </div>

          </>

        )}

        <div className="info-card">

          <h3>

            <FaLock />

            About SHA-256

          </h3>

          <ul>

            <li>Generates a 256-bit cryptographic hash.</li>

            <li>One-way algorithm that cannot be reversed.</li>

            <li>Commonly used for passwords and integrity verification.</li>

            <li>Produces a fixed 64-character hexadecimal output.</li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default SHA256Generator;