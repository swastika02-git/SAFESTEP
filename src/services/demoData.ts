import { Incident } from '../types/incident';
import { SupportedLanguage } from '../types/i18n';

export function getSampleIncident(lang: string = 'en'): Incident {
  const isBn = lang === 'bn';
  const isHi = lang === 'hi';

  return {
    id: 'demo-ipo-allotment-2026',
    createdAt: '2026-10-03T10:42:00Z',
    updatedAt: '2026-10-03T11:05:00Z',
    language: lang,
    title: isBn 
      ? 'ভুয়ো IPO বরাদ্দ ও অতিরিক্ত জমার দাবি'
      : isHi
      ? 'फर्जी IPO आवंटन एवं अतिरिक्त सुरक्षा जमा मांग'
      : 'Suspicious Pre-IPO Allotment & Escalating Deposit Demand',
    status: 'ADDITIONAL_PAYMENT_REQUESTED',
    userLossAmount: '₹38,500',
    actors: [
      {
        id: 'actor-1',
        name: 'Apex Wealth / IPO Desk',
        role: 'Alleged Institutional Broker',
        channel: 'WhatsApp & SMS (+91 98451 09214)',
        contactInfo: '+91 98451 09214',
        verificationState: 'UNVERIFIED',
      },
      {
        id: 'actor-2',
        name: 'Cyber Recovery Legal Cell',
        role: 'Unsolicited Secondary Recovery Agent',
        channel: 'Telegram & WhatsApp (+91 97110 44821)',
        contactInfo: '+91 97110 44821',
        verificationState: 'UNVERIFIED',
      }
    ],
    claims: [
      {
        id: 'claim-1',
        text: isBn 
          ? 'প্রিমিয়ার টেক প্রি-আইপিও কোটায় ১০০টি শেয়ার বরাদ্দ হয়েছে'
          : isHi
          ? 'प्रीमियर टेक प्री-आईपीओ कोटे में 100 शेयर आवंटित किए गए हैं'
          : 'User was allocated 100 institutional shares of Premier Tech IPO',
        evidenceIds: ['ev-1'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      },
      {
        id: 'claim-2',
        text: isBn
          ? '২০ মিনিটের মধ্যে টাকা না পাঠালে কোটা অন্য কাউকে দিয়ে দেওয়া হবে'
          : isHi
          ? '20 मिनट के भीतर भुगतान न करने पर आवंटन रद्द कर दिया जाएगा'
          : 'Allotment will be forfeited if not transferred within 20 minutes',
        evidenceIds: ['ev-1'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      },
      {
        id: 'claim-3',
        text: isBn
          ? 'সেবি (SEBI) সিস্টেমে পেমেন্ট হোল্ড হয়েছে, ₹১২,০০০ রিফান্ডেবল ডিপোজিট দিলে রিলিজ হবে'
          : isHi
          ? 'भुगतान सेबी (SEBI) होल्ड पर है, ₹12,000 रिफंडेबल डिपॉजिट जमा करने पर ही राशि छूटेगी'
          : 'Initial payment placed under automated regulatory hold; requires ₹12,000 refundable security deposit to activate',
        evidenceIds: ['ev-3'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      }
    ],
    requests: [
      {
        id: 'req-1',
        amount: '₹38,500',
        purpose: 'IPO Allotment Quota Activation',
        deadline: 'Within 20 minutes',
        evidenceIds: ['ev-1'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      }
    ],
    actions: [
      {
        id: 'act-1',
        actionText: isBn 
          ? 'ব্যাংক অফ ইন্ডিয়া অ্যাকাউন্ট থেকে ₹৩৮,৫০০ ইউপিআই ট্রান্সফার করা হয়েছে'
          : isHi
          ? 'बैंक ऑफ इंडिया खाते से ₹38,500 यूपीআই के जरिए ट्रांसफर किए गए'
          : 'User initiated UPI transfer of ₹38,500 to apexwealth.corp@okhdfcbank',
        timestamp: '10:51 AM',
        evidenceIds: ['ev-2'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      }
    ],
    payments: [
      {
        id: 'pay-1',
        amount: '₹38,500',
        recipientUpi: 'apexwealth.corp@okhdfcbank',
        recipientName: 'Apex Wealth Partners',
        referenceNumber: 'UTR: 427819034912',
        timestamp: '10:51 AM',
        evidenceIds: ['ev-2'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      }
    ],
    secondRequests: [
      {
        id: 'req-2',
        amount: '₹12,000',
        purpose: 'Mandatory Refundable Security Deposit',
        deadline: 'Immediate',
        evidenceIds: ['ev-3'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      }
    ],
    timelineEvents: [
      {
        id: 'evt-1',
        timestamp: '10:42 AM',
        type: 'CONTACT',
        title: isBn ? 'অযাচিত বার্তা প্রাপ্তি' : isHi ? 'अवांछित संदेश प्राप्त' : 'Unsolicited Communication Received',
        description: isBn 
          ? 'হোয়াটসঅ্যাপে একটি অজানা নম্বর (+91 98451 09214) থেকে বার্তা আসে।'
          : isHi
          ? 'व्हाट्सएप पर अज्ञात नंबर (+91 98451 09214) से प्री-आईपीओ संदेश मिला।'
          : 'Unsolicited investment-related communication received via WhatsApp from unknown number.',
        evidenceIds: ['ev-1'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      },
      {
        id: 'evt-2',
        timestamp: '10:45 AM',
        type: 'CLAIM',
        title: isBn ? 'আইপিও বরাদ্দের দাবি' : isHi ? 'आईपीओ आवंटन का दावा' : 'IPO Allocation Claimed',
        description: isBn
          ? 'প্রেরক দাবি করে যে প্রিমিয়ার টেক আইপিও-তে ১০০টি শেয়ার মঞ্জুর হয়েছে।'
          : isHi
          ? 'संदेश भेजने वाले ने दावा किया कि प्रीमियर टेक आईपीओ का कोटा आवंटित हो चुका है।'
          : 'Sender claimed user had been allocated 100 shares in institutional pre-IPO quota.',
        evidenceIds: ['ev-1'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
      },
      {
        id: 'evt-3',
        timestamp: '10:47 AM',
        type: 'REQUEST',
        title: isBn ? '₹৩৮,৫০০ প্রদানের নির্দেশ' : isHi ? '₹38,500 भुगतान का अनुरोध' : 'Payment Instruction Issued',
        description: isBn
          ? '২০ মিনিটের মধ্যে একটি নির্দিষ্ট ইউপিআই আইডিতে ₹৩৮,৫০০ পাঠানোর জন্য কঠোর তাড়া দেওয়া হয়।'
          : isHi
          ? '20 मिनट की समयसीमा के साथ निजी यूपीआई आईडी पर ₹38,500 ट्रांसफर करने का दबाव बनाया गया।'
          : 'User was instructed to pay ₹38,500 within a 20-minute window to prevent allotment forfeiture.',
        evidenceIds: ['ev-1'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
        amount: '₹38,500',
      },
      {
        id: 'evt-4',
        timestamp: '10:51 AM',
        type: 'PAYMENT',
        title: isBn ? 'টাকা প্রদানের প্রমাণ সনাক্ত' : isHi ? 'भुगतान साक्ष्य दर्ज' : 'Payment Executed (₹38,500)',
        description: isBn
          ? 'ব্যাংক অফ ইন্ডিয়া একাউন্ট থেকে ইউটিআর ৪২৭৮১৯০৩৪৯১২ সহ ইউপিআই পেমেন্টের রসিদ সনাক্ত হয়েছে।'
          : isHi
          ? 'बैंक रसीद से पुष्टि: यूपीआई आईडी apexwealth.corp पर ₹38,500 का भुगतान किया गया (UTR: 427819034912)।'
          : 'Payment receipt confirms ₹38,500 transferred to apexwealth.corp@okhdfcbank via UPI.',
        evidenceIds: ['ev-2'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
        amount: '₹38,500',
      },
      {
        id: 'evt-5',
        timestamp: '10:57 AM',
        type: 'ESCALATION',
        title: isBn ? 'অতিরিক্ত ₹১২,০০০ জমার দাবি' : isHi ? 'अतिरिक्त ₹12,000 की मांग (एस्केलेशन)' : 'Escalating Payment Request (₹12,000)',
        description: isBn
          ? 'টাকা পাঠানোর পরই প্রেরক দাবি করে টাকা সেবি হোল্ডে গেছে, মুক্তির জন্য আরও ₹১২,০০০ ডিপোজিট দিতে হবে।'
          : isHi
          ? 'भुगतान के बाद भेजने वाले ने दावा किया कि फंड सेबी होल्ड पर है और ₹12,000 सुरक्षा जमा मांगे।'
          : 'Sender claimed previous payment entered automated regulatory hold; demanded additional ₹12,000 refundable deposit.',
        evidenceIds: ['ev-3'],
        verificationState: 'CONFIRMED_FROM_EVIDENCE',
        amount: '₹12,000',
      }
    ],
    riskSignals: [
      {
        id: 'rs-1',
        category: 'URGENCY',
        title: isBn ? 'কৃত্রিম সময়সীমা ও তাড়া' : isHi ? 'अस्वाभाविक जल्दबाजी (20 मिनट की समयसीमा)' : 'Artificial Urgency ("20 minutes to transfer")',
        explanation: isBn
          ? 'সংক্ষিপ্ত সময়সীমা স্বাধীনভাবে সত্তাটি যাচাই করার সুযোগ নষ্ট করে এবং আবেগপ্রবণ সিদ্ধান্ত নিতে বাধ্য করে।'
          : isHi
          ? 'कम समय की मोहलत स्वतंत्र रूप से जांच करने का मौका छीन लेती है ताकि घबराहट में पैसे भेज दिए जाएं।'
          : 'Strict deadlines reduce the time available to independently verify claims with recognized stock exchanges or registered brokers.',
        evidenceIds: ['ev-1'],
        severity: 'CRITICAL',
      },
      {
        id: 'rs-2',
        category: 'ESCALATING_PAYMENT',
        title: isBn ? 'ধাপে ধাপে অতিরিক্ত অর্থ দাবি' : isHi ? 'लगातार बढ़ती वित्तीय मांग (एस्केलेटिंग पेमेंट)' : 'Escalating Payment Request',
        explanation: isBn
          ? 'প্রথম পেমেন্ট করার পর পুনরায় কোনো কারণ দেখিয়ে আরও টাকা চাওয়া সাধারণ জালিয়াতির পরিচিত লক্ষণ।'
          : isHi
          ? 'एक बार पैसे देने के बाद सिस्टम होल्ड या टैक्स के नाम पर और पैसे मांगना क्लासिक फ्रॉड सिंडिकेट का पैटर्न है।'
          : 'Demanding further money under the guise of "security deposit" or "release fee" after an initial loss is a textbook extortion loop.',
        evidenceIds: ['ev-3'],
        severity: 'CRITICAL',
      },
      {
        id: 'rs-3',
        category: 'AUTHORITY_CLAIM',
        title: isBn ? 'অননুমোদিত প্রাতিষ্ঠানিক দাবি' : isHi ? 'नियामक प्राधिकार का अनधिकृत दावा (SEBI Hold)' : 'Unverified Regulatory Authority Claim',
        explanation: isBn
          ? 'সেবি বা সরকারি কোনো সংস্থা সাধারণ বিনিয়োগকারীর ব্যক্তিগত ইউপিআই পেমেন্ট আটকে অতিরিক্ত আমানত চায় না।'
          : isHi
          ? 'सेबी या स्टॉक एक्सचेंज व्यक्तिगत निवेशकों से सीधे निजी यूपीआई पर कोई डिपॉजिट या पेनल्टी नहीं वसूलते।'
          : 'Legitimate IPO allotments operate via ASBA (Application Supported by Blocked Amount) through your own bank, never direct third-party UPI transfers.',
        evidenceIds: ['ev-3'],
        severity: 'HIGH',
      },
      {
        id: 'rs-4',
        category: 'UNVERIFIED_IDENTITY',
        title: isBn ? 'অযাচাইকৃত ব্রোকার পরিচয়' : isHi ? 'असत्यापित मध्यस्थ पहचान' : 'Unverified Intermediary Identity',
        explanation: isBn
          ? 'প্রেরক Apex Wealth-এর কোনো সেবি রেজিস্ট্রেশন নম্বর (INZ) ভারতীয় রেজিস্টারে পাওয়া যায়নি।'
          : isHi
          ? 'Apex Wealth का कोई वैध सेबी ब्रोकर रजिस्ट्रेशन नंबर सार्वजनिक रिकॉर्ड में नहीं मिला।'
          : 'Sender cannot be verified on the official SEBI register of recognized brokers or investment advisors.',
        evidenceIds: ['ev-1', 'ev-2'],
        severity: 'HIGH',
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        type: 'IMAGE',
        name: 'sample_ipo_allotment.svg',
        createdAt: '2026-10-03T10:45:00Z',
        fileData: '/samples/sample_ipo_allotment.svg',
        extractedText: 'Apex Wealth: Congratulations! Your institutional quota for Premier Tech IPO has been successfully allotted (100 shares). ACTION REQUIRED: Pay ₹38,500 within 20 mins. UPI: apexwealth.corp@okhdfcbank',
        linkedEvents: ['evt-1', 'evt-2', 'evt-3'],
        status: 'READY',
      },
      {
        id: 'ev-2',
        type: 'IMAGE',
        name: 'sample_payment_receipt.svg',
        createdAt: '2026-10-03T10:51:00Z',
        fileData: '/samples/sample_payment_receipt.svg',
        extractedText: 'Payment Successful: ₹38,500.00. Paid to Apex Wealth Partners (apexwealth.corp@okhdfcbank). UTR: 427819034912. Bank of India Debited A/c XX4891.',
        linkedEvents: ['evt-4'],
        status: 'READY',
      },
      {
        id: 'ev-3',
        type: 'IMAGE',
        name: 'sample_security_deposit.svg',
        createdAt: '2026-10-03T10:57:00Z',
        fileData: '/samples/sample_security_deposit.svg',
        extractedText: 'SYSTEM HOLD: Payment of ₹38,500 placed under automated SEBI hold. MANDATORY SECURITY DEPOSIT: ₹12,000. Refundable in 15 mins. Transfer to nodal escrow.',
        linkedEvents: ['evt-5'],
        status: 'READY',
      }
    ],
    responseActions: [
      {
        id: 'resp-1',
        stepNumber: 1,
        title: isBn ? 'অবিলম্বে ১৯৩০ নম্বরে কল করুন' : isHi ? 'तुरंत 1930 राष्ट्रीय साइबर हेल्पलाइन पर कॉल करें' : 'Call 1930 National Cyber Fraud Helpline Immediately',
        description: isBn
          ? 'ইউটিআর নম্বর ৪২৭৮১৯০৩৪৯১২ ও প্রাপক ইউপিআই আইডি জানান যাতে গোল্ডেন আওয়ারের মধ্যে প্রাপকের অ্যাকাউন্ট ফ্রিজ করা যায়।'
          : isHi
          ? 'लेनदेन संदर्भ संख्या (UTR: 427819034912) और यूपीआई आईडी प्रदान करें ताकि लाभार्थी का खाता फ्रीज हो सके।'
          : 'Quote UTR number 427819034912 and recipient UPI ID apexwealth.corp@okhdfcbank to initiate beneficiary account freeze during the Golden Hour.',
        isUrgent: true,
        actionPhone: '1930',
        officialSourceId: 'cybercrime-1930',
        category: 'FREEZE',
      },
      {
        id: 'resp-2',
        stepNumber: 2,
        title: isBn ? 'দ্বিতীয় পেমেন্ট (₹১২,০০০) একদম পাঠাবেন না' : isHi ? 'मांगी गई अतिरिक्त राशि (₹12,000) कतई न भेजें' : 'DO NOT Send the Additional ₹12,000 Deposit',
        description: isBn
          ? 'আগের ক্ষতি উদ্ধারের আশায় আর কোনো টাকা পাঠাবেন না। এটি আরও বড় ক্ষতির সৃষ্টি করবে।'
          : isHi
          ? 'पिछला पैसा निकालने के लालच में और पैसे न दें। यह दोबारा पैसा ऐंठने का जाल है।'
          : 'Refuse all subsequent requests for "clearance fee", "tax", or "security deposit". No genuine regulator requires payment to refund funds.',
        isUrgent: true,
        category: 'RECOVERY_WARNING',
      },
      {
        id: 'resp-3',
        stepNumber: 3,
        title: isBn ? 'ব্যাংক অফ ইন্ডিয়া হেল্পলাইনে বিতর্ক দায়ের করুন' : isHi ? 'अपने बैंक में अनधिकृत लेनदेन का विवाद दर्ज कराएं' : 'Lodge Formal Transaction Dispute with Bank of India',
        description: isBn
          ? 'আপনার হোম ব্যাংকে গিয়ে প্রতারণামূলক লেনদেনের লিখিত অভিযোগ এবং ইউটিআর নম্বর জমা দিন।'
          : isHi
          ? 'बैंक में धोखाधड़ी का लिखित विवरण दें और चार्जबैक या होल्ड अनुरोध पत्र प्राप्त करें।'
          : 'Notify Bank of India customer care and request recall of funds sent via UTR 427819034912.',
        isUrgent: true,
        category: 'REPORT',
      },
      {
        id: 'resp-4',
        stepNumber: 4,
        title: isBn ? 'cybercrime.gov.in-এ আনুষ্ঠানিক অভিযোগ নথিভুক্ত করুন' : isHi ? 'cybercrime.gov.in पर औपचारिक शिकायत दर्ज करें' : 'File Formal Cybercrime Complaint at cybercrime.gov.in',
        description: isBn
          ? 'স্ক্রিনশট এবং রসিদ আপলোড করে সরকারি একনলেজমেন্ট স্লিপটি সংগ্রহ করে রাখুন।'
          : isHi
          ? 'पोर्टल पर स्क्रीनशॉट और चैट साक्ष्य अपलोड करके पावती संख्या (Acknowledgment Slip) प्राप्त करें।'
          : 'Submit all three evidence files to generate an official police complaint acknowledgement.',
        isUrgent: false,
        actionUrl: 'https://cybercrime.gov.in',
        officialSourceId: 'national-cybercrime-portal',
        category: 'REPORT',
      }
    ],
    recoveryContacts: [],
    summary: {
      whatTheyClaimed: isBn 
        ? '"প্রিমিয়ার টেক আইপিও কোটায় আপনার ১০০টি শেয়ার বরাদ্দ হয়েছে।"'
        : isHi
        ? '"आपको प्रीमियर टेक आईपीओ में संस्थागत शेयर आवंटित किए गए हैं।"'
        : '"You were allocated 100 shares in Premier Tech IPO."',
      whatTheyAsked: '₹38,500',
      whatHappened: isBn
        ? 'ব্যাংক অফ ইন্ডিয়া একাউন্ট থেকে ₹৩৮,৫০০ পেমেন্ট করা হয়েছে।'
        : isHi
        ? 'बैंक ऑफ इंडिया से ₹38,500 का यूपीआई भुगतान किया गया प्रतीत होता है।'
        : 'Payment of ₹38,500 appears to have been executed via UPI.',
      whatTheyAskedNext: isBn
        ? 'অতিরিক্ত ₹১২,০০০ জামিন আমানত (Security Deposit)।'
        : isHi
        ? 'अतिरिक्त ₹12,000 सुरक्षा जमा (Security Deposit)।'
        : 'Additional ₹12,000 security deposit requested.',
      whatRemainsUncertain: isBn
        ? 'প্রেরকের আইনি পরিচয় ও সেবি লাইসেন্স নম্বর যাচাই করা সম্ভব হয়নি।'
        : isHi
        ? 'Apex Wealth का नियामक लाइसेंस और वास्तविक पहचान असत्यापित है।'
        : 'Sender corporate identity cannot be verified against the official SEBI intermediary database.',
    }
  };
}

export const SAMPLE_RECOVERY_OFFER = {
  rawText: 'Hello, we are senior fraud recovery specialists investigating the Apex Wealth server breach. We have traced your lost ₹38,500 in their gateway. RECOVERY CHARGE: ₹4,999 LEGAL FILING FEE. Guaranteed 100% refund within 2 hours. UPI: legal.cyber.charge@paytm',
  actor: 'Cyber Recovery Legal Cell',
  feeRequested: '₹4,999',
  promisedAmount: '₹38,500',
  channel: 'Telegram / WhatsApp',
  date: 'Today, 03:15 PM'
};
