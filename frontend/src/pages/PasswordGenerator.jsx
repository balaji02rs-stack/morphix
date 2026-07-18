import { useEffect, useState } from "react";
import {
  FaCopy,
  FaSyncAlt,
  FaLock,
  FaCheck
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/DeveloperTool.css";

function PasswordGenerator() {
  const [password, setPassword] =useState("");

  const [length, setLength] = useState(16);

  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generatePassword();
  }, []);

  useEffect(() => {
    generatePassword();
  }, [length, upper, lower, number, symbol]);

  const generatePassword = async () => {

    try {

      setLoading(true);

      const response = await api.get("/dev/password", {
        params: {
          length,
          upper,
          lower,
          number,
          symbol
        }
      });

      setPassword(response.data);

    } catch (err) {

      console.error(err);
      toast.error("Unable to generate password.");

    } finally {

      setLoading(false);

    }

  };

  const copyPassword = async () => {

    if (!password) return;

    await navigator.clipboard.writeText(password);

    toast.success("Password copied!");

  };

  const getStrength = () => {

    let score = 0;

    if (length >= 12) score++;
    if (length >= 20) score++;

    if (upper) score++;
    if (lower) score++;
    if (number) score++;
    if (symbol) score++;

    if (score <= 2)
      return {
        text: "Weak",
        width: "30%",
        color: "#ef4444"
      };

    if (score <= 4)
      return {
        text: "Medium",
        width: "65%",
        color: "#f59e0b"
      };

    return {
      text: "Strong",
      width: "100%",
      color: "#22c55e"
    };
  };

  const strength = getStrength();

  return (
    <div className="developer-tool-page">

      <div className="developer-tool-card">

        <h1>
          <FaLock /> Password Generator
        </h1>

        <p className="tool-description">
          Generate secure passwords for applications, accounts and APIs.
        </p>

        <div className="setting-group">

          <label>
            Password Length
          </label>

          <div className="slider-row">

            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />

            <span>{length}</span>

          </div>

        </div>

        <div className="checkbox-grid">

          <label>
            <input
              type="checkbox"
              checked={upper}
              onChange={() => setUpper(!upper)}
            />

            Uppercase

          </label>

          <label>

            <input
              type="checkbox"
              checked={lower}
              onChange={() => setLower(!lower)}
            />

            Lowercase

          </label>

          <label>

            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
            />

            Numbers

          </label>

          <label>

            <input
              type="checkbox"
              checked={symbol}
              onChange={() => setSymbol(!symbol)}
            />

            Symbols

          </label>

        </div>

        <div className="strength-box">

          <div className="strength-header">

            <span>Password Strength</span>

            <span>{strength.text}</span>

          </div>

          <div className="strength-bar">

            <div
              className="strength-fill"
              style={{
                width: strength.width,
                background: strength.color
              }}
            />

          </div>

        </div>

        <div className="output-box">

          {loading ? "Generating password..." : password}

        </div>

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={generatePassword}
          >

            <FaSyncAlt />

            Generate Password

          </button>

          <button
            className="secondary-btn"
            onClick={copyPassword}
          >

            <FaCopy />

            Copy Password

          </button>

        </div>

        <div className="info-card">

          <h3>
            <FaCheck /> About Password Generator
          </h3>

          <ul>

            <li>Adjustable password length.</li>

            <li>Supports uppercase & lowercase letters.</li>

            <li>Supports numbers and symbols.</li>

            <li>Suitable for websites, APIs and applications.</li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default PasswordGenerator;