export interface SearchableResource {
  id: string;
  title: string;
  description: string;
  category: string;
  provider?: string;
  tags?: string[];
}

export const SEARCHABLE_RESOURCES: SearchableResource[] = [
  {
    id: 'ec2-cost',
    title: 'EC2 Cost Optimization',
    description: 'Identify underutilized EC2 instances and rightsizing opportunities',
    category: 'cost',
    provider: 'AWS',
    tags: ['ec2', 'savings', 'rightsizing'],
  },
  {
    id: 'carbon-intensity',
    title: 'Regional Carbon Intensity',
    description: 'Compare carbon intensity across cloud regions for greener workloads',
    category: 'carbon',
    tags: ['sustainability', 'co2', 'green'],
  },
  {
    id: 'latency-anomaly',
    title: 'Latency Anomaly Detection',
    description: 'Detect unusual latency spikes in Cloud SQL / RDS / Azure SQL',
    category: 'health',
    tags: ['latency', 'anomaly', 'database'],
  },
  {
    id: 's3-storage',
    title: 'S3 / Blob Storage Waste',
    description: 'Find unused or infrequently accessed storage buckets',
    category: 'cost',
    provider: 'AWS',
    tags: ['s3', 'storage', 'lifecycle'],
  },
];

export function searchResources(query: string): SearchableResource[] {
  const q = query.toLowerCase().trim();
  if (!q) return SEARCHABLE_RESOURCES;
  return SEARCHABLE_RESOURCES.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.includes(q) ||
      r.tags?.some((t) => t.includes(q))
  );
}
