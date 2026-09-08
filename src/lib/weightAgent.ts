export type Domain =
  | 'fintech'
  | 'healthcare'
  | 'ecommerce'
  | 'energy'
  | 'government'
  | 'saas'
  | 'logistics'
  | 'other';

export interface OnboardingAnswers {
  primaryGoal: string;
  cloudProviders: string[];
  monthlySpend: string;
  teamSize: string;
  priority: 'cost' | 'reliability' | 'sustainability' | 'all';
  domain?: Domain;
}

export interface WeightResult {
  costWeight: number;
  healthWeight: number;
  carbonWeight: number;
  explanation: string;
}

export function deriveWeights(answers: OnboardingAnswers): WeightResult {
  let cost = 0.4;
  let health = 0.35;
  let carbon = 0.25;

  if (answers.priority === 'cost') {
    cost = 0.6;
    health = 0.25;
    carbon = 0.15;
  } else if (answers.priority === 'reliability') {
    cost = 0.25;
    health = 0.55;
    carbon = 0.2;
  } else if (answers.priority === 'sustainability') {
    cost = 0.25;
    health = 0.25;
    carbon = 0.5;
  }

  const explanation = `Weights derived from priority "${answers.priority}": Cost ${(cost * 100).toFixed(0)}%, Health ${(health * 100).toFixed(0)}%, Carbon ${(carbon * 100).toFixed(0)}%.`;

  return { costWeight: cost, healthWeight: health, carbonWeight: carbon, explanation };
}
