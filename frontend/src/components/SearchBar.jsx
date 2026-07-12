function SearchBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "30px 0",
      }}
    >
      <input
        type="text"
        placeholder="Search tools..."
        style={{
          width: "500px",
          maxWidth: "90%",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#1e293b",
          color: "white",
          outline: "none",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default SearchBar;