import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { parseCloudCSV } from '../lib/csvParser';
import { MetricRecord } from '../types';

interface Props {
  onParsed?: (records: MetricRecord[]) => void;
}

export const CSVUploader: React.FC<Props> = ({ onParsed }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState<number | null>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();
    const records = parseCloudCSV(text);
    setCount(records.length);
    onParsed?.(records);
  };

  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-[#16204A]/40 p-8 text-center">
      <Upload className="w-8 h-8 text-[#22D3EE] mx-auto mb-3" />
      <p className="text-sm text-slate-300 mb-3">Drop a cloud metrics CSV or click to browse</p>
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 rounded-lg bg-[#1D63FF] text-white text-sm font-medium"
      >
        Select CSV
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      {count !== null && (
        <p className="text-xs text-emerald-400 mt-3">Parsed {count} records</p>
      )}
    </div>
  );
};
