import { Link } from "react-router-dom";
import "../styles/DeveloperTools.css";

function ImageTools() {
  const tools = [
    {
      title: "JPG → PNG",
      description: "Convert JPG images to PNG format.",
      link: "/image-tools/jpg-to-png",
    },
    {
      title: "PNG → JPG",
      description: "Convert PNG images to JPG format.",
      link: "/image-tools/png-to-jpg",
    },
    {
      title: "Resize Image",
      description: "Resize images to custom dimensions.",
      link: "/image-tools/resize",
    },
    {
  title: "Compress Image",
  description: "Reduce image file size.",
  link: "/image-tools/compress",
},
    {
  title: "Crop Image",
  description: "Crop unwanted areas from images.",
  link: "/image-tools/crop",
},
    {
  title: "Rotate Image",
  description: "Rotate images by 90°, 180°, or 270°.",
  link: "/image-tools/rotate",
},
  ];

  return (
    <div className="developer-page">
      <h1>Image Tools</h1>

      <p className="subtitle">
        Fast image conversion and editing utilities.
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

export default ImageTools;