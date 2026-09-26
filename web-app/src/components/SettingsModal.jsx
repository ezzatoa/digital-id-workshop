import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, apiStatus, onUpdateSettings }) {
  const [userKey, setUserKey] = useState(localStorage.getItem('USER_GEMINI_KEY') || '');
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem('USER_GEMINI_MODEL') || 'gemini-3.8-flash');
  const [saveMessage, setSaveMessage] = useState(false);

  useEffect(() => {
    setUserKey(localStorage.getItem('USER_GEMINI_KEY') || '');
    setSelectedModel(localStorage.getItem('USER_GEMINI_MODEL') || 'gemini-3.8-flash');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('USER_GEMINI_KEY', userKey.trim());
    localStorage.setItem('USER_GEMINI_MODEL', selectedModel);
    if (onUpdateSettings) {
      onUpdateSettings({
        userApiKey: userKey.trim(),
        model: selectedModel
      });
    }
    setSaveMessage(true);
    setTimeout(() => {
      setSaveMessage(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem('USER_GEMINI_KEY');
    setUserKey('');
    if (onUpdateSettings) {
      onUpdateSettings({
        userApiKey: '',
        model: selectedModel
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden space-y-4">
        {/* Modal Header */}
        <div className="bg-taibah-navy text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-taibah-cyan" />
            <h3 className="font-bold text-base">إعدادات الاتصال بـ Google AI Studio</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Server status alert */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">حالة الربط على خادم VPS:</span>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">مفتاح البيئة .env العام:</span>
              <span className={`font-bold ${apiStatus.apiKeyConfigured ? 'text-emerald-600' : 'text-amber-600'}`}>
                {apiStatus.apiKeyConfigured ? 'مفعل ومتاح لجميع المتدربين ✔' : 'غير مضبوط (المحاكي الذكي نشط)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">النموذج الافتراضي:</span>
              <span className="font-mono font-bold text-taibah-navy">{apiStatus.model || 'gemini-3.8-flash'}</span>
            </div>
          </div>

          {/* Optional Individual API Key input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700">مفتاح API خاص بك (اختياري للمتدرب):</label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-taibah-emerald hover:underline flex items-center gap-0.5"
              >
                <span>الحصول على مفتاح مجاني</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-taibah-emerald outline-none"
            />
            <span className="text-[10px] text-slate-400 block">
              إذا تركته فارغاً، سيستخدم التطبيق تلقائياً المفتاح المضبوط مسبقاً في الخادم، أو المحاكي الذكي المدمج.
            </span>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">تحديد نموذج Gemini Flash:</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono text-xs outline-none"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (الأحدث والأسرع - الموصى به)</option>
              <option value="gemini-3.7-flash">gemini-3.7-flash (المحدد بالطلب)</option>
              <option value="gemini-flash-latest">gemini-flash-latest</option>
            </select>
          </div>

          {/* Anti-Abuse Note */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-[11px] leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>نظام حماية الحصة والنزاهة الأكاديمية:</strong>
              جميع طلبات الذكاء الاصطناعي مقيدة بقوالب موجهة مغلقة (Fixed Prompts) لمنع استهلاك الحصة وضمان دقة المخرجات للبحث العلمي.
            </div>
          </div>

          {saveMessage && (
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-center font-bold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" /> تم حفظ الإعدادات بنجاح!
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-slate-500 hover:text-rose-600 text-xs font-semibold"
          >
            مسح المفتاح الخاص
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-semibold"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-taibah-emerald hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition"
            >
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
