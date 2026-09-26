import React, { useState } from 'react';
import { CheckCircle2, GitMerge, AlertCircle, ArrowRight, ExternalLink, Sparkles, BookOpen, ShieldCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScopusSimulation({ onCompleteBadge, isCompleted, isTrainerMode }) {
  const [activeSubTab, setActiveSubTab] = useState('sim'); // 'sim' or 'guide'

  const [step, setStep] = useState(1); // 1: search/select, 2: choose name & affiliation, 3: review & merged
  const [selectedProfiles, setSelectedProfiles] = useState(['p1', 'p2']);
  const [preferredName, setPreferredName] = useState('Al-Ghamdi, Tariq Mohammed');
  const [primaryAffiliation, setPrimaryAffiliation] = useState('Taibah University, Medina, Saudi Arabia');
  const [orcidSynced, setOrcidSynced] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initialProfiles = [
    {
      id: 'p1',
      name: 'Al-Ghamdi, Tariq M.',
      authorId: '57219084122',
      affiliation: 'Taibah University, College of Computer Science & Engineering',
      docs: 24,
      citations: 2150,
      hIndex: 22
    },
    {
      id: 'p2',
      name: 'Ghamdi, T. M.',
      authorId: '57849102943',
      affiliation: 'Taibah University, Department of Information Systems',
      docs: 12,
      citations: 1300,
      hIndex: 14
    }
  ];

  const handleMergeAction = () => {
    setStep(2);
  };

  const handleConfirmMerge = () => {
    setStep(3);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleSyncOrcid = () => {
    setOrcidSynced(true);
  };

  const handleFinish = () => {
    setSavedSuccess(true);
    if (onCompleteBadge) onCompleteBadge('scopus');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#e9711c] flex items-center justify-center font-bold text-white text-sm shadow-sm">
            Sc
          </div>
          <div>
            <h2 className="text-lg font-bold text-taibah-navy">محاكي منصة Scopus & Web of Science (تصحيح ودمج الملفات)</h2>
            <p className="text-xs text-slate-500">مختبر تطبيقي لمعالجة مشكلة انقسام الحساب (Split Profiles) وتوحيد مؤشرات الاقتباس</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'sim' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            شاشة المحاكاة الافتراضية
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'guide' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-taibah-emerald" />
            دليل طلبات التصحيح لما بعد الورشة
          </button>
        </div>
      </div>

      {isTrainerMode && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900">
          <span className="font-bold">🎯 توجيه المدرب للشريحة رقم 18:</span>
          أوضح للمتدربين كيف أن اختلافاً بسيطاً في كتابة الاسم (Al-Ghamdi مقابل Ghamdi) أدى إلى خلق حسابين منفصلين في Scopus وتشتت الـ h-index بين (22) و (14)، وأرهم كيف يقفز الـ h-index الموحد إلى (28) فور الدمج وربطه بـ ORCID!
        </div>
      )}

      {activeSubTab === 'sim' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#1e293b] text-white p-4 flex items-center justify-between border-b border-[#e9711c]">
            <div className="flex items-center gap-2">
              <span className="text-[#e9711c] font-black text-xl tracking-tighter">Scopus</span>
              <span className="text-xs text-slate-300">Author Feedback Wizard (معالج تصحيح المؤلفين)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded font-bold ${step === 1 ? 'bg-[#e9711c] text-white' : 'bg-slate-700 text-slate-300'}`}>
                1. اكتشاف الملفات
              </span>
              <span>←</span>
              <span className={`px-2 py-0.5 rounded font-bold ${step === 2 ? 'bg-[#e9711c] text-white' : 'bg-slate-700 text-slate-300'}`}>
                2. مراجعة البيانات
              </span>
              <span>←</span>
              <span className={`px-2 py-0.5 rounded font-bold ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                3. اعتماد الدمج
              </span>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-950">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-1 text-sm font-bold">تم رصد ملفين منفصلين لنفس الباحث في قاعدة Scopus!</strong>
                    <span>تشتت الأبحاث أدى إلى انخفاض مؤشر هيرش الرسمي. حدد الملفين بالأسفل واضغط على زر "دمج الملفين" لتوحيد السجل.</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {initialProfiles.map((p) => (
                    <div 
                      key={p.id}
                      className={`p-4 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        selectedProfiles.includes(p.id) ? 'bg-amber-50/40 border-amber-400 shadow-sm' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedProfiles.includes(p.id)}
                          onChange={() => {
                            if (selectedProfiles.includes(p.id)) {
                              setSelectedProfiles(selectedProfiles.filter(x => x !== p.id));
                            } else {
                              setSelectedProfiles([...selectedProfiles, p.id]);
                            }
                          }}
                          className="mt-1 w-4 h-4 rounded text-[#e9711c] focus:ring-[#e9711c]"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900" dir="ltr">{p.name}</h4>
                          <p className="text-xs text-slate-500 font-mono" dir="ltr">Scopus Author ID: {p.authorId}</p>
                          <p className="text-xs text-slate-600 mt-1">{p.affiliation}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                        <div className="text-center">
                          <span className="text-[10px] text-slate-400 block">الأبحاث</span>
                          <span className="font-bold text-slate-800 font-mono text-sm">{p.docs}</span>
                        </div>
                        <div className="border-r border-l border-slate-200 px-3 text-center">
                          <span className="text-[10px] text-slate-400 block">الاستشهادات</span>
                          <span className="font-bold text-slate-800 font-mono text-sm">{p.citations}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] text-slate-400 block">h-index</span>
                          <span className="font-bold text-[#e9711c] font-mono text-sm">{p.hIndex}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleMergeAction}
                    disabled={selectedProfiles.length < 2}
                    className="px-6 py-2.5 rounded-xl bg-[#e9711c] hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
                  >
                    <GitMerge className="w-4 h-4" />
                    <span>بدء معالج دمج الملفين (Request Merge)</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 max-w-2xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-base font-bold text-taibah-navy">اختيار الاسم المفضل والانتساب المؤسسي المعتمد</h3>
                  <p className="text-xs text-slate-500">حدد كيف ترغب في ظهور اسمك وانتسابك الرسمي لجامعة طيبة في ملفك الموحد</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 text-right">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">الصيغة اللاتينية المعتمدة للاسم (Preferred Name)</label>
                    <input
                      type="text"
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#e9711c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">جهة الانتساب الرسمية الرئيسية (Primary Affiliation)</label>
                    <input
                      type="text"
                      value={primaryAffiliation}
                      onChange={(e) => setPrimaryAffiliation(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#e9711c] outline-none"
                    />
                    <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                      ✔ سيتم ربط جميع استشهاداتك المدمجة رسمياً بجامعة طيبة لدعم التصنيف العالمي.
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-semibold"
                  >
                    رجوع
                  </button>
                  <button
                    onClick={handleConfirmMerge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأكيد دمج السجلين وتحديث المؤشرات</span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Result of Merged Scopus Profile */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30">
                        الملف الموحد الجديد (Merged Scopus Record)
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1" dir="ltr">{preferredName}</h3>
                      <p className="text-xs text-emerald-100 font-mono">Scopus Author ID: 57219084122 (المعرف المعتمد الدائم)</p>
                      <p className="text-xs text-white/90">{primaryAffiliation}</p>
                    </div>

                    {/* Merged Jump in Metrics */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 grid grid-cols-3 gap-4 text-center min-w-[280px]">
                      <div>
                        <span className="text-[10px] text-emerald-100 block">إجمالي الأبحاث</span>
                        <span className="text-lg font-bold font-mono">7 أبحاث</span>
                      </div>
                      <div className="border-r border-l border-white/20 px-2">
                        <span className="text-[10px] text-emerald-100 block">الاستشهادات الموحدة</span>
                        <span className="text-lg font-bold font-mono text-amber-200">62</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-100 block">معامل h-index الموحد</span>
                        <span className="text-xl font-black font-mono text-white bg-emerald-900/60 rounded px-2 py-0.5">
                          4 (+1 قفزة)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Sync to ORCID card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-0.5">تصدير المعرف الموحد إلى ORCID</h4>
                    <p className="text-[11px] text-slate-500">
                      ربط Scopus Author ID بحسابك في ORCID يضمن ظهور معرف Scopus في سجلك العام وتحديث الاستشهادات آلياً.
                    </p>
                  </div>
                  <button
                    onClick={handleSyncOrcid}
                    disabled={orcidSynced}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                      orcidSynced ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-taibah-navy text-white hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {orcidSynced ? 'تم الربط مع ORCID بنجاح ✔' : 'ربط ومزامنة مع ORCID الآن'}
                  </button>
                </div>

                {/* Complete Simulation Action */}
                <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">إكمال نشاط محاكاة Scopus & WoS</span>
                    <span className="text-[11px] text-slate-500">تم تجربة دمج السجلات المنقسمة وتصحيح الانتساب وقفزة معامل هيرش.</span>
                  </div>
                  <button
                    onClick={handleFinish}
                    className="px-5 py-2.5 rounded-xl bg-taibah-emerald hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {savedSuccess || isCompleted ? 'تم إنجاز المحاكاة وحصد الشارة ✔' : 'اعتماد المحاكاة وحصد الشارة'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Guide */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-taibah-navy">دليل تقديم طلبات دمج وتصحيح Scopus و Clarivate الفعلي</h3>
              <p className="text-xs text-slate-500">خطوات مجانية ومباشرة دون الحاجة لوجود اشتراك مدفوع في Scopus</p>
            </div>
            <a
              href="https://www.scopus.com/feedback/author/home.uri"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#e9711c] text-white font-bold text-xs hover:bg-orange-600 transition flex items-center gap-1.5"
            >
              <span>فتح معالج Scopus المجاني</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#e9711c] text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-900">البحث عبر Scopus Author Search</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ادخل إلى scopus.com/feedback/author/home.uri واكتب اسم عائلتك والأحرف الأولى من اسمك، واختر Affiliation: Taibah University.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#e9711c] text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-900">تحديد الملفات والضغط على Request Merge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                إذا وجدت أكثر من ملف يحمل أبحاثك، ضع علامة صح بجانبها واضغط على زر "Request merge authors" لبدء المعالج الرسمي.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#e9711c] text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-slate-900">مراجعة قائمة الأبحاث (Review Documents)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تأكد من أن كل ورقة في القائمة تخصك، واستبعد أي أوراق لباحثين آخرين. اختر انتساب جامعة طيبة كجهة رئيسية.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-[#e9711c] text-white text-xs font-bold flex items-center justify-center">4</span>
              <h4 className="text-sm font-bold text-slate-900">الاحتفاظ برقم التذكرة والمتابعة</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ستصلك رسالة تأكيد عبر إيميلك برقم تذكرة (Case Number). يستغرق التحديث في Scopus و SciVal ما بين يومين إلى 3 أيام عمل.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
