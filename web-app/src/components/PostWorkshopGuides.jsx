import React, { useState } from 'react';
import { BookOpen, ExternalLink, CheckCircle2, Printer, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { PLATFORM_GUIDES } from '../data/initialData';

export default function PostWorkshopGuides() {
  const [selectedGuide, setSelectedGuide] = useState('orcid');

  const guides = [
    { id: 'orcid', name: 'منصة ORCID', color: 'border-[#a6ce39]' },
    { id: 'scholar', name: 'Google Scholar', color: 'border-[#4285f4]' },
    { id: 'researchgate', name: 'ResearchGate', color: 'border-[#00ccbb]' },
    { id: 'scopus', name: 'Scopus & Clarivate', color: 'border-[#e9711c]' }
  ];

  const currentGuide = PLATFORM_GUIDES[selectedGuide];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 05 | المراجع والأدلة
            </span>
            <span className="text-xs text-slate-300">موسوعة التطبيق المستمر</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            أدلة الاستخدام والتسجيل الفعلي لما بعد الورشة
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            خطوات عملية مصورة وروابط رسمية مباشرة لإعداد وإدارة حساباتك الحقيقية بدقة وربطها بجامعة طيبة.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shrink-0 no-print"
        >
          <Printer className="w-4 h-4 text-taibah-cyan" />
          <span>طباعة هذا الدليل</span>
        </button>
      </div>

      {/* Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-print">
        {guides.map(g => {
          const isActive = selectedGuide === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGuide(g.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border ${
                isActive
                  ? 'bg-white text-taibah-navy border-taibah-emerald shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
              }`}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      {/* Guide Content Display */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{currentGuide.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">خطوات التوثيق الرسمي وقواعد الحماية الأكاديمية</p>
          </div>

          <a
            href={currentGuide.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-taibah-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 self-start sm:self-center"
          >
            <span>الانتقال للمنصة الرسمية</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            قائمة التحقق الإلزامية خطوة بخطوة:
          </h3>
          <div className="space-y-2.5">
            {currentGuide.checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800">
                <span className="w-6 h-6 rounded-full bg-taibah-emerald/20 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed flex-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls / Warning */}
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-1 text-sm font-bold">الخطأ الأكثر شيوعاً الذي يجب تجنبه:</strong>
            <p className="leading-relaxed">{currentGuide.commonErrors}</p>
          </div>
        </div>

        {/* 30-Day Master Checklist Summary */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-800">خطة العمل الموصى بها للـ 30 يوماً القادمة:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-taibah-navy block">الأسبوع 1: التأسيس الرقمي</span>
              <p className="text-slate-600">إنشاء ORCID وتوثيق إيميل الجامعة في Scholar ودمج الأبحاث المكررة.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-emerald-800 block">الأسبوع 2: الأرشفة المفتوحة</span>
              <p className="text-slate-600">إيداع نسخ المؤلف المقبولة (AAM) في مستودع جامعة طيبة وموقع ResearchGate وفق سياسة Sherpa Romeo.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-blue-800 block">الأسبوع 3: تنشيط الورقة الذهبية</span>
              <p className="text-slate-600">صياغة ملخص تبسيطي بالذكاء الاصطناعي للورقة الأقرب لرفع معامل h ونشرها على LinkedIn.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-purple-800 block">الأسبوع 4: الشراكات الدولية</span>
              <p className="text-slate-600">تحديد باحثين دوليين في مجالك وإرسال أول خطاب استقطاب شراكة بحثية باسم جامعة طيبة.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
