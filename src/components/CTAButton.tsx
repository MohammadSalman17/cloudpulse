import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTACardProps {
  onAction?: () => void;
}

export const CTACard: React.FC<CTACardProps> = ({ onAction }) => (
  <div className="rounded-2xl border border-[#1D63FF]/30 bg-gradient-to-br from-[#1D63FF]/10 to-[#22D3EE]/5 p-8 text-center">
    <h3 className="text-xl font-bold text-white mb-2">Ready to optimize your cloud?</h3>
    <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
      Start monitoring cost, health and carbon across AWS, Azure and GCP in minutes.
    </p>
    <button
      onClick={onAction}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1D63FF] hover:bg-[#1550d4] text-white font-semibold transition"
    >
      Get Started Free <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);
