export default function Header({ onAdminClick }) {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(255,255,255,0.7)",
      padding: "10px 15px",
      borderBottom: "2px solid #ffb6d1",
      backdropFilter: "blur(8px)"
    }}>
      <h1 style={{ fontSize: "1.6em", color: "#c80064", fontWeight: 700, margin: 0 }}>رِقّة 💖</h1>
      <span style={{ fontSize: "1.8em", color: "#ff1493", cursor: "pointer" }}
            onClick={onAdminClick}>❤️</span>
    </header>
  );
}
