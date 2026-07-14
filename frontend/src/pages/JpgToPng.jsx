import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function JpgToPng() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertImage = async () => {
    if (!file) {
      alert("Please select a JPG image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post(
        "/image/jpg-to-png",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "converted.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>🖼 JPG → PNG Converter</h1>

        <p>Upload a JPG image and convert it to PNG.</p>

        <input
          type="file"
          accept=".jpg,.jpeg,image/jpeg"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && (
          <p style={{ marginTop: "15px" }}>
            Selected:
            <br />
            <strong>{file.name}</strong>
          </p>
        )}

        <button
          className="tool-button"
          onClick={convertImage}
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "Converting..." : "Convert to PNG"}
        </button>

      </div>
    </div>
  );
}

export default JpgToPng;