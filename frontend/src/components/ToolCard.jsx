import { Link } from "react-router-dom";

function ToolCard({ title, description, link }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        width: "260px",
        border: "1px solid #334155",
      }}
    >
      <h3>{title}</h3>

      <p style={{ color: "#cbd5e1", marginTop: "10px" }}>
        {description}
      </p>

      <Link to={link}>
        <button
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Open
        </button>
      </Link>
    </div>
  );
}

export default ToolCard;