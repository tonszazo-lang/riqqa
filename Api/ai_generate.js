// api/ai/generate.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // ضع مفتاحك في Vercel Environment Variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { section } = req.body;
  if (!section) return res.status(400).json({ error: "يجب تحديد القسم" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "أنت كاتبة محتوى لموقع نسائي." },
        { role: "user", content: `اكتب محتوى مميز لقسم ${section}` }
      ]
    });
    const text = response.choices[0].message.content;
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "فشل جلب المحتوى من AI" });
  }
}
