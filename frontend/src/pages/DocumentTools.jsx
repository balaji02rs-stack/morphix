import { Link } from "react-router-dom";
import {
  FaFilePdf,
  FaObjectUngroup,
  FaLock,
  FaUnlock,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/ToolGrid.css";

function DocumentTools() {
  const tools = [
    {
      title: "Merge PDF",
      description: "Merge multiple PDF files into one document.",
      link: "/document-tools/merge",
      icon: <FaFilePdf />,
    },
    {
      title: "Split PDF",
      description: "Split a PDF into two documents.",
      link: "/document-tools/split",
      icon: <FaObjectUngroup />,
    },
    {
      title: "Protect PDF",
      description: "Secure a PDF with a password.",
      link: "/document-tools/protect",
      icon: <FaLock />,
    },
    {
      title: "Unlock PDF",
      description: "Remove password protection from a PDF.",
      link: "/document-tools/unlock",
      icon: <FaUnlock />,
    },
  ];

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1>Document Tools</h1>
        <p>Merge, split, protect and unlock PDF documents effortlessly.</p>
      </div>

      <div className="tool-grid">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.link}
            className="tool-card"
          >
            <div className="tool-icon">
              {tool.icon}
            </div>

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

export default DocumentTools;