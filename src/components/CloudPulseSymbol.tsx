import React from 'react';

export const CloudPulseSymbol: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" stroke="url(#grad)" strokeWidth="2" fill="rgba(29,99,255,0.1)" />
    <path d="M12 22c0-4 3-7 8-7s8 3 8 7" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3" fill="#1D63FF" />
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#1D63FF" />
        <stop offset="1" stopColor="#22D3EE" />
      </linearGradient>
    </defs>
  </svg>
);
