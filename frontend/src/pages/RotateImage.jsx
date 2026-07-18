import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function RotateImage() {
  const [file, setFile] = useState(null);
  const [angle, setAngle] = useState(90);
  const [loading, setLoading] = useState(false);

  const rotateImage = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("angle", angle);

    try {
      setLoading(true);

      const response = await api.post(
        "/image/rotate",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "rotated.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Rotation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Rotate Image</h1>

        <p>Rotate images by 90°, 180° or 270°.</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <select
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
        >
          <option value="90">90°</option>
          <option value="180">180°</option>
          <option value="270">270°</option>
        </select>

        <br /><br />

        <button
          className="tool-button"
          onClick={rotateImage}
          disabled={loading}
        >
          {loading ? "Rotating..." : "Rotate Image"}
        </button>

      </div>
    </div>
  );
}

export default RotateImage;