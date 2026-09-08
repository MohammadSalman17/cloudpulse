import React, { useEffect, useState } from 'react';

const items = [
  'AWS us-east-1 · EC2 cost spike +14%',
  'GCP europe-west1 · Carbon intensity 0.18 kgCO2e',
  'Azure East US · Availability 99.98%',
  'AWS ap-south-1 · Lambda error rate 0.4%',
  'GCP us-central1 · Cloud SQL latency 92ms',
  'Azure Central India · Blob storage +$1.2k',
];

export const LiveTicker: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0F1630]/80 px-4 py-2 overflow-hidden">
      <span className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded">
        Live
      </span>
      <div className="text-xs text-slate-300 font-mono truncate animate-pulse">{items[idx]}</div>
    </div>
  );
};
