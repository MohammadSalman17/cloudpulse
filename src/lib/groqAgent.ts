export interface AnomalyResolution {
  anomalyId: string;
  service: string;
  provider: string;
  summary: string;
  rootCause: string;
  recommendedActions: string[];
  estimatedSavings?: string;
  confidence: number;
}

/**
 * Demo / offline anomaly remediation agent.
 * In production this calls the Groq API with GROQ_API_KEY.
 */
export async function solveAnomalyWithGroq(params: {
  service: string;
  provider: string;
  metric: string;
  value: number;
  threshold?: number;
}): Promise<AnomalyResolution> {
  const { service, provider, metric, value } = params;

  // Simulated AI response for static / demo deployments
  await new Promise((r) => setTimeout(r, 800));

  return {
    anomalyId: `anom_${Date.now()}`,
    service,
    provider,
    summary: `Elevated ${metric} detected on ${provider} ${service} (value: ${value}).`,
    rootCause: `Possible causes include sudden traffic spike, misconfigured autoscaling, or resource contention.`,
    recommendedActions: [
      `Review recent deploy or config changes for ${service}`,
      'Check CloudWatch / Azure Monitor / GCP Monitoring dashboards',
      'Consider rightsizing or enabling autoscaling policies',
      'Set up alerts for sustained threshold breaches',
    ],
    estimatedSavings: '5-15% if rightsizing is applied',
    confidence: 0.78,
  };
}
