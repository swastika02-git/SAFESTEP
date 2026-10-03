import { Incident, EvidenceItem } from '../../types/incident';
import { reconstructIncidentFromEvidence } from '../incidentEngine/reconstructor';

export async function reconstructWithFallback(
  evidenceList: EvidenceItem[],
  userDescription: string,
  lang: string
): Promise<Incident> {
  // Simulate intelligent analysis delay for realistic user perception
  await new Promise(resolve => setTimeout(resolve, 800));
  return reconstructIncidentFromEvidence(evidenceList, userDescription, lang);
}
