# مطعم النخيل - منيو QR (MongoDB + Next.js)

هذا المشروع يوفر:
- عرض المنيو للعملاء فقط.
- واجهة ادمن لتعديل كل شيء (يتطلب ADMIN_PASS).
- محرر أسعار لتعديل الأسعار فقط (يتطلب PRICE_PASS).
- تخزين البيانات على MongoDB Atlas.

## متغيرات البيئة (Environment Variables)
- `MONGODB_URI` : رابط الاتصال بقاعدة MongoDB Atlas.
- `ADMIN_PASS` : كلمة مرور الأدمن.
- `PRICE_PASS` : كلمة مرور محرر الأسعار.

## خطوات النشر على Vercel
1. أنشئ قاعدة بيانات مجانية على [MongoDB Atlas](https://www.mongodb.com/atlas).
2. انسخ الـ Connection String وضعه في `MONGODB_URI` بمتغيرات البيئة.
3. ارفع هذا المشروع إلى GitHub.
4. أنشئ مشروع جديد في Vercel واختر المستودع.
5. أضف متغيرات البيئة (`MONGODB_URI`, `ADMIN_PASS`, `PRICE_PASS`).
6. اضغط Deploy.

## الواجهات
- `/` : واجهة العملاء.
- `/admin` : لوحة الأدمن.
- `/price-editor` : محرر الأسعار.

تم تحسين التصميم بألوان: أخضر نخيل (#2ecc71) وذهبي فاتح (#f1c40f).
