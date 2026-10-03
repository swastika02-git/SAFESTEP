import { RiskSignal, EvidenceItem, TimelineEvent } from '../../types/incident';

export function evaluateRiskSignals(
  textCombined: string,
  evidenceList: EvidenceItem[],
  timelineEvents: TimelineEvent[]
): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const text = textCombined.toLowerCase();

  // 1. Urgency Rule
  const urgencyKeywords = [
    '20 minute', '20 min', '15 min', 'within', 'immediately', 'urgent', 'hurry', 
    'deadline', 'forfeit', 'expire', 'expires', 'last chance', 'আজকের মধ্যে', '২০ মিনিট', 'तुरंत', '20 मिनट'
  ];
  const hasUrgency = urgencyKeywords.some(kw => text.includes(kw));
  if (hasUrgency) {
    const matchedEvidence = evidenceList.filter(e => 
      urgencyKeywords.some(kw => e.extractedText.toLowerCase().includes(kw))
    ).map(e => e.id);

    signals.push({
      id: 'risk-urgency',
      category: 'URGENCY',
      title: 'Artificial Time Pressure ("Within 20 Minutes / Urgent")',
      explanation: 'Urgency artificially reduces the time available for an investor to independently verify claims with licensed brokers, family, or official stock exchange databases.',
      evidenceIds: matchedEvidence.length > 0 ? matchedEvidence : (evidenceList[0] ? [evidenceList[0].id] : []),
      severity: 'CRITICAL',
    });
  }

  // 2. Escalating Payment Rule
  const escalatingKeywords = [
    'security deposit', 'additional', 'hold', 'another', 'deposit', 'second payment',
    'release fee', 'refundable fee', 'processing fee', 'টাকা পাঠানোর পর আবার', 'আরও টাকা', 'সিকিউরিটি ডিপোজিট', 'सुरक्षा जमा', 'अतिरिक्त'
  ];
  const hasEscalating = escalatingKeywords.some(kw => text.includes(kw));
  if (hasEscalating) {
    const matchedEvidence = evidenceList.filter(e => 
      escalatingKeywords.some(kw => e.extractedText.toLowerCase().includes(kw))
    ).map(e => e.id);

    signals.push({
      id: 'risk-escalating-payment',
      category: 'ESCALATING_PAYMENT',
      title: 'Escalating Payment Request (Repeated Demands)',
      explanation: 'Demanding further money under the guise of "security deposit", "tax clearance", or "unfreezing charge" after an initial payment is a classic sign of an extortion spiral.',
      evidenceIds: matchedEvidence.length > 0 ? matchedEvidence : (evidenceList[evidenceList.length - 1] ? [evidenceList[evidenceList.length - 1].id] : []),
      severity: 'CRITICAL',
    });
  }

  // 3. Authority Claim Rule
  const authorityKeywords = [
    'sebi', 'exchange', 'nse', 'bse', 'rbi', 'govt', 'government', 'nodal', 'compliance', 
    'court', 'legal cell', 'সেবি', 'সরকারি', 'सेबी'
  ];
  const hasAuthority = authorityKeywords.some(kw => text.includes(kw));
  if (hasAuthority) {
    const matchedEvidence = evidenceList.filter(e => 
      authorityKeywords.some(kw => e.extractedText.toLowerCase().includes(kw))
    ).map(e => e.id);

    signals.push({
      id: 'risk-authority-claim',
      category: 'AUTHORITY_CLAIM',
      title: 'Regulatory Authority or Institutional Name Invoked',
      explanation: 'Fraudulent entities frequently reference SEBI, RBI, or institutional quota desks to fabricate credibility. Legitimate regulators never mandate deposits to private UPI addresses.',
      evidenceIds: matchedEvidence.length > 0 ? matchedEvidence : (evidenceList[0] ? [evidenceList[0].id] : []),
      severity: 'HIGH',
    });
  }

  // 4. Unverified Identity / Private UPI Rule
  const upiMatch = text.match(/([a-zA-Z0-9.\-_]+@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|upi))/gi);
  const phoneMatch = text.match(/(\+91\s?[6-9]\d{4}\s?\d{5})/g);
  if (upiMatch || phoneMatch || text.includes('whatsapp') || text.includes('telegram')) {
    signals.push({
      id: 'risk-unverified-identity',
      category: 'UNVERIFIED_IDENTITY',
      title: 'Unverified Entity & Private Communication Channel',
      explanation: 'SEBI-registered stock brokers must execute IPO bids via ASBA through bank accounts or registered brokerage interfaces, never via direct transfers to private third-party UPI handles or messaging apps.',
      evidenceIds: evidenceList.map(e => e.id),
      severity: 'HIGH',
    });
  }

  // 5. Guaranteed / Unusual IPO Allocation Claim
  const promiseKeywords = [
    '100% allotment', 'guaranteed allotment', 'pre-ipo quota', 'institutional allotment', 
    '100% refund', 'free gift', 'insider quota', 'আইপিও লেগেছে', 'গ্যারান্টি', 'आवंटन पक्का'
  ];
  const hasPromise = promiseKeywords.some(kw => text.includes(kw));
  if (hasPromise) {
    signals.push({
      id: 'risk-guaranteed-promise',
      category: 'GUARANTEED_PROMISE',
      title: 'Unusual Allocation or Guaranteed Return Claim',
      explanation: 'Retail IPO allotment is governed by computerized lottery systems overseen by stock exchanges. No private individual or third party can guarantee pre-allotment institutional quotas outside official channels.',
      evidenceIds: evidenceList.length > 0 ? [evidenceList[0].id] : [],
      severity: 'HIGH',
    });
  }

  // Ensure at least one signal if evidence exists
  if (signals.length === 0 && evidenceList.length > 0) {
    signals.push({
      id: 'risk-general-caution',
      category: 'PAYMENT_PRESSURE',
      title: 'Unverified Financial Solicitation',
      explanation: 'The communication involves financial demands without verifiable regulatory intermediary credentials.',
      evidenceIds: [evidenceList[0].id],
      severity: 'MEDIUM',
    });
  }

  return signals;
}
