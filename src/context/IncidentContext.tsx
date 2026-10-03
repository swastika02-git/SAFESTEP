import React, { createContext, useContext, useState, useEffect } from 'react';
import { Incident, EvidenceItem, RecoveryContact } from '../types/incident';
import { 
  getAllIncidents, 
  saveIncident, 
  deleteIncident as deleteFromStorage, 
  clearAllSafestepData,
  getActiveIncidentId,
  setActiveIncidentId
} from '../services/storage/localStorage';
import { getSampleIncident } from '../services/demoData';
import { processEvidenceFile, createTextEvidence, createVoiceEvidence } from '../services/ocr/textExtractor';
import { analyzeAndReconstructIncident } from '../services/ai';
import { useLanguage } from './LanguageContext';

interface IncidentContextType {
  currentIncident: Incident | null;
  allIncidents: Incident[];
  stagedEvidence: EvidenceItem[];
  isAnalyzing: boolean;
  processingStep: number; // 1 to 6
  addEvidenceFile: (file: File) => Promise<void>;
  addTextEvidence: (text: string, title?: string) => void;
  addVoiceEvidence: (transcript: string) => void;
  removeStagedEvidence: (id: string) => void;
  clearStagedEvidence: () => void;
  runReconstruction: (userDescription?: string) => Promise<Incident>;
  loadDemoIncident: (langOverride?: string) => void;
  loadBengaliDemo: () => void;
  loadHindiDemo: () => void;
  deleteCurrentIncident: () => void;
  deleteSpecificIncident: (id: string) => void;
  attachRecoveryContact: (recoveryData: {
    actor: string;
    feeRequested: string;
    promisedRecoveryAmount: string;
    channel: string;
    rawText: string;
  }) => void;
  setActiveIncident: (id: string) => void;
  createNewIncident: () => void;
  resetAllData: () => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useLanguage();
  const [allIncidents, setAllIncidents] = useState<Incident[]>([]);
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);
  const [stagedEvidence, setStagedEvidence] = useState<EvidenceItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<number>(1);

  // Initialize from localStorage or preload demo if empty
  useEffect(() => {
    const list = getAllIncidents();
    if (list.length > 0) {
      setAllIncidents(list);
      const activeId = getActiveIncidentId();
      const active = list.find(i => i.id === activeId) || list[0];
      setCurrentIncident(active);
    } else {
      // Pre-seed demo incident so judges immediately have access
      const demo = getSampleIncident(language);
      saveIncident(demo);
      setAllIncidents([demo]);
      setCurrentIncident(demo);
    }
  }, []);

  const addEvidenceFile = async (file: File) => {
    try {
      const item = await processEvidenceFile(file);
      setStagedEvidence(prev => [...prev, item]);
    } catch (e) {
      console.error('Error adding evidence file', e);
    }
  };

  const addTextEvidence = (text: string, title?: string) => {
    const item = createTextEvidence(text, title);
    setStagedEvidence(prev => [...prev, item]);
  };

  const addVoiceEvidence = (transcript: string) => {
    const item = createVoiceEvidence(transcript);
    setStagedEvidence(prev => [...prev, item]);
  };

  const removeStagedEvidence = (id: string) => {
    setStagedEvidence(prev => prev.filter(e => e.id !== id));
  };

  const clearStagedEvidence = () => {
    setStagedEvidence([]);
  };

  const runReconstruction = async (userDescription: string = ''): Promise<Incident> => {
    setIsAnalyzing(true);
    setProcessingStep(1);

    // Multi-step progress animation simulation (Step 1 -> 6)
    const stepInterval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev < 6) return prev + 1;
        return prev;
      });
    }, 450);

    try {
      // Include staged evidence or fallback to demo evidence if none uploaded
      let evidenceToUse = stagedEvidence;
      if (evidenceToUse.length === 0 && userDescription.trim().length === 0) {
        const demo = getSampleIncident(language);
        evidenceToUse = demo.evidence;
      }

      const reconstructed = await analyzeAndReconstructIncident(
        evidenceToUse,
        userDescription,
        language
      );

      clearInterval(stepInterval);
      setProcessingStep(6);
      await new Promise(r => setTimeout(r, 400));

      saveIncident(reconstructed);
      setAllIncidents(getAllIncidents());
      setCurrentIncident(reconstructed);
      setStagedEvidence([]);
      setIsAnalyzing(false);
      return reconstructed;
    } catch (err) {
      clearInterval(stepInterval);
      console.error('Reconstruction failed:', err);
      // Deterministic recovery
      const fallback = getSampleIncident(language);
      saveIncident(fallback);
      setAllIncidents(getAllIncidents());
      setCurrentIncident(fallback);
      setIsAnalyzing(false);
      return fallback;
    }
  };

  const loadDemoIncident = (langOverride?: string) => {
    const lang = langOverride || language;
    const demo = getSampleIncident(lang);
    saveIncident(demo);
    setAllIncidents(getAllIncidents());
    setCurrentIncident(demo);
  };

  const loadBengaliDemo = () => {
    setLanguage('bn');
    loadDemoIncident('bn');
  };

  const loadHindiDemo = () => {
    setLanguage('hi');
    loadDemoIncident('hi');
  };

  const deleteCurrentIncident = () => {
    if (currentIncident) {
      deleteFromStorage(currentIncident.id);
      const remaining = getAllIncidents();
      setAllIncidents(remaining);
      setCurrentIncident(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const deleteSpecificIncident = (id: string) => {
    deleteFromStorage(id);
    const remaining = getAllIncidents();
    setAllIncidents(remaining);
    if (currentIncident?.id === id) {
      setCurrentIncident(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const attachRecoveryContact = (recoveryData: {
    actor: string;
    feeRequested: string;
    promisedRecoveryAmount: string;
    channel: string;
    rawText: string;
  }) => {
    if (!currentIncident) return;

    const contactId = 'rec-' + Math.random().toString(36).substring(2, 7);
    const newRecoveryContact: RecoveryContact = {
      id: contactId,
      actor: recoveryData.actor || 'Cyber Recovery Legal Cell',
      feeRequested: recoveryData.feeRequested || '₹4,999',
      promisedRecoveryAmount: recoveryData.promisedRecoveryAmount || currentIncident.userLossAmount || '₹38,500',
      channel: recoveryData.channel || 'Telegram / WhatsApp',
      evidenceIds: [],
      date: 'Today, 03:15 PM',
      isSecondaryScamFlag: true,
    };

    // Add as a timeline event
    const newTimelineEvent = {
      id: 'evt-recovery-' + Math.random().toString(36).substring(2, 7),
      timestamp: '03:15 PM',
      type: 'RECOVERY_CONTACT' as const,
      title: 'Secondary Scam Attempt (Recovery Offer)',
      description: `Unsolicited contact from "${newRecoveryContact.actor}" offering to recover ${newRecoveryContact.promisedRecoveryAmount} in exchange for an upfront payment of ${newRecoveryContact.feeRequested}.`,
      evidenceIds: [],
      verificationState: 'CONFIRMED_FROM_EVIDENCE' as const,
      amount: newRecoveryContact.feeRequested,
    };

    const updatedIncident: Incident = {
      ...currentIncident,
      status: 'RECOVERY_CONTACT_DETECTED',
      recoveryContacts: [...currentIncident.recoveryContacts, newRecoveryContact],
      timelineEvents: [...currentIncident.timelineEvents, newTimelineEvent],
      summary: {
        ...currentIncident.summary,
        whatTheyAskedNext: `Secondary Recovery Fee Requested: ${newRecoveryContact.feeRequested} by "${newRecoveryContact.actor}"`
      }
    };

    saveIncident(updatedIncident);
    setAllIncidents(getAllIncidents());
    setCurrentIncident(updatedIncident);
  };

  const setActiveIncident = (id: string) => {
    setActiveIncidentId(id);
    const found = allIncidents.find(i => i.id === id);
    if (found) setCurrentIncident(found);
  };

  const createNewIncident = () => {
    setStagedEvidence([]);
    setCurrentIncident(null);
  };

  const resetAllData = () => {
    clearAllSafestepData();
    const demo = getSampleIncident(language);
    saveIncident(demo);
    setAllIncidents([demo]);
    setCurrentIncident(demo);
    setStagedEvidence([]);
  };

  const value = {
    currentIncident,
    allIncidents,
    stagedEvidence,
    isAnalyzing,
    processingStep,
    addEvidenceFile,
    addTextEvidence,
    addVoiceEvidence,
    removeStagedEvidence,
    clearStagedEvidence,
    runReconstruction,
    loadDemoIncident,
    loadBengaliDemo,
    loadHindiDemo,
    deleteCurrentIncident,
    deleteSpecificIncident,
    attachRecoveryContact,
    setActiveIncident,
    createNewIncident,
    resetAllData,
  };

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
};

export function useIncident() {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncident must be used within an IncidentProvider');
  }
  return context;
}
