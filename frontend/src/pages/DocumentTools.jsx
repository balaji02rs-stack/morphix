import { Link } from "react-router-dom";
import "../styles/DeveloperTools.css";

function DocumentTools() {
  const tools = [
    {
      title: "Merge PDF",
      description: "Merge multiple PDF files into one document.",
      link: "/document-tools/merge",
    },
    {
  title: "Split PDF",
  description: "Split a PDF into two documents.",
  link: "/document-tools/split",
},
    {
  title: "Protect PDF",
  description: "Secure a PDF with a password.",
  link: "/document-tools/protect",
},
    {
  title: "Unlock PDF",
  description: "Remove password protection from a PDF.",
  link: "/document-tools/unlock",
},
  ];

  return (
    <div className="developer-page">
      <h1>Document Tools</h1>

      <p className="subtitle">
        PDF editing and security utilities.
      </p>

      <div className="tool-grid">
        {tools.map((tool, index) =>
          tool.disabled ? (
            <div
              key={index}
              className="tool-card"
              style={{
                opacity: 0.6,
                cursor: "not-allowed",
              }}
            >
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
            </div>
          ) : (
            <Link
              key={index}
              to={tool.link}
              className="tool-card"
            >
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default DocumentTools;