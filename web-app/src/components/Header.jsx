import React, { useState } from 'react';
import { 
  Play, Pause, RotateCcw, Clock, Award, Settings, UserCheck, 
  HelpCircle, Sparkles, BookOpen, BarChart3, ShieldCheck 
} from 'lucide-react';
import { PRESENTER_INFO } from '../data/initialData';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  timerSeconds, 
  isTimerRunning, 
  setIsTimerRunning, 
  resetTimer, 
  isTrainerMode, 
  setIsTrainerMode,
  openSettingsModal,
  apiStatus
}) {
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const navItems = [
    { id: 'maturity', label: '1. مقياس النضج الرقمي', icon: ShieldCheck },
    { id: 'simulations', label: '2. مختبر المحاكيات الأربعة', icon: UserCheck },
    { id: 'metrics', label: '3. حاسبة معامل h ومؤشرات الأثر', icon: BarChart3 },
    { id: 'ai_studio', label: '4. مختبر الذكاء الاصطناعي المقيد', icon: Sparkles },
    { id: 'guides', label: '5. أدلة ما بعد الورشة', icon: BookOpen },
    { id: 'action_plan', label: '6. خطة العمل والشهادة', icon: Award },
  ];

  return (
    <header className="bg-taibah-navy text-white shadow-xl sticky top-0 z-40 border-b border-taibah-emerald/30">
      {/* Top University Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-taibah-emerald to-taibah-cyan flex items-center justify-center font-bold text-lg text-taibah-navy shadow-md">
            ط
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base sm:text-lg">جامعة طيبة</span>
              <span className="text-xs bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40 px-2 py-0.5 rounded-full font-medium">
                عمادة التطوير والجودة 1448هـ
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {PRESENTER_INFO.workshopTitle} (البرنامج رقم {PRESENTER_INFO.workshopCode})
            </p>
          </div>
        </div>

        {/* Presenter & Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Presenter Card Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="text-slate-300">تقديم: </span>
              <span className="font-semibold text-taibah-cyan">{PRESENTER_INFO.name}</span>
              <span className="text-slate-400 text-[11px] block">{PRESENTER_INFO.title} - {PRESENTER_INFO.college}</span>
            </div>
          </div>

          {/* 90-Min Workshop Timer */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-taibah-emerald/50 px-3 py-1.5 rounded-xl shadow-inner">
            <Clock className="w-4 h-4 text-taibah-cyan" />
            <div className="text-center font-mono">
              <span className={`text-base font-bold tracking-wider ${timerSeconds < 600 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {formatTime(timerSeconds)}
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1">مؤقت الورشة (90 د)</span>
            </div>
            <div className="flex items-center gap-1 mr-1">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title={isTimerRunning ? 'إيقاف مؤقت' : 'تشغيل المؤقت'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="إعادة ضبط 90 دقيقة"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Trainer Mode Toggle */}
          <button
            onClick={() => setIsTrainerMode(!isTrainerMode)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
              isTrainerMode 
                ? 'bg-taibah-gold text-slate-950 border-amber-300 shadow-md' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="تبديل وضع المدرب (إرشادات العرض والحلول)"
          >
            <span className="text-sm">🎯</span>
            <span className="hidden sm:inline">{isTrainerMode ? 'وضع المدرب نشط' : 'وضع المتدرب'}</span>
          </button>

          {/* Settings Modal Trigger */}
          <button
            onClick={openSettingsModal}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition relative"
            title="إعدادات الربط والذكاء الاصطناعي"
          >
            <Settings className="w-4 h-4" />
            <span className={`w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 ${apiStatus.apiKeyConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-taibah-emerald to-emerald-600 text-white shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
