// src/pages/api/ai_generate.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { section, prompt } = req.body || {};

    const systemMessage =
      "أنت مساعد متخصص في كتابة محتوى نسائي راقٍ ومهذب لتطبيق 'رِقّة'.";

    const userMessage =
      prompt && prompt.trim().length > 0
        ? prompt
        : `اكتبي محتوى مناسب لقسم (${section}).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
      max_tokens: 350
    });

    const text = response.choices?.[0]?.message?.content || "";

    res.status(200).json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "فشل الاتصال بخادم الذكاء الاصطناعي" });
  }
}
