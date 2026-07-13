import { Link } from "react-router-dom";

function DeveloperTools() {
  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1>Developer Tools</h1>

      <p>Select a tool below.</p>

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gap: "20px",
          maxWidth: "500px",
        }}
      >
        <Link to="/developer-tools/uuid">
          <button
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            UUID Generator
          </button>
        </Link>

        <Link to="/developer-tools/password">
          <button
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Password Generator
          </button>
        </Link>

        <Link to="/developer-tools/sha256">
          <button
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            SHA-256 Generator
          </button>
        </Link>

        <Link to="/developer-tools/base64">
          <button
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Base64 Tool
          </button>
          <Link to="/developer-tools/json">
  <button
    style={{
      width: "100%",
      padding: "15px",
      fontSize: "16px",
      cursor: "pointer",
    }}
  >
    JSON Formatter & Validator
  </button>
</Link>
        </Link>
      </div>
    </div>
  );
}

export default DeveloperTools;