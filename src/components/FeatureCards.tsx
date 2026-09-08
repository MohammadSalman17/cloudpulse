import React from 'react';
import { Globe2, Zap, Shield, BarChart3 } from 'lucide-react';

export const HeroImageRow: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      { title: '3D Global View', desc: 'See every region and live traffic on an interactive Earth', icon: Globe2 },
      { title: 'Real-time Streams', desc: 'Kafka-powered telemetry for cost, health & carbon', icon: Zap },
      { title: 'AI Remediation', desc: 'Autonomous anomaly detection and PDF remediation reports', icon: Shield },
    ].map((f) => (
      <div key={f.title} className="rounded-2xl border border-white/5 bg-[#16204A]/50 p-5 hover:border-[#1D63FF]/30 transition">
        <f.icon className="w-6 h-6 text-[#22D3EE] mb-3" />
        <h4 className="font-semibold text-white mb-1">{f.title}</h4>
        <p className="text-slate-400 text-sm">{f.desc}</p>
      </div>
    ))}
  </div>
);

export const CorePulseFeatureRow: React.FC = () => (
  <div className="rounded-2xl border border-white/5 bg-[#16204A]/40 p-6 md:p-8">
    <div className="flex items-center gap-2 mb-4">
      <BarChart3 className="w-5 h-5 text-[#1D63FF]" />
      <h3 className="text-lg font-bold text-white">One platform for FinOps + GreenOps</h3>
    </div>
    <p className="text-slate-400 text-sm max-w-2xl">
      CloudPulse unifies billing, availability, latency and carbon intensity across AWS, Azure and GCP.
      Use live Kafka feeds, CSV uploads, or the built-in AI agent to cut waste and reduce emissions.
    </p>
  </div>
);
