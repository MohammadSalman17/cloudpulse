import { MetricRecord } from '../types';

/**
 * Simple robust CSV parser for CloudPulse metrics.
 */
export function parseCloudCSV(csvText: string): MetricRecord[] {
  const lines = csvText.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const records: MetricRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? '';
    });

    const metric_value = parseFloat(row['metric_value'] || row['monthly_cost'] || row['value'] || '0');
    if (isNaN(metric_value)) continue;

    records.push({
      user_id: row['user_id'] || row['userid'] || `USR${i}`,
      account_id: row['account_id'],
      event_date: row['event_date'] || row['date'] || new Date().toISOString().slice(0, 10),
      provider: row['provider'] || 'AWS',
      region: row['region'] || 'us-east-1',
      service: row['service'] || 'Unknown',
      category: (row['category'] as any) || 'cost',
      metric_name: row['metric_name'] || 'cloud_cost',
      metric_value,
      unit: row['unit'] || 'USD',
      currency: row['currency'] || 'USD',
      data_source: row['data_source'],
    });
  }

  return records;
}
