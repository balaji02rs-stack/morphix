import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function ResizeImage() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);

  const resizeImage = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    if (!width || !height) {
      alert("Please enter width and height.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("width", width);
    formData.append("height", height);

    try {
      setLoading(true);

      const response = await api.post(
        "/image/resize",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "resized.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Resize failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Resize Image</h1>

        <p>Resize JPG or PNG images to custom dimensions.</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          style={{ width: "120px", marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{ width: "120px" }}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={resizeImage}
          disabled={loading}
        >
          {loading ? "Resizing..." : "Resize Image"}
        </button>

      </div>
    </div>
  );
}

export default ResizeImage;