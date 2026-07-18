import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function CropImage() {
  const [file, setFile] = useState(null);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);

  const cropImage = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    if (!x || !y || !width || !height) {
      alert("Please enter all crop values.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("x", x);
    formData.append("y", y);
    formData.append("width", width);
    formData.append("height", height);

    try {
      setLoading(true);

      const response = await api.post("/image/crop", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "cropped.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Crop failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">
        <h1>Crop Image</h1>

        <p>Crop an image using X, Y, Width and Height.</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <input
          type="number"
          placeholder="X"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Y"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={cropImage}
          disabled={loading}
        >
          {loading ? "Cropping..." : "Crop Image"}
        </button>
      </div>
    </div>
  );
}

export default CropImage;