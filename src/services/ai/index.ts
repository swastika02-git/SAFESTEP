import { Incident, EvidenceItem } from '../../types/incident';
import { reconstructWithGemini } from './gemini';
import { reconstructWithFallback } from './fallback';

export async function analyzeAndReconstructIncident(
  evidenceList: EvidenceItem[],
  userDescription: string = '',
  language: string = 'en'
): Promise<Incident> {
  const hasKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY);
  if (hasKey) {
    return reconstructWithGemini(evidenceList, userDescription, language);
  }
  return reconstructWithFallback(evidenceList, userDescription, language);
}
