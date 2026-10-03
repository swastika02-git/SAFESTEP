export type VoiceState = 
  | 'IDLE'
  | 'LISTENING'
  | 'TRANSCRIBING'
  | 'UNDERSTANDING'
  | 'RECONSTRUCTING'
  | 'ERROR';

export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  detectedLanguage?: string;
}
