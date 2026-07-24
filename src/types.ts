export type OperatingAction = 'AUTO_APPROVE' | 'ACO_ESCALATION' | 'CREDIT_FREEZE';
export type RiskTier = 'Low' | 'Medium' | 'High';
export type KRIStatus = 'Healthy' | 'Warning' | 'Critical';
export type AgentStatus = 'Optimal' | 'Alert' | 'Flagged';

export interface KRIItem {
  metric: string;
  status: KRIStatus;
  observation: string;
  telemetry_source?: string;
}

export interface AgentBreakdownItem {
  agent_name: string;
  score: number;
  status: AgentStatus;
  finding: string;
}

export interface CreditEvaluationRequest {
  company_name: string;
  macro_sector: string;
  annual_gst_revenue: number; // in ₹ Cr
  dso: number; // in days
  top_buyer_concentration: number; // %
  avg_monthly_bank_balance?: number; // in ₹ Cr
  requested_working_capital_topup?: number; // in ₹ Cr
}

export interface CreditEvaluationResult {
  client_profile: {
    company_name: string;
    sector: string;
    analyzed_period: string;
    annual_gst_revenue_inr: string;
  };
  underwriting_summary: {
    health_score: number;
    risk_tier: RiskTier;
    operating_action: OperatingAction;
    approved_dynamic_credit_limit_inr: string;
    baseline_limit_inr?: string;
  };
  key_risk_indicators: KRIItem[];
  agent_diagnostics?: AgentBreakdownItem[];
  operating_model_routing: {
    assigned_role: 'System Autonomous' | 'AI Credit Officer (ACO)' | 'Relationship Strategist';
    action_summary: string;
  };
  rm_strategic_upsell: string;
  timestamp?: string;
  telemetry_sources_used?: string[];
}

export type TelemetryType = 
  | 'GST_EWAY' 
  | 'ACCOUNT_AGGREGATOR' 
  | 'SATELLITE_LOGISTICS' 
  | 'COMMODITY_INDEX' 
  | 'CUSTOMS_PORT';

export interface TelemetryFeedItem {
  id: string;
  timestamp: string;
  type: TelemetryType;
  company: string;
  title: string;
  detail: string;
  impact: 'positive' | 'neutral' | 'risk_flag' | 'critical';
  value: string;
}

export interface ACOQueueItem {
  id: string;
  company_name: string;
  sector: string;
  requested_limit: string;
  recommended_limit: string;
  health_score: number;
  risk_tier: RiskTier;
  operating_action: OperatingAction;
  primary_flag: string;
  status: 'Pending ACO Review' | 'ACO Approved' | 'Structure Modified' | 'Credit Frozen';
  submitted_at: string;
  evaluation: CreditEvaluationResult;
}
