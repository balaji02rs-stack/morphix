import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function ProtectPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const protectPdf = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter a password.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      setLoading(true);

      const response = await api.post(
        "/document/protect",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "protected.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Protection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Protect PDF</h1>

        <p>Add password protection to a PDF.</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={protectPdf}
          disabled={loading}
        >
          {loading ? "Protecting..." : "Protect PDF"}
        </button>

      </div>
    </div>
  );
}

export default ProtectPdf;