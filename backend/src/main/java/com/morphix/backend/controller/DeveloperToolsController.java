function App() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1>Morphix</h1>

      <p>Smart File Conversion Platform</p>

      <button
        style={{
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;