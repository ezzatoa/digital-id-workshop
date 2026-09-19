import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import { MATURITY_QUESTIONS } from '../data/initialData';

export default function MaturityAssessment({ 
  answers, 
  setAnswers, 
  onComplete, 
  isTrainerMode 
}) {
  const [submitted, setSubmitted] = useState(Object.keys(answers).length === MATURITY_QUESTIONS.length);

  const handleToggle = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(v => v === true).length;
  const scorePercent = Math.round((yesCount / MATURITY_QUESTIONS.length) * 100);

  const getTier = (score) => {
    if (score >= 90) return { title: 'رائد بحثي عالمي متصل (World-Class Scholar)', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-300', badge: 'الفئة 1' };
    if (score >= 70) return { title: 'باحث متميز ومكتمل الحضور (Established Digital Presence)', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-300', badge: 'الفئة 2' };
    if (score >= 40) return { title: 'باحث ناشئ يحتاج للمزامنة (Emerging Researcher)', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-300', badge: 'الفئة 3' };
    return { title: 'باحث في بداية التأسيس الرقمي (Foundational Phase)', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-300', badge: 'الفئة 4' };
  };

  const tier = getTier(scorePercent);

  const handleFinish = () => {
    setSubmitted(true);
    if (onComplete) onComplete(scorePercent, tier.title);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-lg border border-taibah-emerald/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-taibah-emerald/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
                المحطة 01 | التشخيص المبدئي
              </span>
              <span className="text-xs text-slate-300">الزمن المقترح: 5 دقائق</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              مقياس جاهزية الهوية الرقمية الأكاديمية للباحث
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              أداة تقييم ذاتية تشخيصية طورتها عمادة التطوير والجودة بجامعة طيبة لقياس اكتمال ملفاتك الأكاديمية وحمايتك من تشتت الاستشهادات قبل بدء ورشة العمل.
            </p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center min-w-[140px]">
            <div className="text-xs text-slate-400">حالة الإجابة</div>
            <div className="text-2xl font-bold text-taibah-cyan font-mono my-1">
              {answeredCount} / {MATURITY_QUESTIONS.length}
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-taibah-emerald h-full transition-all duration-300" 
                style={{ width: `${(answeredCount / MATURITY_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Trainer Guidance Box if active */}
      {isTrainerMode && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
          <span className="text-lg">💡</span>
          <div>
            <span className="font-bold block mb-1">إرشادات المحاضر (د. عزت أبوعزه) للشريحة رقم 04:</span>
            اطلب من الزملاء أعضاء هيئة التدريس الإجابة بصدق تام دون تردد. وضح لهم أن وجود أصفار في بعض المنصات أمر طبيعي وشائع جداً في بداية المشوار، وأن الهدف الأساسي من الورشة هو تحويل أي نقطة ضعف إلى شارة إنجاز عملية وملموسة.
          </div>
        </div>
      )}

      {/* Result Card if Submitted */}
      {submitted && (
        <div className={`p-6 rounded-2xl border ${tier.bg} shadow-md transition-all`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl font-bold font-mono text-taibah-navy border border-slate-200">
                {scorePercent}%
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-slate-300 text-slate-700">
                  {tier.badge}
                </span>
                <h3 className={`text-lg sm:text-xl font-bold mt-1 ${tier.color}`}>
                  {tier.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  حققت {yesCount} إجابات إيجابية من أصل {MATURITY_QUESTIONS.length} معايير عالمية.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                إعادة التقييم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
        {MATURITY_QUESTIONS.map((q, idx) => {
          const currentAnswer = answers[q.id];
          return (
            <div key={q.id} className="p-4 sm:p-5 transition hover:bg-slate-50/70">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base font-semibold">
                      {q.question}
                    </p>
                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-taibah-emerald" />
                      {q.tip}
                    </p>
                  </div>
                </div>

                {/* Yes / No Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center mr-10 sm:mr-0">
                  <button
                    onClick={() => handleToggle(q.id, true)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                      currentAnswer === true
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    نعم
                  </button>
                  <button
                    onClick={() => handleToggle(q.id, false)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                      currentAnswer === false
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    لا
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Action */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="text-xs text-slate-500">
          {answeredCount === MATURITY_QUESTIONS.length ? (
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> اكتملت كافة الأسئلة!
            </span>
          ) : (
            <span>متبقي {MATURITY_QUESTIONS.length - answeredCount} أسئلة لاكتمال التقييم</span>
          )}
        </div>

        <button
          onClick={handleFinish}
          disabled={answeredCount === 0}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-taibah-navy to-taibah-emerald text-white text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 transition flex items-center gap-2"
        >
          <span>اعتماد النتيجة والانتقال للمحاكيات</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
