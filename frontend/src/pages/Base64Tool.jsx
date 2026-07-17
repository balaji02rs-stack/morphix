import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function Base64Tool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const encode = async () => {
    if (!text.trim()) {
      alert("Please enter text.");
      return;
    }

    try {
      const response = await api.get("/dev/base64/encode", {
        params: { text },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Encoding failed.");
    }
  };

  const decode = async () => {
    if (!text.trim()) {
      alert("Please enter Base64 text.");
      return;
    }

    try {
      const response = await api.get("/dev/base64/decode", {
        params: { text },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Decoding failed.");
    }
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    alert("Copied successfully!");
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Base64 Encoder / Decoder</h1>

        <p>
          Encode plain text to Base64 or decode Base64 back to plain text.
        </p>

        <textarea
          className="tool-output"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <br /><br />

        <button className="tool-button" onClick={encode}>
          Encode
        </button>

        {" "}

        <button className="tool-button" onClick={decode}>
          Decode
        </button>

        {result && (
          <>
            <textarea
              className="tool-output"
              readOnly
              value={result}
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

export default Base64Tool;