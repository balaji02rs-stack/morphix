import { Link } from "react-router-dom";
import "../styles/DeveloperTools.css";

function Home() {
  const sections = [
    {
      title: "Developer Tools",
      description:
        "Useful utilities for developers including UUID, Password Generator, SHA-256, Base64 and JSON Formatter.",
      link: "/developer-tools",
    },
    {
      title: "Image Tools",
      description:
        "Convert, resize, compress, crop and rotate images with ease.",
      link: "/image-tools",
    },
    {
      title: "Document Tools",
      description:
        "Merge, split, protect and unlock PDF documents.",
      link: "/document-tools",
    },
  ];

  return (
    <div className="developer-page">
      <h1>Welcome to Morphix</h1>

      <p className="subtitle">
        Your all-in-one toolkit for Developer, Image and Document utilities.
      </p>

      <div className="tool-grid">
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.link}
            className="tool-card"
          >
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;