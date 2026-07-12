import SearchBar from "../components/SearchBar";
import ToolCard from "../components/ToolCard";

function Home() {
  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <SearchBar />

      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Categories
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <ToolCard
          title="Developer Tools"
          description="UUID, Password, SHA-256, Base64 and more."
          link="/developer-tools"
        />

        <ToolCard
          title="Image Tools"
          description="PNG, JPG, Resize, Compress."
          link="/image-tools"
        />

        <ToolCard
          title="Document Tools"
          description="PDF to Text, Image to PDF."
          link="/document-tools"
        />

        <ToolCard
          title="Web Tools"
          description="URL Encode/Decode, HTML Escape."
          link="/web-tools"
        />
      </div>
    </div>
  );
}

export default Home;