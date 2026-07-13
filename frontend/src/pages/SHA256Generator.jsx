import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function SHA256Generator() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");

  const generateHash = async () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    try {
      const response = await api.get("/dev/sha256", {
        params: {
          text: text,
        },
      });

      setHash(response.data);
    } catch (error) {
      console.error(error);
      alert("Backend is not running.");
    }
  };

  const copyHash = async () => {
    if (!hash) return;

    await navigator.clipboard.writeText(hash);
    alert("Hash copied successfully!");
  };

  return (
    <div className="tool-container">
      <div className="tool-card">
        <h1>🔒 SHA-256 Generator</h1>

        <p>Generate a SHA-256 hash from any text.</p>

        <textarea
          className="tool-output"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="tool-button"
          style={{ marginTop: "20px" }}
          onClick={generateHash}
        >
          Generate Hash
        </button>

        {hash && (
          <>
            <textarea
              className="tool-output"
              readOnly
              value={hash}
            />

            <button
              className="tool-button copy-btn"
              onClick={copyHash}
            >
              Copy Hash
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SHA256Generator;