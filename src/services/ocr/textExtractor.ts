import { EvidenceItem } from '../../types/incident';

export async function processEvidenceFile(file: File): Promise<EvidenceItem> {
  const fileId = 'ev-' + Math.random().toString(36).substring(2, 9);
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
  const type: 'IMAGE' | 'DOCUMENT' = isImage ? 'IMAGE' : 'DOCUMENT';

  // Read preview data URL
  const fileData = await readFileAsDataUrl(file);

  // Extract text (heuristic / OCR simulation)
  let extractedText = '';
  const lowerName = file.name.toLowerCase();

  if (lowerName.includes('ipo') || lowerName.includes('allotment')) {
    extractedText = 'Apex Wealth: Congratulations! Your institutional quota for Premier Tech IPO has been successfully allotted (100 shares). ACTION REQUIRED: Pay ₹38,500 within 20 mins to apexwealth.corp@okhdfcbank.';
  } else if (lowerName.includes('receipt') || lowerName.includes('payment')) {
    extractedText = 'Payment Successful: ₹38,500.00 to Apex Wealth Partners (apexwealth.corp@okhdfcbank). UTR / Ref: 427819034912. 03 Oct 2026, 10:51 AM. Debited from Bank of India.';
  } else if (lowerName.includes('deposit') || lowerName.includes('security') || lowerName.includes('hold')) {
    extractedText = 'SYSTEM HOLD: Payment of ₹38,500 placed under automated SEBI hold. MANDATORY SECURITY DEPOSIT: ₹12,000. Refundable in 15 mins. Transfer to nodal escrow.';
  } else if (lowerName.includes('recovery') || lowerName.includes('specialist')) {
    extractedText = 'Cyber Recovery Legal Cell: We have traced your lost ₹38,500. Pay ₹4,999 legal filing fee today to unfreeze and credit ₹38,500 back. Guaranteed 100% refund within 2 hours.';
  } else {
    // Generic extracted text from user uploaded file
    extractedText = `Extracted from ${file.name} (${Math.round(file.size / 1024)} KB): Financial communication evidence uploaded for incident reconstruction.`;
  }

  return {
    id: fileId,
    type,
    name: file.name,
    createdAt: new Date().toISOString(),
    fileData,
    extractedText,
    linkedEvents: [],
    status: 'READY'
  };
}

export function createTextEvidence(text: string, title?: string): EvidenceItem {
  const fileId = 'ev-' + Math.random().toString(36).substring(2, 9);
  return {
    id: fileId,
    type: 'TEXT',
    name: title || 'User Incident Description',
    createdAt: new Date().toISOString(),
    extractedText: text.trim(),
    linkedEvents: [],
    status: 'READY'
  };
}

export function createVoiceEvidence(transcript: string): EvidenceItem {
  const fileId = 'ev-' + Math.random().toString(36).substring(2, 9);
  return {
    id: fileId,
    type: 'VOICE',
    name: 'Voice Incident Recording',
    createdAt: new Date().toISOString(),
    extractedText: transcript.trim(),
    linkedEvents: [],
    status: 'READY'
  };
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}
