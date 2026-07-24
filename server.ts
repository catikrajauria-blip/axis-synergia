import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with user-agent header
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI client:", err);
  }
}

// Fallback deterministic credit engine logic if Gemini API is offline/unconfigured
function calculateFallbackUnderwrite(input: any) {
  const {
    company_name = "Enterprise Client",
    macro_sector = "General Commercial",
    annual_gst_revenue = 50,
    dso = 40,
    top_buyer_concentration = 25,
    avg_monthly_bank_balance = 3,
    requested_working_capital_topup = 5
  } = input;

  let baseScore = 88;
  const kris: any[] = [];
  const diagnostics: any[] = [];

  // Cash flow check
  const monthlyGst = annual_gst_revenue / 12;
  const bankVsGstRatio = (avg_monthly_bank_balance / monthlyGst);
  if (bankVsGstRatio < 0.85) {
    baseScore -= 18;
    kris.push({
      metric: "GST vs Bank Cash Flow Matching",
      status: "Critical",
      observation: `Bank monthly inflow (₹${avg_monthly_bank_balance.toFixed(2)} Cr) lags declared monthly GST revenue (₹${monthlyGst.toFixed(2)} Cr) by >15%.`,
      telemetry_source: "Account Aggregator & GSTR-3B"
    });
    diagnostics.push({
      agent_name: "Cash Flow Anomaly Agent",
      score: 55,
      status: "Flagged",
      finding: "Significant variance between reported GST invoices and bank liquidity deposits."
    });
  } else {
    kris.push({
      metric: "GST vs Bank Cash Flow Matching",
      status: "Healthy",
      observation: `Monthly bank balance (₹${avg_monthly_bank_balance.toFixed(2)} Cr) reconciles cleanly with monthly GST turnover (₹${monthlyGst.toFixed(2)} Cr).`,
      telemetry_source: "GSTR-3B Auto-Reconciliation"
    });
    diagnostics.push({
      agent_name: "Cash Flow Anomaly Agent",
      score: 92,
      status: "Optimal",
      finding: "Verified clean banking transaction ledger matching e-way bill receipts."
    });
  }

  // Working Capital / DSO check
  if (dso > 55) {
    baseScore -= 20;
    kris.push({
      metric: "Days Sales Outstanding (DSO)",
      status: "Critical",
      observation: `DSO extended to ${dso} days (exceeds 45-day threshold). Receivables liquidity lockup observed.`,
      telemetry_source: "Open Account Aggregator Feed"
    });
    diagnostics.push({
      agent_name: "Working Capital Friction Agent",
      score: 52,
      status: "Flagged",
      finding: "Elevated collection period risks short-term liquidity stress on working capital."
    });
  } else if (dso > 45) {
    baseScore -= 10;
    kris.push({
      metric: "Days Sales Outstanding (DSO)",
      status: "Warning",
      observation: `DSO at ${dso} days is moderately elevated above 45-day benchmark.`,
      telemetry_source: "Account Aggregator Stream"
    });
    diagnostics.push({
      agent_name: "Working Capital Friction Agent",
      score: 70,
      status: "Alert",
      finding: "Working capital cycle requires monitoring of aging receivables."
    });
  } else {
    kris.push({
      metric: "Days Sales Outstanding (DSO)",
      status: "Healthy",
      observation: `DSO at ${dso} days remains optimal (<45 days benchmark).`,
      telemetry_source: "ERP Direct API"
    });
    diagnostics.push({
      agent_name: "Working Capital Friction Agent",
      score: 95,
      status: "Optimal",
      finding: "Rapid cash conversion cycle with minimal receivables lag."
    });
  }

  // Buyer Concentration check
  if (top_buyer_concentration > 35) {
    baseScore -= 16;
    kris.push({
      metric: "Top Buyer Revenue Concentration",
      status: top_buyer_concentration > 50 ? "Critical" : "Warning",
      observation: `Top buyer accounts for ${top_buyer_concentration}% of total revenue (threshold 35%). Single counterparty risk present.`,
      telemetry_source: "GST e-Way Bill Stream"
    });
    diagnostics.push({
      agent_name: "Buyer Concentration Risk Agent",
      score: 48,
      status: "Flagged",
      finding: `Over-dependence on single buyer (${top_buyer_concentration}% volume) requires invoice-factoring collateral overlay.`
    });
  } else {
    kris.push({
      metric: "Top Buyer Revenue Concentration",
      status: "Healthy",
      observation: `Top buyer concentration balanced at ${top_buyer_concentration}% (<35% threshold).`,
      telemetry_source: "GST e-Way Bill Analytics"
    });
    diagnostics.push({
      agent_name: "Buyer Concentration Risk Agent",
      score: 90,
      status: "Optimal",
      finding: "Diversified buyer portfolio reduces single counterparty default exposure."
    });
  }

  // Macro sector agent
  diagnostics.push({
    agent_name: "Macro Sector & Market Sentiment Agent",
    score: 85,
    status: "Optimal",
    finding: `Macro industry outlook for ${macro_sector} remains stable under current RBI and MoF credit policy frameworks.`
  });

  const finalScore = Math.max(25, Math.min(99, baseScore));
  let riskTier: 'Low' | 'Medium' | 'High' = 'Low';
  let operatingAction: 'AUTO_APPROVE' | 'ACO_ESCALATION' | 'CREDIT_FREEZE' = 'AUTO_APPROVE';
  let assignedRole: 'System Autonomous' | 'AI Credit Officer (ACO)' | 'Relationship Strategist' = 'System Autonomous';

  if (finalScore >= 75) {
    riskTier = 'Low';
    operatingAction = 'AUTO_APPROVE';
    assignedRole = 'System Autonomous';
  } else if (finalScore >= 50) {
    riskTier = 'Medium';
    operatingAction = 'ACO_ESCALATION';
    assignedRole = 'AI Credit Officer (ACO)';
  } else {
    riskTier = 'High';
    operatingAction = 'CREDIT_FREEZE';
    assignedRole = 'AI Credit Officer (ACO)';
  }

  const approvedLimitVal = operatingAction === 'CREDIT_FREEZE'
    ? Math.min(requested_working_capital_topup * 0.4, 2.0)
    : operatingAction === 'ACO_ESCALATION'
    ? Math.min(requested_working_capital_topup * 0.8, requested_working_capital_topup - 1.0)
    : requested_working_capital_topup;

  const approvedLimitStr = `₹${Math.max(1.0, approvedLimitVal).toFixed(2)} Cr`;

  let actionSummary = "";
  if (operatingAction === 'AUTO_APPROVE') {
    actionSummary = `Continuous AI underwrite passed all telemetry benchmarks. Daily self-adjusting credit line of ${approvedLimitStr} approved autonomously.`;
  } else if (operatingAction === 'ACO_ESCALATION') {
    actionSummary = `Route to AI Credit Officer (ACO) for 15-minute exception review. Capped limit at ${approvedLimitStr} pending invoice-factoring overlay.`;
  } else {
    actionSummary = `Initiated proactive credit freeze due to health score (${finalScore}). Escalated to ACO and Risk Committee for collateral enhancement.`;
  }

  let upsell = "";
  if (top_buyer_concentration > 35) {
    upsell = `Recommend client onboard remaining ₹${(requested_working_capital_topup - approvedLimitVal).toFixed(2)} Cr invoice receivables onto Axis Bank's A.Treds platform to unlock instant non-recourse liquidity.`;
  } else if (dso > 45) {
    upsell = `Deploy Axis Bank Vendor Financing (VFS) and reverse factoring solution to compress DSO down to <35 days.`;
  } else {
    upsell = `Client qualified for Axis Bank Ambient Preferred Credit Tier. Upsell automated Forex Hedging & Working Capital Term Loan at 8.25% p.a.`;
  }

  return {
    client_profile: {
      company_name,
      sector: macro_sector,
      analyzed_period: "Q1 2035 Real-Time Telemetry",
      annual_gst_revenue_inr: `₹${annual_gst_revenue.toFixed(1)} Cr`
    },
    underwriting_summary: {
      health_score: finalScore,
      risk_tier: riskTier,
      operating_action: operatingAction,
      approved_dynamic_credit_limit_inr: approvedLimitStr,
      baseline_limit_inr: `₹${(requested_working_capital_topup * 0.75).toFixed(2)} Cr`
    },
    key_risk_indicators: kris,
    agent_diagnostics: diagnostics,
    operating_model_routing: {
      assigned_role: assignedRole,
      action_summary: actionSummary
    },
    rm_strategic_upsell: upsell,
    timestamp: new Date().toLocaleTimeString(),
    telemetry_sources_used: ["GST e-Way Bill", "Account Aggregator", "Bank Statement API", "Satellite Logistics Feed", "Commodity LME Index"]
  };
}

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", engine: "Axis Ambient-Credit 2035", timestamp: new Date().toISOString() });
});

// Underwriting AI Endpoint
app.post("/api/underwrite", async (req, res) => {
  const requestData = req.body || {};

  // Try real Gemini AI evaluation if key is available
  if (aiClient) {
    try {
      const prompt = `You are the "Axis Ambient-Credit Engine v2035", an enterprise multi-agent commercial underwriting system for Axis Bank Commercial Banking Group (CBG).

Perform an autonomous continuous commercial credit underwrite for:
Company: ${requestData.company_name || "Vayu Green Tech Solutions Ltd"}
Sector: ${requestData.macro_sector || "Renewable Energy Hardware"}
Annual GST Revenue: ₹${requestData.annual_gst_revenue || 72.8} Cr
Days Sales Outstanding (DSO): ${requestData.dso || 58} days
Top Buyer Concentration: ${requestData.top_buyer_concentration || 42}%
Average Monthly Bank Balance: ₹${requestData.avg_monthly_bank_balance || 2.4} Cr
Requested Working Capital Top-Up Limit: ₹${requestData.requested_working_capital_topup || 6.5} Cr

BENCHMARKS & EVALUATION RULES:
1. Cash Flow Health: Compare monthly GST turnover vs bank deposits. Discrepancies >15% trigger critical risk.
2. DSO Friction: >45 days triggers Warning; >55 days or >30% YoY increase signals liquidity freeze.
3. Buyer Concentration: >35% top buyer concentration requires collateral/TReDS mitigation.
4. Health Score Thresholds:
   - 75-100: Low Risk -> AUTO_APPROVE daily self-adjusting limit.
   - 50-74: Medium Risk -> ACO_ESCALATION for 15-minute ACO review & invoice protection.
   - <50: High Risk -> CREDIT_FREEZE + collateral request.

Output STRICT JSON with schema:
{
  "client_profile": {
    "company_name": "${requestData.company_name || "Client"}",
    "sector": "${requestData.macro_sector || "Sector"}",
    "analyzed_period": "Q1 2035 Real-Time Telemetry",
    "annual_gst_revenue_inr": "₹${requestData.annual_gst_revenue || 50} Cr"
  },
  "underwriting_summary": {
    "health_score": number,
    "risk_tier": "Low" | "Medium" | "High",
    "operating_action": "AUTO_APPROVE" | "ACO_ESCALATION" | "CREDIT_FREEZE",
    "approved_dynamic_credit_limit_inr": "string (e.g. ₹5.00 Cr)",
    "baseline_limit_inr": "string"
  },
  "key_risk_indicators": [
    {
      "metric": "string",
      "status": "Healthy" | "Warning" | "Critical",
      "observation": "string",
      "telemetry_source": "string"
    }
  ],
  "agent_diagnostics": [
    {
      "agent_name": "string",
      "score": number,
      "status": "Optimal" | "Alert" | "Flagged",
      "finding": "string"
    }
  ],
  "operating_model_routing": {
    "assigned_role": "System Autonomous" | "AI Credit Officer (ACO)" | "Relationship Strategist",
    "action_summary": "string"
  },
  "rm_strategic_upsell": "string"
}`;

      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      const responseText = response.text || "";
      const parsed = JSON.parse(responseText);
      parsed.timestamp = new Date().toLocaleTimeString();
      parsed.telemetry_sources_used = ["GST e-Way Bill", "Account Aggregator", "Bank Statement API", "Satellite Logistics Feed", "Commodity LME Index"];

      return res.json(parsed);
    } catch (err) {
      console.warn("Gemini API call returned error or invalid JSON, using fallback engine:", err);
    }
  }

  // Fallback engine execution
  const fallbackResult = calculateFallbackUnderwrite(requestData);
  return res.json(fallbackResult);
});

// Setup Vite Dev Middleware or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Axis Bank Ambient-Credit 2035 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
