import { Link } from "react-router-dom";
import {
  FaFileImage,
  FaExchangeAlt,
  FaExpandArrowsAlt,
  FaCompressAlt,
  FaCropAlt,
  FaRedo,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/ToolGrid.css";

function ImageTools() {
  const tools = [
    {
      title: "JPG → PNG",
      description: "Convert JPG images to PNG format.",
      link: "/image-tools/jpg-to-png",
      icon: <FaFileImage />,
    },
    {
      title: "PNG → JPG",
      description: "Convert PNG images to JPG format.",
      link: "/image-tools/png-to-jpg",
      icon: <FaExchangeAlt />,
    },
    {
      title: "Resize Image",
      description: "Resize images to custom dimensions.",
      link: "/image-tools/resize",
      icon: <FaExpandArrowsAlt />,
    },
    {
      title: "Compress Image",
      description: "Reduce image file size.",
      link: "/image-tools/compress",
      icon: <FaCompressAlt />,
    },
    {
      title: "Crop Image",
      description: "Crop unwanted areas from images.",
      link: "/image-tools/crop",
      icon: <FaCropAlt />,
    },
    {
      title: "Rotate Image",
      description: "Rotate images by 90°, 180°, or 270°.",
      link: "/image-tools/rotate",
      icon: <FaRedo />,
    },
  ];

  return (
    <div className="tool-page">
      <div className="page-header">
        <h1>Image Tools</h1>
        <p>Convert, resize and optimize your images effortlessly.</p>
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

export default ImageTools;