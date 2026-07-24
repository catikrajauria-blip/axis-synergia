import React, { useState } from 'react';
import { 
  Code2, 
  X, 
  Copy, 
  Check, 
  Play, 
  FileJson, 
  Sparkles, 
  BookOpen, 
  Layers,
  Terminal
} from 'lucide-react';

interface SystemInstructionsInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestInputInEvaluator: (sampleInput: any) => void;
}

export const SystemInstructionsInspectorModal: React.FC<SystemInstructionsInspectorModalProps> = ({
  isOpen,
  onClose,
  onTestInputInEvaluator
}) => {
  const [copiedInstructions, setCopiedInstructions] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'INSTRUCTIONS' | 'SCHEMA' | 'TEST_CASE' | 'SIMULATOR'>('INSTRUCTIONS');

  if (!isOpen) return null;

  const SYSTEM_INSTRUCTIONS_TEXT = `You are the "Axis Ambient-Credit Engine v2035", an enterprise multi-agent commercial underwriting system built for Axis Bank's Commercial Banking Group (CBG) and Small Business Banking (SBB).

YOUR OBJECTIVE:
Evaluate continuous real-time commercial telemetry data (GST filings, bank statements, Account Aggregator streams, buyer concentration, e-way bill flows) and generate an instant, automated credit decision for MSMEs and corporate clients.

EVALUATION LOGIC & BENCHMARKS:
1. CASH FLOW & TURNOVER HEALTH: Compare quarterly GST turnover against actual bank inflows. Discrepancies >15% trigger an anomaly flag.
2. WORKING CAPITAL FRICTION: DSO (Days Sales Outstanding) expanding beyond 45 days or >30% YoY increase signals potential liquidity lockup.
3. CONCENTRATION RISK: Single buyer concentration >35% requires collateral or TReDS invoice-factoring mitigation.
4. DECISION THRESHOLDS:
   - Low Risk (Health Score 75-100): Auto-Approve daily self-adjusting credit line.
   - Medium Risk (Health Score 50-74): Route to AI Credit Officer (ACO) for 15-minute exception review.
   - High Risk (Health Score <50): Initiate proactive credit freeze + default hedging workflow.

OUTPUT REQUIREMENTS:
You MUST respond strictly in valid JSON using the following structure:

{
  "client_profile": {
    "company_name": "string",
    "sector": "string",
    "analyzed_period": "string"
  },
  "underwriting_summary": {
    "health_score": "number (0-100)",
    "risk_tier": "Low | Medium | High",
    "operating_action": "AUTO_APPROVE | ACO_ESCALATION | CREDIT_FREEZE",
    "approved_dynamic_credit_limit_inr": "string"
  },
  "key_risk_indicators": [
    {
      "metric": "string",
      "status": "Healthy | Warning | Critical",
      "observation": "string"
    }
  ],
  "operating_model_routing": {
    "assigned_role": "System Autonomous | AI Credit Officer (ACO) | Relationship Strategist",
    "action_summary": "string"
  },
  "rm_strategic_upsell": "string"
}`;

  const SAMPLE_TEST_CASE = `Run continuous underwrite for:
Company: Vayu Green Tech Solutions Ltd.
Sector: Renewable Energy Hardware
Quarterly GST Turnover: ₹18.2 Cr (Up 22% YoY)
Average Monthly Bank Balance: ₹2.4 Cr
Days Sales Outstanding (DSO): Increased from 28 days to 58 days
Top Buyer Concentration: 42% (Buyer in solar EPC sector experiencing cash-flow slowdown)
Requested Working Capital Top-Up: Increase Limit from ₹4.0 Cr to ₹6.5 Cr`;

  const SAMPLE_JSON_RESPONSE = `{
  "client_profile": {
    "company_name": "Vayu Green Tech Solutions Ltd.",
    "sector": "Renewable Energy Hardware",
    "analyzed_period": "Q1 2035 Real-Time Telemetry"
  },
  "underwriting_summary": {
    "health_score": 66,
    "risk_tier": "Medium",
    "operating_action": "ACO_ESCALATION",
    "approved_dynamic_credit_limit_inr": "5,00,00,000"
  },
  "key_risk_indicators": [
    {
      "metric": "Days Sales Outstanding (DSO)",
      "status": "Warning",
      "observation": "DSO expanded by 30 days (28 -> 58 days), indicating working capital lockup in unpaid invoices."
    },
    {
      "metric": "Buyer Concentration",
      "status": "Critical",
      "observation": "42% revenue concentration tied to a single buyer experiencing liquidity slowdown."
    }
  ],
  "operating_model_routing": {
    "assigned_role": "AI Credit Officer (ACO)",
    "action_summary": "Route to ACO for 15-minute exception approval. Limit capped at ₹5.0 Cr pending credit protection on remaining balance."
  },
  "rm_strategic_upsell": "Recommend client onboard remaining ₹1.5 Cr invoice receivables onto Axis Bank's A.Treds platform to unlock instant non-recourse liquidity."
}`;

  const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#97124B] rounded-lg text-white">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Method 2: Enterprise Agent Engine Inspector
                <span className="bg-[#97124B]/30 text-rose-300 text-[10px] border border-[#97124B]/50 font-mono px-2 py-0.5 rounded-full">
                  Gemini 3.6 Flash / Playground Mode
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                System instructions, evaluation logic benchmarks, and JSON output schema for Google AI Studio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 border-b border-slate-800 bg-slate-900 flex items-center gap-2 text-xs font-semibold pt-2">
          <button
            onClick={() => setActiveTab('INSTRUCTIONS')}
            className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'INSTRUCTIONS'
                ? 'border-[#97124B] text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>System Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('TEST_CASE')}
            className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'TEST_CASE'
                ? 'border-[#97124B] text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Prompt Input</span>
          </button>

          <button
            onClick={() => setActiveTab('SCHEMA')}
            className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'SCHEMA'
                ? 'border-[#97124B] text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Expected JSON Output</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs space-y-4">
          {activeTab === 'INSTRUCTIONS' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-sans">
                  Paste these instructions into Google AI Studio System Instructions box:
                </span>
                <button
                  onClick={() => handleCopy(SYSTEM_INSTRUCTIONS_TEXT, setCopiedInstructions)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-sans font-medium transition-colors border border-slate-700"
                >
                  {copiedInstructions ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedInstructions ? 'Copied System Prompt!' : 'Copy System Instructions'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {SYSTEM_INSTRUCTIONS_TEXT}
              </pre>
            </div>
          )}

          {activeTab === 'TEST_CASE' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-sans">
                  Master Prompt Test Case (Vayu Green Tech Solutions Ltd):
                </span>
                <button
                  onClick={() => {
                    onTestInputInEvaluator({
                      company_name: "Vayu Green Tech Solutions Ltd",
                      macro_sector: "Renewable Energy Hardware",
                      annual_gst_revenue: 72.8,
                      dso: 58,
                      top_buyer_concentration: 42,
                      avg_monthly_bank_balance: 2.4,
                      requested_working_capital_topup: 6.5
                    });
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#97124B] hover:bg-[#7A0C3C] text-white rounded text-xs font-sans font-bold transition-colors shadow-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run This Test Case in Evaluator</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {SAMPLE_TEST_CASE}
              </pre>
            </div>
          )}

          {activeTab === 'SCHEMA' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-sans">
                  Deterministic JSON Credit Decision Schema:
                </span>
                <button
                  onClick={() => handleCopy(SAMPLE_JSON_RESPONSE, setCopiedJson)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-sans font-medium transition-colors border border-slate-700"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Copied JSON!' : 'Copy Sample JSON'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sky-300 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {SAMPLE_JSON_RESPONSE}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400 font-sans">
          <span>Target Model: Gemini 3.6 Flash / Temperature: 0.2</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
