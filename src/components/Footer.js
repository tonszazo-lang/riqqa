export default function Footer({ onSectionClick }) {
  return (
    <footer style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      background: "rgba(255,255,255,0.9)",
      borderTop: "2px solid #ffc0cb",
      padding: "10px 0"
    }}>
      <button onClick={() => onSectionClick("mashaer")}>💞</button>
      <button onClick={() => onSectionClick("fiqh")}>🌸</button>
      <button onClick={() => onSectionClick("relations")}>💋</button>
      <button onClick={() => onSectionClick("health")}>💗</button>
      <button onClick={() => onSectionClick("community")}>🤍</button>
    </footer>
  );
}
