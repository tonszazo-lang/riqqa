import { useState, useEffect } from "react";

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  async function fetchUserPosts() {
    const res = await fetch("/api/get_user_posts", { method: "GET" });
    const data = await res.json();
    setUserPosts(data.posts || []);
  }

  return (
    <div style={{ fontFamily: "Cairo, sans-serif", padding: "20px" }}>
      <h2>ملفي الشخصي 🌸</h2>
      {userPosts.length === 0 ? (
        <p>لا توجد مشاركات بعد 💖</p>
      ) : (
        userPosts.map(p => (
          <div key={p.id} style={{ background: "#fff", margin: "10px 0", padding: "10px", borderRadius: "12px" }}>
            {p.text}
            <div>
              <a href={`/download/${p.id}`} style={{ color: "#c80064" }}>⬇️ تحميل</a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
