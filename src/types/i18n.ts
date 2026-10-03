export type SupportedLanguage = 
  | 'en'   // English
  | 'hi'   // Hindi (हिन्दी)
  | 'bn'   // Bengali (বাংলা)
  | 'mr'   // Marathi (मराठी)
  | 'te'   // Telugu (తెలుగు)
  | 'ta'   // Tamil (தமிழ்)
  | 'gu'   // Gujarati (ગુજરાતી)
  | 'pa'   // Punjabi (ਪੰਜਾਬੀ)
  | 'as'   // Assamese (অসমীয়া)
  | 'mni'  // Manipuri (মৈতৈলোন্)
  | 'or';  // Odia (ଓଡ଼ିଆ)

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
  flag: string;
}

export interface TranslationSchema {
  common: {
    appName: string;
    tagline: string;
    privacyBanner: string;
    privacySubtext: string;
    loading: string;
    back: string;
    continue: string;
    save: string;
    cancel: string;
    delete: string;
    confirm: string;
    close: string;
    officialSource: string;
    tryDemo: string;
    restartDemo: string;
  };
  nav: {
    home: string;
    incidents: string;
    evidence: string;
    recoveryShield: string;
    officialHelp: string;
    settings: string;
    startIncident: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    startCta: string;
    analyzeMsgCta: string;
    tellUsVoiceCta: string;
    recoveryShieldCta: string;
    whereAreYouNowTitle: string;
    whereAreYouNowSubtitle: string;
    stateNothingSent: string;
    stateNothingSentDesc: string;
    stateInfoShared: string;
    stateInfoSharedDesc: string;
    stateMoneySent: string;
    stateMoneySentDesc: string;
    stateMoneySentMoreAsked: string;
    stateMoneySentMoreAskedDesc: string;
    corePrinciplesTitle: string;
    principle1Title: string;
    principle1Desc: string;
    principle2Title: string;
    principle2Desc: string;
    principle3Title: string;
    principle3Desc: string;
    guardrailDemoQuery: string;
    guardrailDemoResponse: string;
  };
  onboarding: {
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    skip: string;
    getStarted: string;
  };
  intake: {
    title: string;
    subtitle: string;
    dragDropText: string;
    supportsTypes: string;
    browseFiles: string;
    orDescribeText: string;
    textPlaceholder: string;
    voiceButtonText: string;
    voiceListening: string;
    voiceTranscribing: string;
    voiceUnderstanding: string;
    voiceReconstructing: string;
    privacyReminder: string;
    analyzeButton: string;
    quickDemoSample: string;
    processingStep1: string;
    processingStep2: string;
    processingStep3: string;
    processingStep4: string;
    processingStep5: string;
    processingStep6: string;
  };
  detail: {
    summaryTitle: string;
    whatTheyClaimed: string;
    whatTheyAsked: string;
    whatHappened: string;
    whatTheyAskedNext: string;
    whatRemainsUncertain: string;
    timelineTab: string;
    graphTab: string;
    claimsTab: string;
    riskSignalsTab: string;
    responseTab: string;
    evidenceTab: string;
    verifiedFromEvidence: string;
    userReported: string;
    inferred: string;
    unverified: string;
    supportedBy: string;
    deleteIncidentPrompt: string;
    exportSummary: string;
    listenToSummary: string;
    readingAloud: string;
    stopReading: string;
  };
  recoveryShield: {
    title: string;
    tagline: string;
    description: string;
    inputPrompt: string;
    inputPlaceholder: string;
    analyzeButton: string;
    detectionAlertTitle: string;
    detectionAlertDesc: string;
    rule1: string;
    rule2: string;
    attachToTimeline: string;
    attachedSuccess: string;
    tryDemoRecoveryMsg: string;
  };
  officialHelp: {
    title: string;
    subtitle: string;
    call1930Title: string;
    call1930Desc: string;
    call1930Action: string;
    cybercrimeTitle: string;
    cybercrimeDesc: string;
    sebiScoresTitle: string;
    sebiScoresDesc: string;
    rbiChakshuTitle: string;
    rbiChakshuDesc: string;
    goldenHourWarning: string;
    noPrivateRecoveryNotice: string;
  };
  guardrails: {
    refusalNotice: string;
    whyRefused: string;
    returnToSafety: string;
  };
}
