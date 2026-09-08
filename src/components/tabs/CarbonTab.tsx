import React from 'react';
import { CLOUD_REGIONS } from '../../lib/regionData';
import { Leaf } from 'lucide-react';

export const CarbonTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-white flex items-center gap-2">
      <Leaf className="w-5 h-5 text-emerald-400" /> Carbon Intelligence
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CLOUD_REGIONS.map((r) => (
        <div key={r.id} className="rounded-2xl border border-white/5 bg-[#16204A]/50 p-5 flex items-center justify-between">
          <div>
            <div className="text-white font-medium text-sm">{r.name}</div>
            <div className="text-xs text-slate-400">{r.provider}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono text-emerald-400">{r.carbonIntensity.toFixed(2)}</div>
            <div className="text-[10px] text-slate-500">kgCO2e / unit</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
