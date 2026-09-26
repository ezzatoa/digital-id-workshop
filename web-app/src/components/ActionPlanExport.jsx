import React, { useState } from 'react';
import { 
  Printer, CheckCircle2, FileText, Download, User, Building, 
  BookOpen, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, 
  Target, Calendar, CheckSquare, Lightbulb, Compass, Share2
} from 'lucide-react';
import { PRESENTER_INFO } from '../data/initialData';
import logoImg from '../assets/logo.png';

export default function ActionPlanExport({ 
  maturityScore = 0, 
  maturityTier = '', 
  maturityAnswers = {},
  badges = {}, 
  savedAiOutputs = [] 
}) {
  const [traineeName, setTraineeName] = useState('');
  const [department, setDepartment] = useState('جامعة طيبة');
  const [rank, setRank] = useState('عضو هيئة تدريس / باحث');

  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const completedBadgesCount = Object.values(badges).filter(Boolean).length;

  // --- Dynamic Tailored Recommendations Engine ---
  const generatePersonalizedRecommendations = () => {
    const recs = [];

    // 1. Foundational / ORCID Recommendation
    if (!badges.orcid || maturityAnswers[1] === false || maturityAnswers[2] === false) {
      recs.push({
        id: 'rec_orcid',
        priority: 'عاجل • أولوية قصوى',
        priorityColor: 'bg-red-100 text-red-800 border-red-200',
        category: 'ORCID والتأسيس الرقمي',
        icon: '🆔',
        title: 'توثيق وضبط معرف ORCID المؤسسي',
        description: 'بناءً على نتائجك، تحتاج لربط معرف ORCID بانتساب جامعة طيبة وضبط خصوصيته على "Everyone"، وتفعيل إذن المزامنة التلقائية مع Crossref لتحديث أبحاثك فور صدورها.'
      });
    } else {
      recs.push({
        id: 'rec_orcid_adv',
        priority: 'استباقي مستمر',
        priorityColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        category: 'ORCID والتكامل المؤسسي',
        icon: '✅',
        title: 'تعظيم مزامنة ORCID الآلية',
        description: 'معرفك مضبوط بنجاح؛ احرص على تزويد دور النشر بالمعرف أثناء إرسال المخطوطات البحثية (Submission) لتفادي أي إدخال يدوي مستقبلاً.'
      });
    }

    // 2. Google Scholar & Email Verification
    if (!badges.scholar || maturityAnswers[3] === false || maturityAnswers[4] === false) {
      recs.push({
        id: 'rec_scholar',
        priority: 'عاجل • أولوية قصوى',
        priorityColor: 'bg-red-100 text-red-800 border-red-200',
        category: 'Google Scholar والاستشهادات',
        icon: '🎓',
        title: 'تأكيد البريد الجامعي الرسمي وتنظيف الملف',
        description: 'احرص فوراً على تفعيل رابط التحقق عبر بريدك الجامعي (@taibahu.edu.sa)، وجعل الملف عاماً (Public)، واستبعاد أي أوراق مكررة أو دخيلة تضلل مؤشراتك.'
      });
    } else {
      recs.push({
        id: 'rec_scholar_adv',
        priority: 'موصى به شهرياً',
        priorityColor: 'bg-blue-100 text-blue-800 border-blue-200',
        category: 'Google Scholar ومؤشر h-index',
        icon: '📈',
        title: 'متابعة تنبيهات الاستشهاد واستبعاد الدخيل',
        description: 'فعل خاصية التنبيهات لاكتشاف الاستشهادات الجديدة فورياً، وقم بدمج النسخ الأولية المطبوعة (Preprints) مع النسخة النهائية للمجلة.'
      });
    }

    // 3. Scopus Split Profile & Citations Consolidation
    if (!badges.scopus || maturityAnswers[5] === false || maturityAnswers[6] === false) {
      recs.push({
        id: 'rec_scopus',
        priority: 'أولوية هامة',
        priorityColor: 'bg-amber-100 text-amber-800 border-amber-200',
        category: 'Scopus & Web of Science',
        icon: '🔍',
        title: 'دمج الملفات المنقسمة (Merge Split Profiles)',
        description: 'انقسام ملفك في Scopus يشتت استشهاداتك ويخفض معامل h-index؛ استخدم أداة Scopus Author Feedback Wizard لتوحيد أبحاثك تحت معرف واحد وربطه بـ ORCID.'
      });
    }

    // 4. ResearchGate & Green Open Access (Sherpa Romeo)
    if (!badges.rg || maturityAnswers[8] === false) {
      recs.push({
        id: 'rec_rg_oa',
        priority: 'قانوني وأكاديمي هام',
        priorityColor: 'bg-amber-100 text-amber-800 border-amber-200',
        category: 'الأرشفة الخضراء وحقوق النشر',
        icon: '⚖️',
        title: 'الالتزام بسياسات Sherpa Romeo والأرشفة الذكية',
        description: 'لا تشارك النسخة النهائية للناشر (Publisher PDF) علناً إذا كانت المجلة باشتراك؛ بل شارك "نسخة المؤلف المقبولة" (AAM) وأودعها في مستودع جامعة طيبة الرقمي.'
      });
    }

    // 5. Tier-based Strategic Direction
    if (maturityScore < 50) {
      recs.push({
        id: 'rec_tier_low',
        priority: 'خطة انطلاق',
        priorityColor: 'bg-purple-100 text-purple-800 border-purple-200',
        category: 'استراتيجية الحضور الرقمي',
        icon: '🚀',
        title: 'التركيز على اكتمال الأساسيات خلال أسبوعين',
        description: 'مستوى نضج حضورك الرقمي في مرحلة التأسيس. خصص 30 دقيقة هذا الأسبوع لإنهاء خطة الأسبوع الأول فقط (ORCID + Scholar + البريد الجامعي).'
      });
    } else if (maturityScore < 80) {
      recs.push({
        id: 'rec_tier_mid',
        priority: 'خطة توسع ونمو',
        priorityColor: 'bg-purple-100 text-purple-800 border-purple-200',
        category: 'استراتيجية تعظيم الأثر',
        icon: '⚡',
        title: 'استهداف "الورقة الذهبية" لرفع معامل هيرش',
        description: 'حضورك الرقمي جيد وواعد؛ استخدم حاسبة معامل هيرش لتحديد الورقة التي ينقصها استشهاد واحد لرفع h-index القادم وركز جهود الترويج الأكاديمي عليها.'
      });
    } else {
      recs.push({
        id: 'rec_tier_high',
        priority: 'خطة قيادة دولية',
        priorityColor: 'bg-purple-100 text-purple-800 border-purple-200',
        category: 'الريادة والشراكات العالمية',
        icon: '🌐',
        title: 'تفعيل خطابات استقطاب الشراكات الدولية ونشر البيانات',
        description: 'نضج حضورك الرقمي في مستوى متقدم ومتميز؛ ركز الآن على صياغة خطابات شراكات دولية لمشاريع Q1 وإيداع مجموعات البيانات (Open Data) لرفع مؤشر Altmetric.'
      });
    }

    return recs;
  };

  const recommendations = generatePersonalizedRecommendations();

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Top Banner (Hidden in print) */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 06 | التوثيق والختام
            </span>
            <span className="text-xs text-slate-300">الزمن المقترح: 5 دقائق</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            خطة العمل الأكاديمية والتوصيات الفردية
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            خطة تنفيذية وتوصيات إرشادية مخصصة تم توليدها خصيصاً بناءً على إجاباتك في مقياس النضج وإنجاز المحاكيات في الورشة.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-taibah-emerald hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة / حفظ خطة العمل PDF</span>
        </button>
      </div>

      {/* Trainee Details Input (Hidden in print) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 no-print">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <User className="w-4 h-4 text-taibah-emerald" />
          بيانات الباحث للظهور في وثيقة خطة العمل المطبوعة:
        </h3>
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
            <p className="text-xs text-slate-500">عمادة التطوير والجودة | برنامج التدريب الأكاديمي (البرنامج رقم 04)</p>
          </div>
          <div className="text-left space-y-1">
            <img 
              src={logoImg} 
              alt="شعار ورشة الهوية الرقمية الأكاديمية" 
              className="w-16 h-16 rounded-2xl object-contain ml-auto drop-shadow-md border border-slate-100 p-1 bg-white"
            />
            <span className="text-[11px] text-slate-400 block font-mono">1448هـ / 2026م</span>
          </div>
        </div>

        {/* Title & Beneficiary */}
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-taibah-emerald/10 text-taibah-emerald border border-taibah-emerald/30 inline-block">
            وثيقة خطة العمل الفردية وخارطة الحضور الأكاديمي
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-taibah-navy">
            {PRESENTER_INFO.workshopTitle}
          </h1>
          <p className="text-sm text-slate-700">
            أُعدت هذه الخطة لعضو هيئة التدريس: <span className="font-bold text-taibah-navy underline decoration-taibah-emerald underline-offset-4">{traineeName || '...................................................'}</span>
          </p>
          <p className="text-xs text-slate-500">
            {rank} • {department} • جامعة طيبة
          </p>
        </div>

        {/* Diagnostic Score & Badges Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Score Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">1. نتيجة النضج الرقمي:</h4>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-mono text-taibah-navy">{maturityScore || 70}%</span>
              <div>
                <span className="text-xs font-bold text-emerald-700 block">{maturityTier || 'مستوى متقدم ومكتمل'}</span>
                <span className="text-[10px] text-slate-500">مبني على 10 معايير توثيق</span>
              </div>
            </div>
          </div>

          {/* Badges Status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">2. إنجاز المحاكيات ({completedBadgesCount}/4):</h4>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] font-bold">
              <div className={`p-1.5 rounded-lg border ${badges.orcid ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                ORCID
              </div>
              <div className={`p-1.5 rounded-lg border ${badges.scholar ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                Scholar
              </div>
              <div className={`p-1.5 rounded-lg border ${badges.rg ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                RG
              </div>
              <div className={`p-1.5 rounded-lg border ${badges.scopus ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-400'}`}>
                Scopus
              </div>
            </div>
          </div>

          {/* AI Outputs Count */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">3. مخرجات الذكاء الاصطناعي:</h4>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-mono text-taibah-emerald">{savedAiOutputs.length}</span>
              <div>
                <span className="text-xs font-bold text-slate-700 block">أصول بحثية مولدة</span>
                <span className="text-[10px] text-slate-500">عناوين / ملخصات / خطط</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tailored Recommendations Matrix (Based on Progress Results) */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-base font-bold text-taibah-navy flex items-center gap-2">
              <Compass className="w-5 h-5 text-taibah-emerald" />
              مصفوفة التوصيات الأكاديمية الفردية (Tailored Recommendations):
            </h3>
            <span className="text-xs text-slate-500">مخصصة وفق ثغرات التقييم وإنجاز المحاكيات</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-taibah-emerald/40 transition space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{rec.icon}</span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{rec.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${rec.priorityColor}`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pr-7">
                  {rec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Action Roadmap with Checkboxes */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-base font-bold text-taibah-navy flex items-center gap-2">
              <Calendar className="w-5 h-5 text-taibah-emerald" />
              خطة التنفيذ للـ 30 يوماً القادمة (Action Plan Checklist):
            </h3>
            <span className="text-xs text-slate-400 no-print">انقر لتحديد المهام المنجزة</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Week 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-taibah-navy flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-taibah-navy text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  الأسبوع 1: التأسيس والتوثيق الرسمي
                </span>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700">الأيام 1 - 7</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li 
                  onClick={() => toggleTask('t1_1')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t1_1']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t1_1'] ? 'line-through text-slate-400' : ''}>
                    تسجيل معرّف ORCID بانتساب Taibah University وضبط الرؤية على "Everyone".
                  </span>
                </li>
                <li 
                  onClick={() => toggleTask('t1_2')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t1_2']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t1_2'] ? 'line-through text-slate-400' : ''}>
                    تأكيد إيميل @taibahu.edu.sa في Google Scholar وفحص دمج النسخ المكررة.
                  </span>
                </li>
              </ul>
            </div>

            {/* Week 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  الأسبوع 2: الأرشفة الخضراء والمستودع
                </span>
                <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">الأيام 8 - 14</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li 
                  onClick={() => toggleTask('t2_1')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t2_1']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t2_1'] ? 'line-through text-slate-400' : ''}>
                    فحص رخصة المجلة عبر Sherpa Romeo لمعرفة فترة الحظر وشروط نسخة AAM.
                  </span>
                </li>
                <li 
                  onClick={() => toggleTask('t2_2')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t2_2']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t2_2'] ? 'line-through text-slate-400' : ''}>
                    إيداع مسودة المؤلف المقبولة (AAM) في مستودع جامعة طيبة الرقمي المؤسسي.
                  </span>
                </li>
              </ul>
            </div>

            {/* Week 3 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-700 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  الأسبوع 3: استهداف الورقة الذهبية (h-index)
                </span>
                <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded text-blue-800">الأيام 15 - 21</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li 
                  onClick={() => toggleTask('t3_1')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t3_1']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t3_1'] ? 'line-through text-slate-400' : ''}>
                    تحديد "الورقة الذهبية" في Scopus/Scholar التي يفصلها استشهاد واحد لرفع المعامل.
                  </span>
                </li>
                <li 
                  onClick={() => toggleTask('t3_2')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t3_2']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t3_2'] ? 'line-through text-slate-400' : ''}>
                    نشر ملخص تبسيطي احترافي (Lay Summary) على LinkedIn و ResearchGate.
                  </span>
                </li>
              </ul>
            </div>

            {/* Week 4 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-700 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                  الأسبوع 4: الشراكات الدولية والتقييم
                </span>
                <span className="text-[10px] bg-purple-100 px-2 py-0.5 rounded text-purple-800">الأيام 22 - 30</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li 
                  onClick={() => toggleTask('t4_1')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t4_1']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t4_1'] ? 'line-through text-slate-400' : ''}>
                    صياغة وإرسال أول خطاب استقطاب تعاون دولي (Collaboration Pitch).
                  </span>
                </li>
                <li 
                  onClick={() => toggleTask('t4_2')}
                  className="flex items-start gap-2 cursor-pointer hover:text-taibah-emerald transition"
                >
                  <input type="checkbox" checked={!!completedTasks['t4_2']} readOnly className="mt-0.5 rounded text-taibah-emerald" />
                  <span className={completedTasks['t4_2'] ? 'line-through text-slate-400' : ''}>
                    مراجعة تحديثات ملف Scopus وربط معرف WoS ResearcherID بـ ORCID.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Saved AI Studio Outputs if any */}
        {savedAiOutputs && savedAiOutputs.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-taibah-emerald" />
              مخرجات وأصول الذكاء الاصطناعي المحفوظة لخطة العمل:
            </h3>
            <div className="space-y-2.5">
              {savedAiOutputs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-taibah-emerald block">{item.templateName}:</span>
                  <p className="text-slate-700 whitespace-pre-wrap">{item.output}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Document Footnote & Academic Sign-off */}
        <div className="pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-700 block">إعداد وتصميم ورشة العمل:</span>
            <p className="text-sm font-black text-taibah-navy">{PRESENTER_INFO.name}</p>
            <p className="text-[11px] text-slate-500">{PRESENTER_INFO.title} - {PRESENTER_INFO.college}</p>
            <p className="text-[10px] text-slate-400">جامعة طيبة - المدينة المنورة</p>
          </div>

          <div className="text-center sm:text-left space-y-1 max-w-xs">
            <div className="text-xs text-slate-500 italic">
              "هذه الوثيقة تمثل خطة تنفيذية وتوصيات إرشادية فردية لتطوير الأثر والاستشهادات العلمية."
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">تاريخ الإصدار: 1448هـ / 2026م</span>
          </div>
        </div>

      </div>
    </div>
  );
}
