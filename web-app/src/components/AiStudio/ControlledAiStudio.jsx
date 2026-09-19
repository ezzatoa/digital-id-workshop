import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Copy, Check, Send, AlertCircle, 
  HelpCircle, RefreshCw, FileText, Lock, Globe, Share2, Calendar, Search 
} from 'lucide-react';
import { AI_PROMPT_TEMPLATES_CONFIG } from '../../data/initialData';

export default function ControlledAiStudio({ isTrainerMode, onSaveToPlan, apiStatus }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState('seo_title_keywords');
  const [formInputs, setFormInputs] = useState({
    field: 'تقنية الأشعة والتصوير الطبي',
    currentTitle: 'Evaluating Low-Dose CT Protocols in Diagnostic Imaging',
    mainFindings: '30% radiation dose reduction, deep learning image denoising, multicenter clinical validation',
    targetAudience: 'الجمهور العام وصناع القرار في القطاع الصحي',
    abstractText: 'We developed an optimized CT imaging protocol using convolutional neural networks that reduces radiation dose by 35% without degrading structural fidelity in acute abdominal scans.',
    targetPI: 'Prof. David Reynolds, Director of Biomedical Imaging Lab, Imperial College London',
    researchTopic: 'Cross-population validation of automated radiation dose tracking algorithms',
    ourContribution: 'A curated dataset of 1,200 annotated clinical CT scans from Medina regional medical centers and dedicated team of imaging specialists',
    paperType: 'ورقة بحثية أصيلة (Original Research Article)',
    openAccessStatus: 'وصول مفتوح أخضر (Green OA - مسموح مشاركة نسخة المؤلف AAM)',
    platforms: 'ORCID, Google Scholar, ResearchGate, مستودع جامعة طيبة الرقمي, LinkedIn'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savedToPlanNotice, setSavedToPlanNotice] = useState(false);

  const currentTemplate = AI_PROMPT_TEMPLATES_CONFIG.find(t => t.id === selectedTemplateId) || AI_PROMPT_TEMPLATES_CONFIG[0];

  const handleInputChange = (name, value) => {
    setFormInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setSavedToPlanNotice(false);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplateId,
          inputs: formInputs
        })
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        setResult({
          isMock: true,
          output: `خطأ في الاتصال: ${data.error || 'حدث خطأ غير متوقع'}`
        });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Fallback response
      setResult({
        isMock: true,
        output: 'تعذر الاتصال بالخادم، يرجى التأكد من تشغيل server.js أو تفعيل المحاكي المدمج.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToPlan = () => {
    if (onSaveToPlan && result?.output) {
      onSaveToPlan({
        templateId: selectedTemplateId,
        templateName: currentTemplate.name,
        output: result.output
      });
      setSavedToPlanNotice(true);
      setTimeout(() => setSavedToPlanNotice(false), 3000);
    }
  };

  const getTemplateIcon = (id) => {
    switch (id) {
      case 'seo_title_keywords': return <Search className="w-4 h-4 text-emerald-400" />;
      case 'lay_summary': return <Share2 className="w-4 h-4 text-blue-400" />;
      case 'collaboration_pitch': return <Globe className="w-4 h-4 text-amber-400" />;
      case 'dissemination_plan': return <Calendar className="w-4 h-4 text-purple-400" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 04 | الذكاء الاصطناعي المنضبط
            </span>
            <span className="text-xs text-slate-300">الزمن المقترح: 20 دقيقة</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            مختبر الأوامر الموجهة المقيدة (Prompt Guardrails Studio)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            توليد مخرجات أكاديمية محكمة عبر نموذج <span className="font-semibold text-taibah-cyan font-mono">Gemini Flash</span> باستخدام قوالب موجهة مقيدة بملء الفراغات لمنع الهلوسة وإساءة الاستخدام.
          </p>
        </div>

        {/* API Status Badge */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 min-w-[200px] text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">حالة المفتاح بالخادم:</span>
            <span className={`font-bold ${apiStatus.apiKeyConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
              {apiStatus.apiKeyConfigured ? 'مفعل على VPS ✔' : 'المحاكي الذكي نشط'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">النموذج:</span>
            <span className="font-mono text-slate-200">{apiStatus.model || 'gemini-3.8-flash'}</span>
          </div>
        </div>
      </div>

      {isTrainerMode && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 text-xs text-emerald-900">
          <span className="font-bold">🎯 توجيه المحاضر للشريحة رقم 32-36:</span>
          اشرح للزملاء فلسفة "الأوامر المقيدة بملء الفراغات": لا نطلب من الباحث كتابة برومبت مفتوح، بل وفرنا قوالب نظام (System Prompts) محكمة مسبقاً، والمطلوب منه فقط تخصيص الفراغات بما يناسب ورقته البحثية الحقيقية لضمان أعلى جودة وحماية الحصة.
        </div>
      )}

      {/* Template Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AI_PROMPT_TEMPLATES_CONFIG.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              onClick={() => {
                setSelectedTemplateId(template.id);
                setResult(null);
              }}
              className={`p-4 rounded-xl border text-right transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-taibah-emerald shadow-md ring-2 ring-taibah-emerald/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-600'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg bg-slate-900 text-white shrink-0">
                    {getTemplateIcon(template.id)}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      القالب النشط
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {template.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workspace: Left Fill-in-the-Blanks Form, Right Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Strictly Fill-in-the-Blanks */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-taibah-emerald" />
              <h3 className="text-sm font-bold text-slate-900">
                الفراغات المقيدة للمدخلات (Fill-in-the-Blanks)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">القالب مغلق ومحكم</span>
          </div>

          <div className="space-y-3.5">
            {currentTemplate.fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {field.label} {field.required && <span className="text-rose-500">*</span>}
                </label>
                {field.name === 'abstractText' || field.name === 'mainFindings' || field.name === 'ourContribution' ? (
                  <textarea
                    rows={3}
                    value={formInputs[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-taibah-emerald outline-none transition text-left"
                    dir={field.name === 'abstractText' || field.name === 'mainFindings' ? 'ltr' : 'rtl'}
                  />
                ) : (
                  <input
                    type="text"
                    value={formInputs[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-taibah-emerald outline-none transition text-left"
                    dir={field.name === 'targetPI' || field.name === 'currentTitle' ? 'ltr' : 'rtl'}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Locked System Instructions Preview */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ضوابط الحماية والنزاهة المفعلة:</span>
            </div>
            <p>
              يتم دمج هذه المدخلات في قالب أكاديمي محكم مسبقاً يمنع الخروج عن السياق العلمي ويفرض معايير النشر الدولي.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-taibah-navy to-taibah-emerald hover:from-slate-900 hover:to-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>جاري المعالجة الأكاديمية عبر Gemini Flash...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-taibah-cyan" />
                <span>توليد المخرجات الأكاديمية عبر الذكاء الاصطناعي</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Display */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  المخرجات الأكاديمية المولدة (Generated Output)
                </h3>
              </div>

              {result && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
                  </button>

                  <button
                    onClick={handleSaveToPlan}
                    className="px-3 py-1 rounded-lg bg-taibah-emerald/10 text-taibah-emerald hover:bg-taibah-emerald/20 text-xs font-bold transition flex items-center gap-1 border border-taibah-emerald/30"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>حفظ في خطة العمل</span>
                  </button>
                </div>
              )}
            </div>

            {savedToPlanNotice && (
              <div className="mt-2 p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>تم حفظ هذه المخرجات في خطة العمل الفردية الشخصية بنجاح!</span>
              </div>
            )}

            {/* Output Content Area */}
            <div className="mt-4 min-h-[360px] p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans overflow-y-auto max-h-[500px] whitespace-pre-wrap">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
                  <div className="w-10 h-10 border-4 border-taibah-emerald border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-semibold text-slate-600">
                    جاري صياغة المخرجات الأكاديمية بنموذج Gemini Flash...
                  </p>
                </div>
              ) : result ? (
                <div>
                  {result.isMock && (
                    <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>{result.note || 'تم توليد هذه النتيجة عبر المحاكي الأكاديمي الذكي المدمج في التطبيق.'}</span>
                    </div>
                  )}
                  {result.output}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400 space-y-2 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 text-2xl">
                    ✍️
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    اختر أحد القوالب الأكاديمية واملأ الفراغات باليسار ثم اضغط توليد المخرجات
                  </p>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    تحصل على صيغ عناوين محسنة لمحركات البحث أو ملخصات تبسيطية أو خطابات استقطاب شراكات دولية في ثوانٍ.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
            <span>مدعوم بواسطة Google AI Studio - Gemini Flash</span>
            <span>بإشراف: د. عزت عمر عبدالله أبوعزه</span>
          </div>
        </div>
      </div>
    </div>
  );
}
