import React from 'react';

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-slate-700/40 ${className}`} />
);

export const CardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-white/5 bg-[#16204A]/60 p-6 space-y-4">
    <LoadingSkeleton className="h-4 w-1/3" />
    <LoadingSkeleton className="h-8 w-1/2" />
    <LoadingSkeleton className="h-24 w-full" />
  </div>
);
