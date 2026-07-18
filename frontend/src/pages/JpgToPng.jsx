import { useState } from "react";
import {
  FaFileImage,
  FaUpload,
  FaExchangeAlt,
  FaTrash,
  FaDownload
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/ImageTool.css";

function JpgToPng() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (selectedFile) => {

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

  };

  const convertImage = async () => {

    if (!file) {
      toast.warning("Please select a JPG image.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        "/image/jpg-to-png",
        formData,
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "converted.png";
      link.click();

      window.URL.revokeObjectURL(url);

      toast.success("Image converted successfully!");

    } catch (error) {

      console.error(error);

      toast.error("Conversion failed.");

    } finally {

      setLoading(false);

    }

  };

  const clearAll = () => {

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");

    toast.info("Cleared.");

  };

  return (

    <div className="image-tool-page">

      <div className="image-tool-card">

        <h1>
          <FaExchangeAlt />
          JPG → PNG Converter
        </h1>

        <p className="tool-description">
          Convert JPG images into high-quality PNG format instantly.
        </p>

        <label className="upload-box">

          <FaUpload size={40} />

          <h3>Click to Upload JPG Image</h3>

          <p>Supports .jpg and .jpeg files</p>

          <input
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />

        </label>

        {preview && (

          <div className="preview-container">

            <img
              src={preview}
              alt="Preview"
              className="preview-image"
            />

            <div className="file-details">

              <FaFileImage />

              <span>{file.name}</span>

            </div>

          </div>

        )}

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={convertImage}
            disabled={loading}
          >
            <FaDownload />

            {loading
              ? "Converting..."
              : "Convert Image"}

          </button>

          <button
            className="secondary-btn"
            onClick={clearAll}
          >
            <FaTrash />
            Clear
          </button>

        </div>

        <div className="info-card">

          <h3>

            <FaFileImage />

            About JPG → PNG

          </h3>

          <ul>

            <li>Converts JPG images into PNG format.</li>

            <li>PNG supports lossless image quality.</li>

            <li>Useful for transparent graphics and editing.</li>

            <li>Fast conversion with no visible quality loss.</li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default JpgToPng;