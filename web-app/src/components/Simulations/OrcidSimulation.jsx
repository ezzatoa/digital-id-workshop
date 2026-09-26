import React, { useState } from 'react';
import { CheckCircle2, Shield, Globe, Lock, Users, Plus, ExternalLink, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrcidSimulation({ onCompleteBadge, isCompleted, isTrainerMode }) {
  const [activeSubTab, setActiveSubTab] = useState('sim'); // 'sim' or 'guide'
  
  // Simulation form states
  const [formData, setFormData] = useState({
    firstName: 'طارق',
    lastName: 'الغامدي',
    latinName: 'Tariq Al-Ghamdi',
    variants: 'T. M. Al-Ghamdi; Tariq Mohammed Alghamdi; T. Alghamdi',
    institution: 'جامعة طيبة - Taibah University',
    department: 'كلية علوم وهندسة الحاسب الآلي',
    privacy: 'everyone', // 'everyone', 'trusted', 'only_me'
    crossrefSync: true
  });

  const [works, setWorks] = useState([
    {
      id: 'w1',
      title: 'Evaluating Low-Dose CT Protocols via Deep Learning Reconstruction',
      journal: 'Academic Radiology & Imaging Diagnostics',
      year: '2025',
      doi: '10.1016/j.rad.2025.02.019',
      privacy: 'everyone'
    }
  ]);

  const [inputDoi, setInputDoi] = useState('');
  const [doiLoading, setDoiLoading] = useState(false);
  const [orcidId] = useState('0000-0002-8491-3729');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleImportDoi = (e) => {
    e.preventDefault();
    if (!inputDoi.trim()) return;
    setDoiLoading(true);
    setTimeout(() => {
      setWorks(prev => [
        ...prev,
        {
          id: 'w_' + Date.now(),
          title: 'Optimization of Pediatric Radiation Exposure Benchmarks in Medina Medical Centers',
          journal: 'Saudi Journal of Health Sciences (Scopus Q2)',
          year: '2026',
          doi: inputDoi.trim(),
          privacy: 'everyone'
        }
      ]);
      setInputDoi('');
      setDoiLoading(false);
    }, 700);
  };

  const handleFinishSimulation = () => {
    setSavedSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    if (onCompleteBadge) onCompleteBadge('orcid');
  };

  return (
    <div className="space-y-6">
      {/* Simulation / Guide Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#a6ce39] flex items-center justify-center font-bold text-slate-900 text-sm shadow-sm">
            iD
          </div>
          <div>
            <h2 className="text-lg font-bold text-taibah-navy">محاكي منصة ORCID العالمية (Open Researcher ID)</h2>
            <p className="text-xs text-slate-500">بيئة تفاعلية لتعلم إعداد المعرف الرقمي الموحد وضبط المزامنة والخصوصية</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'sim' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            شاشة المحاكاة الافتراضية
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'guide' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-taibah-emerald" />
            دليل التسجيل الفعلي لما بعد الورشة
          </button>
        </div>
      </div>

      {isTrainerMode && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-900">
          <span className="font-bold">🎯 توجيه المحاضر للشريحة رقم 09:</span>
          ركز على تنبيه الزملاء لخانة "صيغ الأسماء الأخرى (Also known as)"، وأكد على أهمية اختيار علامة القفل الخضراء (الجميع - Everyone) حتى تتمكن أنظمة تصنيف الجامعات من التعرف على أبحاثهم.
        </div>
      )}

      {activeSubTab === 'sim' ? (
        /* ORCID Interactive Simulation UI */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Banner mirroring ORCID official header */}
          <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#a6ce39]">
            <div className="flex items-center gap-3">
              <span className="text-[#a6ce39] font-black text-2xl tracking-tighter">ORCID</span>
              <div className="h-5 w-px bg-slate-700"></div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-[#a6ce39] animate-ping"></span>
                https://orcid.org/{orcidId}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">حالة السجل:</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> موثق ونشط
              </span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Personal info & Variations */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">البيانات التعريفية والبدائل</h3>
                
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">الاسم بالإنجليزية (كما يظهر في النشر)</label>
                  <input
                    type="text"
                    value={formData.latinName}
                    onChange={(e) => setFormData({...formData, latinName: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-taibah-emerald outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    صيغ الأسماء الأخرى (Also known as)
                    <span className="text-[10px] text-taibah-emerald mr-1 font-normal">(حاسم لتشابه الأسماء)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.variants}
                    onChange={(e) => setFormData({...formData, variants: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-taibah-emerald outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">جهة الانتساب المؤسسية (Employment)</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-taibah-emerald outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">ROR ID: https://ror.org/03t2p7020 (معرف جامعة طيبة)</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">الكلية والقسم العلمي</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-taibah-emerald outline-none"
                  />
                </div>
              </div>

              {/* Privacy Control Matrix */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">إعداد مستوى الخصوصية المعتمد</h3>
                <div className="space-y-2">
                  <label 
                    onClick={() => setFormData({...formData, privacy: 'everyone'})}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                      formData.privacy === 'everyone' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>الجميع (Everyone - موصى به للنشر)</span>
                    </div>
                    {formData.privacy === 'everyone' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </label>

                  <label 
                    onClick={() => setFormData({...formData, privacy: 'trusted'})}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                      formData.privacy === 'trusted' ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>الجهات الموثوقة فقط (Trusted Parties)</span>
                    </div>
                    {formData.privacy === 'trusted' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </label>

                  <label 
                    onClick={() => setFormData({...formData, privacy: 'only_me'})}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                      formData.privacy === 'only_me' ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-rose-600" />
                      <span>أنا فقط (Only Me - يحجب السجل)</span>
                    </div>
                    {formData.privacy === 'only_me' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                  </label>
                </div>

                {formData.privacy === 'only_me' && (
                  <div className="p-2 rounded-lg bg-rose-50 text-rose-800 text-[11px] border border-rose-200 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>تحذير: اختيار "أنا فقط" يمنع جامعة طيبة ولجان الترقيات وقواعد بيانات التصنيف من احتساب أبحاثك!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Works & Crossref Auto-Update */}
            <div className="lg:col-span-2 space-y-4">
              {/* Auto Update Banner */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 mb-1">المزامنة التلقائية مع Crossref و DataCite</h4>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    عند تفعيل هذا الخيار، سيتم استيراد أي ورقة جديدة تنشرها ويُصدر لها رقم DOI تلقائياً إلى حسابك بدون أي إدخال يدوي.
                  </p>
                </div>
                <button
                  onClick={() => setFormData({...formData, crossrefSync: !formData.crossrefSync})}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                    formData.crossrefSync ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {formData.crossrefSync ? 'المزامنة مفعلة ✔' : 'المزامنة معطلة ✘'}
                </button>
              </div>

              {/* Works Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">قائمة الأبحاث والأعمال ({works.length})</h3>
                  <span className="text-[11px] text-slate-500">استيراد عبر المعرف الرقمي DOI</span>
                </div>

                {/* Add via DOI form */}
                <form onSubmit={handleImportDoi} className="flex gap-2">
                  <input
                    type="text"
                    value={inputDoi}
                    onChange={(e) => setInputDoi(e.target.value)}
                    placeholder="مثال: 10.1016/j.rad.2026.01.005"
                    className="flex-1 text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-taibah-emerald outline-none text-left"
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    disabled={doiLoading}
                    className="px-4 py-2 bg-taibah-navy hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {doiLoading ? 'جاري الاستيراد...' : 'إضافة البحث'}
                  </button>
                </form>

                {/* Works list */}
                <div className="space-y-2 mt-3">
                  {works.map((w, idx) => (
                    <div key={w.id} className="bg-white p-3 rounded-lg border border-slate-200 text-right space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 flex-1 text-left" dir="ltr">
                          {w.title}
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          عام (Everyone)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-left" dir="ltr">DOI: {w.doi}</span>
                        <span>{w.journal} ({w.year})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Simulation Action */}
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">إكمال نشاط محاكاة ORCID</span>
                  <span className="text-[11px] text-slate-500">تم تجربة إعداد الاسم، الانتماء لجامعة طيبة، استيراد الأبحاث، وضبط الخصوصية.</span>
                </div>
                <button
                  onClick={handleFinishSimulation}
                  className="px-5 py-2.5 rounded-xl bg-taibah-emerald hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {savedSuccess || isCompleted ? 'تم إنجاز المحاكاة وحصد الشارة ✔' : 'اعتماد المحاكاة وحصد الشارة'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ORCID Post-Workshop Guide */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-taibah-navy">خطوات التسجيل الفعلي في منصة ORCID بعد الورشة</h3>
              <p className="text-xs text-slate-500">دليل استرشادي تفصيلي لحسابك الحقيقي لضمان نسبة أبحاثك لجامعة طيبة</p>
            </div>
            <a
              href="https://orcid.org/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-taibah-navy text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <span>فتح موقع ORCID الرسمي</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-taibah-navy text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-900">إنشاء الحساب بالبريد الجامعي</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ادخل إلى orcid.org/register وسجل باستخدام اسمك اللاتيني المعتمد في أبحاثك مع إضافة بريدك الجامعي (@taibahu.edu.sa) وبريد شخصي احتياطي لضمان الوصول دائماً.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-taibah-navy text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-900">توثيق انتساب جامعة طيبة الرسمي</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                في قسم Employment، اكتب "Taibah University" واخترها من القائمة المنسدلة ليرتبط المعرف المؤسسي ROR تلقائياً بملفك.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-taibah-navy text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-slate-900">ربط Crossref للتحديث التلقائي</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                في قسم Works، اضغط على Add ثم Search &amp; Link ثم اختر Crossref ومن ثم اضغط Authorize لتفعيل الإضافة الآلية للأوراق القادمة.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-taibah-navy text-white text-xs font-bold flex items-center justify-center">4</span>
              <h4 className="text-sm font-bold text-slate-900">ضبط الخصوصية العامة (Everyone)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تأكد من أن الأيقونة الخضراء (Everyone) مفعلة على اسمك وانتمائك وأبحاثك حتى تظهر في تقارير التصنيف الوطنية والدولية.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
