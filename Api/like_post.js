// api/like_post.js
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data/posts.json");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { id } = req.body;

  if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: "لا توجد بيانات" });

  const posts = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  let found = false;

  Object.keys(posts).forEach(section => {
    posts[section].forEach(post => {
      if (post.content === id) { // نستخدم المحتوى كمعرف مؤقت
        post.likes = (post.likes || 0) + 1;
        found = true;
      }
    });
  });

  if (!found) return res.status(404).json({ error: "المنشور غير موجود" });

  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.status(200).json({ likes: posts });
}
