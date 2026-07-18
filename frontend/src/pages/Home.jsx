import { Link } from "react-router-dom";
import { FaCode, FaImage, FaFilePdf, FaArrowRight } from "react-icons/fa";
import "../styles/DeveloperTools.css";

function Home() {
  const sections = [
    {
      title: "Developer Tools",
      description:
        "Useful utilities for developers including UUID, Password Generator, SHA-256, Base64 and JSON Formatter.",
      link: "/developer-tools",
      icon: <FaCode />,
    },
    {
      title: "Image Tools",
      description:
        "Convert, resize, compress, crop and rotate images with ease.",
      link: "/image-tools",
      icon: <FaImage />,
    },
    {
      title: "Document Tools",
      description:
        "Merge, split, protect and unlock PDF documents.",
      link: "/document-tools",
      icon: <FaFilePdf />,
    },
  ];

  return (
    <div className="home-page">

      <section className="hero">

        <h2 className="hero-small">Welcome to</h2>

        <h1 className="hero-title">Morphix</h1>

        <div className="hero-line"></div>

        <p className="hero-subtitle">
          Your all-in-one toolkit for Developer, Image and Document utilities.
        </p>

      </section>

      <section className="tool-grid">
        {sections.map((tool, index) => (
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
              Explore Tools
              <FaArrowRight />
            </div>

          </Link>
        ))}
      </section>

    </div>
  );
}

export default Home;