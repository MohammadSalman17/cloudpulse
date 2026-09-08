import React, { useState } from 'react';
import { Search, Bell, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardTab } from '../types';

interface TopBarProps {
  onRequestLogin: () => void;
  onRequestSignUp: () => void;
  onSelectTab: (tab: DashboardTab) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onRequestLogin, onRequestSignUp }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="h-14 shrink-0 border-b border-white/5 bg-[#0C1228]/80 backdrop-blur flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search regions, services, metrics..."
            className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#1D63FF]/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">
          <Bell className="w-4 h-4" />
        </button>
        {isAuthenticated ? (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1D63FF] to-[#22D3EE] flex items-center justify-center text-white text-xs font-bold">
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
            <span className="hidden sm:inline">{user?.name}</span>
          </div>
        ) : (
          <>
            <button onClick={onRequestLogin} className="text-sm text-slate-300 hover:text-white px-3 py-1.5">
              Sign in
            </button>
            <button
              onClick={onRequestSignUp}
              className="text-sm bg-[#1D63FF] hover:bg-[#1550d4] text-white px-3 py-1.5 rounded-lg font-medium"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  isSignUp: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, isSignUp }) => {
  const { login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) await signup(name || 'User', email, password);
    else await login(email, password);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0F1630] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{isSignUp ? 'Create account' : 'Sign in'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1D63FF]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1D63FF]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1D63FF]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#1D63FF] hover:bg-[#1550d4] text-white font-semibold text-sm disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center">Demo mode — any credentials work</p>
      </div>
    </div>
  );
};
