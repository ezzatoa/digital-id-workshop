import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';
import OrcidSimulation from './OrcidSimulation';
import ScholarSimulation from './ScholarSimulation';
import ResearchGateSimulation from './ResearchGateSimulation';
import ScopusSimulation from './ScopusSimulation';

export default function SimulationsLab({ badges, onCompleteBadge, isTrainerMode }) {
  const [activePlatform, setActivePlatform] = useState('orcid');

  const platforms = [
    { id: 'orcid', name: '1. منصة ORCID', icon: 'iD', color: 'text-[#a6ce39]' },
    { id: 'scholar', name: '2. باحث Google', icon: 'G', color: 'text-[#4285f4]' },
    { id: 'rg', name: '3. ResearchGate', icon: 'RG', color: 'text-[#00ccbb]' },
    { id: 'scopus', name: '4. Scopus & WoS', icon: 'Sc', color: 'text-[#e9711c]' }
  ];

  const completedCount = Object.values(badges).filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Top Banner with Progress & Badges */}
      <div className="bg-gradient-to-r from-taibah-navy to-slate-900 text-white rounded-2xl p-6 shadow-md border border-taibah-emerald/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-taibah-emerald/20 text-taibah-emerald border border-taibah-emerald/40">
              المحطة 02 | المنصات الأربع الكبرى
            </span>
            <span className="text-xs text-slate-300">الزمن المقترح: 30 دقيقة</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            مختبرات المحاكاة الافتراضية لمنصات الهوية الأكاديمية
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            تدرب بحرية تامة على بيئات تحاكي الأنظمة الحقيقية بنسبة 100% دون الحاجة للتسجيل أثناء الورشة.
          </p>
        </div>

        {/* Badges Earned */}
        <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 min-w-[240px]">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span>الشارات المكتملة:</span>
            <span className="font-bold text-taibah-cyan font-mono">{completedCount} / 4</span>
          </div>
          <div className="flex items-center gap-2">
            {platforms.map(p => (
              <div
                key={p.id}
                className={`flex-1 py-1.5 rounded-lg text-center text-xs font-bold border transition ${
                  badges[p.id] 
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500' 
                    : 'bg-slate-900/60 text-slate-500 border-slate-700'
                }`}
                title={p.name}
              >
                {badges[p.id] ? '✔ ' + p.icon : p.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {platforms.map(p => {
          const isActive = activePlatform === p.id;
          const isDone = badges[p.id];
          return (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-white text-taibah-navy border-taibah-emerald shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200/70'
              }`}
            >
              <span className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center font-bold bg-slate-900 text-white ${p.color}`}>
                {p.icon}
              </span>
              <span>{p.name}</span>
              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1" />}
            </button>
          );
        })}
      </div>

      {/* Active Platform Simulation View */}
      <div className="transition-all">
        {activePlatform === 'orcid' && (
          <OrcidSimulation 
            onCompleteBadge={onCompleteBadge} 
            isCompleted={badges.orcid}
            isTrainerMode={isTrainerMode}
          />
        )}
        {activePlatform === 'scholar' && (
          <ScholarSimulation 
            onCompleteBadge={onCompleteBadge} 
            isCompleted={badges.scholar}
            isTrainerMode={isTrainerMode}
          />
        )}
        {activePlatform === 'rg' && (
          <ResearchGateSimulation 
            onCompleteBadge={onCompleteBadge} 
            isCompleted={badges.rg}
            isTrainerMode={isTrainerMode}
          />
        )}
        {activePlatform === 'scopus' && (
          <ScopusSimulation 
            onCompleteBadge={onCompleteBadge} 
            isCompleted={badges.scopus}
            isTrainerMode={isTrainerMode}
          />
        )}
      </div>
    </div>
  );
}
