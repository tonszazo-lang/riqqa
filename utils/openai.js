/**
 * utils/openai.js
 * 
 * أداة مساعدة للتواصل مع OpenAI API
 * يمكن استخدامها داخل أي API Route في Next.js
 */

import OpenAI from "openai";

// استخدم متغير البيئة لحماية مفتاح API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * دالة لتوليد نصوص باستخدام نموذج OpenAI
 * @param {string} prompt - النص المطلوب استكماله أو الرد عليه
 * @param {number} maxTokens - الحد الأقصى لعدد الرموز الناتجة
 * @returns {Promise<string>} - النص الناتج من OpenAI
 */
export async function generateText(prompt, maxTokens = 150) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // يمكنك تغييره حسب احتياجك
      messages: [
        { role: "system", content: "أنت مساعد ذكي للنساء." },
        { role: "user", content: prompt }
      ],
      max_tokens: maxTokens
    });

    // استخراج النص الناتج
    const text = response.choices[0].message.content;
    return text;

  } catch (error) {
    console.error("خطأ في استدعاء OpenAI:", error);
    return "حدث خطأ أثناء توليد المحتوى.";
  }
}
