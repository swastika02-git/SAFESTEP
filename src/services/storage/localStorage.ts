import { Incident } from '../../types/incident';

const STORAGE_KEY_INCIDENTS = 'safestep_incidents_v1';
const STORAGE_KEY_ACTIVE_ID = 'safestep_active_incident_id_v1';
const STORAGE_KEY_LANGUAGE = 'safestep_preferred_language_v1';
const STORAGE_KEY_ONBOARDED = 'safestep_onboarding_completed_v1';

export function getAllIncidents(): Incident[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INCIDENTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read incidents from localStorage', e);
    return [];
  }
}

export function getIncidentById(id: string): Incident | null {
  const incidents = getAllIncidents();
  return incidents.find(inc => inc.id === id) || null;
}

export function saveIncident(incident: Incident): void {
  try {
    const incidents = getAllIncidents();
    const existingIndex = incidents.findIndex(inc => inc.id === incident.id);
    if (existingIndex >= 0) {
      incidents[existingIndex] = { ...incident, updatedAt: new Date().toISOString() };
    } else {
      incidents.unshift({ ...incident, updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(incidents));
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, incident.id);
  } catch (e) {
    console.error('Failed to save incident to localStorage', e);
  }
}

export function deleteIncident(id: string): void {
  try {
    const incidents = getAllIncidents().filter(inc => inc.id !== id);
    localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(incidents));
    const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
    if (activeId === id) {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
    }
  } catch (e) {
    console.error('Failed to delete incident from localStorage', e);
  }
}

export function clearAllSafestepData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_INCIDENTS);
    localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
    localStorage.removeItem(STORAGE_KEY_ONBOARDED);
  } catch (e) {
    console.error('Failed to clear storage', e);
  }
}

export function getActiveIncidentId(): string | null {
  return localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
}

export function setActiveIncidentId(id: string): void {
  localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id);
}

export function getSavedLanguage(): string | null {
  return localStorage.getItem(STORAGE_KEY_LANGUAGE);
}

export function saveLanguage(lang: string): void {
  localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
}

export function isOnboardingCompleted(): boolean {
  return localStorage.getItem(STORAGE_KEY_ONBOARDED) === 'true';
}

export function setOnboardingCompleted(completed: boolean = true): void {
  localStorage.setItem(STORAGE_KEY_ONBOARDED, completed ? 'true' : 'false');
}

export function exportIncidentAsText(incident: Incident): string {
  const dateStr = new Date(incident.createdAt).toLocaleString();
  return `=== SAFESTEP OFFICIAL INCIDENT RECONSTRUCTION SUMMARY ===
Report Generated: ${new Date().toLocaleString()}
Incident Reference: ${incident.id}
Incident Date: ${dateStr}
Incident Title: ${incident.title}
Status: ${incident.status}
Reported Loss: ${incident.userLossAmount || 'Not specified'}

--- 1. WHAT THEY CLAIMED ---
${incident.summary.whatTheyClaimed}

--- 2. WHAT THEY ASKED ---
${incident.summary.whatTheyAsked}

--- 3. WHAT HAPPENED ---
${incident.summary.whatHappened}

--- 4. WHAT THEY ASKED NEXT ---
${incident.summary.whatTheyAskedNext}

--- 5. WHAT REMAINS UNCERTAIN ---
${incident.summary.whatRemainsUncertain}

--- 6. RECONSTRUCTED TIMELINE ---
${incident.timelineEvents.map(e => `[${e.timestamp}] ${e.type}: ${e.title}\n  Details: ${e.description}\n  Verification: ${e.verificationState}`).join('\n\n')}

--- 7. RISK SIGNALS IDENTIFIED ---
${incident.riskSignals.map(r => `• [${r.category}] ${r.title} (${r.severity})\n  Why It Matters: ${r.explanation}`).join('\n\n')}

--- 8. ATTACHED EVIDENCE ITEMS (${incident.evidence.length}) ---
${incident.evidence.map(ev => `• Evidence #${ev.id}: ${ev.name} (${ev.type})\n  Extracted: ${ev.extractedText.slice(0, 150)}...`).join('\n')}

--- 9. OFFICIAL RECOMMENDED ACTIONS ---
${incident.responseActions.map(a => `${a.stepNumber}. ${a.title}\n   ${a.description}`).join('\n\n')}

============================================================
NOTE: SAFESTEP is an automated informational safety and incident reconstruction tool. It does not provide legal opinions or financial advice. File this report with 1930 / cybercrime.gov.in and your home bank.`;
}
