// api/comments/[id].js
import fs from "fs";
import path from "path";

const COMMENTS_FILE = path.join(process.cwd(), "data/comments.json");

export default function handler(req, res) {
  const { id } = req.query;
  if (!fs.existsSync(COMMENTS_FILE)) return res.status(200).send("");

  const comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8"));
  res.status(200).send((comments[id] || []).map(c => `<div class="comment">${c}</div>`).join(""));
}
