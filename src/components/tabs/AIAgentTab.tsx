import React, { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { solveAnomalyWithGroq, AnomalyResolution } from '../../lib/groqAgent';
import { generateRemediationPDF } from '../../lib/generateRemediationPDF';

export const AIAgentTab: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnomalyResolution | null>(null);

  const runAgent = async () => {
    setLoading(true);
    const res = await solveAnomalyWithGroq({
      service: 'EC2',
      provider: 'AWS',
      metric: 'error_rate',
      value: 2.4,
    });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Bot className="w-5 h-5 text-[#22D3EE]" /> AI Remediation Agent
      </h2>
      <p className="text-slate-400 text-sm max-w-xl">
        Simulate an anomaly and let the agent suggest root cause and remediation steps. In production this uses Groq / Gemini.
      </p>
      <button
        onClick={runAgent}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D63FF] hover:bg-[#1550d4] text-white font-semibold text-sm disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
        {loading ? 'Analyzing...' : 'Run Anomaly Analysis'}
      </button>

      {result && (
        <div className="rounded-2xl border border-white/5 bg-[#16204A]/60 p-6 space-y-4">
          <h3 className="font-semibold text-white">{result.summary}</h3>
          <div>
            <div className="text-xs text-slate-500 mb-1">Root Cause</div>
            <p className="text-sm text-slate-300">{result.rootCause}</p>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-2">Recommended Actions</div>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {result.recommendedActions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Confidence: {(result.confidence * 100).toFixed(0)}%</span>
            {result.estimatedSavings && <span>Savings: {result.estimatedSavings}</span>}
          </div>
          <button
            onClick={() => generateRemediationPDF(result)}
            className="text-sm text-[#22D3EE] hover:underline"
          >
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
};
