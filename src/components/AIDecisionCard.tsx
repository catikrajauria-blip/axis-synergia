import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Clock, 
  IndianRupee, 
  ArrowUpRight, 
  FileText, 
  Download, 
  UserCheck, 
  Zap, 
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';
import { CreditEvaluationResult, OperatingAction, RiskTier } from '../types';

interface AIDecisionCardProps {
  evaluation: CreditEvaluationResult | null;
  onSendToACOQueue: (evaluation: CreditEvaluationResult) => void;
  isAlreadyInACOQueue?: boolean;
}

export const AIDecisionCard: React.FC<AIDecisionCardProps> = ({
  evaluation,
  onSendToACOQueue,
  isAlreadyInACOQueue = false
}) => {
  if (!evaluation) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-xs">
        <div className="max-w-md mx-auto">
          <div className="p-3 bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Cpu className="w-6 h-6 text-[#97124B]" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Continuous AI Underwriting Engine Ready
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Select a preset MSME above or enter custom telemetry parameters and click "Run Continuous AI Underwrite" to generate instant real-time credit decisioning.
          </p>
        </div>
      </div>
    );
  }

  const {
    client_profile,
    underwriting_summary,
    key_risk_indicators = [],
    agent_diagnostics = [],
    operating_model_routing,
    rm_strategic_upsell,
    timestamp
  } = evaluation;

  const { health_score, risk_tier, operating_action, approved_dynamic_credit_limit_inr, baseline_limit_inr } = underwriting_summary;

  const getActionBadge = (action: OperatingAction) => {
    switch (action) {
      case 'AUTO_APPROVE':
        return (
          <div className="bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl font-extrabold text-xs tracking-wider flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4" /> AUTO-APPROVE
          </div>
        );
      case 'ACO_ESCALATION':
        return (
          <div className="bg-amber-500 text-white px-3.5 py-1.5 rounded-xl font-extrabold text-xs tracking-wider flex items-center gap-1.5 shadow-xs">
            <AlertTriangle className="w-4 h-4" /> ACO ESCALATION
          </div>
        );
      case 'CREDIT_FREEZE':
        return (
          <div className="bg-rose-600 text-white px-3.5 py-1.5 rounded-xl font-extrabold text-xs tracking-wider flex items-center gap-1.5 shadow-xs">
            <XCircle className="w-4 h-4" /> RISK FREEZE
          </div>
        );
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 75) return { text: 'text-emerald-600', bg: 'bg-emerald-500', stroke: '#10B981', label: 'Healthy / Low Risk' };
    if (score >= 50) return { text: 'text-amber-600', bg: 'bg-amber-500', stroke: '#F59E0B', label: 'Moderate Risk / Caution' };
    return { text: 'text-rose-600', bg: 'bg-rose-600', stroke: '#EF4444', label: 'High Risk / Severe' };
  };

  const healthStyle = getHealthColor(health_score);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all">
      {/* Top Banner with Axis Burgundy accent */}
      <div className="bg-[#97124B] text-white p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">CLIENT AI DIAGNOSTIC DOSSIER</span>
            <span className="text-white/40">•</span>
            <span className="text-[10px] font-mono text-white/80">{timestamp || "Just now"}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {client_profile.company_name}
          </h2>
          <div className="flex items-center gap-3 text-xs text-white/90 mt-1 font-medium">
            <span className="font-bold text-amber-200">{client_profile.sector}</span>
            <span className="text-white/40">|</span>
            <span>Annual GST: {client_profile.annual_gst_revenue_inr || "N/A"}</span>
            <span className="text-white/40">|</span>
            <span>{client_profile.analyzed_period}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {getActionBadge(operating_action)}
        </div>
      </div>

      {/* Main Score & Limit Overview */}
      <div className="p-6 bg-gray-50/80 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Health Gauge Dial */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 shadow-2xs">
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke={healthStyle.stroke}
                strokeWidth="8"
                strokeDasharray={201}
                strokeDashoffset={201 - (201 * health_score) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <span className={`text-xl font-black ${healthStyle.text}`}>{health_score}</span>
              <span className="text-[9px] text-gray-400 font-bold block -mt-1">/100</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Health Score</span>
            <span className={`text-sm font-bold block ${healthStyle.text}`}>{healthStyle.label}</span>
            <span className="text-[11px] text-gray-500 mt-0.5 block">
              Risk Tier: <strong className="text-gray-900">{risk_tier}</strong>
            </span>
          </div>
        </div>

        {/* Dynamic Credit Line Approved */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 border-l-4 border-l-[#97124B] shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center justify-between">
            <span>Dynamic Credit Approved</span>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#97124B] tracking-tight">
            {approved_dynamic_credit_limit_inr}
          </div>
          <div className="text-[11px] text-gray-500 mt-1 flex items-center justify-between font-medium">
            <span>Baseline: {baseline_limit_inr || "₹4.00 Cr"}</span>
            <span className="text-emerald-600 font-bold">Continuous Auto-Adjust</span>
          </div>
        </div>

        {/* Operating Routing */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Operating Routing</div>
          <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-1">
            <UserCheck className="w-4 h-4 text-[#97124B]" />
            <span>{operating_model_routing.assigned_role}</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug line-clamp-2">
            {operating_model_routing.action_summary}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Multi-Agent Diagnostics */}
        {agent_diagnostics.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#97124B]" /> Multi-Agent Diagnostic Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {agent_diagnostics.map((agent, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-gray-900 text-xs">{agent.agent_name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      agent.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' :
                      agent.status === 'Alert' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {agent.score}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                    {agent.finding}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Risk Indicators (KRIs) */}
        <div>
          <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#97124B]" /> Key Risk Indicators (KRIs) & Telemetry Observations
          </h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-xs">
            {key_risk_indicators.map((kri, index) => (
              <div key={index} className="p-3.5 bg-white hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {kri.status === 'Healthy' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {kri.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {kri.status === 'Critical' && <XCircle className="w-4 h-4 text-rose-600" />}
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-xs">{kri.metric}</span>
                    <p className="text-gray-600 text-xs mt-0.5 font-medium">{kri.observation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {kri.telemetry_source && (
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-mono px-2 py-0.5 rounded border border-gray-200">
                      {kri.telemetry_source}
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    kri.status === 'Healthy' ? 'bg-emerald-100 text-emerald-800' :
                    kri.status === 'Warning' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {kri.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RM Strategic Recommendation */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                RM Strategic Recommendation
              </span>
              <p className="text-xs text-amber-950 font-medium mt-0.5 leading-relaxed">
                {rm_strategic_upsell}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {operating_action !== 'AUTO_APPROVE' && (
              <button
                onClick={() => onSendToACOQueue(evaluation)}
                disabled={isAlreadyInACOQueue}
                className="bg-[#97124B] hover:bg-[#7A0C3C] text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5 uppercase tracking-wider"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{isAlreadyInACOQueue ? 'In ACO Queue' : 'Route to ACO'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
