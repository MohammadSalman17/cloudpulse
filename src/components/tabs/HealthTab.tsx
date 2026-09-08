import React from 'react';
import { CLOUD_REGIONS } from '../../lib/regionData';
import { Badge } from '../Badge';

export const HealthTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-white">Health & Reliability</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {CLOUD_REGIONS.map((r) => (
        <div key={r.id} className="rounded-2xl border border-white/5 bg-[#16204A]/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium text-sm">{r.name}</span>
            <Badge variant={r.healthScore >= 95 ? 'success' : r.healthScore >= 90 ? 'warning' : 'danger'}>
              {r.healthScore}%
            </Badge>
          </div>
          <div className="text-xs text-slate-400 mb-2">{r.provider} · {r.topService}</div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                r.healthScore >= 95 ? 'bg-emerald-400' : r.healthScore >= 90 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
              style={{ width: `${r.healthScore}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
