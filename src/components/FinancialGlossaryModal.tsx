import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  X, 
  Sparkles, 
  Presentation, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  IndianRupee, 
  Truck, 
  Database, 
  Activity,
  Lightbulb
} from 'lucide-react';

interface FinancialGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinancialGlossaryModal: React.FC<FinancialGlossaryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'glossary' | 'pitch_guide'>('glossary');
  const [selectedTerm, setSelectedTerm] = useState<string>('DSO');

  if (!isOpen) return null;

  const GLOSSARY_ITEMS = [
    {
      id: 'DSO',
      term: 'Days Sales Outstanding (DSO)',
      simpleDefinition: 'How long it takes a company to collect money from its customers after selling a product.',
      analogy: 'Imagine you lend ₹100 to a friend and ask them to pay you back in 30 days. If they pay in 30 days, your DSO is 30. If they take 90 days, your DSO is 90. The lower the number, the faster you get your cash!',
      whyItMatters: 'If a business has a high DSO (e.g., >60 days), its cash is stuck with customers. It might run out of money to pay rent, salaries, or suppliers.',
      axisImpact: 'The AI flags high DSO as a cash flow risk and automatically reduces credit limits to protect the bank.',
      icon: Clock,
      category: 'Cash Flow'
    },
    {
      id: 'WorkingCapital',
      term: 'Working Capital & Credit Limit',
      simpleDefinition: 'The daily cash a business needs to keep its operations running (buy raw materials, pay wages, pay electricity).',
      analogy: 'Think of your monthly grocery money. You might own a ₹1 Crore house (wealth), but if you don’t have ₹5,000 cash in your wallet today, you can’t buy groceries.',
      whyItMatters: 'Even profitable companies go bankrupt if they run out of daily working capital cash.',
      axisImpact: 'Axis Bank gives businesses a flexible credit line (overdraft) so production never stops while waiting for customer payments.',
      icon: IndianRupee,
      category: 'Credit Lines'
    },
    {
      id: 'GST_EWAY',
      term: 'GST e-Way Bill',
      simpleDefinition: 'An official digital permit generated on the government tax portal whenever goods worth over ₹50,000 are shipped in a truck across India.',
      analogy: 'A digital highway toll pass and live cargo receipt issued directly by the government.',
      whyItMatters: 'In the past, dishonest businesses created fake paper invoices to trick banks. But they CANNOT fake live trucks carrying real cargo on highways with e-Way bills.',
      axisImpact: 'Our AI verifies real-time e-Way bills to confirm that genuine goods are actually being manufactured and shipped.',
      icon: Truck,
      category: 'Government Telemetry'
    },
    {
      id: 'AA',
      term: 'Account Aggregator (AA)',
      simpleDefinition: 'An RBI-regulated secure digital network that allows a business to share its official bank statements directly with Axis Bank in 5 seconds.',
      analogy: 'Like the "Login with Google" button on websites, but for bank accounts! You tap a button on your phone, give permission, and bank records transfer instantly.',
      whyItMatters: 'Eliminates paper bank statements, PDF tampering, and forged documents completely.',
      axisImpact: 'Provides 100% verified, fraud-proof bank cash flow data straight to our AI engine.',
      icon: Database,
      category: 'RBI Infrastructure'
    },
    {
      id: 'TReDS',
      term: 'TReDS (Trade Receivables Discounting)',
      simpleDefinition: 'An online government-backed auction market where small businesses sell their unpaid customer invoices to banks to get instant cash today.',
      analogy: 'Suppose you hold a ₹1,000 gift voucher that pays out in 3 months. You sell it to someone today for ₹980 cash so you don’t have to wait 3 months.',
      whyItMatters: 'Saves small businesses (MSMEs) from waiting 90 days to get paid by giant corporate buyers.',
      axisImpact: 'Axis Bank buys verified invoices on TReDS with low risk and instant repayment assurances.',
      icon: Activity,
      category: 'Invoice Finance'
    },
    {
      id: 'ISRO_SATELLITE',
      term: 'ISRO Satellite Logistics Feed',
      simpleDefinition: 'High-resolution satellite imagery and radar telemetry from India’s space agency (ISRO) observing factory activity, truck movements, and industrial output from space.',
      analogy: 'Like a security camera in orbit! If a factory owner tells you "My factory is running at full capacity," you look at the camera to see if smoke is coming out of the chimney and trucks are entering the gate.',
      whyItMatters: 'A dishonest company can print fake paper bills or fake bank entries. But they CANNOT fake factory rooftop thermal activity or truck parking density visible from space satellites!',
      axisImpact: 'Axis Bank’s Satellite Freight Agent cross-references satellite heatmaps against declared GST invoices to confirm real manufacturing activity.',
      icon: Truck,
      category: 'Space-Based Telemetry'
    },
    {
      id: 'BUYER_CONCENTRATION',
      term: 'Top Buyer Concentration %',
      simpleDefinition: 'The percentage of a company’s total sales that comes from its single biggest customer.',
      analogy: 'If 80% of your salary comes from one freelance client and that client stops paying you, you lose 80% of your income overnight!',
      whyItMatters: 'High concentration (>35%) means if that single big customer faces trouble, the MSME will collapse too.',
      axisImpact: 'The AI checks customer diversity. High concentration triggers a "Prudent Guardrail" or requires additional collateral.',
      icon: ShieldCheck,
      category: 'Risk Metrics'
    },
    {
      id: 'TAT',
      term: 'Turnaround Time (TAT)',
      simpleDefinition: 'The total time taken by the bank to receive a loan request, analyze the financial health, and approve the money.',
      analogy: 'Traditional banks take 12 to 14 days (like sending a physical letter). Ambient-Credit 2035 takes 3.8 minutes (like sending a WhatsApp text).',
      whyItMatters: 'Fast TAT means small businesses can seize urgent business opportunities without waiting weeks.',
      axisImpact: 'Replaces slow manual loan approvals with autonomous AI underwrites.',
      icon: Sparkles,
      category: 'Engine Speed'
    },
    {
      id: 'ACO',
      term: 'ACO (Authorized Credit Officer)',
      simpleDefinition: 'The human senior bank officer who makes final decisions when the AI flags an unusual risk or complex restructuring.',
      analogy: 'Think of an airplane autopilot system. The AI handles 87% of routine flights smoothly, but passes control to the human pilot (ACO) if there’s bad weather.',
      whyItMatters: 'Ensures 100% safety, human accountability, and zero "black-box" AI errors.',
      axisImpact: 'Maintains a Human-in-the-Loop review queue for high-value or elevated-risk applications.',
      icon: Presentation,
      category: 'Human Control'
    }
  ];

  const PRESENTATION_STEPS = [
    {
      step: '1',
      title: 'The Core Concept & Problem (30 Seconds)',
      whatToSay: '"Traditional business loans take 12-14 days because banks look at old paper reports. Axis Bank Ambient-Credit 2035 changes this completely. It is an autonomous AI credit engine that monitors MSME businesses 24/7 using live digital signals like highway trucks, bank deposits, and satellite data."',
      highlightSection: 'Top Corporate Header Banner',
      keyPoint: 'Explain: Continuous, real-time credit underwriting vs old 14-day manual paper reviews.'
    },
    {
      step: '2',
      title: 'Executive Top Bar & Portfolio Health Data',
      whatToSay: '"At the top, we see Axis Bank Commercial Group managing a ₹14,250 Crore portfolio. How do we get this data? It is aggregated live from Axis Bank’s Core Banking System (CBS) and dynamic loan servicing databases. It tracks 94.2% Risk Health, 3.8 Minute average approval time, and ₹184 Crore daily auto-underwritten volume. The Executive Guardrails (Balanced, Growth, Prudent) allow bank directors to shift risk rules instantly."',
      highlightSection: '4 Metric Cards & Guardrail Selector',
      keyPoint: 'Data Source: Pulled directly from Axis Core Banking System (CBS) APIs & real-time loan databases.'
    },
    {
      step: '3',
      title: 'Live Telemetry Ingestion Stream & ISRO Satellite Feed',
      whatToSay: '"This live scrolling feed is the heartbeat of the system. Notice the ISRO Satellite Logistics Feed! What is it? It’s high-resolution radar satellite imagery from India’s space agency monitoring factory rooftops, solar output, and truck parking density from space. Why is it important? Companies can fake paper invoices, but they CANNOT fake live trucks or active factory chimneys visible from satellites!"',
      highlightSection: 'Telemetry Feed (Middle Left)',
      keyPoint: 'Importance: ISRO Satellite imagery proves physical factory activity so dishonest companies cannot trick the bank with fake paper invoices.'
    },
    {
      step: '4',
      title: 'Interactive MSME Credit Evaluator',
      whatToSay: '"Let’s test a real business! Here we can pick a company like Vayu Green Tech or Apex Engineering, or enter custom revenue, DSO (collection days), and credit requests. Clicking \'Run Continuous AI Underwrite\' triggers our 4 AI agents in seconds."',
      highlightSection: 'MSME Credit Evaluator Form (Middle Right)',
      keyPoint: 'Action: Click a preset like "Vayu Green Tech" and hit "Run Continuous AI Underwrite".'
    },
    {
      step: '5',
      title: 'Client AI Diagnostic Dossier',
      whatToSay: '"Here is the instant output! The AI calculates a Health Score (e.g., 88/100) and approves a Dynamic Credit Line. Look at the 4 Multi-Agent Diagnostics: GST Velocity Agent, Account Aggregator Agent, Satellite Freight Agent, and Commodity Index Agent. Every claim is verified with real evidence."',
      highlightSection: 'AIDecisionCard Component (Lower Middle)',
      keyPoint: 'Explain: Shows multi-agent breakdown, Key Risk Indicators (KRIs), and RM Strategic Upsell.'
    },
    {
      step: '6',
      title: 'ACO Human-in-the-Loop Review Queue',
      whatToSay: '"For cases requiring human approval or special limit adjustments, the AI routes them to the ACO (Authorized Credit Officer) Queue. The credit officer can 1-click Approve, Modify Limit, or Freeze accounts with full audit memorandums."',
      highlightSection: 'ACO Approval Queue Table (Bottom)',
      keyPoint: 'Explain: AI does 87% straight-through processing, while humans maintain complete safety control.'
    },
    {
      step: '7',
      title: 'Analytics & Schema Inspection',
      whatToSay: '"Finally, bank auditors can click \'Portfolio Analytics\' to see sector concentration heatmaps, or \'Inspect Schema\' to review the raw system prompts and TypeScript interfaces powering this entire AI platform."',
      highlightSection: 'Top Bar Action Buttons',
      keyPoint: 'Explain: Full enterprise transparency and regulatory compliance.'
    }
  ];

  const currentTerm = GLOSSARY_ITEMS.find(item => item.id === selectedTerm) || GLOSSARY_ITEMS[0];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#97124B] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Banking Terms & Demo Pitch Guide
                </h2>
                <span className="bg-amber-400 text-slate-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wide">
                  Layman Friendly
                </span>
              </div>
              <p className="text-xs text-white/80 font-medium">
                Plain-English explanations of all financial terms + Step-by-Step website presentation flow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-100 p-2 border-b border-gray-200 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'glossary'
                ? 'bg-white text-[#97124B] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#97124B]" />
            <span>1. Financial Terms Glossary (Simple Language)</span>
          </button>
          <button
            onClick={() => setActiveTab('pitch_guide')}
            className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'pitch_guide'
                ? 'bg-white text-[#97124B] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Presentation className="w-4 h-4 text-[#97124B]" />
            <span>2. How to Explain Whole Website (Flow & Script)</span>
          </button>
        </div>

        {/* Tab 1: Financial Glossary */}
        {activeTab === 'glossary' && (
          <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Term List Column */}
            <div className="md:col-span-5 space-y-1.5 pr-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Select a term to understand:
              </span>
              {GLOSSARY_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = item.id === selectedTerm;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTerm(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#97124B]/5 border-[#97124B] shadow-2xs'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#97124B] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-[#97124B]' : 'text-gray-900'}`}>
                          {item.term}
                        </div>
                        <div className="text-[10px] text-gray-400 font-medium">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#97124B]' : 'text-gray-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Term Explanation Column */}
            <div className="md:col-span-7 bg-gray-50/80 rounded-2xl p-5 border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {currentTerm.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {currentTerm.term}
                    </h3>
                  </div>
                </div>

                {/* Plain Definition */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    What does it mean in simple words?
                  </span>
                  <p className="text-sm font-semibold text-gray-800 leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                    "{currentTerm.simpleDefinition}"
                  </p>
                </div>

                {/* Everyday Analogy */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" /> Real-Life Everyday Analogy:
                  </span>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed bg-amber-50 p-3.5 rounded-xl border border-amber-200/80">
                    {currentTerm.analogy}
                  </p>
                </div>

                {/* Why it matters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
                      Why Companies Care:
                    </span>
                    <p className="text-[11px] text-gray-600 font-medium leading-snug">
                      {currentTerm.whyItMatters}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#97124B] block mb-1">
                      How Axis AI Uses It:
                    </span>
                    <p className="text-[11px] text-gray-600 font-medium leading-snug">
                      {currentTerm.axisImpact}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 text-[10px] text-gray-400 font-medium flex items-center justify-between">
                <span>Click another term on the left to explore</span>
                <span className="font-bold text-[#97124B]">Axis Bank Ambient-Credit Engine</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Presentation & Flow Guide */}
        {activeTab === 'pitch_guide' && (
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
              <Presentation className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Master Presentation Strategy (How to demo this to anyone in 3 minutes)
                </h4>
                <p className="text-xs text-amber-950 font-medium mt-1 leading-relaxed">
                  When showing this website to colleagues, professors, or clients, follow this exact sequence. Start with the big problem, show the live AI stream, test a company live, and end with the human approval safety net!
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {PRESENTATION_STEPS.map((step) => (
                <div key={step.step} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#97124B]/40 transition-all shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#97124B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        {step.title}
                      </h4>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200">
                      Target UI: {step.highlightSection}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-800 font-serif italic mb-2">
                    <span className="font-sans font-bold text-[#97124B] not-italic mr-1.5 text-[10px] uppercase">Exact Script:</span>
                    {step.whatToSay}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{step.keyPoint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-100 p-4 border-t border-gray-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-[#97124B]" />
            <span>Interactive Educational Glossary & Demo Pitch Assistant</span>
          </div>

          <button
            onClick={onClose}
            className="bg-[#97124B] hover:bg-[#7A0C3C] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
          >
            Got it, Close Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
