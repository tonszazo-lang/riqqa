import { useState } from "react";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("mashaer");
  const [text, setText] = useState("");

  const loginAdmin = () => {
    if (username === "zazo" && password === "zazo010988") {
      setIsAdmin(true);
    } else alert("بيانات الدخول غير صحيحة 💔");
  };

  const addPost = async () => {
    if (!text.trim()) return alert("أكتبي شيئًا جميلًا 🌷");
    await fetch("/api/add_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, content: text }),
    });
    setText("");
    alert("تمت إضافة البوح الجميل 💖");
  };

  return (
    <div style={{ fontFamily: "Cairo, sans-serif", padding: "20px" }}>
      {!isAdmin ? (
        <div>
          <input placeholder="اسم المستخدم" onChange={e => setUsername(e.target.value)} />
          <input placeholder="كلمة السر" type="password" onChange={e => setPassword(e.target.value)} />
          <button onClick={loginAdmin}>دخول</button>
        </div>
      ) : (
        <div>
          <h3>مرحباً يا رقيقة Zazo 🌸</h3>
          <select onChange={e => setSection(e.target.value)} value={section}>
            <option value="mashaer">💞 المشاعر</option>
            <option value="fiqh">🌸 فقه النساء</option>
            <option value="relations">💋 العلاقات الحميمية</option>
            <option value="health">💗 الصحة</option>
            <option value="community">🤍 المجتمع</option>
          </select>
          <textarea rows="5" value={text} onChange={e => setText(e.target.value)} placeholder="اكتبي البوح الجميل هنا..."></textarea>
          <button onClick={addPost}>💌 إضافة بوح جميل</button>
        </div>
      )}
    </div>
  );
}
