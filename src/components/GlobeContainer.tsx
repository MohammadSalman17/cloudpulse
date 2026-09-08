import React from 'react';
import { CLOUD_REGIONS } from '../lib/regionData';

export const GlobeContainer: React.FC = () => {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      {/* Simplified globe placeholder - full react-globe.gl works when deps are installed */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#0a1a2e] border border-[#1D63FF]/20 shadow-2xl shadow-[#1D63FF]/10 overflow-hidden">
        <div className="absolute inset-4 rounded-full border border-[#22D3EE]/10" />
        <div className="absolute inset-8 rounded-full border border-[#1D63FF]/10" />
        {/* Region dots */}
        {CLOUD_REGIONS.slice(0, 7).map((r, i) => {
          const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 32;
          const y = 50 + Math.sin(angle) * 28;
          return (
            <div
              key={r.id}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-pulse"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              title={`${r.name} · $${r.monthlySpend.toLocaleString()}`}
            />
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white/90">Earth</div>
            <div className="text-xs text-[#22D3EE] font-mono mt-1">{CLOUD_REGIONS.length} regions live</div>
          </div>
        </div>
      </div>
    </div>
  );
};
