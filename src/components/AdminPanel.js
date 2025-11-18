import { useState } from "react";

export default function AdminPanel({ isVisible, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAdmin = () => {
    if(username==="zazo" && password==="zazo010988") setIsAdmin(true);
    else alert("بيانات الدخول غير صحيحة 💔");
  };

  if(!isVisible) return null;

  return (
    <div style={{
      position: "fixed", top:0, left:0, right:0, bottom:0,
      background:"rgba(255,255,255,0.98)",
      padding:"20px",
      overflowY:"auto",
      zIndex:999,
      display:"flex",
      flexDirection:"column"
    }}>
      {!isAdmin ? (
        <div>
          <input placeholder="اسم المستخدم" onChange={e=>setUsername(e.target.value)} />
          <input placeholder="كلمة السر" type="password" onChange={e=>setPassword(e.target.value)} />
          <button onClick={loginAdmin}>دخول</button>
        </div>
      ) : (
        <div>
          <h3>مرحباً يا رقيقة Zazo 🌸</h3>
          {/* يمكن إضافة عناصر التحكم الأخرى للادمن هنا */}
          <button onClick={onClose} style={{ background:"#f88" }}>خروج</button>
        </div>
      )}
    </div>
  );
}
