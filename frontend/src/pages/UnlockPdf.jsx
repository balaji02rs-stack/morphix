import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function UnlockPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const unlockPdf = async () => {
    if (!file) {
      alert("Please select a protected PDF.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter the password.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      setLoading(true);

      const response = await api.post(
        "/document/unlock",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "unlocked.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Unlock failed. Please check the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="tool-card">

        <h1>Unlock PDF</h1>

        <p>Remove password protection from a PDF.</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter PDF password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button
          className="tool-button"
          onClick={unlockPdf}
          disabled={loading}
        >
          {loading ? "Unlocking..." : "Unlock PDF"}
        </button>

      </div>
    </div>
  );
}

export default UnlockPdf;