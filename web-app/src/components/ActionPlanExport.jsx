import React, { useState } from 'react';
import { Award, Printer, CheckCircle2, FileText, Download, User, Building, BookOpen } from 'lucide-react';
import { PRESENTER_INFO } from '../data/initialData';

export default function ActionPlanExport({ 
  maturityScore, 
  maturityTier, 
  badges, 
  savedAiOutputs 
}) {
  const [traineeName, setTraineeName] = useState('');
  const [department, setDepartment] = useState('كلية العلوم الطبية التطبيقية');
  const [rank, setRank] = useState('أستاذ مساعد');

  const handlePrint = () => {
    window.print();
  };

  const completedBadgesCount = Object.values(badges).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Action Header */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 06 | التوثيق والختام
            </span>
            <span className="text-xs text-slate-300">الزمن المقترح: 5 دقائق</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            إصدار وثيقة خطة العمل الشخصية والشهادة التفاعلية
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            وثيقة تنفيذية مخصصة تجمع نتائج تقييمك وشارات إنجازك للمحاكيات ومخرجات الذكاء الاصطناعي.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-taibah-emerald hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center gap-2 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة / حفظ التقرير PDF</span>
        </button>
      </div>

      {/* Trainee Details Input (Hidden in print) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 no-print">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">بيانات المتدرب للظهور في الوثيقة الرسمية:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">الاسم الثلاثي لعضو هيئة التدريس</label>
            <input
              type="text"
              placeholder="اكتب اسمك الكريم هنا..."
              value={traineeName}
              onChange={(e) => setTraineeName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-taibah-emerald outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">الرتبة الأكاديمية</label>
            <input
              type="text"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-taibah-emerald outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">القسم والكلية بجامعة طيبة</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-taibah-emerald outline-none"
            />
          </div>
        </div>
      </div>

      {/* Printable Document Area */}
      <div className="bg-white rounded-3xl border border-slate-300 shadow-xl p-8 sm:p-12 space-y-8 text-slate-900 printable-document">
        {/* Document University Letterhead */}
        <div className="flex items-center justify-between border-b-2 border-taibah-emerald/40 pb-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-taibah-navy">المملكة العربية السعودية</h2>
            <h3 className="text-lg font-bold text-taibah-navy">جامعة طيبة - المدينة المنورة</h3>
            <p className="text-xs text-slate-500">عمادة التطوير والجودة | الخطة التدريبية للعام الجامعي 1448هـ</p>
          </div>
          <div className="text-left space-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-taibah-navy to-taibah-emerald text-white font-bold text-2xl flex items-center justify-center shadow-md ml-auto">
              ط
            </div>
            <span className="text-[11px] text-slate-400 block">برنامج التدريب رقم 04</span>
          </div>
        </div>

        {/* Title & Beneficiary */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-taibah-emerald/10 text-taibah-emerald border border-taibah-emerald/30 inline-block">
            وثيقة خطة العمل الفردية وخارطة الحضور الأكاديمي العالمي
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-taibah-navy">
            {PRESENTER_INFO.workshopTitle}
          </h1>
          <p className="text-sm text-slate-600">
            تُمنح هذه الوثيقة لعضو هيئة التدريس: <span className="font-bold text-taibah-navy underline decoration-taibah-emerald underline-offset-4">{traineeName || '...................................................'}</span>
          </p>
          <p className="text-xs text-slate-500">
            {rank} • {department} • جامعة طيبة
          </p>
        </div>

        {/* Diagnostic Score & Badges Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">1. نتيجة مقياس النضج الرقمي الأولي:</h4>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black font-mono text-taibah-navy">{maturityScore || 70}%</span>
              <div>
                <span className="text-xs font-bold text-emerald-700 block">{maturityTier || 'باحث متميز ومكتمل الحضور'}</span>
                <span className="text-[11px] text-slate-500">مبني على فحص معايير التوثيق بالبريد وحماية الاستشهادات</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">2. شارات إنجاز المحاكيات المعتمدة:</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
              <div className={`p-2 rounded-lg border ${badges.orcid ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                ORCID
              </div>
              <div className={`p-2 rounded-lg border ${badges.scholar ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                Scholar
              </div>
              <div className={`p-2 rounded-lg border ${badges.rg ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                RG
              </div>
              <div className={`p-2 rounded-lg border ${badges.scopus ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                Scopus
              </div>
            </div>
          </div>
        </div>

        {/* 30-Day Action Roadmap */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-taibah-emerald" />
            خطة العمل المعتمدة للـ 30 يوماً القادمة (Action Plan Checklist):
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-taibah-navy block">الأسبوع 1: التأسيس والتوثيق</span>
              <ul className="space-y-1 text-slate-600">
                <li>[ ] تسجيل ORCID بانتساب Taibah University وضبطه عاماً (Everyone).</li>
                <li>[ ] التحقق من إيميل @taibahu.edu.sa في Scholar ودمج الأبحاث المكررة.</li>
              </ul>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-800 block">الأسبوع 2: الأرشفة الخضراء</span>
              <ul className="space-y-1 text-slate-600">
                <li>[ ] فحص سياسة المجلة عبر Sherpa Romeo.</li>
                <li>[ ] إيداع مسودة المؤلف المقبولة (AAM) في مستودع جامعة طيبة الرقمي.</li>
              </ul>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-blue-800 block">الأسبوع 3: تعزيز معامل h-index</span>
              <ul className="space-y-1 text-slate-600">
                <li>[ ] تحديد "الورقة الذهبية" التي يفصلها استشهاد واحد عن رفع المعامل.</li>
                <li>[ ] نشر ملخص تبسيطي لها على LinkedIn ووسائل التواصل العلمي.</li>
              </ul>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-purple-800 block">الأسبوع 4: التعاون الدولي</span>
              <ul className="space-y-1 text-slate-600">
                <li>[ ] صياغة وإرسال أول خطاب استقطاب شراكة بحثية دولية.</li>
                <li>[ ] التحقق من معالجة أي طلبات دمج منقسمة في Scopus.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Saved AI Studio Outputs if any */}
        {savedAiOutputs && savedAiOutputs.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
              مخرجات مختبر الذكاء الاصطناعي المحفوظة:
            </h3>
            <div className="space-y-2.5">
              {savedAiOutputs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-taibah-emerald block">{item.templateName}:</span>
                  <p className="text-slate-700 whitespace-pre-wrap line-clamp-4">{item.output}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Workshop Verification & Signatures */}
        <div className="pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-700 block">مقدم ومصمم ورشة العمل:</span>
            <p className="text-sm font-black text-taibah-navy">{PRESENTER_INFO.name}</p>
            <p className="text-[11px] text-slate-500">{PRESENTER_INFO.title} - {PRESENTER_INFO.college}</p>
            <p className="text-[10px] text-slate-400">جامعة طيبة - المدينة المنورة</p>
          </div>

          <div className="text-center space-y-1">
            <div className="w-20 h-20 border-2 border-dashed border-taibah-emerald rounded-full flex items-center justify-center text-taibah-emerald font-bold text-xs mx-auto">
              ختم الإنجاز المعتمد
            </div>
            <span className="text-[10px] text-slate-400 block">1448هـ / 2026م</span>
          </div>
        </div>
      </div>
    </div>
  );
}
