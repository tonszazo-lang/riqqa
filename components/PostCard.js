export default function PostCard({ post, onLike }) {
  return (
    <div style={{
      background: "#fff",
      margin: "10px 0",
      padding: "10px",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <p>{post.text}</p>
      <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "8px", fontSize: "1.2em" }}>
        <span onClick={() => onLike(post.id)}>❤️</span>
        <span><a href={`/download/${post.id}`} style={{ color: "#c80064" }}>⬇️ تحميل</a></span>
      </div>
    </div>
  );
}
