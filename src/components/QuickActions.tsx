import React from 'react';
import { AlertTriangle, Upload, Sparkles, Radio } from 'lucide-react';

interface QuickActionsProps {
  onTriggerAnomaly?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onTriggerAnomaly, onNavigateTab }) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={onTriggerAnomaly}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium hover:bg-rose-500/20 transition"
    >
      <AlertTriangle className="w-3.5 h-3.5" /> Simulate Anomaly
    </button>
    <button
      onClick={() => onNavigateTab?.('ai')}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1D63FF]/10 border border-[#1D63FF]/20 text-[#22D3EE] text-xs font-medium hover:bg-[#1D63FF]/20 transition"
    >
      <Sparkles className="w-3.5 h-3.5" /> AI Agent
    </button>
    <button
      onClick={() => onNavigateTab?.('live')}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition"
    >
      <Radio className="w-3.5 h-3.5" /> Live Feed
    </button>
    <button
      onClick={() => onNavigateTab?.('cost')}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-white/10 transition"
    >
      <Upload className="w-3.5 h-3.5" /> Upload CSV
    </button>
  </div>
);
