import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    try {
      const response = await api.get(
    "/dev/password",
        {
          params: {
            length,
            upper,
            lower,
            number,
            symbol,
          },
        }
      );

      setPassword(response.data);
    } catch (error) {
      console.error(error);
      alert("Backend is not running.");
    }
  };

  const copyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>🔐 Password Generator</h1>

        <p>Generate secure passwords instantly.</p>

        <label>Password Length</label>

        <input
          type="number"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="tool-output"
          style={{ minHeight: "45px", marginTop: "10px" }}
        />

        <div style={{ marginTop: "20px", lineHeight: "35px" }}>

          <label>
            <input
              type="checkbox"
              checked={upper}
              onChange={() => setUpper(!upper)}
            />
            {" "}Uppercase
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={lower}
              onChange={() => setLower(!lower)}
            />
            {" "}Lowercase
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
            />
            {" "}Numbers
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={symbol}
              onChange={() => setSymbol(!symbol)}
            />
            {" "}Symbols
          </label>

        </div>

        <button
          className="tool-button"
          style={{ marginTop: "25px" }}
          onClick={generatePassword}
        >
          Generate Password
        </button>

        {password && (
          <>
            <textarea
              className="tool-output"
              readOnly
              value={password}
            />

            <button
              className="tool-button copy-btn"
              onClick={copyPassword}
            >
              Copy Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default PasswordGenerator;