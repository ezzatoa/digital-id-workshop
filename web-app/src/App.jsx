import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MaturityAssessment from './components/MaturityAssessment';
import SimulationsLab from './components/Simulations/SimulationsLab';
import HIndexCalculator from './components/HIndexCalculator';
import ControlledAiStudio from './components/AiStudio/ControlledAiStudio';
import PostWorkshopGuides from './components/PostWorkshopGuides';
import ActionPlanExport from './components/ActionPlanExport';
import SettingsModal from './components/SettingsModal';
import { PRESENTER_INFO, WORKSHOP_MODULES } from './data/initialData';
import { getApiUrl } from './utils/api';
import { ExternalLink, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

const TOTAL_WORKSHOP_SECONDS = 90 * 60; // 90 minutes = 5400s

export default function App() {
  // Determine if this is the exclusive Trainer Page
  const [isTrainerPage, setIsTrainerPage] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path.includes('/trainer') || search.includes('trainer=true');
  });

  const [activeTab, setActiveTab] = useState('maturity');

  // Resilient High-Precision Timer (Wall-clock Date.now() anchored)
  const [timerSeconds, setTimerSeconds] = useState(() => {
    if (typeof window === 'undefined') return TOTAL_WORKSHOP_SECONDS;
    try {
      const saved = localStorage.getItem('taibah_workshop_timer');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isRunning && parsed.endTime) {
          const remaining = Math.max(0, Math.ceil((parsed.endTime - Date.now()) / 1000));
          return remaining;
        } else if (typeof parsed.remainingSeconds === 'number') {
          return parsed.remainingSeconds;
        }
      }
    } catch (e) {}
    return TOTAL_WORKSHOP_SECONDS;
  });

  // Automatically start timer for active workshop session
  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const saved = localStorage.getItem('taibah_workshop_timer');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isRunning === 'boolean') {
          return parsed.isRunning;
        }
      }
    } catch (e) {}
    return true; // Auto-start on load
  });

  const endTimeRef = useRef(null);
  
  // Trainer Mode is active by default ONLY on the trainer page
  const [isTrainerMode, setIsTrainerMode] = useState(isTrainerPage);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Global Progress States
  const [maturityAnswers, setMaturityAnswers] = useState({});
  const [maturityScore, setMaturityScore] = useState(0);
  const [maturityTier, setMaturityTier] = useState('');
  const [badges, setBadges] = useState({
    orcid: false,
    scholar: false,
    rg: false,
    scopus: false
  });
  const [savedAiOutputs, setSavedAiOutputs] = useState([]);

  // Server API status
  const [apiStatus, setApiStatus] = useState({
    apiKeyConfigured: false,
    model: 'gemini-3.8-flash'
  });

  // Check server health on mount
  useEffect(() => {
    fetch(getApiUrl('/api/health'))
      .then(res => res.json())
      .then(data => {
        if (data.status === 'online') {
          setApiStatus({
            apiKeyConfigured: data.apiKeyConfigured,
            model: data.model
          });
        }
      })
      .catch(() => {
        setApiStatus({
          apiKeyConfigured: false,
          model: 'gemini-3.8-flash (مدمج محلياً)'
        });
      });
  }, []);

  // Listen to popstate or url changes if user navigates
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const trainer = path.includes('/trainer') || search.includes('trainer=true');
      setIsTrainerPage(trainer);
      if (trainer) setIsTrainerMode(true);
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Synchronize target endTime with wall-clock Date.now()
  useEffect(() => {
    if (isTimerRunning) {
      const targetEnd = Date.now() + timerSeconds * 1000;
      endTimeRef.current = targetEnd;
      try {
        localStorage.setItem('taibah_workshop_timer', JSON.stringify({
          isRunning: true,
          endTime: targetEnd,
          remainingSeconds: timerSeconds
        }));
      } catch (e) {}
    } else {
      endTimeRef.current = null;
      try {
        localStorage.setItem('taibah_workshop_timer', JSON.stringify({
          isRunning: false,
          endTime: null,
          remainingSeconds: timerSeconds
        }));
      } catch (e) {}
    }
  }, [isTimerRunning]);

  // High-precision clock tick: calculates remaining time directly from Date.now()
  useEffect(() => {
    if (!isTimerRunning) return;

    const tick = () => {
      if (!endTimeRef.current) return;
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));

      setTimerSeconds(remaining);

      if (remaining <= 0) {
        setIsTimerRunning(false);
        try {
          localStorage.setItem('taibah_workshop_timer', JSON.stringify({
            isRunning: false,
            endTime: null,
            remainingSeconds: 0
          }));
        } catch (e) {}
      }
    };

    tick();
    const interval = setInterval(tick, 500); // 500ms intervals guarantee zero second-skip and zero drift

    // Cross-tab sync: if trainer changes timer in another tab or participant navigates
    const handleStorage = (e) => {
      if (e.key === 'taibah_workshop_timer' && e.newValue) {
        try {
          const syncData = JSON.parse(e.newValue);
          if (syncData.isRunning && syncData.endTime) {
            endTimeRef.current = syncData.endTime;
            setIsTimerRunning(true);
            const remaining = Math.max(0, Math.ceil((syncData.endTime - Date.now()) / 1000));
            setTimerSeconds(remaining);
          } else {
            setIsTimerRunning(false);
            if (typeof syncData.remainingSeconds === 'number') {
              setTimerSeconds(syncData.remainingSeconds);
            }
          }
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, [isTimerRunning]);

  const resetTimer = () => {
    const targetEnd = Date.now() + TOTAL_WORKSHOP_SECONDS * 1000;
    endTimeRef.current = targetEnd;
    setTimerSeconds(TOTAL_WORKSHOP_SECONDS);
    setIsTimerRunning(true);
    try {
      localStorage.setItem('taibah_workshop_timer', JSON.stringify({
        isRunning: true,
        endTime: targetEnd,
        remainingSeconds: TOTAL_WORKSHOP_SECONDS
      }));
    } catch (e) {}
  };

  const handleCompleteMaturity = (score, tier) => {
    setMaturityScore(score);
    setMaturityTier(tier);
    setActiveTab('simulations');
  };

  const handleCompleteBadge = (platformId) => {
    setBadges(prev => ({
      ...prev,
      [platformId]: true
    }));
  };

  const handleSaveAiOutput = (item) => {
    setSavedAiOutputs(prev => [item, ...prev]);
  };

  // Strictly enforce that participants never see trainer mode
  const effectiveTrainerMode = isTrainerPage && isTrainerMode;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-taibah-emerald selection:text-white">
      
      {/* Exclusive Top Trainer Control Bar */}
      {isTrainerPage && (
        <aside aria-label="شريط تحكم المدرب" className="bg-amber-400 text-slate-950 px-4 py-2.5 text-xs font-semibold border-b border-amber-500 shadow-sm no-print sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base">👑</span>
              <span className="font-bold text-sm">لوحة تحكم مقدم ومعد الورشة (د. عزت عمر عبدالله أبوعزه)</span>
              <span className="bg-slate-900 text-white px-2 py-0.5 rounded-full text-[10px] font-mono">
                TRAINER CONSOLE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-800 text-[11px] hidden md:inline">
                {effectiveTrainerMode ? '🎯 إرشادات المدرب ونماذج الحلول معروضة' : '⚪ تم إخفاء إرشادات المدرب'}
              </span>

              <button
                onClick={() => setSettingsOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-300" />
                <span>إعدادات الذكاء الاصطناعي (API)</span>
              </button>

              <a
                href="/digital-id-workshop"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition shadow-xs"
                title="فتح شاشة المتدرب العادية في نافذة منفصلة للمعاينة"
              >
                <span>معاينة شاشة المتدربين</span>
                <ExternalLink className="w-3 h-3 text-slate-600" />
              </a>
            </div>
          </div>
        </aside>
      )}

      {/* Header with Navigation & Timer */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        resetTimer={resetTimer}
        isTrainerMode={effectiveTrainerMode}
        setIsTrainerMode={setIsTrainerMode}
        openSettingsModal={() => setSettingsOpen(true)}
        apiStatus={apiStatus}
        isTrainerPage={isTrainerPage}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'maturity' && (
          <MaturityAssessment
            answers={maturityAnswers}
            setAnswers={setMaturityAnswers}
            onComplete={handleCompleteMaturity}
            isTrainerMode={effectiveTrainerMode}
          />
        )}

        {activeTab === 'simulations' && (
          <SimulationsLab
            badges={badges}
            onCompleteBadge={handleCompleteBadge}
            isTrainerMode={effectiveTrainerMode}
          />
        )}

        {activeTab === 'metrics' && (
          <HIndexCalculator
            isTrainerMode={effectiveTrainerMode}
          />
        )}

        {activeTab === 'ai_studio' && (
          <ControlledAiStudio
            isTrainerMode={effectiveTrainerMode}
            onSaveToPlan={handleSaveAiOutput}
            apiStatus={apiStatus}
          />
        )}

        {activeTab === 'guides' && (
          <PostWorkshopGuides />
        )}

        {activeTab === 'action_plan' && (
          <ActionPlanExport
            maturityScore={maturityScore}
            maturityTier={maturityTier}
            maturityAnswers={maturityAnswers}
            badges={badges}
            savedAiOutputs={savedAiOutputs}
          />
        )}
      </main>

      {/* Settings Modal (Accessible ONLY via Trainer Page) */}
      {isTrainerPage && (
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          apiStatus={apiStatus}
          onUpdateSettings={(newSettings) => {
            setApiStatus(prev => ({
              ...prev,
              apiKeyConfigured: !!newSettings.userApiKey || prev.apiKeyConfigured,
              model: newSettings.model || prev.model
            }));
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-6 px-4 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">جامعة طيبة - عمادة التطوير والجودة</span>
            <span>•</span>
            <span>الخطة التدريبية 1448هـ / 2026م</span>
          </div>

          <div className="text-center sm:text-left flex items-center gap-3">
            <div>
              <span>إعداد وتقديم: </span>
              <span className="font-bold text-taibah-cyan">{PRESENTER_INFO.name}</span>
              <span className="text-slate-500 mr-1">({PRESENTER_INFO.title} - {PRESENTER_INFO.college})</span>
            </div>

            {/* Quick discrete trainer switch in footer for convenience */}
            {!isTrainerPage && (
              <a 
                href="/digital-id-workshop/trainer" 
                className="text-[10px] text-slate-500 hover:text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 transition"
                title="بوابة دخول المدرب"
              >
                دخول المدرب 🎯
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
