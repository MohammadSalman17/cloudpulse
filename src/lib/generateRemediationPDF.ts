import { jsPDF } from 'jspdf';
import { AnomalyResolution } from './groqAgent';

export function generateRemediationPDF(resolution: AnomalyResolution): void {
  const doc = new jsPDF();
  const margin = 20;
  let y = 20;

  doc.setFontSize(18);
  doc.text('CloudPulse Remediation Report', margin, y);
  y += 12;

  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
  y += 10;

  doc.setFontSize(14);
  doc.text('Anomaly Summary', margin, y);
  y += 8;
  doc.setFontSize(11);
  const summaryLines = doc.splitTextToSize(resolution.summary, 170);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 6 + 6;

  doc.setFontSize(14);
  doc.text('Root Cause', margin, y);
  y += 8;
  doc.setFontSize(11);
  const causeLines = doc.splitTextToSize(resolution.rootCause, 170);
  doc.text(causeLines, margin, y);
  y += causeLines.length * 6 + 6;

  doc.setFontSize(14);
  doc.text('Recommended Actions', margin, y);
  y += 8;
  doc.setFontSize(11);
  resolution.recommendedActions.forEach((action, i) => {
    const lines = doc.splitTextToSize(`${i + 1}. ${action}`, 170);
    doc.text(lines, margin, y);
    y += lines.length * 6 + 2;
  });

  y += 6;
  doc.text(`Confidence: ${(resolution.confidence * 100).toFixed(0)}%`, margin, y);
  if (resolution.estimatedSavings) {
    y += 7;
    doc.text(`Estimated Savings: ${resolution.estimatedSavings}`, margin, y);
  }

  doc.save(`cloudpulse-remediation-${resolution.anomalyId}.pdf`);
}
