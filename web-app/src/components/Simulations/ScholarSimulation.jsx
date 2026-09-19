import React, { useState } from 'react';
import { CheckCircle2, Merge, Trash2, Globe, Lock, Mail, Sparkles, BookOpen, AlertCircle, TrendingUp, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScholarSimulation({ onCompleteBadge, isCompleted, isTrainerMode }) {
  const [activeSubTab, setActiveSubTab] = useState('sim'); // 'sim' or 'guide'

  const [isPublic, setIsPublic] = useState(true);
  const [autoUpdateMode, setAutoUpdateMode] = useState('review'); // 'auto' or 'review'
  const [verifiedEmail, setVerifiedEmail] = useState('eaboazza@taibahu.edu.sa');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [mergedNotice, setMergedNotice] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Articles state
  const [articles, setArticles] = useState([
    {
      id: 'art1_conf',
      title: 'Low-Dose CT Image Quality Assessment (Conference Proceedings)',
      authors: 'EO Aboazza, M Alghamdi',
      venue: 'IEEE International Imaging Symposium, pp. 45-49',
      year: 2024,
      citations: 6,
      isDuplicateGroup: 'group1'
    },
    {
      id: 'art1_journal',
      title: 'Low-Dose CT Image Quality Assessment and Denoising via Deep Learning',
      authors: 'EO Aboazza, M Alghamdi, K Miller',
      venue: 'Journal of Radiologic Diagnostics 14 (3), 112-120',
      year: 2025,
      citations: 15,
      isDuplicateGroup: 'group1'
    },
    {
      id: 'art_intruder',
      title: 'Synthesis of Novel Heterocyclic Polymers for Photovoltaic Cells',
      authors: 'E. Aboazza, S. Kumar',
      venue: 'Journal of Applied Polymer Chemistry 40 (2), 44-50',
      year: 2023,
      citations: 18,
      isIntruder: true
    },
    {
      id: 'art3',
      title: 'Pediatric Dose Reduction Strategies in Modern Emergency Fluoroscopy',
      authors: 'EO Aboazza',
      venue: 'Saudi Medical Imaging Journal 9 (1), 30-38',
      year: 2025,
      citations: 9,
      isIntruder: false
    }
  ]);

  const toggleSelect = (id) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(item => item !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  const handleMerge = () => {
    if (selectedArticles.length < 2) return;
    
    const itemsToMerge = articles.filter(a => selectedArticles.includes(a.id));
    const totalCitations = itemsToMerge.reduce((sum, a) => sum + a.citations, 0);
    const primaryItem = itemsToMerge.find(a => a.venue.includes('Journal')) || itemsToMerge[0];

    const mergedItem = {
      ...primaryItem,
      id: 'merged_' + Date.now(),
      citations: totalCitations,
      title: primaryItem.title + ' [نسخة موحدة مدمجة]',
      isMerged: true
    };

    const remaining = articles.filter(a => !selectedArticles.includes(a.id));
    setArticles([mergedItem, ...remaining]);
    setSelectedArticles([]);
    setMergedNotice(`تم دمج الأبحاث بنجاح! ارتفعت استشهادات البحث الموحد إلى ${totalCitations} استشهاداً.`);
  };

  const handleDeleteIntruder = (id) => {
    setArticles(articles.filter(a => a.id !== id));
    setSelectedArticles(selectedArticles.filter(item => item !== id));
    setMergedNotice('تم استبعاد البحث غير التابع لك بنجاح لحماية نزاهة سجلك العلمي.');
  };

  // Dynamic metrics calculation
  const allCitations = articles.reduce((sum, a) => sum + a.citations, 0);
  const sortedCitations = articles.map(a => a.citations).sort((a, b) => b - a);
  let hIndex = 0;
  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }
  const i10Index = articles.filter(a => a.citations >= 10).length;

  const handleFinish = () => {
    setSavedSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    if (onCompleteBadge) onCompleteBadge('scholar');
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4285f4] flex items-center justify-center font-bold text-white text-sm shadow-sm">
            G
          </div>
          <div>
            <h2 className="text-lg font-bold text-taibah-navy">محاكي منصة Google Scholar (باحث Google العلمي)</h2>
            <p className="text-xs text-slate-500">مختبر تطبيقي لتوثيق البريد الجامعي، دمج النسخ المكررة، واستبعاد الأبحاث الدخيلة</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'sim' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            شاشة المحاكاة الافتراضية
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'guide' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-taibah-emerald" />
            دليل التوثيق والتنظيف لما بعد الورشة
          </button>
        </div>
      </div>

      {isTrainerMode && (
        <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 text-xs text-blue-900">
          <span className="font-bold">🎯 توجيه المحاضر للشريحة رقم 12:</span>
          اطلب من المتدربين تحديد البحثين الأولين والضغط على زر "دمج (Merge)" ليروا كيف يقفز عدد الاستشهادات من 15 إلى 21، ثم اطلب منهم حذف البحث الكيميائي الدخيل لحماية تخصص تقنية الأشعة.
        </div>
      )}

      {activeSubTab === 'sim' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Google Scholar Header Mock */}
          <div className="bg-slate-50 border-b border-slate-200 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-2xl flex items-center justify-center shadow-md">
                  EA
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">Dr. Ezzat Aboazza</h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> تم التحقق بالبريد
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Assistant Professor of Radiologic Technology, Taibah University
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-taibah-emerald" />
                    بريد إلكتروني تم التحقق منه في <span className="font-semibold text-slate-700 font-mono">taibahu.edu.sa</span>
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">Medical Imaging</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">Radiology</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">AI in Healthcare</span>
                  </div>
                </div>
              </div>

              {/* Metrics Table Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[240px] text-center">
                <table className="w-full text-xs" dir="ltr">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-1 text-left">مؤشرات الاقتباس</th>
                      <th className="pb-1 text-right">الكل</th>
                      <th className="pb-1 text-right">منذ 2021</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-1.5 text-left font-semibold text-slate-700">Citations (الاستشهادات)</td>
                      <td className="py-1.5 text-right font-bold text-taibah-navy font-mono text-sm">{allCitations}</td>
                      <td className="py-1.5 text-right font-mono text-slate-600">{allCitations}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-left font-semibold text-slate-700">h-index (معامل هيرش)</td>
                      <td className="py-1.5 text-right font-bold text-emerald-600 font-mono text-base">{hIndex}</td>
                      <td className="py-1.5 text-right font-mono text-slate-600">{hIndex}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-left font-semibold text-slate-700">i10-index</td>
                      <td className="py-1.5 text-right font-bold text-blue-600 font-mono text-sm">{i10Index}</td>
                      <td className="py-1.5 text-right font-mono text-slate-600">{i10Index}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Profile Visibility Controls */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">ظهور الملف:</span>
                  <button
                    onClick={() => setIsPublic(!isPublic)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                      isPublic ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {isPublic ? <Globe className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5 text-rose-600" />}
                    {isPublic ? 'عام للجميع (Public)' : 'خاص ومخفي (Private)'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500">تحديث المقالات:</span>
                  <select
                    value={autoUpdateMode}
                    onChange={(e) => setAutoUpdateMode(e.target.value)}
                    className="p-1 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs outline-none"
                  >
                    <option value="review">مراجعة وإشعار بالبريد أولاً (موصى به لمنع الخلط)</option>
                    <option value="auto">إضافة تلقائية فورية دون مراجعة</option>
                  </select>
                </div>
              </div>

              {/* Action Toolbar when items selected */}
              {selectedArticles.length > 0 && (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
                  <span className="font-bold text-blue-900 text-xs">تم تحديد {selectedArticles.length} عناصر:</span>
                  {selectedArticles.length >= 2 && (
                    <button
                      onClick={handleMerge}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <Merge className="w-3.5 h-3.5" />
                      دمج النسخ المكررة
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Feedback notice */}
          {mergedNotice && (
            <div className="m-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
              <span>{mergedNotice}</span>
              <button onClick={() => setMergedNotice(null)} className="text-emerald-700 font-bold hover:underline">إغلاق</button>
            </div>
          )}

          {/* Articles Table */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                قائمة المقالات المنشورة ({articles.length})
              </h4>
              <span className="text-xs text-slate-400">حدد المقالات المكررة لدمجها أو اضغط حذف لاستبعاد الأوراق الغريبة</span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {articles.map((art) => (
                <div 
                  key={art.id}
                  className={`p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    selectedArticles.includes(art.id) ? 'bg-blue-50/70' : art.isIntruder ? 'bg-rose-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedArticles.includes(art.id)}
                      onChange={() => toggleSelect(art.id)}
                      className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-slate-900 text-left" dir="ltr">
                          {art.title}
                        </h5>
                        {art.isIntruder && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                            ورقة دخيلة (تخصص مختلف)
                          </span>
                        )}
                        {art.isMerged && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            مدمج بنجاح
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 text-left" dir="ltr">{art.authors}</p>
                      <p className="text-xs text-slate-400 text-left" dir="ltr">{art.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-center min-w-[60px]">
                      <span className="text-xs text-slate-400 block">الاقتباسات</span>
                      <span className="text-sm font-bold text-slate-800 font-mono">{art.citations}</span>
                    </div>
                    <div className="text-center min-w-[50px]">
                      <span className="text-xs text-slate-400 block">السنة</span>
                      <span className="text-xs text-slate-600 font-mono">{art.year}</span>
                    </div>

                    {art.isIntruder && (
                      <button
                        onClick={() => handleDeleteIntruder(art.id)}
                        className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                        title="حذف البحث الدخيل من الملف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Simulation Action */}
            <div className="mt-6 p-4 bg-slate-100 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">إكمال نشاط محاكاة Google Scholar</span>
                <span className="text-[11px] text-slate-500">تم تجربة التوثيق بالبريد الجامعي، دمج النسخ المكررة، وحذف الأوراق الغريبة.</span>
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
        </div>
      ) : (
        /* Post-workshop guide */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-taibah-navy">دليل ضبط وتأكيد باحث Google العلمي الفعلي</h3>
              <p className="text-xs text-slate-500">إرشادات رسمية لحسابك الحقيقي لضمان ظهور أبحاثك في محركات البحث العالمية</p>
            </div>
            <a
              href="https://scholar.google.com/citations?view_op=new_profile"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5"
            >
              <span>فتح Google Scholar الرسمي</span>
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-900">التحقق من البريد الجامعي</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ادخل بريدك الرسمي (@taibahu.edu.sa) في خانة "Email for verification". افتح بريدك واضغط على رابط التفعيل لتحصل على علامة التوثيق.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-900">تفعيل خيار "عام" (Make Public)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                اضغط على زر التعديل بجانب اسمك، وضع علامة صح على "Make my profile public". بدون هذا الخيار، لن تظهر أبحاثك في أي نتائج بحث!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-slate-900">دمج الأبحاث المتطابقة شهرياً</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                حدد النسخ المتكررة لنفس البحث (نسخة المؤتمر ونسخة المجلة والمسودة) واضغط دمج (Merge) لجمع استشهاداتها ورفع معامل h-index فوراً.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <h4 className="text-sm font-bold text-slate-900">ضبط مراجعة الأبحاث عبر البريد</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                اختر "Don't automatically add articles to my profile" لمنع خوارزميات Google من إضافة أبحاث باحثين آخرين يحملون اسماً مشابهاً لاسمك.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
