// استدعاء مكتبة OpenAI
import OpenAI from "openai";

// إعداد المفتاح من متغير البيئة
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// الدالة الرئيسية لمعالجة الطلبات
export default async function handler(req, res) {
  // السماح فقط بطلب POST
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "يجب إرسال prompt" });
    }

    try {
      // استدعاء API الخاص بـ OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      });

      // إرسال النتيجة للواجهة
      res.status(200).json({
        result: response.choices[0].message.content
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "حدث خطأ في معالجة الطلب" });
    }
  } else {
    // إذا لم يكن POST
    res.status(405).json({ error: "الطريقة غير مسموح بها" });
  }
}
