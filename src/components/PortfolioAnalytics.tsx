import React from 'react';
import { 
  BarChart3, 
  X, 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Clock, 
  Building2,
  CheckCircle2,
  Zap,
  Layers,
  IndianRupee
} from 'lucide-react';

interface PortfolioAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#97124B] text-white rounded-xl shadow-xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Axis CBG Portfolio & Continuous Credit Telemetry Analytics
              </h2>
              <p className="text-xs text-slate-500">
                Portfolio size ₹14,250 Cr across 14,820 Commercial & MSME Borrowers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Key Portfolio Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block mb-1">Underwriting Speed TAT</span>
              <div className="text-xl font-extrabold text-slate-900">3.8 Minutes</div>
              <span className="text-emerald-600 font-semibold text-[11px] mt-1 block">
                ↓ Reduced from 12 Days Baseline (-99.7%)
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block mb-1">Autonomous Approval Rate</span>
              <div className="text-xl font-extrabold text-slate-900">87.4% Volume</div>
              <span className="text-emerald-600 font-semibold text-[11px] mt-1 block">
                ₹184 Cr Straight-Through Today
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block mb-1">Default Early Warning Lead Time</span>
              <div className="text-xl font-extrabold text-slate-900">42 Days Ahead</div>
              <span className="text-emerald-600 font-semibold text-[11px] mt-1 block">
                Early DSO & Concentration Detection
              </span>
            </div>
          </div>

          {/* Sector Breakdown Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-[#97124B]" /> Commercial Sector Portfolio Distribution
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 font-semibold text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Macro Sector</th>
                    <th className="py-2.5 px-3">Portfolio Exposure</th>
                    <th className="py-2.5 px-3">Avg Health Score</th>
                    <th className="py-2.5 px-3">ACO Escalation %</th>
                    <th className="py-2.5 px-3">Telemetry Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Auto Ancillary & Precision</td>
                    <td className="py-2.5 px-3">₹4,820 Cr (33.8%)</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">88.4 / 100</td>
                    <td className="py-2.5 px-3">6.2%</td>
                    <td className="py-2.5 px-3"><span className="text-emerald-600 font-semibold">Optimal</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Renewable Energy & Solar Hardware</td>
                    <td className="py-2.5 px-3">₹3,450 Cr (24.2%)</td>
                    <td className="py-2.5 px-3 text-amber-600 font-bold">71.8 / 100</td>
                    <td className="py-2.5 px-3">18.4%</td>
                    <td className="py-2.5 px-3"><span className="text-amber-600 font-semibold">DSO Monitored</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Pharmaceuticals & Bulk Drugs</td>
                    <td className="py-2.5 px-3">₹2,910 Cr (20.4%)</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">84.2 / 100</td>
                    <td className="py-2.5 px-3">8.1%</td>
                    <td className="py-2.5 px-3"><span className="text-emerald-600 font-semibold">Optimal</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Textiles & Apparel Export</td>
                    <td className="py-2.5 px-3">₹1,820 Cr (12.8%)</td>
                    <td className="py-2.5 px-3 text-amber-600 font-bold">68.5 / 100</td>
                    <td className="py-2.5 px-3">22.0%</td>
                    <td className="py-2.5 px-3"><span className="text-amber-600 font-semibold">Buyer Concentration</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Infrastructure & EPC Contracting</td>
                    <td className="py-2.5 px-3">₹1,250 Cr (8.8%)</td>
                    <td className="py-2.5 px-3 text-amber-600 font-bold">62.1 / 100</td>
                    <td className="py-2.5 px-3">31.5%</td>
                    <td className="py-2.5 px-3"><span className="text-amber-600 font-semibold">GSTR-3B Reconciling</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Underwriting Architecture Flow */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-amber-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Axis Bank Ambient-Credit Multi-Agent Underwriting Pipeline
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              Continuous 24/7 tele-ingestion processes live GST e-way bills, bank account aggregator statements, ISRO satellite port logistics, and LME commodity indices. Automated agents run continuous credit evaluations every 15 minutes, dynamically expanding or capping daily revolving credit lines to mitigate risk before defaults occur.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#97124B] text-white font-bold text-xs rounded-lg shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
