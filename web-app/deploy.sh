#!/bin/bash
# سكريبت النشر والتشغيل التلقائي على خادم VPS
# ورشة الهوية الرقمية الأكاديمية - جامعة طيبة
# تقديم: د. عزت عمر عبدالله أبوعزه

echo "=========================================================="
echo "  بدء نشر تطبيق ورشة الهوية الرقمية الأكاديمية لجامعة طيبة"
echo "  تقديم: د. عزت عمر عبدالله أبوعزه"
echo "=========================================================="

# التأكد من وجود ملف .env
if [ ! -f .env ]; then
    echo "ملف .env غير موجود، سيتم إنشاؤه من .env.example..."
    cp .env.example .env
    echo "يرجى تعديل .env وإضافة مفتاح GEMINI_API_KEY إذا رغبت."
fi

# فحص ما إذا كان Docker مثبتاً
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    echo "تم العثور على Docker! سيتم التشغيل بواسطة Docker Compose..."
    docker compose down 2>/dev/null || true
    docker compose up -d --build
    echo "تم التشغيل بنجاح عبر Docker على المنفذ 3001!"
    echo "يمكنك زيارة التطبيق على: http://YOUR_VPS_IP:3001"
else
    echo "Docker غير مثبت، سيتم التشغيل بواسطة Node.js و PM2..."
    npm install
    npm run build

    if command -v pm2 &> /dev/null; then
        pm2 restart digital-identity-workshop 2>/dev/null || pm2 start server.js --name digital-identity-workshop
        pm2 save
        echo "تم التشغيل بنجاح عبر PM2 على المنفذ 3001!"
    else
        echo "تشغيل مباشر عبر Node.js في الخلفية..."
        nohup node server.js > app.log 2>&1 &
        echo "تم التشغيل بالخلفية وسجل العمليات في app.log"
    fi
fi

echo "=========================================================="
echo "  اكتمل النشر بنجاح! تمنياتنا بورشة عمل مميزة ومثمرة."
echo "=========================================================="
