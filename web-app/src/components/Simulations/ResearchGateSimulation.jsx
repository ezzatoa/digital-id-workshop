import React, { useState } from 'react';
import { CheckCircle2, Upload, AlertTriangle, FileText, Send, Sparkles, BookOpen, ShieldAlert, MessageSquare, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResearchGateSimulation({ onCompleteBadge, isCompleted, isTrainerMode }) {
  const [activeSubTab, setActiveSubTab] = useState('sim'); // 'sim' or 'guide'

  const [selectedFileType, setSelectedFileType] = useState(null); // 'final_pdf' or 'aam'
  const [uploadStatus, setUploadStatus] = useState(null);
  const [privateRequestReplied, setPrivateRequestReplied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Mock Metrics
  const [stats, setStats] = useState({
    researchInterest: 248.5,
    citations: 62,
    reads: 1420
  });

  const handleUploadTest = (type) => {
    setSelectedFileType(type);
    if (type === 'final_pdf') {
      setUploadStatus({
        type: 'danger',
        title: 'تحذير قانوني صارم وفق سياسات Sherpa Romeo!',
        message: 'هذا البحث منشور في مجلة اشتراكات تجارية (Elsevier/Springer). رفع نسخة الناشر النهائية المنسقة (Publisher PDF) علناً يعد انتهاكاً لحقوق الطبع والنشر ويعرضك لإخطار إزالة فوري (DMCA Takedown).'
      });
    } else {
      setUploadStatus({
        type: 'success',
        title: 'متوافق مع الوصول المفتوح الأخضر (Green Open Access) ✔',
        message: 'يسمح معظم الناشرين بمشاركة "نسخة المؤلف المقبولة" (Author Accepted Manuscript - AAM) في مستودع الجامعة وشبكات التواصل الأكاديمي. تم قبول الرفع بأمان قانوني تام!'
      });
      // boost stats
      setStats(prev => ({
        ...prev,
        reads: prev.reads + 45,
        researchInterest: +(prev.researchInterest + 6.2).toFixed(1)
      }));
    }
  };

  const handleReplyPrivate = () => {
    setPrivateRequestReplied(true);
    setStats(prev => ({
      ...prev,
      reads: prev.reads + 12,
      researchInterest: +(prev.researchInterest + 2.4).toFixed(1)
    }));
  };

  const handleFinish = () => {
    setSavedSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    if (onCompleteBadge) onCompleteBadge('rg');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00ccbb] flex items-center justify-center font-bold text-white text-sm shadow-sm">
            R<sup>G</sup>
          </div>
          <div>
            <h2 className="text-lg font-bold text-taibah-navy">محاكي منصة ResearchGate (بوابة الباحثين العالمية)</h2>
            <p className="text-xs text-slate-500">مختبر تطبيقي لإدارة الأوراق، فحص حقوق النشر عبر Sherpa Romeo، والمشاركة الخاصة</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('sim')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'sim' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            شاشة المحاكاة الافتراضية
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'guide' ? 'bg-white text-taibah-navy shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-taibah-emerald" />
            دليل المشاركة القانونية لما بعد الورشة
          </button>
        </div>
      </div>

      {isTrainerMode && (
        <div className="bg-teal-50 border border-teal-300 rounded-xl p-3 text-xs text-teal-900">
          <span className="font-bold">🎯 توجيه المحاضر للشريحة رقم 15 و 16:</span>
          اطلب من المتدربين الضغط على خيار "نسخة الناشر النهائية (Publisher PDF)" ليروا رسالة التحذير الحمراء، ثم اطلب منهم اختيار "نسخة المؤلف المقبولة (AAM)" ليشاهدوا كيف تصبح المشاركة قانونية وترتفع قراءاتهم فوراً.
        </div>
      )}

      {activeSubTab === 'sim' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* ResearchGate Profile Header Mock */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 border-b border-[#00ccbb]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#00ccbb] text-white font-bold text-2xl flex items-center justify-center shadow-lg">
                  EA
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Dr. Ezzat Aboazza</h3>
                  <p className="text-xs text-[#00ccbb] font-medium">
                    Taibah University • Department of Radiologic Technology
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Medina, Saudi Arabia
                  </p>
                </div>
              </div>

              {/* RG Stats Bar */}
              <div className="grid grid-cols-3 gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center min-w-[280px]">
                <div>
                  <span className="text-[10px] text-slate-400 block">Research Interest</span>
                  <span className="text-base font-bold text-[#00ccbb] font-mono">{stats.researchInterest}</span>
                </div>
                <div className="border-r border-l border-slate-700 px-2">
                  <span className="text-[10px] text-slate-400 block">Citations</span>
                  <span className="text-base font-bold text-white font-mono">{stats.citations}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Reads (القراءات)</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{stats.reads}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Sherpa Romeo Upload Simulation Activity */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-taibah-emerald" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    نشاط رفع ورقة بحثية وفحص حقوق النشر (Sherpa Romeo)
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  لديك ورقة مقبولة في مجلة (Journal of Medical Systems - Springer Nature). ما هي النسخة التي يحق لك رفعها علناً للجميع؟
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleUploadTest('final_pdf')}
                    className={`w-full p-3 rounded-xl border text-right transition flex items-center justify-between ${
                      selectedFileType === 'final_pdf'
                        ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">1. نسخة الناشر النهائية المنسقة (Publisher PDF)</span>
                      <span className="text-[11px] text-slate-500 font-normal">النسخة المحملة من موقع المجلة بشعار دار النشر والترقيم النهائي.</span>
                    </div>
                    <FileText className="w-5 h-5 text-rose-500 shrink-0 mr-2" />
                  </button>

                  <button
                    onClick={() => handleUploadTest('aam')}
                    className={`w-full p-3 rounded-xl border text-right transition flex items-center justify-between ${
                      selectedFileType === 'aam'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block">2. مسودة المؤلف المقبولة (Author Accepted Manuscript - AAM)</span>
                      <span className="text-[11px] text-slate-500 font-normal">النسخة المكتوبة بـ Word/PDF بعد انتهاء التحكيم وقبل تنسيق دار النشر.</span>
                    </div>
                    <FileText className="w-5 h-5 text-emerald-500 shrink-0 mr-2" />
                  </button>
                </div>

                {uploadStatus && (
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed mt-3 flex items-start gap-2.5 ${
                    uploadStatus.type === 'danger' ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  }`}>
                    {uploadStatus.type === 'danger' ? (
                      <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="block mb-1">{uploadStatus.title}</strong>
                      <span>{uploadStatus.message}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Private Full-Text Sharing Interaction */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    نشاط مشاركة النص الكامل بصفة فردية خاصة (Private Sharing)
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تلقيت طلباً خاصاً للحصول على بحثك المغلق من باحث بريطاني في جامعة أكسفورد:
                </p>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Prof. James Wilson (Oxford University)</span>
                    <span className="text-[10px] text-slate-400 font-mono">منذ ساعتين</span>
                  </div>
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100" dir="ltr">
                    "Dear Dr. Aboazza, I am working on radiation optimization protocols and would be very grateful if you could share the full text of your recent study. Kind regards."
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {privateRequestReplied ? 'تم إرسال الملف بصفة شخصية قانونية ✔' : 'المشاركة الفردية مسموحة 100% قانونياً حتى للمجلات المغلقة!'}
                    </span>
                    <button
                      onClick={handleReplyPrivate}
                      disabled={privateRequestReplied}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {privateRequestReplied ? 'تم الإرسال والرد' : 'إرسال النص الكامل كرسالة خاصة'}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950">
                  <strong className="block mb-1">💡 معلومة للمحاضر (د. عزت أبوعزه):</strong>
                  قوانين حماية الملكية الفكرية تسمح للباحث بمشاركة أبحاثه الفردية مع زملائه الباحثين (One-to-One Scholarly Sharing)، وهذا يختلف تماماً عن النشر العلني المتاح للجميع على الإنترنت!
                </div>
              </div>
            </div>
          </div>

          {/* Complete Simulation Action */}
          <div className="p-4 m-6 bg-slate-100 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-800 block">إكمال نشاط محاكاة ResearchGate</span>
              <span className="text-[11px] text-slate-500">تم تجربة معايير Sherpa Romeo القانونية، وحفظ حقوق الناشر، والمشاركة الخاصة الفعالة.</span>
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
      ) : (
        /* Guide */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-taibah-navy">دليل استخدام ResearchGate بأمان قانوني وتفاعل علمي</h3>
              <p className="text-xs text-slate-500">كيف تستفيد من الشبكة الأضخم عالمياً دون الوقوع في انتهاك حقوق دور النشر</p>
            </div>
            <a
              href="https://www.researchgate.net"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#00ccbb] text-slate-900 font-bold text-xs hover:bg-teal-400 transition flex items-center gap-1.5"
            >
              <span>فتح ResearchGate الرسمي</span>
              <Award className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-sm font-bold text-slate-900">فحص المجلة عبر Sherpa Romeo</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                قبل رفع أي ملف PDF، ادخل إلى موقع v2.sherpa.ac.uk/romeo واكتب اسم المجلة لمعرفة ما إذا كانت تسمح برفع نسخة المؤلف المقبولة (AAM) وفترة الحظر المطلوبة.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-sm font-bold text-slate-900">استخدام ميزة طلب النص الكامل</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                إذا كانت المجلة تحظر النشر المفتوح تماماً، ارفع فقط المستخلص والعنوان ورقم الـ DOI، ودع خيار "Request Full-text" متاحاً لترسل البحث بصفة شخصية لمن يطلبه.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-sm font-bold text-slate-900">متابعة الباحثين الرواد ومجموعات التخصص</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تابع ما لا يقل عن 10 باحثين رواد في تخصصك الدقيق. تفاعلك مع أوراقهم بالسؤال والمناقشة يظهر اسمك وأبحاثك في خلاصاتهم الأسبوعية.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <h4 className="text-sm font-bold text-slate-900">الربط بقسمك في جامعة طيبة</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                انضم لقسم تقنية الأشعة أو كليتك بجامعة طيبة؛ كل قراءة واستشهاد يسجلها حسابك يرفع تصنيف ومؤشر اهتمام البحث التراكمي لجامعة طيبة في المنصة.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
