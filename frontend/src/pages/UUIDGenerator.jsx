import { useEffect, useState } from "react";
import { FaCopy, FaSyncAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/DeveloperTool.css";

function UUIDGenerator() {
  const [uuid, setUuid] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateUUID();
  }, []);

  const generateUUID = async () => {
    try {
      setLoading(true);

      const response = await api.get("/dev/uuid");

      setUuid(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Backend is not running.");
    } finally {
      setLoading(false);
    }
  };

  const copyUUID = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      toast.success("UUID copied!");
    } catch {
      toast.error("Failed to copy.");
    }
  };

  return (
    <div className="developer-tool-page">

      <div className="developer-tool-card">

        <h1>UUID Generator</h1>

        <p className="tool-description">
          Generate RFC 4122 universally unique identifiers instantly.
        </p>

        <div className="output-box">
          {loading ? "Generating..." : uuid}
        </div>

        <div className="button-group">

          <button
            className="primary-btn"
            onClick={generateUUID}
            disabled={loading}
          >
            <FaSyncAlt />
            {loading ? " Generating..." : " Generate New"}
          </button>

          <button
            className="secondary-btn"
            onClick={copyUUID}
            disabled={!uuid}
          >
            <FaCopy />
            Copy
          </button>

        </div>

      </div>

    </div>
  );
}

export default UUIDGenerator;