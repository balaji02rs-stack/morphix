import { useState } from "react";
import api from "../services/api";
import "../styles/ToolPage.css";

function UUIDGenerator() {
  const [uuid, setUuid] = useState("");

  const generateUUID = async () => {
    try {
      const response = await api.get("/dev/uuid");
      setUuid(response.data);
    } catch (error) {
      console.error(error);
      alert("Backend is not running.");
    }
  };

  const copyUUID = () => {
    if (!uuid) return;

    navigator.clipboard.writeText(uuid);
    alert("UUID copied successfully!");
  };

 return (
  <div className="tool-container">
    <div className="tool-card">
      <h1>UUID Generator</h1>

      <p>Generate universally unique identifiers instantly.</p>

      <button className="tool-button" onClick={generateUUID}>
        Generate UUID
      </button>

      {uuid && (
        <>
          <textarea
            className="tool-output"
            readOnly
            value={uuid}
          />

          <button
            className="tool-button copy-btn"
            onClick={copyUUID}
          >
            Copy UUID
          </button>
        </>
      )}
    </div>
  </div>
)
}
export default UUIDGenerator;