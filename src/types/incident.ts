export type VerificationState = 
  | 'CONFIRMED_FROM_EVIDENCE'  // Directly visible in uploaded material
  | 'USER_REPORTED'           // Information supplied by the user
  | 'INFERRED'                // Potentially relevant interpretation
  | 'UNVERIFIED';             // Information SAFESTEP cannot establish

export type IncidentStatus = 
  | 'PREVENTION'                     // I haven't sent anything
  | 'INFORMATION_EXPOSED'            // I shared information
  | 'PAYMENT_MADE'                   // I sent money
  | 'ADDITIONAL_PAYMENT_REQUESTED'   // I sent money & they ask for more
  | 'RECOVERY_CONTACT_DETECTED'      // Someone contacted promising to recover funds
  | 'RESOLVED_ARCHIVED';

export type EventType = 
  | 'CONTACT'
  | 'CLAIM'
  | 'REQUEST'
  | 'ACTION'
  | 'PAYMENT'
  | 'ESCALATION'
  | 'RECOVERY_CONTACT';

export interface EvidenceItem {
  id: string;
  type: 'IMAGE' | 'DOCUMENT' | 'TEXT' | 'VOICE';
  name: string;
  createdAt: string;
  fileData?: string; // base64 or URL
  extractedText: string;
  linkedEvents: string[];
  sourceReference?: string;
  status: 'READY' | 'PROCESSING' | 'ERROR';
}

export interface TimelineEvent {
  id: string;
  timestamp: string; // e.g. "10:42 AM"
  date?: string;
  type: EventType;
  title: string;
  description: string;
  evidenceIds: string[];
  verificationState: VerificationState;
  amount?: string;
}

export type RiskCategory = 
  | 'URGENCY'
  | 'ESCALATING_PAYMENT'
  | 'AUTHORITY_CLAIM'
  | 'UNVERIFIED_IDENTITY'
  | 'GUARANTEED_PROMISE'
  | 'PAYMENT_PRESSURE';

export interface RiskSignal {
  id: string;
  category: RiskCategory;
  title: string;
  explanation: string; // "Why it matters"
  evidenceIds: string[];
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFORMATIONAL';
}

export interface IncidentActor {
  id: string;
  name: string;
  role: string; // e.g. "Alleged IPO Broker", "Recovery Agent"
  channel: string; // e.g. "WhatsApp", "SMS", "Telegram", "Phone call"
  contactInfo?: string; // e.g. "+91 98451 09214"
  verificationState: VerificationState;
}

export interface IncidentClaim {
  id: string;
  text: string;
  evidenceIds: string[];
  verificationState: VerificationState;
}

export interface IncidentRequest {
  id: string;
  amount?: string;
  purpose: string;
  deadline?: string;
  evidenceIds: string[];
  verificationState: VerificationState;
}

export interface IncidentAction {
  id: string;
  actionText: string;
  timestamp?: string;
  evidenceIds: string[];
  verificationState: VerificationState;
}

export interface IncidentPayment {
  id: string;
  amount: string;
  recipientUpi?: string;
  recipientName?: string;
  referenceNumber?: string;
  timestamp: string;
  evidenceIds: string[];
  verificationState: VerificationState;
}

export interface RecoveryContact {
  id: string;
  actor: string;
  feeRequested: string;
  promisedRecoveryAmount: string;
  channel: string;
  evidenceIds: string[];
  date: string;
  isSecondaryScamFlag: boolean;
}

export interface ResponseAction {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  isUrgent: boolean;
  officialSourceId?: string;
  actionUrl?: string;
  actionPhone?: string;
  category: 'PREVENT' | 'FREEZE' | 'REPORT' | 'PRESERVE' | 'RECOVERY_WARNING';
  completed?: boolean;
}

export interface OfficialSource {
  id: string;
  name: string;
  organization: string;
  description: string;
  helpline?: string;
  url: string;
  badge: 'CENTRAL_GOVERNMENT' | 'REGULATORY_BODY' | 'FINANCIAL_HELPLINE';
  verified: true;
  stepsToFollow: string[];
}

export interface Incident {
  id: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  title: string;
  status: IncidentStatus;
  userLossAmount?: string;
  actors: IncidentActor[];
  claims: IncidentClaim[];
  requests: IncidentRequest[];
  actions: IncidentAction[];
  payments: IncidentPayment[];
  secondRequests: IncidentRequest[];
  timelineEvents: TimelineEvent[];
  riskSignals: RiskSignal[];
  evidence: EvidenceItem[];
  responseActions: ResponseAction[];
  recoveryContacts: RecoveryContact[];
  summary: {
    whatTheyClaimed: string;
    whatTheyAsked: string;
    whatHappened: string;
    whatTheyAskedNext: string;
    whatRemainsUncertain: string;
  };
}
