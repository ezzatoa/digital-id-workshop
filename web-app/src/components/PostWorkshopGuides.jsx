import React, { useState } from 'react';
import { 
  BookOpen, ExternalLink, CheckCircle2, Printer, AlertTriangle, 
  ShieldCheck, HelpCircle, Presentation, Maximize2, Download, 
  Layers, MonitorPlay, Sparkles 
} from 'lucide-react';
import { PLATFORM_GUIDES, WORKSHOP_PRESENTATION, PRESENTER_INFO } from '../data/initialData';

export default function PostWorkshopGuides() {
  const [selectedGuide, setSelectedGuide] = useState('presentation');

  const guides = [
    { id: 'presentation', name: 'العرض التقديمي (Google Slides) 📑', isSpecial: true },
    { id: 'orcid', name: 'منصة ORCID' },
    { id: 'scholar', name: 'Google Scholar' },
    { id: 'researchgate', name: 'ResearchGate' },
    { id: 'scopus', name: 'Scopus & Clarivate' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const isPresentation = selectedGuide === 'presentation';
  const currentGuide = !isPresentation ? PLATFORM_GUIDES[selectedGuide] : null;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 05 | المراجع والأدلة
            </span>
            <span className="text-xs text-slate-300">موسوعة التطبيق المستمر والشرائح الرسمية</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            أدلة الاستخدام والشرائح التقديمية المعتمدة
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            المرجع الكامل لورشة العمل: شرائح Google Slides التفاعلية (40 شريحة)، بالإضافة لخطوات التوثيق والحماية الأكاديمية.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
          >
            <Printer className="w-4 h-4 text-taibah-cyan" />
            <span>طباعة الصفحة</span>
          </button>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-print">
        {guides.map(g => {
          const isActive = selectedGuide === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGuide(g.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition border cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? g.isSpecial 
                    ? 'bg-taibah-emerald text-white border-taibah-emerald shadow-md'
                    : 'bg-white text-taibah-navy border-taibah-emerald shadow-sm'
                  : g.isSpecial
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
              }`}
            >
              {g.isSpecial && <Presentation className="w-4 h-4" />}
              <span>{g.name}</span>
            </button>
          );
        })}
      </div>

      {/* View 1: Google Presentation Embedded Viewer */}
      {isPresentation ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Presentation Header & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md">
                  Google Slides الرسمية
                </span>
                <span className="text-xs text-slate-500">40 شريحة تدريبية متكاملة</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{WORKSHOP_PRESENTATION.title}</h2>
              <p className="text-xs text-slate-600 mt-1">
                إعداد وتقديم: <strong className="text-taibah-navy">{PRESENTER_INFO.name}</strong> ({PRESENTER_INFO.title} - {PRESENTER_INFO.college})
              </p>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 no-print">
              <a
                href={WORKSHOP_PRESENTATION.presentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-taibah-emerald hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                title="عرض تقديمي كامل بملء الشاشة"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>عرض بملء الشاشة</span>
              </a>

              <a
                href={WORKSHOP_PRESENTATION.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                title="فتح العرض في تطبيق Google Slides"
              >
                <ExternalLink className="w-3.5 h-3.5 text-taibah-cyan" />
                <span>فتح في Google Slides</span>
              </a>

              <a
                href={WORKSHOP_PRESENTATION.pdfExportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                title="تحميل نسخة PDF جاهزة للطباعة"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل PDF</span>
              </a>

              <a
                href={WORKSHOP_PRESENTATION.pptxExportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                title="تحميل نسخة PowerPoint (.pptx)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل PPTX</span>
              </a>
            </div>
          </div>

          {/* Interactive Responsive Iframe Container */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-slate-950 aspect-[16/9] min-h-[380px] sm:min-h-[480px] md:min-h-[540px]">
            <iframe
              src={WORKSHOP_PRESENTATION.embedUrl}
              title="Google Slides Presentation Embed"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={true}
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              loading="lazy"
            ></iframe>
          </div>

          {/* Presentation Highlights Breakdown */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-taibah-emerald" />
              محتويات ومحاور شرائح الورشة (40 شريحة):
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-taibah-navy block">1. المدخل والتشخيص الرقمي</span>
                <p className="text-slate-600">مفهوم الهوية الرقمية الأكاديمية، أزمة تشابه الأسماء، والنتائج الكارثية لتشتت الحسابات في التصنيفات العالمية.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800 block">2. منظومة المعرفات (ORCID & Scholar)</span>
                <p className="text-slate-600">خطوات ضبط ORCID الإلزامي وربطه بـ Crossref، وتوثيق البريد الجامعي الرسمي لجامعة طيبة في Scholar.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-blue-800 block">3. منصات التواصل والوصول المفتوح</span>
                <p className="text-slate-600">قواعد ResearchGate وسياسات مجلات الاشتراك عبر Sherpa Romeo وتجنب انتهاك حقوق النشر (Green OA).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-amber-800 block">4. مؤشرات الأثر ومعامل هيرش (h-index)</span>
                <p className="text-slate-600">معادلة حساب h-index، مفهوم الورقة الذهبية الفاصلة، ومؤشر الاقتباس الميداني المعياري (FWCI).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-purple-800 block">5. تطبيقات الذكاء الاصطناعي المنضبط</span>
                <p className="text-slate-600">صياغة الملخصات التبسيطية للجمهور، واقتراح الكلمات المفتاحية الذكية، وصياغة خطابات التعاون الدولي.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">6. خارطة طريق الـ 30 يوماً</span>
                <p className="text-slate-600">جدول تنفيذي أسبوعي منظم لتحويل المعرفة المكتسبة إلى حضور بحثي عالمي دائم وموثق باسم جامعة طيبة.</p>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1 text-sm font-bold">إمكانية التصفح دون اتصال أو حفظ كمرجع:</strong>
              <p className="leading-relaxed">
                يمكنك تحميل كامل محتوى الشرائح بصيغة PDF أو PowerPoint عبر أزرار التحميل أعلاه للاحتفاظ بها أو تدوين ملاحظاتك الشخصية عليها.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* View 2: Platform Guides (ORCID, Scholar, ResearchGate, Scopus) */
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
      )}
    </div>
  );
}
