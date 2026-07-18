import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function SplitPdf() {
  const [file, setFile] = useState(null);
  const [pageNumber, setPageNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const splitPdf = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!pageNumber) {
      alert("Please enter a page number.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pageNumber", pageNumber);

    try {
      setLoading(true);

      const response = await api.post(
        "/document/split",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "split.zip";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Split failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Split PDF</h1>

        <p>Split a PDF into two files.</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Split after page..."
          value={pageNumber}
          onChange={(e) => setPageNumber(e.target.value)}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={splitPdf}
          disabled={loading}
        >
          {loading ? "Splitting..." : "Split PDF"}
        </button>

      </div>
    </div>
  );
}

export default SplitPdf;