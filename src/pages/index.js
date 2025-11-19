// pages/index.js
import { useState, useEffect } from "react";
import Head from "next/head";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Home() {
  const sections = ["mashaer","fiqh","relations","health","community"];
  const [currentSection,setCurrentSection] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const [showAdminPanel,setShowAdminPanel] = useState(false);
  const [adminSection,setAdminSection] = useState("mashaer");
  const [adminContentType,setAdminContentType] = useState("text"); 
  const [adminTitle,setAdminTitle] = useState(""); 
  const [adminText,setAdminText] = useState(""); 
  const [adminFile,setAdminFile] = useState(null); 
  const [posts,setPosts] = useState({});
  const [commentsVisible,setCommentsVisible] = useState(false);
  const [currentCommentId,setCurrentCommentId] = useState("");
  const [newComment,setNewComment] = useState("");

  const [loadingAI,setLoadingAI] = useState(false);

  // Health
  const [lastPeriod,setLastPeriod] = useState("");
  const [cycleLength,setCycleLength] = useState(28);
  const [pregnancyStatus,setPregnancyStatus] = useState("أدخل بيانات آخر دورة لعرض الحمل");
  const [lastFeed,setLastFeed] = useState("");
  const [nextFeed,setNextFeed] = useState("--");
  const [calendarEvents,setCalendarEvents] = useState([]);

  // ------------ Health functions -------------
  const savePeriod = () => {
    if(!lastPeriod || !cycleLength) return alert("أكمل البيانات");
    localStorage.setItem("lastPeriod",lastPeriod);
    localStorage.setItem("cycleLength",cycleLength);
    updateHealth();
  };

  const saveFeed = () => {
    if(!lastFeed) return alert("أدخل وقت آخر رضعة");
    localStorage.setItem("lastFeed",lastFeed);
    updateFeed();
  };

  const updateHealth = () => {
    const last = localStorage.getItem("lastPeriod");
    const len = parseInt(localStorage.getItem("cycleLength") || 28);
    if(!last || !len) return;
    setLastPeriod(last);
    setCycleLength(len);

    const lastDate = new Date(last);
    const today = new Date();
    const diffDays = Math.floor((today-lastDate)/(1000*60*60*24));
    const weeks = Math.floor(diffDays/7);
    const days = diffDays%7;
    setPregnancyStatus(`لقد مضى ${weeks} أسبوع و ${days} يوم منذ آخر دورة`);

    const events = [];
    let start = new Date(lastDate);
    for(let i=0;i<12;i++){
      const periodStart = new Date(start);
      events.push({
        title:"🩸 الحيض",
        start:periodStart,
        end:new Date(periodStart.getTime()+5*24*60*60*1000)
      });
      start.setDate(start.getDate()+len);
    }
    setCalendarEvents(events);
  };

  const updateFeed = () => {
    const last = localStorage.getItem("lastFeed");
    if(!last){ setNextFeed("--"); return; }
    setLastFeed(last);
    const now = new Date();
    const [h,m] = last.split(":");
    const lastDateObj = new Date();
    lastDateObj.setHours(h);
    lastDateObj.setMinutes(m);
    const nextDate = new Date(lastDateObj.getTime()+2*60*60*1000);
    const diff = Math.max(0,Math.floor((nextDate-now)/1000/60));
    const hrs = Math.floor(diff/60);
    const mins = diff%60;
    setNextFeed(`التالي بعد: ${hrs} ساعة و ${mins} دقيقة`);
  };

  // ------------ AI function -------------
  const generateAIContent = async () => {
    if(!adminTitle) return alert("أدخل اسم البوست");
    setLoadingAI(true);
    try {
      const res = await fetch("/api/openai", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt:adminText || "اكتبي محتوى جذاب للقسم "+adminSection})
      });
      const data = await res.json();
      if(data?.text){
        setAdminText(data.text);
      }
    } catch(err){
      console.log(err);
      alert("حدث خطأ في توليد المحتوى AI");
    } finally {
      setLoadingAI(false);
    }
  };

  // ------------ Posts functions -------------
  const addPost = () => {
    if(adminContentType!=="AI" && !adminText && !adminFile) return alert("أكمل المحتوى أو اختر ملف");
    const allPosts = {...posts};
    if(!allPosts[adminSection]) allPosts[adminSection] = [];

    let contentObj = { id:Date.now(), title:adminTitle || "بوح", type:adminContentType, likes:0, comments:[] };
    if(adminContentType==="text" || adminContentType==="poem" || adminContentType==="story" || adminContentType==="AI") contentObj.content = adminText;
    if(adminContentType==="image" || adminContentType==="video") {
      contentObj.file = adminFile ? URL.createObjectURL(adminFile) : null;
    }

    allPosts[adminSection].push(contentObj);
    setPosts(allPosts);
    localStorage.setItem("posts",JSON.stringify(allPosts));

    setAdminText("");
    setAdminTitle("");
    setAdminFile(null);
  };

  const deletePost = (section,id) => {
    const allPosts = {...posts};
    allPosts[section] = allPosts[section].filter(p=>p.id!==id);
    setPosts(allPosts);
    localStorage.setItem("posts",JSON.stringify(allPosts));
  };

  const likePost = (section,id) => {
    const allPosts = {...posts};
    allPosts[section] = allPosts[section].map(p=>{ if(p.id===id) p.likes=(p.likes||0)+1; return p; });
    setPosts(allPosts);
    localStorage.setItem("posts",JSON.stringify(allPosts));
  };

  const openComments = (id) => { setCurrentCommentId(id); setCommentsVisible(true); };
  const postComment = (section) => {
    if(!newComment) return;
    const allPosts = {...posts};
    allPosts[section] = allPosts[section].map(p=>{
      if(p.id===currentCommentId){
        if(!p.comments)p.comments=[];
        p.comments.push(newComment);
      }
      return p;
    });
    setPosts(allPosts);
    localStorage.setItem("posts",JSON.stringify(allPosts));
    setNewComment("");
  };

  const shareContent = (p) => {
    let text = p.title + "\n";
    if(p.content) text += p.content;
    if(navigator.share) navigator.share({text});
    else { navigator.clipboard.writeText(text); alert("تم نسخ المحتوى 💖"); }
  };

  // ------------ Admin Login -------------
  const loginAdmin = () => {
    const u = document.getElementById("adminUser").value;
    const p = document.getElementById("adminPass").value;
    if(u==="zazo" && p==="zazo010988") setIsAdmin(true);
    else alert("بيانات الدخول غير صحيحة 💔");
  };

  useEffect(()=>{
    const stored = localStorage.getItem("posts");
    if(stored) setPosts(JSON.parse(stored));
    updateHealth();
    updateFeed();
  },[]);

  return (
    <>
    <Head>
      <title>رِقّة النسائية 💖</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.css"/>
    </Head>

    <div style={{fontFamily:"Cairo,sans-serif",minHeight:"100vh",display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#ffe6f2,#fdd8f5,#f3c5f9)",color:"#4a004a"}}>

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:10,background:"rgba(255,255,255,0.75)",borderBottom:"2px solid #ffb6d1",backdropFilter:"blur(6px)"}}>
        <h1 style={{margin:0,color:"#c80064"}}>رِقّة 💖</h1>
        <button style={{background:"transparent",border:"none",fontSize:24,cursor:"pointer"}} onClick={()=>setShowAdminPanel(true)}>❤️</button>
      </header>

      <input placeholder="ابحثي هنا يا رقيقة..." style={{margin:"10px auto",width:"90%",padding:8,borderRadius:25,border:"none",outline:"none",boxShadow:"0 2px 6px rgba(255,105,180,0.35)"}}/>

      <main style={{flex:1,overflow:"auto",padding:15}}>
        <p style={{textAlign:"center",fontWeight:500,color:"#c80064"}}>✨ اختاري قسمك الجميل من الأسفل ✨</p>

        {sections.map(sec=>(
          <div key={sec} style={currentSection===sec?{}:{display:"none"}, {marginBottom:15}}>
            <h3>{sec==="mashaer"?"💞 المشاعر":sec==="fiqh"?"🌸 فقه النساء":sec==="relations"?"💋 العلاقات الحميمية":sec==="health"?"💗 الصحة":"🤍 المجتمع"}</h3>

            {sec==="health" && (
              <>
                <div style={{marginBottom:12}}>
                  <h4>🩸 متابعة الحيض</h4>
                  <input type="date" value={lastPeriod} onChange={e=>setLastPeriod(e.target.value)}/>
                  <input type="number" value={cycleLength} onChange={e=>setCycleLength(parseInt(e.target.value))}/>
                  <button onClick={savePeriod}>حفظ</button>
                  <p>{pregnancyStatus}</p>
                </div>
                <div style={{marginBottom:12}}>
                  <h4>🍼 متابعة الرضاعة</h4>
                  <input type="time" value={lastFeed} onChange={e=>setLastFeed(e.target.value)}/>
                  <button onClick={saveFeed}>حفظ</button>
                  <p>{nextFeed}</p>
                </div>
                <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" locale="ar" events={calendarEvents}/>
              </>
            )}

            {posts[sec]?.map(p=>(
              <div key={p.id} style={{background:"#fff",padding:12,borderRadius:12,boxShadow:"0 2px 6px rgba(0,0,0,0.07)",margin:"10px 0"}}>
                <h4>{p.title}</h4>
                {p.type==="text"||p.type==="poem"||p.type==="story"||p.type==="AI"?<p>{p.content}</p>:null}
                {p.type==="image"?<img src={p.file} style={{maxWidth:"100%",borderRadius:12}} />:null}
                {p.type==="video"?<video src={p.file} controls style={{maxWidth:"100%",borderRadius:12}} />:null}
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <button onClick={()=>likePost(sec,p.id)}>❤️ {p.likes||0}</button>
                  <button onClick={()=>openComments(p.id)}>💬</button>
                  <button onClick={()=>shareContent(p)}>🔗 مشاركة</button>
                  {isAdmin && <button onClick={()=>deletePost(sec,p.id)} style={{color:"red"}}>حذف</button>}
                </div>
                <div>
                  {p.comments?.map((c,i)=><div key={i} style={{background:"#eee",borderRadius:6,padding:4,marginTop:4}}>{c}</div>)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>

      <footer style={{display:"flex",justifyContent:"space-around",padding:10,background:"rgba(255,255,255,0.95)",borderTop:"2px solid #ffc0cb"}}>
        {sections.map(sec=>(
          <button key={sec} onClick={()=>setCurrentSection(sec)}>
            {sec==="mashaer"? "💞": sec==="fiqh"? "🌸": sec==="relations"? "💋": sec==="health"? "💗": "🤍"}
          </button>
        ))}
      </footer>

      <div style={{position:"fixed",top:"50%",right:"-200px",transform:"translateY(-50%)",width:200,background:"#3b5998",color:"white",padding:10,borderRadius:"8px 0 0 8px",transition:"0.3s",zIndex:998}}
        onMouseEnter={e=>e.currentTarget.style.right="0"} onMouseLeave={e=>e.currentTarget.style.right="-200px"}>
        <a href="https://www.facebook.com/profile.php?id=61571056531349" target="_blank" style={{color:"white",fontWeight:"bold",textAlign:"center",display:"block"}}>🌸 تواصلي معنا على الفيسبوك</a>
      </div>

      {showAdminPanel && (
        <div style={{position:"fixed",inset:0,background:"rgba(255,255,255,0.98)",display:"flex",flexDirection:"column",padding:18,zIndex:999,overflow:"auto"}}>
          {!isAdmin && (
            <div>
              <input id="adminUser" placeholder="اسم المستخدم"/>
              <input id="adminPass" type="password" placeholder="كلمة السر"/>
              <button onClick={loginAdmin}>دخول</button>
            </div>
          )}
          {isAdmin && (
            <>
              <h3>مرحباً Zazo 🌸</h3>
              <select value={adminSection} onChange={e=>setAdminSection(e.target.value)}>
                <option value="mashaer">💞 المشاعر</option>
                <option value="fiqh">🌸 فقه النساء</option>
                <option value="relations">💋 العلاقات الحميمية</option>
                <option value="health">💗 الصحة</option>
                <option value="community">🤍 المجتمع</option>
              </select>

              <select value={adminContentType} onChange={e=>setAdminContentType(e.target.value)}>
                <option value="text">بوست نصي</option>
                <option value="image">صورة</option>
                <option value="video">فيديو</option>
                <option value="poem">أبيات شعر</option>
                <option value="story">قصة</option>
                <option value="AI">محتوى ذكاء صناعي</option>
              </select>

              <input placeholder="اسم البوست (بوح)" value={adminTitle} onChange={e=>setAdminTitle(e.target.value)} />

              {(adminContentType==="text"||adminContentType==="poem"||adminContentType==="story"||adminContentType==="AI") &&
                <textarea placeholder="المحتوى" value={adminText} onChange={e=>setAdminText(e.target.value)} />
              }

              {(adminContentType==="image"||adminContentType==="video") &&
                <input type="file" accept={adminContentType+"/*"} onChange={e=>setAdminFile(e.target.files[0])} />
              }

              {adminContentType==="AI" &&
                <button onClick={generateAIContent} disabled={loadingAI}>{loadingAI?"جاري الإنشاء...":"إنشاء محتوى AI"}</button>
              }

              <button onClick={addPost}>💌 إضافة المحتوى</button>
              <button onClick={()=>setShowAdminPanel(false)} style={{background:"#f88"}}>خروج</button>
            </>
          )}
        </div>
      )}

      {commentsVisible && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"white",padding:14,borderRadius:12,width:"95%",maxWidth:600}}>
            <h3>التعليقات</h3>
            <div>
              {posts[currentSection]?.find(p=>p.id===currentCommentId)?.comments?.map((c,i)=><div key={i} style={{background:"#eee",borderRadius:6,padding:4,marginTop:4}}>{c}</div>)}
            </div>
            <textarea value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="أضيفي تعليقك..."></textarea>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>postComment(currentSection)}>نشر</button>
              <button onClick={()=>setCommentsVisible(false)}>إغلاق</button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}
