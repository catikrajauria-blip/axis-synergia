import React, { useState } from 'react';
import { 
  Radio, 
  Satellite, 
  Receipt, 
  Landmark, 
  TrendingDown, 
  Container, 
  Search, 
  Filter, 
  Eye, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Pause,
  Play
} from 'lucide-react';
import { TelemetryFeedItem, TelemetryType } from '../types';

interface TelemetryFeedProps {
  feed: TelemetryFeedItem[];
  onSelectCompanyForUnderwrite: (companyName: string) => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const TelemetryFeed: React.FC<TelemetryFeedProps> = ({
  feed,
  onSelectCompanyForUnderwrite,
  isPaused,
  onTogglePause
}) => {
  const [selectedType, setSelectedType] = useState<TelemetryType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectItem, setInspectItem] = useState<TelemetryFeedItem | null>(null);

  const getSourceIcon = (type: TelemetryType) => {
    switch (type) {
      case 'GST_EWAY':
        return <Receipt className="w-4 h-4 text-purple-600" />;
      case 'ACCOUNT_AGGREGATOR':
        return <Landmark className="w-4 h-4 text-blue-600" />;
      case 'SATELLITE_LOGISTICS':
        return <Satellite className="w-4 h-4 text-emerald-600" />;
      case 'COMMODITY_INDEX':
        return <TrendingDown className="w-4 h-4 text-amber-600" />;
      case 'CUSTOMS_PORT':
        return <Container className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getBadgeColor = (type: TelemetryType) => {
    switch (type) {
      case 'GST_EWAY': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ACCOUNT_AGGREGATOR': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SATELLITE_LOGISTICS': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'COMMODITY_INDEX': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'CUSTOMS_PORT': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  const filteredFeed = feed.filter((item) => {
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    const matchesQuery = searchQuery === '' || 
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#97124B]/10 rounded text-[#97124B]">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
              <span>Telemetry Ingestion Stream</span>
              <span className="text-green-600 font-bold flex items-center gap-1 text-[10px] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                ● Live
              </span>
            </h2>
            <p className="text-[11px] text-gray-500 font-medium">
              Real-time multi-agent data feeds (GSTN, AA, ISRO Satellite, Commodity Spot)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onTogglePause}
            className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 hover:bg-gray-50 rounded text-xs font-bold text-gray-700 shadow-2xs"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-amber-600" />}
            <span>{isPaused ? 'Resume Ingestion' : 'Pause Stream'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 border-b border-gray-100 bg-white flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-2.5 py-1 rounded font-bold transition-colors whitespace-nowrap text-[11px] uppercase tracking-wider ${
              selectedType === 'ALL'
                ? 'bg-[#97124B] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({feed.length})
          </button>
          <button
            onClick={() => setSelectedType('GST_EWAY')}
            className={`px-2.5 py-1 rounded font-bold transition-colors whitespace-nowrap text-[11px] uppercase tracking-wider ${
              selectedType === 'GST_EWAY'
                ? 'bg-purple-700 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            GST e-Way
          </button>
          <button
            onClick={() => setSelectedType('ACCOUNT_AGGREGATOR')}
            className={`px-2.5 py-1 rounded font-bold transition-colors whitespace-nowrap text-[11px] uppercase tracking-wider ${
              selectedType === 'ACCOUNT_AGGREGATOR'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Account Aggregator
          </button>
          <button
            onClick={() => setSelectedType('SATELLITE_LOGISTICS')}
            className={`px-2.5 py-1 rounded font-bold transition-colors whitespace-nowrap text-[11px] uppercase tracking-wider ${
              selectedType === 'SATELLITE_LOGISTICS'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            Satellite & Logistics
          </button>
          <button
            onClick={() => setSelectedType('COMMODITY_INDEX')}
            className={`px-2.5 py-1 rounded font-bold transition-colors whitespace-nowrap text-[11px] uppercase tracking-wider ${
              selectedType === 'COMMODITY_INDEX'
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Commodities
          </button>
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search company or telemetry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#97124B]"
          />
        </div>
      </div>

      {/* Feed Stream List */}
      <div className="divide-y divide-gray-100 max-h-[280px] overflow-y-auto">
        {filteredFeed.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-xs">
            No telemetry records match current filters.
          </div>
        ) : (
          filteredFeed.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded bg-gray-50 border border-gray-200 shrink-0">
                  {getSourceIcon(item.type)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900 text-xs">{item.company}</span>
                    <span className={`border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(item.type)}`}>
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className="text-gray-400 text-[10px] font-mono">{item.timestamp}</span>
                  </div>

                  <p className="font-semibold text-gray-800 text-xs">{item.title}</p>
                  <p className="text-gray-600 text-[11px] leading-relaxed max-w-3xl">{item.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <span className="font-bold font-mono text-gray-900 block text-xs">{item.value}</span>
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 justify-end uppercase ${
                    item.impact === 'positive' ? 'text-emerald-600' :
                    item.impact === 'risk_flag' ? 'text-amber-600' :
                    item.impact === 'critical' ? 'text-rose-600' : 'text-gray-500'
                  }`}>
                    {item.impact === 'positive' && <CheckCircle2 className="w-3 h-3" />}
                    {item.impact === 'risk_flag' && <AlertTriangle className="w-3 h-3" />}
                    {item.impact === 'critical' && <XCircle className="w-3 h-3" />}
                    {item.impact.toUpperCase().replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={() => onSelectCompanyForUnderwrite(item.company)}
                  className="flex items-center gap-1 bg-[#97124B]/10 hover:bg-[#97124B] hover:text-white text-[#97124B] px-2.5 py-1 rounded font-bold text-[11px] transition-all uppercase tracking-wider"
                  title="Load into MSME Credit Evaluator"
                >
                  <span>Evaluate</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
