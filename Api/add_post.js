// api/add_post.js
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data/posts.json");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { section, content } = req.body;
  if (!section || !content) return res.status(400).json({ error: "البيانات ناقصة" });

  let posts = {};
  if (fs.existsSync(DATA_FILE)) posts = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  if (!posts[section]) posts[section] = [];
  posts[section].push({ content, date: new Date().toISOString(), likes: 0 });

  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.status(200).json({ success: true });
}
