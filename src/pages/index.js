import { useState, useEffect } from "react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("");
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (currentSection) {
      fetchPosts();
      fetchVideos();
    }
  }, [currentSection]);

  async function fetchPosts() {
    const res = await fetch("/api/get_posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: currentSection }),
    });
    const data = await res.json();
    setPosts(data.posts || []);
  }

  async function fetchVideos() {
    const res = await fetch("/api/get_videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: currentSection }),
    });
    const data = await res.json();
    setVideos(data.videos || []);
  }

  function openSection(section) {
    setCurrentSection(section);
  }

  return (
    <div style={{ fontFamily: "Cairo, sans-serif", background: "linear-gradient(180deg,#ffe6f2,#fdd8f5,#f3c5f9)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "10px 15px", backdropFilter: "blur(8px)" }}>
        <h1 style={{ color: "#c80064" }}>رِقّة 💖</h1>
        <a href="/admin" style={{ fontSize: "1.8em", color: "#ff1493" }}>❤️</a>
      </header>

      <input id="search" placeholder="ابحثي هنا يا رقيقة..." style={{ margin: "10px auto", width: "90%", padding: "8px 12px", borderRadius: "25px", border: "none" }}/>

      <main style={{ padding: "15px" }}>
        {posts.length === 0 && videos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#c80064" }}>✨ اختاري قسمك الجميل من الأسفل ✨</p>
        ) : (
          <>
            {posts.map(p => (
              <div key={p.id} style={{ background: "#fff", margin: "10px 0", padding: "10px", borderRadius: "12px" }}>
                {p.text}
                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "8px" }}>
                  <span onClick={() => alert("❤️ أعجبك البوح!")}>❤️</span>
                  <span><a href={`/download/${p.id}`} style={{ color: "#c80064" }}>⬇️ تحميل</a></span>
                </div>
              </div>
            ))}
            {videos.map(v => (
              <div key={v.id} style={{ margin: "10px 0" }}>
                <video src={v.src} controls width="100%" style={{ borderRadius: "10px" }} />
                <a href={v.src} download style={{ display: "block", marginTop: "5px", color: "#c80064" }}>⬇️ تحميل الفيديو</a>
              </div>
            ))}
          </>
        )}
      </main>

      <footer style={{ display: "flex", justifyContent: "space-around", padding: "10px 0", borderTop: "2px solid #ffc0cb" }}>
        <button onClick={() => openSection("mashaer")}>💞</button>
        <button onClick={() => openSection("fiqh")}>🌸</button>
        <button onClick={() => openSection("relations")}>💋</button>
        <button onClick={() => openSection("health")}>💗</button>
        <button onClick={() => openSection("community")}>🤍</button>
      </footer>
    </div>
  );
}
