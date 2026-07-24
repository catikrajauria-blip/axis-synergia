import { CreditEvaluationResult, ACOQueueItem, TelemetryFeedItem, CreditEvaluationRequest } from '../types';

export const SAMPLE_PRESETS: { label: string; request: CreditEvaluationRequest }[] = [
  {
    label: "Vayu Green Tech (Master Prompt Test Case)",
    request: {
      company_name: "Vayu Green Tech Solutions Ltd",
      macro_sector: "Renewable Energy Hardware",
      annual_gst_revenue: 72.8, // 18.2 Cr quarterly * 4
      dso: 58,
      top_buyer_concentration: 42,
      avg_monthly_bank_balance: 2.4,
      requested_working_capital_topup: 6.5
    }
  },
  {
    label: "Apex Engineering (Low Risk - Auto Approve)",
    request: {
      company_name: "Apex Engineering Components Ltd",
      macro_sector: "Auto Ancillary",
      annual_gst_revenue: 54.0,
      dso: 32,
      top_buyer_concentration: 18,
      avg_monthly_bank_balance: 4.8,
      requested_working_capital_topup: 8.5
    }
  },
  {
    label: "Zenith Solar Systems (High Risk - Credit Freeze)",
    request: {
      company_name: "Zenith Solar Systems Pvt Ltd",
      macro_sector: "Solar Manufacturing",
      annual_gst_revenue: 28.0,
      dso: 74,
      top_buyer_concentration: 56,
      avg_monthly_bank_balance: 0.9,
      requested_working_capital_topup: 5.0
    }
  },
  {
    label: "Kaveri Pharma Organics (Medium Risk - ACO Review)",
    request: {
      company_name: "Kaveri Pharma Organics Pvt Ltd",
      macro_sector: "Pharmaceuticals & Bulk Drugs",
      annual_gst_revenue: 42.5,
      dso: 52,
      top_buyer_concentration: 38,
      avg_monthly_bank_balance: 2.1,
      requested_working_capital_topup: 4.5
    }
  }
];

export const INITIAL_TELEMETRY_FEED: TelemetryFeedItem[] = [
  {
    id: "tel-001",
    timestamp: "Just now",
    type: "GST_EWAY",
    company: "Apex Engineering Components Ltd",
    title: "GST GSTR-3B Auto-Reconciliation Clean",
    detail: "Quarterly GST turnover matches bank inflows within 1.2% threshold. 4,120 e-Way bills validated.",
    impact: "positive",
    value: "₹13.5 Cr Q3 Turnover"
  },
  {
    id: "tel-002",
    timestamp: "2 mins ago",
    type: "SATELLITE_LOGISTICS",
    company: "Vayu Green Tech Solutions Ltd",
    title: "Port Inbound Shipment Verified",
    detail: "ISRO/Gaganyaan Satellite telemetry confirms 14 containers of solar inverter sub-assemblies docked at JNPT Nhava Sheva.",
    impact: "positive",
    value: "14 Cargo Units"
  },
  {
    id: "tel-003",
    timestamp: "4 mins ago",
    type: "ACCOUNT_AGGREGATOR",
    company: "Zenith Solar Systems Pvt Ltd",
    title: "Working Capital Inflow Delay Detected",
    detail: "Account Aggregator open feed shows DSO expanded from 42 to 74 days. Primary buyer payment pending 68 days.",
    impact: "risk_flag",
    value: "DSO +32 Days"
  },
  {
    id: "tel-004",
    timestamp: "7 mins ago",
    type: "COMMODITY_INDEX",
    company: "Auto Ancillary Sector",
    title: "Aluminium & Copper Spot Price Spike",
    detail: "LME Copper index dropped 2.4%, easing raw material working capital pressure for precision engineering vendors.",
    impact: "positive",
    value: "LME Copper -2.4%"
  },
  {
    id: "tel-005",
    timestamp: "11 mins ago",
    type: "CUSTOMS_PORT",
    company: "Kaveri Pharma Organics Pvt Ltd",
    title: "API Raw Material Import Customs Clearance",
    detail: "Import bill of entry cleared at Hyderabad Air Cargo Port with active Letter of Credit verification.",
    impact: "positive",
    value: "₹2.8 Cr Import LC"
  },
  {
    id: "tel-006",
    timestamp: "15 mins ago",
    type: "GST_EWAY",
    company: "Vayu Green Tech Solutions Ltd",
    title: "Single Buyer Invoice Spike Flagged",
    detail: "42% of month-to-date e-way bills issued to single EPC counterparty experiencing cash flow slowdown.",
    impact: "risk_flag",
    value: "42% Top Buyer Conc."
  }
];

export const INITIAL_ACO_QUEUE: ACOQueueItem[] = [
  {
    id: "ACO-2035-881",
    company_name: "Vayu Green Tech Solutions Ltd.",
    sector: "Renewable Energy Hardware",
    requested_limit: "₹6.50 Cr",
    recommended_limit: "₹5.00 Cr",
    health_score: 66,
    risk_tier: "Medium",
    operating_action: "ACO_ESCALATION",
    primary_flag: "DSO expansion (28 -> 58 days) & 42% Top Buyer concentration lockup",
    status: "Pending ACO Review",
    submitted_at: "Today, 10:14 AM",
    evaluation: {
      client_profile: {
        company_name: "Vayu Green Tech Solutions Ltd.",
        sector: "Renewable Energy Hardware",
        analyzed_period: "Q1 2035 Continuous Telemetry",
        annual_gst_revenue_inr: "₹72.8 Cr"
      },
      underwriting_summary: {
        health_score: 66,
        risk_tier: "Medium",
        operating_action: "ACO_ESCALATION",
        approved_dynamic_credit_limit_inr: "₹5.00 Cr",
        baseline_limit_inr: "₹4.00 Cr"
      },
      key_risk_indicators: [
        {
          metric: "Days Sales Outstanding (DSO)",
          status: "Warning",
          observation: "DSO expanded by 30 days (28 -> 58 days), indicating working capital lockup in unpaid invoices.",
          telemetry_source: "Account Aggregator Feed"
        },
        {
          metric: "Buyer Concentration",
          status: "Critical",
          observation: "42% revenue concentration tied to a single buyer experiencing liquidity slowdown.",
          telemetry_source: "GST e-Way Bill Stream"
        },
        {
          metric: "GST vs Bank Cash Flow Matching",
          status: "Healthy",
          observation: "Quarterly GST turnover ₹18.2 Cr matches monthly bank deposits within 3.5% variance.",
          telemetry_source: "GSTR-3B & Bank API"
        }
      ],
      agent_diagnostics: [
        {
          agent_name: "Cash Flow Anomaly Agent",
          score: 88,
          status: "Optimal",
          finding: "Bank cash inflows validate GST sales. No circular trading or shell company transactions detected."
        },
        {
          agent_name: "Working Capital Friction Agent",
          score: 54,
          status: "Alert",
          finding: "Receivables collection cycle slowed significantly over past 60 days."
        },
        {
          agent_name: "Buyer Concentration Risk Agent",
          score: 48,
          status: "Flagged",
          finding: "Top buyer holds ₹7.6 Cr unpaid receivables, creating systemic single-point dependency."
        },
        {
          agent_name: "Macro Sector Sentiment Agent",
          score: 82,
          status: "Optimal",
          finding: "Renewable Energy Hardware macro demand in India remains robust under National Green Energy Corridor Expansion."
        }
      ],
      operating_model_routing: {
        assigned_role: "AI Credit Officer (ACO)",
        action_summary: "Route to ACO for 15-minute exception approval. Limit capped at ₹5.00 Cr pending credit protection on remaining balance."
      },
      rm_strategic_upsell: "Recommend client onboard remaining ₹1.50 Cr invoice receivables onto Axis Bank's A.Treds platform to unlock instant non-recourse liquidity."
    }
  },
  {
    id: "ACO-2035-882",
    company_name: "Zenith Solar Systems Pvt Ltd",
    sector: "Solar Manufacturing",
    requested_limit: "₹5.00 Cr",
    recommended_limit: "₹2.10 Cr",
    health_score: 44,
    risk_tier: "High",
    operating_action: "CREDIT_FREEZE",
    primary_flag: "Critical DSO expansion (74 days) & GSTR mismatch >18%",
    status: "Pending ACO Review",
    submitted_at: "Today, 09:30 AM",
    evaluation: {
      client_profile: {
        company_name: "Zenith Solar Systems Pvt Ltd",
        sector: "Solar Manufacturing",
        analyzed_period: "Q1 2035 Continuous Telemetry",
        annual_gst_revenue_inr: "₹28.0 Cr"
      },
      underwriting_summary: {
        health_score: 44,
        risk_tier: "High",
        operating_action: "CREDIT_FREEZE",
        approved_dynamic_credit_limit_inr: "₹2.10 Cr (Frozen)",
        baseline_limit_inr: "₹4.00 Cr"
      },
      key_risk_indicators: [
        {
          metric: "GSTR vs Bank Match",
          status: "Critical",
          observation: "19.4% discrepancy between GST declared turnover and actual bank account inflows over 90 days.",
          telemetry_source: "Account Aggregator"
        },
        {
          metric: "Days Sales Outstanding",
          status: "Critical",
          observation: "DSO enlarged to 74 days; severe liquidity freeze observed.",
          telemetry_source: "ERP Direct API"
        }
      ],
      agent_diagnostics: [
        {
          agent_name: "Cash Flow Anomaly Agent",
          score: 42,
          status: "Flagged",
          finding: "Possible off-book revenue diversion or delay in client reconciliation."
        },
        {
          agent_name: "Working Capital Friction Agent",
          score: 38,
          status: "Flagged",
          finding: "Inventory turnover cycle stalled due to polysilicon raw material cost inflation."
        }
      ],
      operating_model_routing: {
        assigned_role: "AI Credit Officer (ACO)",
        action_summary: "Initiate credit freeze on top-up requests. Request physical audit or collateral enhancement before unlocking line."
      },
      rm_strategic_upsell: "Structure LC-backed supplier financing overlay with 100% margin security."
    }
  },
  {
    id: "ACO-2035-883",
    company_name: "Kaveri Pharma Organics Pvt Ltd",
    sector: "Pharmaceuticals & Bulk Drugs",
    requested_limit: "₹4.50 Cr",
    recommended_limit: "₹4.20 Cr",
    health_score: 72,
    risk_tier: "Medium",
    operating_action: "ACO_ESCALATION",
    primary_flag: "38% Buyer concentration requiring TReDS collateral overlay",
    status: "Pending ACO Review",
    submitted_at: "Today, 08:45 AM",
    evaluation: {
      client_profile: {
        company_name: "Kaveri Pharma Organics Pvt Ltd",
        sector: "Pharmaceuticals & Bulk Drugs",
        analyzed_period: "Q1 2035 Continuous Telemetry",
        annual_gst_revenue_inr: "₹42.5 Cr"
      },
      underwriting_summary: {
        health_score: 72,
        risk_tier: "Medium",
        operating_action: "ACO_ESCALATION",
        approved_dynamic_credit_limit_inr: "₹4.20 Cr",
        baseline_limit_inr: "₹3.50 Cr"
      },
      key_risk_indicators: [
        {
          metric: "Working Capital DSO",
          status: "Healthy",
          observation: "DSO stable at 52 days in line with pharma industry standards.",
          telemetry_source: "Account Aggregator Feed"
        },
        {
          metric: "Buyer Concentration",
          status: "Warning",
          observation: "38% top buyer concentration in tier-1 hospital chain.",
          telemetry_source: "GST e-Way Bill Stream"
        }
      ],
      operating_model_routing: {
        assigned_role: "AI Credit Officer (ACO)",
        action_summary: "Approved with standard ₹0.30 Cr haircuts. Recommend onboarding buyer receivables."
      },
      rm_strategic_upsell: "Deploy Axis Bank Supply Chain Financing (SCF) vendor platform."
    }
  }
];
