import React from 'react';
import { useKafkaStream } from '../../hooks/useKafkaStream';
import { Radio } from 'lucide-react';

export const LiveFeedTab: React.FC = () => {
  const { events, connected, error } = useKafkaStream();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#22D3EE]" /> Live Feed
        </h2>
        <span className={`text-xs font-mono px-2 py-1 rounded ${
          connected ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700 text-slate-400'
        }`}>
          {connected ? '● Connected' : '○ Disconnected'}
        </span>
      </div>

      {error && (
        <div className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2">
          {error} — Live SSE requires the local Kafka bridge. Demo mode shows static sample events.
        </div>
      )}

      <div className="rounded-2xl border border-white/5 bg-[#0F1630] overflow-hidden max-h-[480px] overflow-y-auto">
        {(events.length ? events : [
          { type: 'metric', provider: 'AWS', service: 'EC2', region: 'us-east-1', metric: 'cost', value: 12.4 },
          { type: 'metric', provider: 'GCP', service: 'Cloud SQL', region: 'us-central1', metric: 'latency', value: 94 },
          { type: 'metric', provider: 'Azure', service: 'Blob Storage', region: 'East US', metric: 'error_rate', value: 0.3 },
        ]).map((e, i) => (
          <div key={i} className="px-4 py-3 border-b border-white/5 text-xs font-mono text-slate-300 flex gap-3">
            <span className="text-slate-500">{new Date().toLocaleTimeString()}</span>
            <span className="text-[#22D3EE]">{e.provider || e.type}</span>
            <span>{e.service || e.type}</span>
            <span className="text-slate-400">{e.region}</span>
            <span className="ml-auto text-white">{e.metric}: {e.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
