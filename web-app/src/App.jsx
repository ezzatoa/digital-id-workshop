import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('maturity');
  const [timerSeconds, setTimerSeconds] = useState(90 * 60); // 90 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTrainerMode, setIsTrainerMode] = useState(false);
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
        // Fallback status if running pure static or offline
        setApiStatus({
          apiKeyConfigured: false,
          model: 'gemini-3.8-flash (مدمج محلياً)'
        });
      });
  }, []);

  // Timer interval effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(90 * 60);
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-taibah-emerald selection:text-white">
      {/* Header with Navigation & Timer */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        resetTimer={resetTimer}
        isTrainerMode={isTrainerMode}
        setIsTrainerMode={setIsTrainerMode}
        openSettingsModal={() => setSettingsOpen(true)}
        apiStatus={apiStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'maturity' && (
          <MaturityAssessment
            answers={maturityAnswers}
            setAnswers={setMaturityAnswers}
            onComplete={handleCompleteMaturity}
            isTrainerMode={isTrainerMode}
          />
        )}

        {activeTab === 'simulations' && (
          <SimulationsLab
            badges={badges}
            onCompleteBadge={handleCompleteBadge}
            isTrainerMode={isTrainerMode}
          />
        )}

        {activeTab === 'metrics' && (
          <HIndexCalculator
            isTrainerMode={isTrainerMode}
          />
        )}

        {activeTab === 'ai_studio' && (
          <ControlledAiStudio
            isTrainerMode={isTrainerMode}
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
            badges={badges}
            savedAiOutputs={savedAiOutputs}
          />
        )}
      </main>

      {/* Settings Modal */}
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-6 px-4 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">جامعة طيبة - عمادة التطوير والجودة</span>
            <span>•</span>
            <span>الخطة التدريبية 1448هـ / 2026م</span>
          </div>

          <div className="text-center sm:text-left">
            <span>إعداد وتقديم: </span>
            <span className="font-bold text-taibah-cyan">{PRESENTER_INFO.name}</span>
            <span className="text-slate-500 mr-1">({PRESENTER_INFO.title} - {PRESENTER_INFO.college})</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
