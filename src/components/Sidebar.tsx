import React from 'react';
import {
  Globe2, LayoutDashboard, DollarSign, HeartPulse, Leaf, Bot, Radio, ChevronLeft, ChevronRight, LogIn,
} from 'lucide-react';
import { DashboardTab } from '../types';
import { CloudPulseSymbol } from './CloudPulseSymbol';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onRequestLogin: () => void;
}

const nav = [
  { id: 'global' as DashboardTab, label: 'Global', icon: Globe2 },
  { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
  { id: 'cost' as DashboardTab, label: 'Cost', icon: DollarSign },
  { id: 'health' as DashboardTab, label: 'Health', icon: HeartPulse },
  { id: 'carbon' as DashboardTab, label: 'Carbon', icon: Leaf },
  { id: 'ai' as DashboardTab, label: 'AI Agent', icon: Bot },
  { id: 'live' as DashboardTab, label: 'Live Feed', icon: Radio },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab, onSelectTab, collapsed, onToggleCollapse, onRequestLogin,
}) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <aside
      className={`shrink-0 border-r border-white/5 bg-[#0C1228] flex flex-col transition-all duration-200 ${
        collapsed ? 'w-[68px]' : 'w-[220px]'
      }`}
    >
      <div className="h-14 flex items-center gap-2 px-3 border-b border-white/5">
        <CloudPulseSymbol className="w-7 h-7 shrink-0" />
        {!collapsed && <span className="font-bold text-white text-sm tracking-tight">CloudPulse</span>}
      </div>

      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {nav.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition ${
                active
                  ? 'bg-[#1D63FF]/20 text-[#22D3EE]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-2 border-t border-white/5 space-y-1">
        {isAuthenticated ? (
          <div className={`text-xs text-slate-400 px-2 ${collapsed ? 'text-center' : ''}`}>
            {!collapsed && <div className="truncate mb-1">{user?.email}</div>}
            <button onClick={logout} className="text-rose-400 hover:underline text-xs">
              {collapsed ? '⎋' : 'Sign out'}
            </button>
          </div>
        ) : (
          <button
            onClick={onRequestLogin}
            className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            <LogIn className="w-4 h-4" />
            {!collapsed && 'Sign in'}
          </button>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center py-1.5 text-slate-500 hover:text-slate-300"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
