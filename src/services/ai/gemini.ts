import { Incident, EvidenceItem } from '../../types/incident';
import { reconstructWithFallback } from './fallback';

export async function reconstructWithGemini(
  evidenceList: EvidenceItem[],
  userDescription: string,
  lang: string
): Promise<Incident> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return reconstructWithFallback(evidenceList, userDescription, lang);
  }

  try {
    const prompt = `You are SAFESTEP, an AI incident reconstruction assistant for Indian retail investors.
Reconstruct the following user evidence into an incident:
${evidenceList.map((e, idx) => `Evidence #${idx + 1} (${e.name}): ${e.extractedText}`).join('\n')}
User description: ${userDescription}

Respond strictly as JSON matching SAFESTEP data schema.`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!res.ok) {
      console.warn('Gemini API call failed with status', res.status, '- falling back to deterministic engine');
      return reconstructWithFallback(evidenceList, userDescription, lang);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidateText) {
      const parsed = JSON.parse(candidateText);
      return parsed;
    }
    return reconstructWithFallback(evidenceList, userDescription, lang);
  } catch (err) {
    console.warn('Gemini API error, falling back cleanly:', err);
    return reconstructWithFallback(evidenceList, userDescription, lang);
  }
}
