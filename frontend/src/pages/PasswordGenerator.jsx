import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const generatePassword = async () => {
    try {
      const response = await api.get("/dev/password");
      setPassword(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate password.");
    }
  };

  const copyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);
    alert("Password copied successfully!");
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Password Generator</h1>

        <p>
          Generate strong and secure passwords instantly.
        </p>

        <button
          className="tool-button"
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