import { useState, useEffect, useCallback } from 'react';
import { MetricRecord } from '../types';

export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<MetricRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadDemo = useCallback(async () => {
    setLoading(true);
    try {
      // In production this would come from Kafka / API
      // For static deploy we use a small built-in sample
      const sample: MetricRecord[] = [
        {
          user_id: 'USR001',
          event_date: new Date().toISOString().slice(0, 10),
          provider: 'AWS',
          region: 'us-east-1',
          service: 'EC2',
          category: 'cost',
          metric_name: 'cloud_cost',
          metric_value: 124.5,
          unit: 'USD',
          currency: 'USD',
        },
        {
          user_id: 'USR002',
          event_date: new Date().toISOString().slice(0, 10),
          provider: 'GCP',
          region: 'us-central1',
          service: 'Cloud SQL',
          category: 'health',
          metric_name: 'availability',
          metric_value: 99.95,
          unit: 'percent',
        },
        {
          user_id: 'USR003',
          event_date: new Date().toISOString().slice(0, 10),
          provider: 'Azure',
          region: 'East US',
          service: 'Blob Storage',
          category: 'carbon',
          metric_name: 'co2e_emissions',
          metric_value: 0.42,
          unit: 'kgCO2e',
        },
      ];
      setMetrics(sample);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDemo();
  }, [loadDemo]);

  return { metrics, loading, lastUpdated, refresh: loadDemo };
}
