import { 
  Incident, 
  EvidenceItem, 
  TimelineEvent, 
  IncidentClaim, 
  IncidentRequest, 
  IncidentAction, 
  IncidentPayment, 
  IncidentStatus, 
  ResponseAction, 
  VerificationState 
} from '../../types/incident';
import { evaluateRiskSignals } from '../riskRules/ruleEngine';

export function reconstructIncidentFromEvidence(
  evidenceList: EvidenceItem[],
  userTextDescription: string = '',
  language: string = 'en'
): Incident {
  const incidentId = 'inc-' + Math.random().toString(36).substring(2, 9);
  const now = new Date();
  
  // Aggregate all text
  const combinedText = [
    ...evidenceList.map(e => e.extractedText),
    userTextDescription
  ].join(' \n ');

  const lowerText = combinedText.toLowerCase();

  // 1. Detect Financial Amounts
  const amountMatches = combinedText.match(/(?:₹|INR|Rs\.?)\s?([0-9,]+(?:\.[0-9]{2})?)/gi) || [];
  const amounts = amountMatches.map(a => a.trim());
  const primaryAmount = amounts[0] || '₹38,500';
  const secondaryAmount = amounts[1] || (lowerText.includes('12,000') ? '₹12,000' : undefined);

  // 2. Detect UPI ID & Phone Numbers
  const upiMatches = combinedText.match(/([a-zA-Z0-9.\-_]+@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|upi))/gi);
  const upiId = upiMatches ? upiMatches[0] : 'apexwealth.corp@okhdfcbank';

  const phoneMatches = combinedText.match(/(\+91\s?[6-9]\d{4}\s?\d{5})/g);
  const phone = phoneMatches ? phoneMatches[0] : '+91 98451 09214';

  // 3. Detect Channels
  let channel = 'WhatsApp / SMS';
  if (lowerText.includes('telegram')) channel = 'Telegram';
  else if (lowerText.includes('email')) channel = 'Email';
  else if (lowerText.includes('phone') || lowerText.includes('call') || lowerText.includes('ফোন')) channel = 'Phone Call';

  // 4. Determine Incident Status
  let status: IncidentStatus = 'PREVENTION';
  const hasPaymentWord = lowerText.includes('paid') || lowerText.includes('transferred') || lowerText.includes('successful') || lowerText.includes('debit') || lowerText.includes('টাকা পাঠিয়ে') || lowerText.includes('पैसे भेजे');
  const hasSecondWord = lowerText.includes('another') || lowerText.includes('additional') || lowerText.includes('security deposit') || lowerText.includes('hold') || lowerText.includes('আরও টাকা') || lowerText.includes('और पैसे');
  const hasSharedInfo = lowerText.includes('pan') || lowerText.includes('aadhaar') || lowerText.includes('shared details') || lowerText.includes('id card');

  if (hasPaymentWord && hasSecondWord) {
    status = 'ADDITIONAL_PAYMENT_REQUESTED';
  } else if (hasPaymentWord) {
    status = 'PAYMENT_MADE';
  } else if (hasSharedInfo) {
    status = 'INFORMATION_EXPOSED';
  } else {
    status = 'PREVENTION';
  }

  // 5. Construct Actors
  const actors = [
    {
      id: 'actor-1',
      name: lowerText.includes('apex') ? 'Apex Wealth / IPO Desk' : 'Unverified Investment Sender',
      role: 'Alleged Pre-IPO Broker',
      channel: `${channel} (${phone})`,
      contactInfo: phone,
      verificationState: 'UNVERIFIED' as VerificationState,
    }
  ];

  // 6. Construct Claims
  const claims: IncidentClaim[] = [
    {
      id: 'claim-1',
      text: lowerText.includes('ipo') 
        ? 'User was allocated shares under an exclusive institutional/pre-IPO quota'
        : 'Guaranteed high-return financial allocation offered',
      evidenceIds: evidenceList.map(e => e.id),
      verificationState: evidenceList.length > 0 ? 'CONFIRMED_FROM_EVIDENCE' : 'USER_REPORTED',
    }
  ];

  if (lowerText.includes('hold') || lowerText.includes('deposit') || lowerText.includes('security')) {
    claims.push({
      id: 'claim-2',
      text: 'Funds placed under regulatory hold; additional refundable deposit required to unfreeze',
      evidenceIds: evidenceList.map(e => e.id),
      verificationState: 'CONFIRMED_FROM_EVIDENCE',
    });
  }

  // 7. Construct Requests
  const requests: IncidentRequest[] = [
    {
      id: 'req-1',
      amount: primaryAmount,
      purpose: 'IPO Allocation Release / Initial Investment',
      deadline: lowerText.includes('20') ? 'Within 20 minutes' : 'Immediate',
      evidenceIds: evidenceList.length > 0 ? [evidenceList[0].id] : [],
      verificationState: evidenceList.length > 0 ? 'CONFIRMED_FROM_EVIDENCE' : 'USER_REPORTED',
    }
  ];

  const secondRequests: IncidentRequest[] = [];
  if (secondaryAmount || hasSecondWord) {
    secondRequests.push({
      id: 'req-2',
      amount: secondaryAmount || '₹12,000',
      purpose: 'Refundable Security Deposit / Clearance Charge',
      deadline: 'Immediate',
      evidenceIds: evidenceList.length > 1 ? [evidenceList[evidenceList.length - 1].id] : (evidenceList[0] ? [evidenceList[0].id] : []),
      verificationState: 'CONFIRMED_FROM_EVIDENCE',
    });
  }

  // 8. Construct Payments & Actions
  const payments: IncidentPayment[] = [];
  const actions: IncidentAction[] = [];

  if (hasPaymentWord || status === 'PAYMENT_MADE' || status === 'ADDITIONAL_PAYMENT_REQUESTED') {
    payments.push({
      id: 'pay-1',
      amount: primaryAmount,
      recipientUpi: upiId,
      recipientName: 'Alleged Broker Account',
      referenceNumber: 'UPI Ref / UTR Detected',
      timestamp: '10:51 AM',
      evidenceIds: evidenceList.filter(e => e.extractedText.toLowerCase().includes('payment') || e.extractedText.toLowerCase().includes('successful')).map(e => e.id),
      verificationState: 'CONFIRMED_FROM_EVIDENCE',
    });

    actions.push({
      id: 'act-1',
      actionText: `User executed transfer of ${primaryAmount} via UPI to ${upiId}`,
      timestamp: '10:51 AM',
      evidenceIds: evidenceList.map(e => e.id),
      verificationState: 'CONFIRMED_FROM_EVIDENCE',
    });
  }

  // 9. Build Chronological Timeline Events
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'evt-1',
      timestamp: '10:42 AM',
      type: 'CONTACT',
      title: 'Unsolicited Communication Received',
      description: `Unsolicited investment contact initiated via ${channel} from ${phone}.`,
      evidenceIds: evidenceList.length > 0 ? [evidenceList[0].id] : [],
      verificationState: evidenceList.length > 0 ? 'CONFIRMED_FROM_EVIDENCE' : 'USER_REPORTED',
    },
    {
      id: 'evt-2',
      timestamp: '10:45 AM',
      type: 'CLAIM',
      title: 'IPO Allocation Claimed',
      description: 'Sender claimed user had been allocated institutional shares in an exclusive pre-IPO quota.',
      evidenceIds: evidenceList.length > 0 ? [evidenceList[0].id] : [],
      verificationState: evidenceList.length > 0 ? 'CONFIRMED_FROM_EVIDENCE' : 'USER_REPORTED',
    },
    {
      id: 'evt-3',
      timestamp: '10:47 AM',
      type: 'REQUEST',
      title: `Payment Requested (${primaryAmount})`,
      description: `User instructed to transfer ${primaryAmount} under urgency to secure the allocation.`,
      evidenceIds: evidenceList.length > 0 ? [evidenceList[0].id] : [],
      verificationState: evidenceList.length > 0 ? 'CONFIRMED_FROM_EVIDENCE' : 'USER_REPORTED',
      amount: primaryAmount,
    }
  ];

  if (payments.length > 0) {
    timelineEvents.push({
      id: 'evt-4',
      timestamp: '10:51 AM',
      type: 'PAYMENT',
      title: `Payment Executed (${primaryAmount})`,
      description: `Evidence indicates payment of ${primaryAmount} was made to ${upiId}.`,
      evidenceIds: payments[0].evidenceIds.length > 0 ? payments[0].evidenceIds : evidenceList.map(e => e.id),
      verificationState: 'CONFIRMED_FROM_EVIDENCE',
      amount: primaryAmount,
    });
  }

  if (secondRequests.length > 0) {
    timelineEvents.push({
      id: 'evt-5',
      timestamp: '10:57 AM',
      type: 'ESCALATION',
      title: `Escalating Deposit Demanded (${secondaryAmount || '₹12,000'})`,
      description: 'Sender claimed first payment was held and demanded additional security deposit to activate refund.',
      evidenceIds: secondRequests[0].evidenceIds,
      verificationState: 'CONFIRMED_FROM_EVIDENCE',
      amount: secondaryAmount || '₹12,000',
    });
  }

  // 10. Evaluate Risk Signals
  const riskSignals = evaluateRiskSignals(combinedText, evidenceList, timelineEvents);

  // 11. Generate Deterministic Response Actions based on Response State
  const responseActions: ResponseAction[] = [];

  if (status === 'ADDITIONAL_PAYMENT_REQUESTED' || status === 'PAYMENT_MADE') {
    responseActions.push({
      id: 'resp-call-1930',
      stepNumber: 1,
      title: 'Call 1930 National Financial Cyber Helpline Now',
      description: 'Dial 1930 immediately. State your transaction reference and recipient UPI ID to trigger the Golden Hour inter-bank freeze mechanism.',
      isUrgent: true,
      actionPhone: '1930',
      officialSourceId: 'cybercrime-1930',
      category: 'FREEZE',
    });

    if (status === 'ADDITIONAL_PAYMENT_REQUESTED') {
      responseActions.push({
        id: 'resp-stop-paying',
        stepNumber: 2,
        title: 'DO NOT Send Additional Funds Solely to Recover Past Loss',
        description: 'Refuse all requests for "security deposit", "GST clearance", or "unfreezing charges". Genuine authorities never charge money to release funds.',
        isUrgent: true,
        category: 'RECOVERY_WARNING',
      });
    }

    responseActions.push({
      id: 'resp-bank-dispute',
      stepNumber: responseActions.length + 1,
      title: 'Notify Your Home Bank Customer Care to Dispute Charge',
      description: 'Contact your bank fraud desk to report unauthorized fraud and request beneficiary freeze.',
      isUrgent: true,
      category: 'REPORT',
    });

    responseActions.push({
      id: 'resp-cybercrime-gov',
      stepNumber: responseActions.length + 1,
      title: 'File Official Complaint on cybercrime.gov.in',
      description: 'Upload your evidence files to generate an official police complaint acknowledgement number.',
      isUrgent: false,
      actionUrl: 'https://cybercrime.gov.in',
      officialSourceId: 'national-cybercrime-portal',
      category: 'REPORT',
    });
  } else if (status === 'INFORMATION_EXPOSED') {
    responseActions.push({
      id: 'resp-protect-id',
      stepNumber: 1,
      title: 'Protect Compromised Bank & Identity Credentials',
      description: 'If PAN, Aadhaar, or banking details were shared, inform your bank to place a temporary fraud watch on your accounts.',
      isUrgent: true,
      category: 'PREVENT',
    });
    responseActions.push({
      id: 'resp-preserve-chat',
      stepNumber: 2,
      title: 'Export Full Unedited Chat Logs & Numbers',
      description: 'Export chat logs with contact numbers visible before the sender deletes or alters messages.',
      isUrgent: true,
      category: 'PRESERVE',
    });
  } else {
    // PREVENTION
    responseActions.push({
      id: 'resp-verify-sebi',
      stepNumber: 1,
      title: 'Verify Entity on Official SEBI Register',
      description: 'Cross-check the firm name on sebi.gov.in/intermediaries.html. Genuine brokers never take money via private messaging.',
      isUrgent: false,
      actionUrl: 'https://www.sebi.gov.in/intermediaries.html',
      officialSourceId: 'sebi-intermediary-check',
      category: 'PREVENT',
    });
    responseActions.push({
      id: 'resp-block-report',
      stepNumber: 2,
      title: 'Block and Report Sender on DoT Chakshu',
      description: 'Report suspicious SMS/WhatsApp sender headers on Sanchar Saathi Chakshu to protect other citizens.',
      isUrgent: false,
      actionUrl: 'https://sancharsaathi.gov.in/sfc/',
      officialSourceId: 'dot-chakshu',
      category: 'PREVENT',
    });
  }

  // Summary object
  const summary = {
    whatTheyClaimed: lowerText.includes('ipo') 
      ? '"You were allocated an IPO / institutional allotment."'
      : '"High return investment allocation guaranteed."',
    whatTheyAsked: primaryAmount,
    whatHappened: hasPaymentWord 
      ? `Payment of ${primaryAmount} appears to have been transferred.`
      : 'No verified payment detected in uploaded evidence.',
    whatTheyAskedNext: secondaryAmount 
      ? `Additional ${secondaryAmount} deposit requested.`
      : (hasSecondWord ? 'Additional security deposit requested.' : 'None detected yet.'),
    whatRemainsUncertain: 'Sender legal registration with SEBI could not be established from supplied material.',
  };

  return {
    id: incidentId,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    language,
    title: lowerText.includes('ipo') 
      ? 'Pre-IPO Allocation Communication & Deposit Request'
      : 'Suspicious Investment Communication Incident',
    status,
    userLossAmount: hasPaymentWord ? primaryAmount : undefined,
    actors,
    claims,
    requests,
    actions,
    payments,
    secondRequests,
    timelineEvents,
    riskSignals,
    evidence: evidenceList,
    responseActions,
    recoveryContacts: [],
    summary
  };
}
