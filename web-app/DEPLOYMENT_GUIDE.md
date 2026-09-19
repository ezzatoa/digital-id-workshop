# دليل الاستضافة والنشر على خادم VPS
## ورشة الهوية الرقمية الأكاديمية والحضور البحثي العالمي
**تقديم: د. عزت عمر عبدالله أبوعزه**  
*أستاذ مساعد - قسم تقنية الأشعة - كلية العلوم الطبية التطبيقية - جامعة طيبة*

---

يسهل هذا الدليل عملية رفع واستضافة تطبيق الويب التفاعلي على خادم الـ VPS الخاص بك بأكثر من طريقة (Docker أو PM2 أو Nginx)، مع تأمين مفتاح الذكاء الاصطناعي وتوفير شهادة أمان SSL مجانية.

---

### 1. المتطلبات الأساسية على الـ VPS
- خادم VPS يعمل بنظام **Ubuntu** (20.04 أو 22.04 أو 24.04) أو **Debian**.
- اتصال SSH بالخادم بصلاحيات `root` أو `sudo`.
- عنوان IP عام (Public IP)، أو دومين مخصص (مثال: `workshop.yourdomain.com`).

---

### 2. رفع ملفات المشروع إلى السيرفر
يمكنك ضغط مجلد `web-app` ورفعه إلى السيرفر عبر `scp` أو `rsync`:

```bash
# من جهازك المحلي:
scp -r d:/G/projects/workshops/digital-identity-workshop-antigravity/web-app user@YOUR_VPS_IP:/home/user/workshop-app
```

أو الدخول إلى مجلد المشروع على السيرفر:
```bash
cd /home/user/workshop-app
```

---

### 3. إعداد مفتاح Google AI Studio API (.env)
انسخ ملف الإعدادات وقم بتعديله لإدخال مفتاح Gemini Flash الخاص بك:
```bash
cp .env.example .env
nano .env
```
ضع مفتاحك داخل الملف:
```env
PORT=3001
GEMINI_API_KEY=AIzaSyYourActualKeyHere
GEMINI_MODEL=gemini-3.8-flash
```
> **ملاحظة أمان وهامة:** بوضع المفتاح هنا على خادمك في `.env`، يصبح متاحاً لجميع المتدربين داخل الورشة تلقائياً دون أن يظهر المفتاح للمتدربين إطلاقاً ودون الحاجة لمطالبتهم بإنشاء مفاتيح خاصة بهم!

---

### 4. خيارات التشغيل والاستضافة

#### الخيار الأول: التشغيل السريع عبر Docker (الموصى به - أمر واحد)
إذا كان خادمك يحتوي على Docker و Docker Compose:
```bash
# تشغيل التطبيق بالخلفية
docker compose up -d --build
```
- سيعمل التطبيق مباشرة على المنفذ `3001`.
- لمشاهدة سجل التشغيل: `docker compose logs -f`
- لإيقاف التطبيق: `docker compose down`

---

#### الخيار الثاني: التشغيل بواسطة Node.js و PM2
إذا كنت تفضل التشغيل المباشر عبر Node.js:
```bash
# 1. تثبيت الحزم وبناء الواجهة
npm install
npm run build

# 2. تثبيت مدير العمليات PM2 (إذا لم يكن مثبتاً)
sudo npm install -g pm2

# 3. تشغيل الخادم
pm2 start server.js --name "taibah-workshop"

# 4. حفظ الحالة ليعمل تلقائياً عند إعادة تشغيل السيرفر
pm2 save
pm2 startup
```

---

### 5. ضبط خادم Nginx وعنوان الدومين وشهادة SSL (اختياري واحترافي)
إذا كنت تريد ربط التطبيق بدومين (مثل `workshop.taibahu.org`) مع شهادة SSL خضراء (HTTPS):

1. **تثبيت Nginx:**
```bash
sudo apt update
sudo apt install nginx -y
```

2. **إنشاء ملف إعدادات الموقع:**
```bash
sudo nano /etc/nginx/sites-available/workshop
```
أضف المحتوى التالي (مع استبدال `workshop.yourdomain.com` برابطك أو بالـ IP):
```nginx
server {
    listen 80;
    server_name workshop.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

3. **تفعيل الموقع وإعادة تشغيل Nginx:**
```bash
sudo ln -s /etc/nginx/sites-available/workshop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **إصدار شهادة SSL مجانية عبر Certbot (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d workshop.yourdomain.com
```

مبروك! أصبح التطبيق يعمل بأمان تام على: `https://workshop.yourdomain.com`

---

### 6. التحقق من عمل التطبيق
افتح المتصفح وتوجه إلى عنوان خادمك، وتأكد من:
1. ظهور هوية جامعة طيبة واسم المحاضر (د. عزت عمر عبدالله أبوعزه).
2. تشغيل المؤقت (90 دقيقة).
3. تجربة إحدى المحاكيات وحصد الشارة.
4. تجربة توليد مخرج عبر مختبر الذكاء الاصطناعي المقيد.
