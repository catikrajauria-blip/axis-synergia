import React, { useState } from 'react';
import { 
  Building2, 
  IndianRupee, 
  Clock, 
  Users, 
  Briefcase, 
  Sparkles, 
  Zap, 
  RotateCcw, 
  CheckCircle2,
  FileText,
  Sliders
} from 'lucide-react';
import { CreditEvaluationRequest } from '../types';
import { SAMPLE_PRESETS } from '../data/mockData';

interface MSMECreditEvaluatorProps {
  onRequestEvaluation: (req: CreditEvaluationRequest) => void;
  isLoading: boolean;
}

export const MSMECreditEvaluator: React.FC<MSMECreditEvaluatorProps> = ({
  onRequestEvaluation,
  isLoading
}) => {
  const [formData, setFormData] = useState<CreditEvaluationRequest>({
    company_name: "Vayu Green Tech Solutions Ltd",
    macro_sector: "Renewable Energy Hardware",
    annual_gst_revenue: 72.8,
    dso: 58,
    top_buyer_concentration: 42,
    avg_monthly_bank_balance: 2.4,
    requested_working_capital_topup: 6.5
  });

  const handleSelectPreset = (presetRequest: CreditEvaluationRequest) => {
    setFormData(presetRequest);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestEvaluation(formData);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#97124B]/10 rounded-lg text-[#97124B]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                MSME Credit Evaluator
              </h2>
              <p className="text-[11px] text-gray-500 font-medium">
                Autonomous Commercial Underwriting Parameters
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mr-1 hidden lg:inline">Presets:</span>
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset.request)}
              className={`px-2 py-0.5 rounded border text-[10px] font-bold transition-all uppercase tracking-wider ${
                formData.company_name === preset.request.company_name
                  ? 'bg-[#97124B] text-white border-[#97124B]'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {preset.request.company_name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Company Name */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Company / MSME Name
            </label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              placeholder="e.g. Apex Engineering Ltd"
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#97124B] focus:bg-white transition-all"
            />
          </div>

          {/* Macro Sector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Macro Sector
            </label>
            <select
              value={formData.macro_sector}
              onChange={(e) => setFormData({ ...formData, macro_sector: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#97124B] focus:bg-white transition-all"
            >
              <option value="Renewable Energy Hardware">Renewable Energy Hardware</option>
              <option value="Auto Ancillary">Auto Ancillary & Precision</option>
              <option value="Solar Manufacturing">Solar Manufacturing</option>
              <option value="Pharmaceuticals & Bulk Drugs">Pharmaceuticals & Bulk Drugs</option>
              <option value="Textiles & Apparel Export">Textiles & Apparel Export</option>
              <option value="Infrastructure & EPC Contracting">Infrastructure & EPC Contracting</option>
              <option value="Chemicals & Polymers">Chemicals & Polymers</option>
            </select>
          </div>

          {/* Annual GST Revenue (₹ Cr) */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              GST Revenue (₹ Cr)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={formData.annual_gst_revenue}
              onChange={(e) => setFormData({ ...formData, annual_gst_revenue: parseFloat(e.target.value) || 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#97124B] focus:bg-white transition-all"
            />
          </div>

          {/* Days Sales Outstanding (DSO) */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1 flex items-center justify-between">
              <span>DSO (Days)</span>
              <span className={`text-[10px] font-bold ${formData.dso > 45 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {formData.dso} Days
              </span>
            </label>
            <input
              type="number"
              min="10"
              max="120"
              required
              value={formData.dso}
              onChange={(e) => setFormData({ ...formData, dso: parseInt(e.target.value) || 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#97124B] focus:bg-white transition-all"
            />
          </div>

          {/* Revenue Concentration % in Top Buyer */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1 flex items-center justify-between">
              <span>Top Buyer Conc. %</span>
              <span className={`text-[10px] font-bold ${formData.top_buyer_concentration > 35 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {formData.top_buyer_concentration}%
              </span>
            </label>
            <input
              type="number"
              min="1"
              max="100"
              required
              value={formData.top_buyer_concentration}
              onChange={(e) => setFormData({ ...formData, top_buyer_concentration: parseInt(e.target.value) || 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#97124B] focus:bg-white transition-all"
            />
          </div>

          {/* Requested Working Capital Limit (₹ Cr) */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              Requested Limit (₹ Cr)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={formData.requested_working_capital_topup || 5.0}
              onChange={(e) => setFormData({ ...formData, requested_working_capital_topup: parseFloat(e.target.value) || 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-sm font-medium text-gray-900 focus:outline-hidden focus:border-[#97124B] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 mt-2">
          <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Telemetry streams connect directly to AA & GSTN.</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-[#97124B] text-white py-2.5 px-6 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-pink-900/20 active:scale-95 hover:bg-[#7A0C3C] transition-all disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Underwriting...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Run Continuous AI Underwrite</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
