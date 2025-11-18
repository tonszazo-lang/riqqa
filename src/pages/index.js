// src/pages/index.js
import { useState, useEffect } from "react";

export default function Home() {
  // الصفحات
  const sections = [
    "التجميل",
    "الموضة",
    "التنمية الذاتية",
    "العناية بالصحة",
    "عناية المنزل",
    "الأسرة والعلاقات",
    "نصائح يومية",
    "مطبخ وتجهيز",
    "الأناقة",
    "المال والأعمال"
  ];

  const [section, setSection] = useState(sections[0]);
  const [content, setContent] = useState({});
  const [aiText, setAiText] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // تحميل محتوى الصفحات من التخزين المحلي
  useEffect(() => {
    const saved = localStorage.getItem("riqqa-content");
    if (saved) setContent(JSON.parse(saved));
  }, []);

  // حفظ التعديلات
  function saveContent() {
    localStorage.setItem("riqqa-content", JSON.stringify(content));
    alert("تم حفظ المحتوى");
  }

  // جلب نص ذكاء صناعي
  async function generateAI() {
    try {
      const res = await fetch("/api/ai_generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section })
      });

      const data = await res.json();
      if (data.text) setAiText(data.text);
    } catch (e) {
      alert("فشل الاتصال بخادم الذكاء الاصطناعي");
    }
  }

  // تسجيل الدخول الأدمن
  function tryLogin() {
    if (username === "zazo" && password === "zazo010988") {
      setAdminMode(true);
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  }

  return (
    <div style={{ fontFamily: "Tahoma", padding: 20, direction: "rtl" }}>
      {/* زر القلب للأدمن */}
      {!adminMode && (
        <button
          onClick={() => {
            const pass = prompt("كلمة السر:");
            if (pass === "zazo010988") setAdminMode(true);
          }}
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            background: "pink",
            border: "none",
            padding: "10px 14px",
            borderRadius: "50%",
            fontSize: 20,
            cursor: "pointer"
          }}
        >
          ❤️
        </button>
      )}

      {/* صفحة الأدمن */}
      {adminMode ? (
        <div>
          <h2>لوحة التحكم — تحرير الأقسام</h2>

          <label>اختيار قسم:</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            style={{ padding: 10, margin: "10px 0" }}
          >
            {sections.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <textarea
            style={{ width: "100%", height: 200, marginTop: 10 }}
            value={content[section] || ""}
            onChange={(e) =>
              setContent({ ...content, [section]: e.target.value })
            }
          />

          <button
            onClick={saveContent}
            style={{
              padding: 10,
              marginTop: 10,
              background: "#0088cc",
              color: "#fff",
              borderRadius: 8,
              border: 0
            }}
          >
            حفظ
          </button>

          <hr style={{ margin: "30px 0" }} />

          <button
            onClick={generateAI}
            style={{
              padding: 10,
              background: "purple",
              color: "white",
              border: 0,
              borderRadius: 8
            }}
          >
            توليد محتوى عبر الذكاء الاصطناعي
          </button>

          {aiText && (
            <div
              style={{
                marginTop: 20,
                padding: 15,
                background: "#f8f2ff",
                borderRadius: 10
              }}
            >
              <h4>الناتج الذكي:</h4>
              <p>{aiText}</p>

              <button
                onClick={() => {
                  setContent({ ...content, [section]: aiText });
                  alert("تم نقل المحتوى للقسم");
                }}
                style={{
                  marginTop: 10,
                  padding: 10,
                  background: "green",
                  color: "white",
                  borderRadius: 8,
                  border: 0
                }}
              >
                استخدام هذا النص للقسم
              </button>
            </div>
          )}
        </div>
      ) : (
        // الصفحة العامة (للمستخدمين)
        <div>
          <h1>تطبيق رِقّة النسائي</h1>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            style={{ padding: 10, margin: "20px 0" }}
          >
            {sections.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <div
            style={{
              background: "#fff0f6",
              padding: 20,
              borderRadius: 10,
              minHeight: 120,
              border: "1px solid #ffcce7"
            }}
          >
            <h3>{section}</h3>
            <p>{content[section] || "لا يوجد محتوى بعد."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
