<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>رِقّة النسائية 💖</title>
<link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.css" rel="stylesheet">
<style>
:root{--pink:#ff6fb2;--deep:#4a004a}
body{margin:0;font-family:"Cairo",sans-serif;background:linear-gradient(180deg,#ffe6f2,#fdd8f5,#f3c5f9);color:var(--deep);display:flex;flex-direction:column;height:100vh;overflow-x:hidden}
header{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.75);padding:10px 15px;border-bottom:2px solid #ffb6d1;backdrop-filter:blur(6px)}
header h1{margin:0;color:#c80064}
#search{margin:10px auto;width:90%;padding:8px 12px;border-radius:25px;border:none;outline:none;box-shadow:0 2px 6px rgba(255,105,180,0.35)}
main{flex:1;overflow:auto;padding:15px;margin-right:0}
footer{display:flex;justify-content:space-around;align-items:center;background:rgba(255,255,255,0.95);border-top:2px solid #ffc0cb;padding:10px}
footer button{background:none;border:none;font-size:1.4em;color:#c80064;cursor:pointer}
.section-content{background:rgba(255,255,255,0.9);border-radius:12px;padding:12px;box-shadow:0 3px 10px rgba(0,0,0,0.06);margin-bottom:15px;}
.post{background:#fff;margin:10px 0;padding:12px;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.07)}
.post-actions{display:flex;gap:12px;align-items:center;margin-top:8px}
.action-btn{cursor:pointer;padding:6px 10px;border-radius:16px;border:none;background:linear-gradient(90deg,#ffb6d1,#fdb5e1);color:var(--deep)}
.count{font-weight:700;margin-left:6px}
#adminPanel{position:fixed;inset:0;background:rgba(255,255,255,0.98);display:none;flex-direction:column;padding:18px;z-index:999;overflow:auto}
.hidden{display:none}
textarea{width:100%;min-height:80px;border-radius:8px;padding:8px}
input,select{padding:8px;border-radius:8px;width:100%;margin:6px 0}
.video-thumb,img{max-width:100%;border-radius:8px}
#commentsModal{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:none;align-items:center;justify-content:center;z-index:1000}
#commentsBox{background:white;padding:14px;border-radius:12px;width:95%;max-width:600px}
.comment{padding:8px;border-radius:8px;background:#fff;margin:6px 0;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
#fbSidebar{position:fixed;top:50%;right:-200px;transform:translateY(-50%);width:200px;background:#3b5998;color:white;padding:10px;border-radius:8px 0 0 8px;transition:0.3s;z-index:998}
#fbSidebar:hover{right:0}
#fbSidebar a{color:white;text-decoration:none;font-weight:bold;display:block;text-align:center}
</style>
</head>
<body>

<header>
  <h1>رِقّة 💖</h1>
  <div>
    <button class="action-btn" onclick="openAdmin()">❤️ الأدمن</button>
  </div>
</header>

<input id="search" placeholder="ابحثي هنا يا رقيقة...">

<main id="content">
  <p style="text-align:center;color:#c80064;font-weight:500;">✨ اختاري قسمك الجميل من الأسفل ✨</p>
  <div id="sectionsPlaceholder"></div>
</main>

<footer>
  <button onclick="openSection('mashaer')">💞</button>
  <button onclick="openSection('fiqh')">🌸</button>
  <button onclick="openSection('relations')">💋</button>
  <button onclick="openSection('health')">💗</button>
  <button onclick="openSection('community')">🤍</button>
</footer>

<div id="fbSidebar">
  <a href="https://www.facebook.com/profile.php?id=61571056531349" target="_blank">🌸 تواصلي معنا على الفيسبوك</a>
</div>

<!-- لوحة الأدمن -->
<div id="adminPanel">
  <h2>لوحة الأدمن 💼</h2>
  <div id="loginArea">
    <input id="adminUser" placeholder="اسم المستخدم">
    <input id="adminPass" type="password" placeholder="كلمة السر">
    <button class="action-btn" onclick="loginAdmin()">دخول</button>
  </div>
  <div id="adminContent" class="hidden">
    <h3>مرحباً Zazo 🌸</h3>
    <select id="adminSection">
      <option value="mashaer">💞 المشاعر</option>
      <option value="fiqh">🌸 فقه النساء</option>
      <option value="relations">💋 العلاقات</option>
      <option value="health">💗 الصحة</option>
      <option value="community">🤍 المجتمع</option>
    </select>
    <button class="action-btn" onclick="generateAIContent()">✨ جلب محتوى AI</button>
    <textarea id="adminText" placeholder="اكتبي هنا أو اطلبي من AI إنشاء محتوى"></textarea>
    <button class="action-btn" onclick="addPost()">💌 إضافة المحتوى</button>
    <hr>
    <label>رفع فيديو</label>
    <input type="file" id="videoUpload" accept="video/*">
    <button class="action-btn" onclick="uploadVideo()">رفع فيديو</button>
    <label>رفع صورة</label>
    <input type="file" id="imageUpload" accept="image/*">
    <button class="action-btn" onclick="uploadImage()">رفع صورة</button>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      <button class="action-btn" onclick="addType('poem')">📝 بيت شعر</button>
      <button class="action-btn" onclick="addType('article')">📚 مقال</button>
      <button class="action-btn" onclick="addType('story')">📖 قصة</button>
    </div>
    <hr>
    <div id="adminPosts"></div>
    <button class="action-btn" style="background:#f88" onclick="closeAdmin()">خروج</button>
  </div>
</div>

<div id="commentsModal">
  <div id="commentsBox">
    <h3>التعليقات</h3>
    <div id="commentsList"></div>
    <textarea id="newComment" placeholder="أضيفي تعليقك..."></textarea>
    <div style="display:flex;gap:8px;justify-content:flex-end">
      <button class="action-btn" onclick="postComment()">نشر</button>
      <button class="action-btn" onclick="closeComments()">إغلاق</button>
    </div>
  </div>
</div>

<!-- قسم الصحة -->
<div id="healthSection" class="section-content hidden">
  <h3>💗 متابعة الصحة</h3>
  <div style="margin-bottom:12px;" class="health-post">
    <h4>🩸 متابعة الحيض</h4>
    <label>آخر دورة شهرية:</label>
    <input type="date" id="lastPeriod">
    <label>طول الدورة (أيام):</label>
    <input type="number" id="cycleLength" value="28" min="20" max="40">
    <button onclick="savePeriod()">حفظ</button>
    <div class="post-actions">
      <span onclick="likePost('period')">❤️ <span class="count" id="like-period">0</span></span>
      <span onclick="openComments('period')">💬</span>
      <span onclick="shareContent('متابعة الحيض 💗')">🔗 مشاركة</span>
    </div>
  </div>
  <div style="margin-bottom:12px;" class="health-post">
    <h4>🤰 متابعة الحمل</h4>
    <p id="pregnancyStatus">أدخل بيانات آخر دورة لعرض الحمل</p>
    <div class="post-actions">
      <span onclick="likePost('pregnancy')">❤️ <span class="count" id="like-pregnancy">0</span></span>
      <span onclick="openComments('pregnancy')">💬</span>
      <span onclick="shareContent('متابعة الحمل 💗')">🔗 مشاركة</span>
    </div>
  </div>
  <div style="margin-bottom:12px;" class="health-post">
    <h4>🍼 متابعة الرضاعة</h4>
    <label>آخر رضعة:</label>
    <input type="time" id="lastFeed">
    <button onclick="saveFeed()">حفظ</button>
    <p id="nextFeed">التالي بعد: --</p>
    <div class="post-actions">
      <span onclick="likePost('feed')">❤️ <span class="count" id="like-feed">0</span></span>
      <span onclick="openComments('feed')">💬</span>
      <span onclick="shareContent('متابعة الرضاعة 💗')">🔗 مشاركة</span>
    </div>
  </div>
  <div id="calendar"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>
<script>
// ---------- وظائف الصحة ----------
const healthSection = document.getElementById('healthSection');

function savePeriod(){ const last=document.getElementById('lastPeriod').value; const len=parseInt(document.getElementById('cycleLength').value); if(!last||!len){alert("أكمل البيانات"); return;} fetch('/api/save_period',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({last,len})}).then(()=>updateHealth()); }
function saveFeed(){ const time=document.getElementById('lastFeed').value; if(!time){alert("أدخل وقت آخر رضعة"); return;} fetch('/api/save_feed',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({time})}).then(()=>updateFeed()); }
function updateHealth(){ fetch('/api/get_health').then(r=>r.json()).then(data=>{ document.getElementById('pregnancyStatus').innerText=data.pregnancyStatus; const calendarEl=document.getElementById('calendar'); calendarEl.innerHTML=''; const calendar=new FullCalendar.Calendar(calendarEl,{initialView:'dayGridMonth',locale:'ar',events:data.events}); calendar.render();}); }
function updateFeed(){ fetch('/api/get_feed').then(r=>r.json()).then(data=>{ document.getElementById('nextFeed').innerText=data.nextFeed; }); }

// ---------- وظائف التفاعل ----------
function likePost(id){ fetch('/api/like_post',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}).then(r=>r.json()).then(data=>{document.getElementById('like-'+id).innerText=data.likes});}
function openComments(id){ fetch(`/api/comments/${id}`).then(r=>r.text()).then(html=>{document.getElementById('commentsModal').style.display='flex'; document.getElementById('commentsList').innerHTML=html; document.getElementById('newComment').dataset.id=id;});}
function postComment(){ const textarea=document.getElementById('newComment'); const id=textarea.dataset.id; const val=textarea.value.trim(); if(!val)return; fetch('/api/add_comment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,comment:val})}).then(()=>{textarea.value=''; openComments(id);}); }
function closeComments(){document.getElementById('commentsModal').style.display='none';}
function shareContent(text){if(navigator.share) navigator.share({text}); else {navigator.clipboard.writeText(text); alert("تم نسخ المحتوى 💖");}}

// ---------- فتح الأقسام ----------
function openSection(section){document.querySelectorAll('.section-content').forEach(s=>s.classList.add('hidden')); if(section==='health'){healthSection.classList.remove('hidden'); updateHealth(); updateFeed();}}

// ---------- لوحة الأدمن ----------
let isAdmin=false;
function openAdmin(){document.getElementById("adminPanel").style.display="flex";}
function closeAdmin(){document.getElementById("adminPanel").style.display="none";}
function loginAdmin(){const u=document.getElementById("adminUser").value; const p=document.getElementById("adminPass").value; if(u==="zazo" && p==="zazo010988"){isAdmin=true; document.getElementById("loginArea").classList.add("hidden"); document.getElementById("adminContent").classList.remove("hidden");} else alert("بيانات الدخول غير صحيحة 💔");}
async function generateAIContent(){if(!isAdmin)return alert("يجب تسجيل الدخول"); const section=document.getElementById("adminSection").value; try{ const res=await fetch("/api/ai/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({section})}); const data=await res.json(); document.getElementById("adminText").value=data.text||"💖 لم يصل رد من الخادم";}catch(e){alert("⚠️ تعذر الاتصال بالخادم");}}
async function addPost(){if(!isAdmin)return alert("يجب تسجيل الدخول"); const section=document.getElementById("adminSection").value; const txt=document.getElementById("adminText").value.trim(); if(!txt)return alert("أكتبي شيئًا 🌷"); await fetch("/api/add_post",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({section,content:txt})}); document.getElementById("adminText").value=""; alert("تمت إضافة المحتوى 💖");}
async function uploadVideo(){const file=document.getElementById('videoUpload').files[0]; if(!file){alert("اختر ملف الفيديو"); return;} const fd=new FormData(); fd.append('video',file); await fetch('/api/upload_video',{method:'POST',body:fd}); alert("تم رفع الفيديو 💖");}
async function uploadImage(){const file=document.getElementById('imageUpload').files[0]; if(!file){alert("اختر ملف الصورة"); return;} const fd=new FormData(); fd.append('image',file); await fetch('/api/upload_image',{method:'POST',body:fd}); alert("تم رفع الصورة 💖");}
function addType(type){document.getElementById('adminText').value=`[${type.toUpperCase()}] `;}
</script>

</body>
</html>
