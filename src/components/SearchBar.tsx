import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchResources } from '../lib/searchData';

export const SearchBar: React.FC = () => {
  const [q, setQ] = useState('');
  const results = searchResources(q);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search resources..."
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#1D63FF]"
      />
      {q && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-white/10 bg-[#0F1630] shadow-xl z-20 max-h-60 overflow-y-auto">
          {results.map((r) => (
            <div key={r.id} className="px-3 py-2 text-sm hover:bg-white/5 cursor-pointer">
              <div className="text-white">{r.title}</div>
              <div className="text-xs text-slate-500">{r.category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
