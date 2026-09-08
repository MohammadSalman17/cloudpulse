import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Props {
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1D63FF] hover:bg-[#1550d4] shadow-lg shadow-[#1D63FF]/30 flex items-center justify-center text-white transition-transform hover:scale-105"
    aria-label="Open assistant"
  >
    <MessageCircle className="w-6 h-6" />
  </button>
);
