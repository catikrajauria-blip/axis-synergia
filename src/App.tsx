/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ExecutiveHeader } from './components/ExecutiveHeader';
import { TelemetryFeed } from './components/TelemetryFeed';
import { MSMECreditEvaluator } from './components/MSMECreditEvaluator';
import { AIDecisionCard } from './components/AIDecisionCard';
import { ACOApprovalQueue } from './components/ACOApprovalQueue';
import { SystemInstructionsInspectorModal } from './components/SystemInstructionsInspectorModal';
import { PortfolioAnalytics } from './components/PortfolioAnalytics';
import { FinancialGlossaryModal } from './components/FinancialGlossaryModal';

import { 
  CreditEvaluationRequest, 
  CreditEvaluationResult, 
  ACOQueueItem, 
  TelemetryFeedItem 
} from './types';

import { 
  INITIAL_TELEMETRY_FEED, 
  INITIAL_ACO_QUEUE, 
  SAMPLE_PRESETS 
} from './data/mockData';

export default function App() {
  // Executive Portfolio State
  const [portfolioValue, setPortfolioValue] = useState("₹14,250 Cr");
  const [riskScore, setRiskScore] = useState(94.2);
  const [avgTat, setAvgTat] = useState("3.8 Mins");
  const [autoApprovedToday, setAutoApprovedToday] = useState("₹184 Cr");
  
  const [autoEngineActive, setAutoEngineActive] = useState(true);
  const [riskAppetite, setRiskAppetite] = useState<'Balanced' | 'Growth' | 'Prudent'>('Balanced');

  // Telemetry Feed State
  const [telemetryFeed, setTelemetryFeed] = useState<TelemetryFeedItem[]>(INITIAL_TELEMETRY_FEED);
  const [isFeedPaused, setIsFeedPaused] = useState(false);

  // Active Credit Evaluation State (Default loaded with Vayu Green Tech Solutions Master Prompt case)
  const [currentEvaluation, setCurrentEvaluation] = useState<CreditEvaluationResult | null>(
    INITIAL_ACO_QUEUE[0].evaluation
  );
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(false);

  // ACO Queue State
  const [acoQueue, setAcoQueue] = useState<ACOQueueItem[]>(INITIAL_ACO_QUEUE);

  // Modals
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);

  // Simulated continuous tele-ingestion stream ticker
  useEffect(() => {
    if (!autoEngineActive || isFeedPaused) return;

    const interval = setInterval(() => {
      const randomCompanies = [
        "Vayu Green Tech Solutions Ltd",
        "Apex Engineering Components Ltd",
        "Zenith Solar Systems Pvt Ltd",
        "Kaveri Pharma Organics Pvt Ltd",
        "Varun Textiles India",
        "Surya EPC Infra Solutions"
      ];
      const randomComp = randomCompanies[Math.floor(Math.random() * randomCompanies.length)];
      
      const newTelemetryTypes = [
        { type: 'GST_EWAY' as const, title: 'GST e-Way Bill Stream Cleared', detail: 'Bulk e-way bills reconciled with GSTN portal.', impact: 'positive' as const, value: '₹1.8 Cr Invoices' },
        { type: 'ACCOUNT_AGGREGATOR' as const, title: 'Bank Inflow Telemetry Verified', detail: 'Real-time open banking credit transaction logged.', impact: 'positive' as const, value: '₹45.0 Lakhs Deposit' },
        { type: 'SATELLITE_LOGISTICS' as const, title: 'Satellite Cargo Docking Confirmed', detail: 'ISRO Earth-Observation telemetry verified container movement.', impact: 'positive' as const, value: '8 Cargo Units' },
        { type: 'COMMODITY_INDEX' as const, title: 'Raw Material Spot Index Fluctuation', detail: 'LME Copper/Steel spot price shifted -1.2%.', impact: 'neutral' as const, value: 'Spot Index -1.2%' }
      ];

      const chosenType = newTelemetryTypes[Math.floor(Math.random() * newTelemetryTypes.length)];

      const newItem: TelemetryFeedItem = {
        id: `tel-auto-${Date.now()}`,
        timestamp: "Just now",
        type: chosenType.type,
        company: randomComp,
        title: chosenType.title,
        detail: chosenType.detail,
        impact: chosenType.impact,
        value: chosenType.value
      };

      setTelemetryFeed(prev => [newItem, ...prev.slice(0, 19)]);
    }, 10000);

    return () => clearInterval(interval);
  }, [autoEngineActive, isFeedPaused]);

  // Request Continuous Underwrite from Express / Gemini API Endpoint
  const handleRequestEvaluation = async (req: CreditEvaluationRequest) => {
    setIsLoadingEvaluation(true);
    try {
      const response = await fetch('/api/underwrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentEvaluation(data);

        // Auto-add to ACO Queue if action is ACO_ESCALATION or CREDIT_FREEZE
        if (data.underwriting_summary.operating_action !== 'AUTO_APPROVE') {
          const newAcoItem: ACOQueueItem = {
            id: `ACO-2035-${Math.floor(100 + Math.random() * 900)}`,
            company_name: data.client_profile.company_name,
            sector: data.client_profile.sector,
            requested_limit: `₹${(req.requested_working_capital_topup || 5.0).toFixed(2)} Cr`,
            recommended_limit: data.underwriting_summary.approved_dynamic_credit_limit_inr,
            health_score: data.underwriting_summary.health_score,
            risk_tier: data.underwriting_summary.risk_tier,
            operating_action: data.underwriting_summary.operating_action,
            primary_flag: data.key_risk_indicators?.[0]?.observation || "Telemetry flag requiring ACO review",
            status: "Pending ACO Review",
            submitted_at: "Just now",
            evaluation: data
          };

          setAcoQueue(prev => {
            if (prev.some(p => p.company_name === newAcoItem.company_name && p.status === 'Pending ACO Review')) {
              return prev;
            }
            return [newAcoItem, ...prev];
          });
        } else {
          // Increment auto-approved volume metric
          setAutoApprovedToday("₹189 Cr");
        }
      } else {
        console.error("Failed to run underwriting API call");
      }
    } catch (err) {
      console.error("Error executing underwrite:", err);
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  // Push evaluation manually to ACO queue
  const handleSendToACOQueue = (evaluation: CreditEvaluationResult) => {
    const newItem: ACOQueueItem = {
      id: `ACO-2035-${Math.floor(100 + Math.random() * 900)}`,
      company_name: evaluation.client_profile.company_name,
      sector: evaluation.client_profile.sector,
      requested_limit: evaluation.underwriting_summary.baseline_limit_inr || "₹5.00 Cr",
      recommended_limit: evaluation.underwriting_summary.approved_dynamic_credit_limit_inr,
      health_score: evaluation.underwriting_summary.health_score,
      risk_tier: evaluation.underwriting_summary.risk_tier,
      operating_action: evaluation.underwriting_summary.operating_action,
      primary_flag: evaluation.key_risk_indicators?.[0]?.observation || "ACO Escalation requested by user",
      status: "Pending ACO Review",
      submitted_at: "Just now",
      evaluation: evaluation
    };

    setAcoQueue(prev => [newItem, ...prev]);
  };

  // ACO Actions
  const handleApproveACO = (id: string, note: string) => {
    setAcoQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'ACO Approved' } : item));
  };

  const handleModifyACO = (id: string, newLimit: string, note: string) => {
    setAcoQueue(prev => prev.map(item => item.id === id ? { 
      ...item, 
      status: 'Structure Modified', 
      recommended_limit: newLimit 
    } : item));
  };

  const handleFreezeACO = (id: string, note: string) => {
    setAcoQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Credit Frozen' } : item));
  };

  const handleInspectQueueItem = (item: ACOQueueItem) => {
    setCurrentEvaluation(item.evaluation);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Select company from telemetry stream to evaluate
  const handleSelectCompanyFromTelemetry = (companyName: string) => {
    const matchedPreset = SAMPLE_PRESETS.find(p => p.request.company_name.toLowerCase().includes(companyName.toLowerCase()));
    if (matchedPreset) {
      handleRequestEvaluation(matchedPreset.request);
    } else {
      handleRequestEvaluation({
        company_name: companyName,
        macro_sector: "Commercial MSME",
        annual_gst_revenue: 45.0,
        dso: 48,
        top_buyer_concentration: 32,
        avg_monthly_bank_balance: 3.2,
        requested_working_capital_topup: 4.5
      });
    }
  };

  const handleTriggerTelemetrySpike = () => {
    const spikeItem1: TelemetryFeedItem = {
      id: `tel-spike-${Date.now()}-1`,
      timestamp: "Just now",
      type: "ACCOUNT_AGGREGATOR",
      company: "Vayu Green Tech Solutions Ltd",
      title: "Surge Telemetry: GST Payment Discrepancy",
      detail: "Account Aggregator open feed flagged GST payment lag on Q1 GSTN filing.",
      impact: "risk_flag",
      value: "14.2% Variance"
    };

    const spikeItem2: TelemetryFeedItem = {
      id: `tel-spike-${Date.now()}-2`,
      timestamp: "Just now",
      type: "SATELLITE_LOGISTICS",
      company: "Apex Engineering Components Ltd",
      title: "Surge Telemetry: Container Fleet Cleared",
      detail: "Satellite optical sensing confirmed 22 trucks loaded at Mundra Port.",
      impact: "positive",
      value: "22 Logistics Units"
    };

    setTelemetryFeed(prev => [spikeItem1, spikeItem2, ...prev]);
    setPortfolioValue("₹14,285 Cr");
  };

  const isCurrentInACOQueue = acoQueue.some(
    item => item.company_name === currentEvaluation?.client_profile.company_name && item.status === 'Pending ACO Review'
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Executive Metrics Header */}
      <ExecutiveHeader
        portfolioValue={portfolioValue}
        riskScore={riskScore}
        avgTat={avgTat}
        autoApprovedToday={autoApprovedToday}
        autoEngineActive={autoEngineActive}
        onToggleAutoEngine={() => setAutoEngineActive(!autoEngineActive)}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        onOpenAnalyticsModal={() => setIsAnalyticsModalOpen(true)}
        onOpenGlossaryModal={() => setIsGlossaryModalOpen(true)}
        onTriggerTelemetrySpike={handleTriggerTelemetrySpike}
        riskAppetite={riskAppetite}
        onChangeRiskAppetite={(val) => setRiskAppetite(val)}
      />

      {/* Dashboard Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-6 w-full">
        {/* Section 2: Live Telemetry Ingestion Feed */}
        <section>
          <TelemetryFeed
            feed={telemetryFeed}
            onSelectCompanyForUnderwrite={handleSelectCompanyFromTelemetry}
            isPaused={isFeedPaused}
            onTogglePause={() => setIsFeedPaused(!isFeedPaused)}
          />
        </section>

        {/* Section 3 & 4: Interactive MSME Credit Evaluator & AI Decision Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <MSMECreditEvaluator
              onRequestEvaluation={handleRequestEvaluation}
              isLoading={isLoadingEvaluation}
            />
          </div>

          <div className="lg:col-span-7">
            <AIDecisionCard
              evaluation={currentEvaluation}
              onSendToACOQueue={handleSendToACOQueue}
              isAlreadyInACOQueue={isCurrentInACOQueue}
            />
          </div>
        </section>

        {/* Section 5: Human-In-The-Loop (ACO) Approval Queue */}
        <section>
          <ACOApprovalQueue
            queue={acoQueue}
            onApproveACO={handleApproveACO}
            onModifyACO={handleModifyACO}
            onFreezeACO={handleFreezeACO}
            onInspectItem={handleInspectQueueItem}
          />
        </section>
      </main>

      {/* Corporate Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-4 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#97124B]"></div>
            <span className="font-bold text-white tracking-wide">AXIS BANK</span>
            <span>| Commercial Banking Group (CBG) & MSME Credit Division</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            Powered by Google AI Studio & Gemini 3.6 Flash Multi-Agent Engine • RBI Regulatory Compliant Continuous Underwriting Architecture
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SystemInstructionsInspectorModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
        onTestInputInEvaluator={(sampleReq) => handleRequestEvaluation(sampleReq)}
      />

      <PortfolioAnalytics
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
      />

      <FinancialGlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
      />
    </div>
  );
}
