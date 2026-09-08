export type DashboardTab = 'global' | 'overview' | 'cost' | 'health' | 'carbon' | 'ai' | 'live';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CloudRegion {
  id: string;
  name: string;
  provider: 'AWS' | 'GCP' | 'Azure' | 'OCI';
  city: string;
  country: string;
  lat: number;
  lng: number;
  monthlySpend: number;
  instancesCount: number;
  costSavings: number;
  healthScore: number;
  carbonIntensity: number;
  status: 'optimal' | 'warning' | 'critical';
  topService?: string;
}

export interface MetricRecord {
  user_id: string;
  account_id?: string;
  event_date: string;
  provider: string;
  region: string;
  service: string;
  category: 'cost' | 'health' | 'carbon' | string;
  metric_name: string;
  metric_value: number;
  unit?: string;
  currency?: string;
  data_source?: string;
}

export interface OnboardingAnswers {
  primaryGoal: string;
  cloudProviders: string[];
  monthlySpend: string;
  teamSize: string;
  priority: 'cost' | 'reliability' | 'sustainability' | 'all';
}
