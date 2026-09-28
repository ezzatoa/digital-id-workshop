import React, { useEffect } from 'react';
import { 
  X, ExternalLink, Download, Maximize2, MonitorPlay, 
  Presentation, FileText, Sparkles, BookOpen 
} from 'lucide-react';
import { WORKSHOP_PRESENTATION, PRESENTER_INFO } from '../data/initialData';

export default function PresentationViewerModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-700/40 overflow-hidden flex flex-col max-h-[96vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-taibah-navy via-slate-900 to-taibah-navy text-white px-5 py-4 border-b border-taibah-emerald/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-taibah-emerald/20 border border-taibah-emerald/50 flex items-center justify-center text-taibah-cyan shadow-inner shrink-0">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="modal-headline" className="text-base sm:text-lg font-bold text-white leading-tight">
                  {WORKSHOP_PRESENTATION.title}
                </h2>
                <span className="text-[11px] bg-taibah-emerald/30 text-emerald-300 border border-taibah-emerald/50 px-2 py-0.5 rounded-full font-medium">
                  Google Slides • 40 شريحة
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                إعداد وتقديم: <span className="text-taibah-cyan font-semibold">{PRESENTER_INFO.name}</span> — جامعة طيبة
              </p>
            </div>
          </div>

          {/* Quick Action Links & Close */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={WORKSHOP_PRESENTATION.presentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-taibah-emerald hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="عرض الشرائح بملء الشاشة في نافذة جديدة"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">عرض كامل (Present)</span>
            </a>

            <a
              href={WORKSHOP_PRESENTATION.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition flex items-center gap-1.5 border border-slate-700"
              title="فتح العرض مباشرة في Google Slides"
            >
              <ExternalLink className="w-3.5 h-3.5 text-taibah-cyan" />
              <span className="hidden md:inline">Google Slides</span>
            </a>

            <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
              <a
                href={WORKSHOP_PRESENTATION.pdfExportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded text-xs font-medium transition flex items-center gap-1"
                title="تحميل نسخة PDF من الشرائح"
              >
                <Download className="w-3 h-3 text-red-400" />
                <span>PDF</span>
              </a>
              <span className="text-slate-600">|</span>
              <a
                href={WORKSHOP_PRESENTATION.pptxExportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded text-xs font-medium transition flex items-center gap-1"
                title="تحميل نسخة PowerPoint (.pptx)"
              >
                <Download className="w-3 h-3 text-amber-400" />
                <span>PPTX</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 hover:text-rose-200 text-slate-300 transition cursor-pointer border border-slate-700 mr-1"
              title="إغلاق العرض"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Presentation Frame */}
        <div className="relative w-full bg-slate-950 flex-1 min-h-[480px] sm:min-h-[560px] md:min-h-[620px] overflow-hidden flex items-center justify-center">
          <iframe
            src={WORKSHOP_PRESENTATION.embedUrl}
            title="Google Slides Presentation"
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            loading="lazy"
          ></iframe>
        </div>

        {/* Modal Bottom Bar / Helper Info */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-2 text-right">
            <span className="text-emerald-600 font-bold">💡 إرشاد:</span>
            <span>
              استخدم الأسهم السفلية لشريط العرض للتبديل بين الـ 40 شريحة، أو انقر على العرض واستخدم أزرار الأسهم في لوحة المفاتيح.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WORKSHOP_PRESENTATION.pdfExportUrl}
              className="px-2.5 py-1 text-slate-700 hover:text-taibah-navy bg-white hover:bg-slate-100 rounded-md border border-slate-300 transition text-[11px] font-semibold flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-red-500" />
              <span>تحميل كـ PDF</span>
            </a>
            <a
              href={WORKSHOP_PRESENTATION.pptxExportUrl}
              className="px-2.5 py-1 text-slate-700 hover:text-taibah-navy bg-white hover:bg-slate-100 rounded-md border border-slate-300 transition text-[11px] font-semibold flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-amber-500" />
              <span>تحميل كـ PowerPoint</span>
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-md transition text-[11px] cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
