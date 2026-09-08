import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { TopBar, AuthModal } from './components/TopBar';
import { GlobeContainer } from './components/GlobeContainer';
import { StatsRow } from './components/StatsRow';
import { HeroImageRow, CorePulseFeatureRow } from './components/FeatureCards';
import { TestimonialCard } from './components/Testimonial';
import { CTACard } from './components/CTAButton';

import { OverviewTab } from './components/tabs/OverviewTab';
import { CostTab } from './components/tabs/CostTab';
import { HealthTab } from './components/tabs/HealthTab';
import { CarbonTab } from './components/tabs/CarbonTab';
import { AIAgentTab } from './components/tabs/AIAgentTab';
import { LiveFeedTab } from './components/tabs/LiveFeedTab';

import { Hero } from './components/Hero';
import { LiveTicker } from './components/LiveTicker';
import { QuickActions } from './components/QuickActions';
import { FloatingActionButton } from './components/FloatingActionButton';

import { DashboardTab } from './types';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('global');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openLogin = () => {
    setIsSignUp(false);
    setAuthModalOpen(true);
  };

  const openSignUp = () => {
    setIsSignUp(true);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#10183A] text-slate-100 flex font-sans antialiased">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onRequestLogin={openLogin}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onRequestLogin={openLogin} onRequestSignUp={openSignUp} onSelectTab={setActiveTab} />

        <div className="px-6 pt-3">
          <LiveTicker />
        </div>

        <main className="p-6 md:p-8 max-w-[1440px] mx-auto w-full space-y-8 flex-1">
          <QuickActions
            onTriggerAnomaly={() => {
              if (isAuthenticated) setActiveTab('health');
              else openLogin();
            }}
            onNavigateTab={(tab) => {
              if (isAuthenticated) setActiveTab(tab as DashboardTab);
              else openLogin();
            }}
          />

          {(activeTab === 'global' || !isAuthenticated) && (
            <div className="space-y-12 animate-fadeIn">
              <Hero onSignIn={openLogin} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 flex justify-center items-center">
                  <GlobeContainer />
                </div>
                <div className="lg:col-span-4 space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1D63FF]/15 border border-[#1D63FF]/30 text-[#22D3EE] text-xs font-mono font-bold">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Next-Gen FinOps Telemetry</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug font-sans">
                    Real-Time Global <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D63FF] via-[#22D3EE] to-emerald-400">
                      Cloud Intelligence
                    </span>
                  </h1>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Monitor AWS, Azure & GCP spend, health and carbon in one place with live Kafka streams and AI remediation.
                  </p>
                  <button
                    onClick={openSignUp}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D63FF] hover:bg-[#1550d4] text-white font-semibold text-sm transition"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <StatsRow />
              <HeroImageRow />
              <CorePulseFeatureRow />
              <TestimonialCard />
              <CTACard onAction={openSignUp} />
            </div>
          )}

          {isAuthenticated && activeTab === 'overview' && <OverviewTab />}
          {isAuthenticated && activeTab === 'cost' && <CostTab />}
          {isAuthenticated && activeTab === 'health' && <HealthTab />}
          {isAuthenticated && activeTab === 'carbon' && <CarbonTab />}
          {isAuthenticated && activeTab === 'ai' && <AIAgentTab />}
          {isAuthenticated && activeTab === 'live' && <LiveFeedTab />}
        </main>
      </div>

      <FloatingActionButton onClick={openLogin} />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} isSignUp={isSignUp} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
