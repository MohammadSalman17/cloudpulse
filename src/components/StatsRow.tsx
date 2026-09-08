import React from 'react';
import { DollarSign, Activity, Leaf, Server } from 'lucide-react';

const stats = [
  { label: 'Monthly Spend', value: '$54.2k', change: '-8.4%', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Avg Availability', value: '99.7%', change: '+0.2%', icon: Activity, color: 'text-cyan-400' },
  { label: 'CO₂e This Month', value: '1.8 t', change: '-12%', icon: Leaf, color: 'text-green-400' },
  { label: 'Active Services', value: '47', change: '+3', icon: Server, color: 'text-blue-400' },
];

export const StatsRow: React.FC = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((s) => (
      <div key={s.label} className="rounded-2xl border border-white/5 bg-[#16204A]/60 p-4 md:p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-xs font-medium">{s.label}</span>
          <s.icon className={`w-4 h-4 ${s.color}`} />
        </div>
        <div className="text-xl md:text-2xl font-bold text-white">{s.value}</div>
        <div className={`text-xs mt-1 ${s.change.startsWith('-') && s.label !== 'Avg Availability' ? 'text-emerald-400' : 'text-slate-400'}`}>
          {s.change} vs last month
        </div>
      </div>
    ))}
  </div>
);
