import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sparkles, HelpCircle, ArrowUpRight, Plus, Trash2, Award, Users } from 'lucide-react';
import { DEFAULT_PAPERS, SCHOLAR_AUTHOR_EXAMPLES } from '../data/initialData';

export default function HIndexCalculator({ isTrainerMode }) {
  const [papers, setPapers] = useState(DEFAULT_PAPERS);
  const [newTitle, setNewTitle] = useState('');
  const [newCitations, setNewCitations] = useState('');

  // Update citation count for a paper
  const handleCitationChange = (id, newCount) => {
    const count = Math.max(0, parseInt(newCount) || 0);
    setPapers(prev => prev.map(p => p.id === id ? { ...p, citations: count } : p));
  };

  const handleAddPaper = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPaper = {
      id: Date.now(),
      title: newTitle.trim(),
      citations: Math.max(0, parseInt(newCitations) || 0)
    };
    setPapers([...papers, newPaper]);
    setNewTitle('');
    setNewCitations('');
  };

  const handleDeletePaper = (id) => {
    setPapers(papers.filter(p => p.id !== id));
  };

  // Sort papers descending by citations to compute h-index
  const sortedPapers = [...papers].sort((a, b) => b.citations - a.citations);
  const totalCitations = papers.reduce((sum, p) => sum + p.citations, 0);

  let calculatedH = 0;
  for (let i = 0; i < sortedPapers.length; i++) {
    if (sortedPapers[i].citations >= i + 1) {
      calculatedH = i + 1;
    } else {
      break;
    }
  }

  const i10Index = papers.filter(p => p.citations >= 10).length;

  // Identify the "Golden Target Paper"
  // The paper at index = calculatedH (which is the (calculatedH + 1)-th paper)
  const nextTargetPaper = sortedPapers[calculatedH];
  const citationsNeededForNextH = nextTargetPaper 
    ? (calculatedH + 1) - nextTargetPaper.citations 
    : 1;

  // Estimated FWCI (Benchmark simulation)
  const averageFieldCitations = 8.5;
  const estimatedFwci = papers.length > 0 
    ? ((totalCitations / papers.length) / averageFieldCitations).toFixed(2) 
    : '0.00';

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 03 | فك شفرة مؤشرات الأثر
            </span>
            <span className="text-xs text-slate-300">الزمن المقترح: 20 دقيقة</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            المختبر التفاعلي لحساب معامل h ومحاكاة قفزات الاستشهاد
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            حرك أشرطة الاستشهاد لأبحاثك وشاهد بالرسم البياني كيف يُحسب h-index واكتشف "ورقتك الذهبية" القادمة.
          </p>
        </div>

        {/* Live Metrics Card */}
        <div className="bg-slate-800/90 p-4 rounded-xl border border-taibah-emerald/40 grid grid-cols-3 gap-4 text-center min-w-[300px]">
          <div>
            <span className="text-[10px] text-slate-400 block">إجمالي الاستشهادات</span>
            <span className="text-xl font-bold font-mono text-white">{totalCitations}</span>
          </div>
          <div className="border-r border-l border-slate-700 px-3">
            <span className="text-[10px] text-emerald-400 font-semibold block">معامل هيرش (h-index)</span>
            <span className="text-2xl font-black font-mono text-emerald-400">{calculatedH}</span>
          </div>
          <div>
            <span className="text-[10px] text-blue-400 font-semibold block">مؤشر i10-index</span>
            <span className="text-xl font-bold font-mono text-blue-400">{i10Index}</span>
          </div>
        </div>
      </div>

      {/* Author Case Studies Quick Load Bar */}
      <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-taibah-navy" />
          تحميل بيانات نماذج الباحثين للتجربة (Google Scholar Case Studies):
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setPapers(SCHOLAR_AUTHOR_EXAMPLES.high.calculatorPapers)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-500 font-bold text-slate-800 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>🌟</span>
            <span>أ.د. طارق الغامدي (h: 28 • استشهادات عالية)</span>
          </button>
          <button
            type="button"
            onClick={() => setPapers(SCHOLAR_AUTHOR_EXAMPLES.low.calculatorPapers)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-500 font-bold text-slate-800 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>🚀</span>
            <span>د. فهد الحربي (h: 3 • مرحلة التأسيس)</span>
          </button>
        </div>
      </div>

      {isTrainerMode && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-950">
          <span className="font-bold">🎯 توجيه المدرب للشريحة رقم 21 و 26:</span>
          دع المتدربين يجربون زيادة الورقة الأولى إلى 100 استشهاد ليشهدوا بأنفسهم أن h-index لا يتغير أبداً (ظاهرة الهضبة Plateau)، ثم اطلب منهم زيادة استشهادات الورقة الذهبية المميزة باللون الأخضر ليروا كيف يقفز المعامل فوراً بدرجة كاملة!
        </div>
      )}

      {/* Golden Target Paper Banner */}
      {nextTargetPaper && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-taibah-emerald rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-taibah-emerald text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              🎯
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full inline-block mb-1">
                الورقة الذهبية المستهدفة لرفع معامل h القادم ({calculatedH} ← {calculatedH + 1})
              </span>
              <h4 className="text-sm font-bold text-slate-900 line-clamp-1" dir="ltr">
                {nextTargetPaper.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                لديها حالياً <span className="font-bold text-emerald-800 font-mono">{nextTargetPaper.citations}</span> استشهاداً.
                تحتاج فقط إلى <span className="font-black text-rose-600 font-mono text-sm">{citationsNeededForNextH}</span> استشهاد إضافي ليقفز معاملك بالكامل إلى ({calculatedH + 1})!
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => handleCitationChange(nextTargetPaper.id, nextTargetPaper.citations + citationsNeededForNextH)}
              className="px-4 py-2 rounded-xl bg-taibah-emerald hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>محاكاة نيل الاستشهادات المطلوبة</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Graph: Sorted Papers & Threshold Line */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-taibah-emerald" />
              الرسم البياني لتوزيع الاقتباسات وخط العتبة (Threshold Line)
            </h3>
            <span className="text-xs text-slate-400 font-mono">الترتيب التنازلي</span>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-3 pt-2">
            {sortedPapers.map((p, idx) => {
              const rank = idx + 1;
              const isThresholdMet = p.citations >= rank;
              const isNextTarget = rank === calculatedH + 1;
              const maxVal = Math.max(30, sortedPapers[0]?.citations || 30);
              const barWidthPercent = Math.min(100, Math.round((p.citations / maxVal) * 100));

              return (
                <div key={p.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center font-mono shrink-0 ${
                        isThresholdMet ? 'bg-taibah-navy text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        #{rank}
                      </span>
                      <span className="text-slate-800 truncate text-left" dir="ltr">
                        {p.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 mr-2">
                      <span className="font-mono font-bold text-slate-800 text-xs">
                        {p.citations} اقتباس
                      </span>
                      {isThresholdMet ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold border border-emerald-200">
                          محسوب في h
                        </span>
                      ) : isNextTarget ? (
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                          الهدف القادم
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isThresholdMet
                          ? 'bg-gradient-to-r from-taibah-navy to-taibah-emerald'
                          : isNextTarget
                          ? 'bg-amber-400 animate-pulse'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${barWidthPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-taibah-emerald shrink-0 mt-0.5" />
            <div>
              <strong>تفسير الخط البياني:</strong> يتم احتساب الورقة ضمن معاملك إذا كان طول شريط استشهاداتها أكبر من أو يساوي رقم ترتيبها في القائمة. الورقة الأخيرة التي تحقق هذا الشرط تحدد معامل هيرش بدقة.
            </div>
          </div>
        </div>

        {/* Right: Paper Controls & Sliders */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              التحكم التفاعلي في استشهادات الأوراق ({papers.length})
            </h3>
            <p className="text-xs text-slate-500">
              استخدم الأشرطة لتعديل أرقام الاستشهاد فوراً ومشاهدة تأثيرها الحي على المعامل.
            </p>

            <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1">
              {papers.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 truncate max-w-[200px]" dir="ltr">
                      {p.title}
                    </span>
                    <button
                      onClick={() => handleDeletePaper(p.id)}
                      className="text-slate-400 hover:text-rose-600 transition"
                      title="حذف الورقة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={p.citations}
                      onChange={(e) => handleCitationChange(p.id, e.target.value)}
                      className="flex-1 accent-taibah-emerald cursor-pointer h-1.5"
                    />
                    <input
                      type="number"
                      min="0"
                      value={p.citations}
                      onChange={(e) => handleCitationChange(p.id, e.target.value)}
                      className="w-14 text-center text-xs p-1 rounded border border-slate-300 font-mono font-bold bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Paper Form */}
            <form onSubmit={handleAddPaper} className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">إضافة ورقة بحثية جديدة للمحاكاة:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="عنوان البحث الجديد..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="flex-1 text-xs p-2 rounded-lg border border-slate-300 bg-white outline-none"
                  dir="ltr"
                />
                <input
                  type="number"
                  placeholder="الاستشهادات"
                  value={newCitations}
                  onChange={(e) => setNewCitations(e.target.value)}
                  className="w-20 text-xs p-2 rounded-lg border border-slate-300 text-center font-mono bg-white outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-taibah-navy hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  إضافة
                </button>
              </div>
            </form>
          </div>

          {/* FWCI Benchmark Box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950">مؤشر FWCI المقدر لمجموعتك:</span>
              <span className="font-black text-base font-mono text-blue-800">{estimatedFwci}</span>
            </div>
            <p className="text-blue-900 leading-relaxed text-[11px]">
              إذا كانت القيمة &gt; 1.00 فهذا يعني أن أبحاثك تؤدي بمعدل أعلى من المتوسط العالمي في تخصصك وفق معايير Scopus وتصنيفات الجامعات.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
