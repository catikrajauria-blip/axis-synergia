import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Code2, 
  BarChart3, 
  Activity,
  Sparkles,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

interface ExecutiveHeaderProps {
  portfolioValue: string;
  riskScore: number;
  avgTat: string;
  autoApprovedToday: string;
  autoEngineActive: boolean;
  onToggleAutoEngine: () => void;
  onOpenSchemaModal: () => void;
  onOpenAnalyticsModal: () => void;
  onTriggerTelemetrySpike: () => void;
  riskAppetite: 'Balanced' | 'Growth' | 'Prudent';
  onChangeRiskAppetite: (val: 'Balanced' | 'Growth' | 'Prudent') => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  portfolioValue,
  riskScore,
  avgTat,
  autoApprovedToday,
  autoEngineActive,
  onToggleAutoEngine,
  onOpenSchemaModal,
  onOpenAnalyticsModal,
  onTriggerTelemetrySpike,
  riskAppetite,
  onChangeRiskAppetite
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      {/* Top Corporate Strip */}
      <div className="bg-[#97124B] text-white px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-white rotate-45"></div>
          </div>
          <div className="flex items-center gap-2 font-semibold tracking-wide">
            <span className="font-extrabold tracking-wider text-white">AXIS BANK</span>
          </div>
          <span className="text-white/60 hidden sm:inline">|</span>
          <span className="text-white/90 font-medium hidden sm:inline">
            Commercial Banking Group (CBG) & MSME Credit Engine
          </span>
          <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded font-mono">
            v2035.4-AUTONOMOUS
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5 text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
            <span className="font-mono text-[11px]">RBI Account Aggregator Live</span>
          </div>

          <button
            onClick={onOpenSchemaModal}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded transition-colors text-[11px] font-medium"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Inspect System Instructions & Schema</span>
            <span className="md:hidden">Schema</span>
          </button>
        </div>
      </div>

      {/* Main Title & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#97124B] rounded-lg flex items-center justify-center shadow-sm shrink-0">
              <div className="w-5 h-5 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  AXIS <span className="text-[#97124B]">AMBIENT-CREDIT</span> 2035
                </h1>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 tracking-wider">
                  <Sparkles className="w-3 h-3 text-emerald-600" /> Continuous Underwrite
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mt-0.5">
                Autonomous Commercial Underwriting Engine • Commercial & MSME Division
              </p>
            </div>
          </div>

          {/* Quick Engine Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Risk Appetite Selector */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500 ml-1" />
              <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider mr-1 hidden sm:inline">Guardrails:</span>
              {(['Balanced', 'Growth', 'Prudent'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onChangeRiskAppetite(mode)}
                  className={`px-2.5 py-1 rounded font-semibold transition-all text-xs ${
                    riskAppetite === mode
                      ? 'bg-white text-[#97124B] shadow-2xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Auto Engine Toggle */}
            <button
              onClick={onToggleAutoEngine}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                autoEngineActive
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${autoEngineActive ? 'text-emerald-600 animate-pulse' : 'text-gray-400'}`} />
              <span>Engine: {autoEngineActive ? 'AUTONOMOUS' : 'MANUAL'}</span>
            </button>

            <button
              onClick={onTriggerTelemetrySpike}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-gray-200"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
              <span>Simulate Surge</span>
            </button>

            <button
              onClick={onOpenAnalyticsModal}
              className="flex items-center gap-1.5 bg-[#97124B] hover:bg-[#7A0C3C] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Portfolio Analytics</span>
            </button>
          </div>
        </div>

        {/* 4 Executive Metric Cards with Professional Polish border-left accent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="metric-card rounded-xl p-4 border border-gray-200 transition-all">
            <div className="flex items-center justify-between text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Portfolio Value</span>
              <TrendingUp className="w-4 h-4 text-[#97124B]" />
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {portfolioValue}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px]">
              <span className="text-emerald-600 font-semibold">↑ ₹420 Cr today</span>
              <span className="text-gray-400">| 14,820 CBG Accounts</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-emerald-500 shadow-2xs transition-all">
            <div className="flex items-center justify-between text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Risk Health</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 tracking-tight flex items-baseline gap-1">
              <span>{riskScore.toFixed(1)}%</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Optimal</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px]">
              <span className="text-emerald-600 font-semibold">99.4% Low Volatility</span>
              <span className="text-gray-400">| 0.18% Stress</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-blue-500 shadow-2xs transition-all">
            <div className="flex items-center justify-between text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Avg Underwriting TAT</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {avgTat}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px]">
              <span className="text-blue-600 font-semibold">-99.7% vs 12 Days</span>
              <span className="text-gray-400">| Instant API</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 border-l-4 border-l-[#97124B] shadow-2xs transition-all">
            <div className="flex items-center justify-between text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Today's Auto Vol</span>
              <Zap className="w-4 h-4 text-[#97124B]" />
            </div>
            <div className="text-2xl font-bold text-[#97124B] tracking-tight">
              {autoApprovedToday}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px]">
              <span className="text-gray-700 font-semibold">87.4% Straight-Through</span>
              <span className="text-gray-400">| 12.6% ACO</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
