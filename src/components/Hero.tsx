import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onSignIn?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSignIn }) => (
  <div className="text-center space-y-4 py-4">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D63FF]/15 border border-[#1D63FF]/30 text-[#22D3EE] text-xs font-mono font-bold">
      <Sparkles className="w-3.5 h-3.5" />
      CloudPulse v1.0 · FinOps + GreenOps
    </div>
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
      Multi-Cloud Intelligence
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D63FF] via-[#22D3EE] to-emerald-400">
        in Real Time
      </span>
    </h1>
    <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
      Cost, health and carbon metrics from AWS, Azure and GCP — unified dashboard, Kafka streams, and AI-powered remediation.
    </p>
    {onSignIn && (
      <button
        onClick={onSignIn}
        className="mt-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition"
      >
        Sign in to open dashboard
      </button>
    )}
  </div>
);
