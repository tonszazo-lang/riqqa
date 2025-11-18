export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // تحقق من بيانات الادمن (يمكن تعديلها حسب الحاجة)
    const ADMIN_USER = "zazo";
    const ADMIN_PASS = "zazo010988";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // إنشاء session أو token مؤقت (هنا مجرد مثال بسيط)
      res.status(200).json({ success: true, message: "تم تسجيل الدخول بنجاح" });
    } else {
      res.status(401).json({ success: false, message: "اسم المستخدم أو كلمة السر خاطئة" });
    }
  } else {
    res.status(405).json({ success: false, message: "الطريقة غير مسموح بها" });
  }
}
