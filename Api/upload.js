import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import fs from "fs";

// إعداد Cloudinary بالمفتاح الذي زودتني به
cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME", // استبدله باسم حسابك في Cloudinary
  api_key: "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",
  api_secret: "YOUR_CLOUDINARY_API_SECRET" // ضع السر الخاص بك من Cloudinary
});

// منع Vercel من التعامل مع الـ body تلقائيًا
export const config = {
  api: {
    bodyParser: false,
  },
};

// الدالة الرئيسية لرفع الملفات
export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      try {
        const file = files.file; // اسم الحقل من الفورم
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "riqqa_uploads",
        });

        res.status(200).json({
          message: "تم رفع الملف بنجاح",
          url: result.secure_url,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "حدث خطأ أثناء رفع الملف" });
      }
    });
  } else {
    res.status(405).json({ error: "الطريقة غير مسموح بها" });
  }
}
