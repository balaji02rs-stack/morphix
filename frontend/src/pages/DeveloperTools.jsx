import { Link } from "react-router-dom";
import "../styles/DeveloperTools.css";

function DeveloperTools() {
  const tools = [
    {
      title: "UUID Generator",
      description: "Generate universally unique identifiers.",
      link: "/developer-tools/uuid",
    },
    {
      title: "Password Generator",
      description: "Generate strong and secure passwords.",
      link: "/developer-tools/password",
    },
    {
      title: "SHA-256 Generator",
      description: "Generate SHA-256 hashes instantly.",
      link: "/developer-tools/sha256",
    },
    {
      title: "Base64 Encoder / Decoder",
      description: "Encode and decode Base64 text.",
      link: "/developer-tools/base64",
    },
    {
      title: "JSON Formatter",
      description: "Format and validate JSON data.",
      link: "/developer-tools/json",
    },
  ];

  return (
    <div className="developer-page">
      <h1>Developer Tools</h1>
      <p className="subtitle">
        Fast, free and easy-to-use developer utilities.
      </p>

      <div className="tool-grid">
        {tools.map((tool, index) => (
          <Link to={tool.link} key={index} className="tool-card">
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DeveloperTools;