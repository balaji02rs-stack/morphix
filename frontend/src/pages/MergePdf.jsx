import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const mergePdf = async () => {
    if (files.length < 2) {
      alert("Please select at least two PDF files.");
      return;
    }

    const formData = new FormData();

    for (let file of files) {
      formData.append("files", file);
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/document/merge",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Merge failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Merge PDF</h1>

        <p>Select two or more PDF files to merge.</p>

        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={mergePdf}
          disabled={loading}
        >
          {loading ? "Merging..." : "Merge PDF"}
        </button>

      </div>
    </div>
  );
}

export default MergePdf;