export default function VideoCard({ video }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <video src={video.src} controls width="100%" style={{ borderRadius: "10px" }} />
      <a href={video.src} download style={{
        display: "block",
        marginTop: "5px",
        fontSize: "0.9em",
        color: "#c80064"
      }}>⬇️ تحميل الفيديو</a>
    </div>
  );
}
