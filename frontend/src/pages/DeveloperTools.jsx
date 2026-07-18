import { Link } from "react-router-dom";
import {
  FaFingerprint,
  FaKey,
  FaLock,
  FaExchangeAlt,
  FaCode,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/ToolGrid.css";

function DeveloperTools() {
  const tools = [
    {
      title: "UUID Generator",
      description: "Generate universally unique identifiers.",
      link: "/developer-tools/uuid",
      icon: <FaFingerprint />,
    },
    {
      title: "Password Generator",
      description: "Generate strong and secure passwords.",
      link: "/developer-tools/password",
      icon: <FaKey />,
    },
    {
      title: "SHA-256 Generator",
      description: "Generate SHA-256 hashes instantly.",
      link: "/developer-tools/sha256",
      icon: <FaLock />,
    },
    {
      title: "Base64 Encoder / Decoder",
      description: "Encode and decode Base64 text.",
      link: "/developer-tools/base64",
      icon: <FaExchangeAlt />,
    },
    {
      title: "JSON Formatter",
      description: "Format and validate JSON data.",
      link: "/developer-tools/json",
      icon: <FaCode />,
    },
  ];

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1>Developer Tools</h1>
        <p>Fast, free and easy-to-use developer utilities.</p>
      </div>

      <div className="tool-grid">
        {tools.map((tool, index) => (
          <Link key={index} to={tool.link} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>

            <h2>{tool.title}</h2>

            <div className="card-line"></div>

            <p>{tool.description}</p>

            <div className="explore-btn">
              Explore <FaArrowRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DeveloperTools;