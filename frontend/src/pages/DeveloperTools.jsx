function DeveloperTools() {
  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1>Developer Tools</h1>

      <p>Select a tool.</p>

      <ul>
        <li>UUID Generator</li>
        <li>Password Generator</li>
        <li>SHA-256 Generator</li>
        <li>Base64 Encoder / Decoder</li>
      </ul>
    </div>
  );
}

export default DeveloperTools;