// api/add_comment.js
import fs from "fs";
import path from "path";

const COMMENTS_FILE = path.join(process.cwd(), "data/comments.json");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { id, comment } = req.body;

  let comments = {};
  if (fs.existsSync(COMMENTS_FILE)) comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8"));

  if (!comments[id]) comments[id] = [];
  comments[id].push(comment);

  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
  res.status(200).json({ success: true });
}
