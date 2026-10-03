import { OfficialSource } from '../../types/incident';

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'cybercrime-1930',
    name: 'National Financial Cyber Fraud Helpline (1930)',
    organization: 'Ministry of Home Affairs (MHA) & I4C',
    description: 'Direct citizen helpline to report immediate online financial fraud and freeze defrauded money during the crucial golden hour (first 2 hours).',
    helpline: '1930',
    url: 'https://cybercrime.gov.in',
    badge: 'FINANCIAL_HELPLINE',
    verified: true,
    stepsToFollow: [
      'Call 1930 immediately with transaction reference numbers (UTR/UPI IDs).',
      'Provide recipient UPI ID, mobile number, and debit account details.',
      'A formal acknowledgement ticket is automatically forwarded to the originating and beneficiary banks.',
      'Bank nodal officers freeze the beneficiary wallet or account if funds have not yet been withdrawn.'
    ]
  },
  {
    id: 'national-cybercrime-portal',
    name: 'National Cyber Crime Reporting Portal',
    organization: 'Indian Cyber Crime Coordination Centre (I4C)',
    description: 'Official Government of India portal for filing cyber fraud, phishing, identity theft, and financial extortion complaints.',
    helpline: '1930',
    url: 'https://cybercrime.gov.in',
    badge: 'CENTRAL_GOVERNMENT',
    verified: true,
    stepsToFollow: [
      'Visit cybercrime.gov.in and click "Report Financial Fraud".',
      'Upload screenshots, transaction receipts, and phone numbers involved.',
      'Download your PDF Acknowledgement Number for formal police record.',
      'Submit the acknowledgement copy to your home bank branch within 24 hours.'
    ]
  },
  {
    id: 'sebi-scores',
    name: 'SEBI SCORES 2.0 Grievance Redressal',
    organization: 'Securities and Exchange Board of India (SEBI)',
    description: 'Centralized grievance portal for retail investors against unregistered stock brokers, fraudulent IPO syndicates, and market manipulation.',
    helpline: '1800 22 7575 / 1800 266 7575',
    url: 'https://scores.sebi.gov.in',
    badge: 'REGULATORY_BODY',
    verified: true,
    stepsToFollow: [
      'Register on SEBI SCORES with PAN and investor details.',
      'File complaint against unauthorized entities posing as SEBI-registered brokers.',
      'SEBI inspects intermediary credentials and initiates enforcement warnings.'
    ]
  },
  {
    id: 'sebi-intermediary-check',
    name: 'SEBI Recognized Intermediaries Check',
    organization: 'Securities and Exchange Board of India',
    description: 'Public register to verify whether an investment advisor, research analyst, or broker is genuinely registered with SEBI.',
    url: 'https://www.sebi.gov.in/intermediaries.html',
    badge: 'REGULATORY_BODY',
    verified: true,
    stepsToFollow: [
      'Ask the advisor or entity for their SEBI Registration Number (starts with INZ, INA, or INH).',
      'Cross-check the exact registration number and bank account name on sebi.gov.in.',
      'Legitimate brokers NEVER instruct investors to transfer IPO funds to personal or third-party private UPI IDs.'
    ]
  },
  {
    id: 'rbi-sachet',
    name: 'RBI Sachet Portal',
    organization: 'Reserve Bank of India (RBI)',
    description: 'Official regulatory platform to report unauthorized deposit-taking entities, fake loan apps, and fraudulent fund collections.',
    url: 'https://sachet.rbi.org.in',
    badge: 'REGULATORY_BODY',
    verified: true,
    stepsToFollow: [
      'Check whether the company is authorized by RBI to accept public deposits.',
      'Lodge a report under "Report Illegal Schemes".',
      'Information is coordinated with State Level Coordination Committees (SLCC).'
    ]
  },
  {
    id: 'dot-chakshu',
    name: 'DoT Chakshu (Sanchar Saathi)',
    organization: 'Department of Telecommunications (DoT), Govt of India',
    description: 'Citizen reporting mechanism for suspected fraudulent communications received via SMS, WhatsApp, or phone calls.',
    url: 'https://sancharsaathi.gov.in/sfc/',
    badge: 'CENTRAL_GOVERNMENT',
    verified: true,
    stepsToFollow: [
      'Report sender mobile numbers and fraudulent SMS sender headers.',
      'Telecom operators block flagged IMEIs and disconnect scam sender numbers nationwide.'
    ]
  }
];
