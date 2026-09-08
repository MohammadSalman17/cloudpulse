import React from 'react';
import { StatsRow } from '../StatsRow';
import { CLOUD_REGIONS } from '../../lib/regionData';
import { Badge } from '../Badge';

export const OverviewTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-white">Overview</h2>
    <StatsRow />
    <div className="rounded-2xl border border-white/5 bg-[#16204A]/50 overflow-hidden">
      <div className="px-5 py-3 border-b border-white/5 text-sm font-medium text-slate-300">Regions</div>
      <div className="divide-y divide-white/5">
        {CLOUD_REGIONS.map((r) => (
          <div key={r.id} className="px-5 py-3 flex items-center justify-between gap-4 text-sm">
            <div>
              <div className="text-white font-medium">{r.name}</div>
              <div className="text-slate-500 text-xs">{r.provider} · {r.city}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono">${r.monthlySpend.toLocaleString()}</div>
              <Badge variant={r.status === 'optimal' ? 'success' : r.status === 'warning' ? 'warning' : 'danger'}>
                {r.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
