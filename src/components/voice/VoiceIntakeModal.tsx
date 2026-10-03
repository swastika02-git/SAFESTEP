import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Waveform } from '../animations/Waveform';
import { speechService } from '../../services/speech/speechService';
import { VoiceState } from '../../types/voice';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceComplete: (transcript: string) => void;
}

export const VoiceIntakeModal: React.FC<VoiceIntakeModalProps> = ({
  isOpen,
  onClose,
  onVoiceComplete,
}) => {
  const { t, language } = useLanguage();
  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [transcript, setTranscript] = useState<string>('');
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (isOpen) {
      handleStartListening();
    } else {
      if (stopListeningFn) stopListeningFn();
      setVoiceState('IDLE');
      setTranscript('');
    }
    return () => {
      if (stopListeningFn) stopListeningFn();
    };
  }, [isOpen]);

  const handleStartListening = () => {
    setTranscript('');
    const cleanup = speechService.startListening(
      (state) => setVoiceState(state),
      (text) => setTranscript(text),
      (err) => console.warn('Voice recognition error:', err)
    );
    setStopListeningFn(() => cleanup);
  };

  const handleStopListening = () => {
    if (stopListeningFn) {
      stopListeningFn();
      setStopListeningFn(null);
    }
    setVoiceState('UNDERSTANDING');
    setTimeout(() => {
      setVoiceState('RECONSTRUCTING');
    }, 600);
  };

  const handleApplyVoice = () => {
    if (transcript.trim()) {
      onVoiceComplete(transcript);
      onClose();
    }
  };

  const isRecording = voiceState === 'LISTENING' || voiceState === 'TRANSCRIBING';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.intake.voiceButtonText}
      maxWidth="max-w-lg"
    >
      <div className="flex flex-col items-center text-center space-y-6 py-2">
        {/* State Banner */}
        <div className="py-1 px-4 rounded-full bg-safestep-midnight text-safestep-moss text-xs font-mono font-bold tracking-wider uppercase border border-safestep-moss/30">
          {voiceState === 'LISTENING' && t.intake.voiceListening}
          {voiceState === 'TRANSCRIBING' && t.intake.voiceTranscribing}
          {voiceState === 'UNDERSTANDING' && t.intake.voiceUnderstanding}
          {voiceState === 'RECONSTRUCTING' && t.intake.voiceReconstructing}
          {voiceState === 'IDLE' && 'Ready to Listen'}
          {voiceState === 'ERROR' && 'Speech service unavailable - simulated sample loaded'}
        </div>

        {/* Large Microphone Pulse Button */}
        <div className="relative">
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-safestep-rose/20 animate-ping opacity-60" />
          )}
          <button
            onClick={isRecording ? handleStopListening : handleStartListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-elevated ${
              isRecording
                ? 'bg-safestep-rose text-safestep-darker ring-4 ring-safestep-rose/40 scale-105'
                : 'bg-safestep-moss text-safestep-darker hover:bg-safestep-moss-light ring-4 ring-safestep-moss/30 hover:scale-105'
            }`}
            aria-label={isRecording ? 'Stop recording voice' : 'Start speaking'}
          >
            {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="w-full">
          <Waveform isActive={isRecording} />
        </div>

        {/* Live Transcript Box */}
        <div className="w-full bg-safestep-midnight/40 border border-safestep-moss/30 rounded-xl p-4 text-left min-h-[90px]">
          <div className="text-[11px] font-mono text-safestep-moss uppercase font-bold tracking-wider mb-1">
            Speech-to-Text Transcript:
          </div>
          <p className="text-sm text-safestep-beige leading-relaxed">
            {transcript ? transcript : (
              <span className="italic text-safestep-beige/40">
                Speak in your regional language (English, Hindi, Bengali, etc.). We understand natural mixed speech.
              </span>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1"
          >
            {t.common.cancel}
          </Button>

          <Button
            variant="primary"
            onClick={handleApplyVoice}
            disabled={!transcript.trim()}
            icon={<Check className="w-4 h-4" />}
            className="flex-1"
          >
            Apply to Incident
          </Button>
        </div>
      </div>
    </Modal>
  );
};
