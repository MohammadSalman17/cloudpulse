import React from 'react';
import { CLOUD_REGIONS } from '../../lib/regionData';

export const CostTab: React.FC = () => {
  const total = CLOUD_REGIONS.reduce((s, r) => s + r.monthlySpend, 0);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Cost Intelligence</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/5 bg-[#16204A]/60 p-5">
          <div className="text-slate-400 text-xs mb-1">Total Monthly Spend</div>
          <div className="text-2xl font-bold text-white">${total.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#16204A]/60 p-5">
          <div className="text-slate-400 text-xs mb-1">Potential Savings</div>
          <div className="text-2xl font-bold text-emerald-400">~$8.4k</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#16204A]/60 p-5">
          <div className="text-slate-400 text-xs mb-1">Top Cost Driver</div>
          <div className="text-2xl font-bold text-white">EC2 / VMs</div>
        </div>
      </div>
      <div className="rounded-2xl border border-white/5 bg-[#16204A]/50 p-5">
        <h3 className="text-sm font-medium text-slate-300 mb-4">Spend by Region</h3>
        <div className="space-y-3">
          {CLOUD_REGIONS.map((r) => (
            <div key={r.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{r.name}</span>
                <span className="text-white font-mono">${r.monthlySpend.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1D63FF] to-[#22D3EE]"
                  style={{ width: `${(r.monthlySpend / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
