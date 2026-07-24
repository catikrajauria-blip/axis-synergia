import React, { useState } from 'react';
import { 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Filter, 
  Search, 
  Building2, 
  Clock, 
  ShieldAlert,
  Sliders,
  Check,
  ChevronRight
} from 'lucide-react';
import { ACOQueueItem, CreditEvaluationResult } from '../types';

interface ACOApprovalQueueProps {
  queue: ACOQueueItem[];
  onApproveACO: (id: string, note: string) => void;
  onModifyACO: (id: string, newLimit: string, note: string) => void;
  onFreezeACO: (id: string, note: string) => void;
  onInspectItem: (item: ACOQueueItem) => void;
}

export const ACOApprovalQueue: React.FC<ACOApprovalQueueProps> = ({
  queue,
  onApproveACO,
  onModifyACO,
  onFreezeACO,
  onInspectItem
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<ACOQueueItem | null>(null);
  const [modalAction, setModalAction] = useState<'APPROVE' | 'MODIFY' | 'FREEZE' | null>(null);
  const [customNote, setCustomNote] = useState('');
  const [newLimitInput, setNewLimitInput] = useState('');

  const filteredQueue = queue.filter((item) => {
    const matchesSearch = item.company_name.toLowerCase().includes(search.toLowerCase()) ||
      item.sector.toLowerCase().includes(search.toLowerCase()) ||
      item.primary_flag.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAction = (item: ACOQueueItem, action: 'APPROVE' | 'MODIFY' | 'FREEZE') => {
    setActiveModalItem(item);
    setModalAction(action);
    setCustomNote('');
    setNewLimitInput(item.recommended_limit);
  };

  const handleConfirmModalAction = () => {
    if (!activeModalItem || !modalAction) return;

    if (modalAction === 'APPROVE') {
      onApproveACO(activeModalItem.id, customNote || "ACO sign-off approved based on telemetry audit.");
    } else if (modalAction === 'MODIFY') {
      onModifyACO(activeModalItem.id, newLimitInput || activeModalItem.recommended_limit, customNote || "ACO limit structure modified with TReDS overlay.");
    } else if (modalAction === 'FREEZE') {
      onFreezeACO(activeModalItem.id, customNote || "ACO initiated risk freeze pending audit.");
    }

    setActiveModalItem(null);
    setModalAction(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Queue Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-700 rounded-lg">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Human-in-the-Loop (ACO) Exception Review Queue
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {queue.filter(q => q.status === 'Pending ACO Review').length} Pending
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Flagged medium/high risk MSME commercial credit applications awaiting 15-minute AI Credit Officer sign-off
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search ACO queue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#97124B]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending ACO Review">Pending ACO Review</option>
            <option value="ACO Approved">ACO Approved</option>
            <option value="Structure Modified">Structure Modified</option>
            <option value="Credit Frozen">Credit Frozen</option>
          </select>
        </div>
      </div>

      {/* Queue Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-100/80 border-b border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Ref ID / Client</th>
              <th className="py-3 px-4">Macro Sector</th>
              <th className="py-3 px-4">Req / Rec Limit</th>
              <th className="py-3 px-4">Health & Tier</th>
              <th className="py-3 px-4">Primary Telemetry Flag</th>
              <th className="py-3 px-4">ACO Queue Status</th>
              <th className="py-3 px-4 text-right">ACO Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQueue.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400 text-xs font-medium">
                  No applications in ACO review queue matching filter.
                </td>
              </tr>
            ) : (
              filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-gray-900 text-xs">{item.company_name}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">{item.id} • {item.submitted_at}</div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-700 font-medium">{item.sector}</td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{item.recommended_limit}</div>
                    <div className="text-[10px] text-gray-400">Req: {item.requested_limit}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-xs ${
                        item.health_score >= 75 ? 'text-emerald-600' :
                        item.health_score >= 50 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {item.health_score}/100
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.risk_tier === 'Low' ? 'bg-emerald-100 text-emerald-800' :
                        item.risk_tier === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.risk_tier}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs text-gray-600 leading-snug font-medium">
                    <span className="line-clamp-2">{item.primary_flag}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'Pending ACO Review' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      item.status === 'ACO Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      item.status === 'Structure Modified' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onInspectItem(item)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                        title="View Full Diagnostic Dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {item.status === 'Pending ACO Review' ? (
                        <>
                          <button
                            onClick={() => handleOpenAction(item, 'APPROVE')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded font-bold text-[10px] uppercase tracking-wider transition-colors shadow-2xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleOpenAction(item, 'MODIFY')}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded font-bold text-[10px] uppercase tracking-wider transition-colors shadow-2xs"
                          >
                            Structure
                          </button>
                          <button
                            onClick={() => handleOpenAction(item, 'FREEZE')}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded font-bold text-[10px] uppercase tracking-wider transition-colors shadow-2xs"
                          >
                            Freeze
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic font-medium">Signed Off</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ACO Action Confirmation Modal */}
      {activeModalItem && modalAction && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200">
            <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#97124B]" />
              <span>
                ACO Exception Sign-Off: {activeModalItem.company_name}
              </span>
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-medium">
              Action: <strong className="text-gray-900 uppercase">{modalAction}</strong> | Ref ID: {activeModalItem.id}
            </p>

            {modalAction === 'MODIFY' && (
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Adjusted Dynamic Limit (₹ Cr)
                </label>
                <input
                  type="text"
                  value={newLimitInput}
                  onChange={(e) => setNewLimitInput(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-900"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                ACO Override Memorandum & Telemetry Audit Note
              </label>
              <textarea
                rows={3}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Enter credit officer audit reasoning..."
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => { setActiveModalItem(null); setModalAction(null); }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModalAction}
                className="px-5 py-2 bg-[#97124B] hover:bg-[#7A0C3C] text-white font-bold text-xs uppercase tracking-wider rounded shadow-sm"
              >
                Confirm ACO Sign-Off
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
