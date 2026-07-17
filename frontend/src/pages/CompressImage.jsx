import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function CompressImage() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);

  const compressImage = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", quality / 100);

    try {
      setLoading(true);

      const response = await api.post(
        "/image/compress",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "compressed.jpg";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Compression failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Compress Image</h1>

        <p>Reduce image size while maintaining quality.</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <label>
          Quality: <strong>{quality}%</strong>
        </label>

        <br />

        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          style={{ width: "100%" }}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={compressImage}
          disabled={loading}
        >
          {loading ? "Compressing..." : "Compress Image"}
        </button>

      </div>
    </div>
  );
}

export default CompressImage;