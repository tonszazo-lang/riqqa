// src/pages/index.js
import { useEffect, useState } from "react";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminSection, setAdminSection] = useState("mashaer");
  const [adminText, setAdminText] = useState("");
  const [comments, setComments] = useState({});
  const [healthData, setHealthData] = useState({ pregnancyStatus: "", events: [], nextFeed: "--" });

  useEffect(() => {
    updateHealth();
    updateFeed();
  }, []);

  // ---------- وظائف الصحة ----------
  const savePeriod = async () => {
    const last = document.getElementById("lastPeriod").value;
    const len = parseInt(document.getElementById("cycleLength").value);
    if (!last || !len) return alert("أكمل البيانات");
    await fetch("/api/save_period", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ last, len }),
    });
    updateHealth();
  };

  const saveFeed = async () => {
    const time = document.getElementById("lastFeed").value;
    if (!time) return alert("أدخل وقت آخر رضعة");
    await fetch("/api/save_feed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });
    updateFeed();
  };

  const updateHealth = async () => {
    const res = await fetch("/api/get_health");
    const data = await res.json();
    setHealthData((prev) => ({ ...prev, pregnancyStatus: data.pregnancyStatus, events: data.events }));
  };

  const updateFeed = async () => {
    const res = await fetch("/api/get_feed");
    const data = await res.json();
    setHealthData((prev) => ({ ...prev, nextFeed: data.nextFeed }));
  };

  // ---------- وظائف التفاعل ----------
  const likePost = async (id) => {
    const res = await fetch("/api/like_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    document.getElementById("like-" + id).innerText = data.likes;
  };

  const openComments = async (id) => {
    const res = await fetch(`/api/comments/${id}`);
    const html = await res.text();
    setComments((prev) => ({ ...prev, [id]: html }));
    document.getElementById("commentsModal").style.display = "flex";
    document.getElementById("newComment").dataset.id = id;
  };

  const postComment = async () => {
    const textarea = document.getElementById("newComment");
    const id = textarea.dataset.id;
    const val = textarea.value.trim();
    if (!val) return;
    await fetch("/api/add_comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, comment: val }),
    });
    textarea.value = "";
    openComments(id);
  };

  const closeComments = () => {
    document.getElementById("commentsModal").style.display = "none";
  };

  const shareContent = (text) => {
    if (navigator.share) navigator.share({ text });
    else {
      navigator.clipboard.writeText(text);
      alert("تم نسخ المحتوى 💖");
    }
  };

  const openSection = (section) => {
    document.querySelectorAll(".section-content").forEach((s) => s.classList.add("hidden"));
    if (section === "health") {
      document.getElementById("healthSection").classList.remove("hidden");
      updateHealth();
      updateFeed();
    }
  };

  // ---------- لوحة الأدمن ----------
  const openAdmin = () => {
    document.getElementById("adminPanel").style.display = "flex";
  };
  const closeAdmin = () => {
    document.getElementById("adminPanel").style.display = "none";
  };
  const loginAdmin = () => {
    if (adminUser === "zazo" && adminPass === "zazo010988") {
      setIsAdmin(true);
      document.getElementById("loginArea").classList.add("hidden");
      document.getElementById("adminContent").classList.remove("hidden");
    } else alert("بيانات الدخول غير صحيحة 💔");
  };
  const generateAIContent = async () => {
    if (!isAdmin) return alert("يجب تسجيل الدخول");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: adminSection }),
      });
      const data = await res.json();
      setAdminText(data.text || "💖 لم يصل رد من الخادم");
    } catch (e) {
      alert("⚠️ تعذر الاتصال بالخادم");
    }
  };

  const addPost = async () => {
    if (!isAdmin) return alert("يجب تسجيل الدخول");
    if (!adminText.trim()) return alert("أكتبي شيئًا 🌷");
    await fetch("/api/add_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: adminSection, content: adminText }),
    });
    setAdminText("");
    alert("تمت إضافة المحتوى 💖");
  };

  const uploadVideo = async () => {
    const file = document.getElementById("videoUpload").files[0];
    if (!file) return alert("اختر ملف الفيديو");
    const fd = new FormData();
    fd.append("video", file);
    await fetch("/api/upload_video", { method: "POST", body: fd });
    alert("تم رفع الفيديو 💖");
  };

  const uploadImage = async () => {
    const file = document.getElementById("imageUpload").files[0];
    if (!file) return alert("اختر ملف الصورة");
    const fd = new FormData();
    fd.append("image", file);
    await fetch("/api/upload_image", { method: "POST", body: fd });
    alert("تم رفع الصورة 💖");
  };

  const addType = (type) => {
    setAdminText(`[${type.toUpperCase()}] `);
  };

  return (
    <div style={{ fontFamily: "Cairo, sans-serif", direction: "rtl", background: "linear-gradient(180deg,#ffe6f2,#fdd8f5,#f3c5f9)", minHeight: "100vh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.75)", padding: 10, borderBottom: "2px solid #ffb6d1", backdropFilter: "blur(6px)" }}>
        <h1 style={{ margin: 0, color: "#c80064" }}>رِقّة 💖</h1>
        <div>
          <button className="action-btn" onClick={openAdmin}>❤️ الأدمن</button>
        </div>
      </header>

      <input id="search" placeholder="ابحثي هنا يا رقيقة..." style={{ margin: "10px auto", width: "90%", padding: "8px 12px", borderRadius: 25, border: "none", outline: "none", boxShadow: "0 2px 6px rgba(255,105,180,0.35)" }} />

      <main id="content" style={{ flex: 1, overflow: "auto", padding: 15 }}>
        <p style={{ textAlign: "center", color: "#c80064", fontWeight: 500 }}>✨ اختاري قسمك الجميل من الأسفل ✨</p>
        <div id="sectionsPlaceholder"></div>
      </main>

      <footer style={{ display: "flex", justifyContent: "space-around", alignItems: "center", background: "rgba(255,255,255,0.95)", borderTop: "2px solid #ffc0cb", padding: 10 }}>
        <button onClick={() => openSection("mashaer")}>💞</button>
        <button onClick={() => openSection("fiqh")}>🌸</button>
        <button onClick={() => openSection("relations")}>💋</button>
        <button onClick={() => openSection("health")}>💗</button>
        <button onClick={() => openSection("community")}>🤍</button>
      </footer>

      {/* باقي عناصر HTML مثل لوحة الأدمن، التعليقات، الصحة ... يمكن إضافتها بنفس الطريقة باستخدام JSX */}
    </div>
  );
}
