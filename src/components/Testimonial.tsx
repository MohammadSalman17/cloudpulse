import React from 'react';

export const TestimonialCard: React.FC = () => (
  <div className="rounded-2xl border border-white/5 bg-[#16204A]/50 p-6 md:p-8">
    <p className="text-slate-300 text-sm md:text-base leading-relaxed italic mb-4">
      "CloudPulse gave us real-time visibility across three clouds. We cut waste by 23% in the first quarter and finally have carbon reporting the board understands."
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D63FF] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm">
        AP
      </div>
      <div>
        <div className="text-white font-semibold text-sm">Ananya Patel</div>
        <div className="text-slate-500 text-xs">Head of FinOps · NovaScale</div>
      </div>
    </div>
  </div>
);
