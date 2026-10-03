import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Mic, 
  Sparkles, 
  ShieldAlert, 
  Lock,
  Plus
} from 'lucide-react';
import { Button } from '../common/Button';
import { EvidenceCard } from './EvidenceCard';
import { VoiceIntakeModal } from '../voice/VoiceIntakeModal';
import { useLanguage } from '../../context/LanguageContext';
import { useIncident } from '../../context/IncidentContext';

interface EvidenceUploaderProps {
  onReconstruct: (description: string) => void;
  isAnalyzing: boolean;
}

export const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  onReconstruct,
  isAnalyzing,
}) => {
  const { t } = useLanguage();
  const { 
    stagedEvidence, 
    addEvidenceFile, 
    addTextEvidence, 
    removeStagedEvidence,
    clearStagedEvidence 
  } = useIncident();

  const [descriptionText, setDescriptionText] = useState('');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        await addEvidenceFile(e.target.files[i]);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        await addEvidenceFile(e.dataTransfer.files[i]);
      }
    }
  };

  const handleLoadSampleScenario = async () => {
    // Populate the staged evidence with the 3 sample files
    clearStagedEvidence();
    
    // Create File-like items for the samples
    try {
      const resp1 = await fetch('/samples/sample_ipo_allotment.svg');
      const blob1 = await resp1.blob();
      const file1 = new File([blob1], 'sample_ipo_allotment.svg', { type: 'image/svg+xml' });
      await addEvidenceFile(file1);

      const resp2 = await fetch('/samples/sample_payment_receipt.svg');
      const blob2 = await resp2.blob();
      const file2 = new File([blob2], 'sample_payment_receipt.svg', { type: 'image/svg+xml' });
      await addEvidenceFile(file2);

      const resp3 = await fetch('/samples/sample_security_deposit.svg');
      const blob3 = await resp3.blob();
      const file3 = new File([blob3], 'sample_security_deposit.svg', { type: 'image/svg+xml' });
      await addEvidenceFile(file3);

      setDescriptionText('Received WhatsApp message stating 100 shares of Premier Tech IPO allotted. Transferred ₹38,500 via UPI. Now they demand ₹12,000 extra security deposit claiming funds are on SEBI hold.');
    } catch (e) {
      console.warn('Failed to load sample blobs, fallback to text evidence', e);
      addTextEvidence('Apex Wealth IPO message demanding ₹38,500 within 20 mins', 'Sample IPO Notice');
      addTextEvidence('Payment receipt for ₹38,500 via UPI to apexwealth.corp@okhdfcbank', 'Payment Receipt');
      addTextEvidence('Demand for additional ₹12,000 security deposit to release funds', 'Escalating Deposit');
    }
  };

  const handleVoiceComplete = (transcript: string) => {
    setDescriptionText(prev => prev ? `${prev}\n${transcript}` : transcript);
    addTextEvidence(transcript, 'Voice Recording Transcript');
  };

  return (
    <div className="space-y-6">
      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-safestep-moss bg-safestep-midnight/40 scale-[1.01]'
            : 'border-safestep-moss/40 bg-safestep-darker/80 hover:border-safestep-moss hover:bg-safestep-midnight/20'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*,application/pdf"
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-safestep-midnight/80 border border-safestep-moss/40 flex items-center justify-center mx-auto mb-4 text-safestep-moss shadow-glow-moss">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h4 className="text-base sm:text-lg font-bold text-safestep-beige mb-1">
          {t.intake.dragDropText}
        </h4>
        <p className="text-xs text-safestep-beige/70 max-w-md mx-auto mb-4">
          {t.intake.supportsTypes}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            {t.intake.browseFiles}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<Mic className="w-4 h-4 text-safestep-moss" />}
            onClick={(e) => {
              e.stopPropagation();
              setIsVoiceOpen(true);
            }}
          >
            {t.intake.voiceButtonText}
          </Button>

          <Button
            type="button"
            variant="beige"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-safestep-rose" />}
            onClick={(e) => {
              e.stopPropagation();
              handleLoadSampleScenario();
            }}
          >
            {t.intake.quickDemoSample}
          </Button>
        </div>
      </div>

      {/* Staged Evidence Cards List */}
      {stagedEvidence.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-safestep-moss tracking-wider uppercase font-mono">
              Staged Evidence ({stagedEvidence.length} items ready for reconstruction)
            </span>
            <button
              onClick={clearStagedEvidence}
              className="text-safestep-rose hover:underline"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stagedEvidence.map((ev, index) => (
              <EvidenceCard
                key={ev.id}
                evidence={ev}
                index={index}
                onRemove={removeStagedEvidence}
              />
            ))}
          </div>
        </div>
      )}

      {/* Text Description Box */}
      <div className="bg-safestep-darker/90 rounded-2xl border border-safestep-moss/25 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-bold text-safestep-beige flex items-center gap-2">
            <FileText className="w-4 h-4 text-safestep-moss" />
            {t.intake.orDescribeText}
          </label>
          <span className="text-[11px] text-safestep-beige/60">Optional context</span>
        </div>

        <textarea
          rows={3}
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
          placeholder={t.intake.textPlaceholder}
          className="w-full bg-safestep-dark rounded-xl border border-safestep-midnight p-3.5 text-xs sm:text-sm text-safestep-beige placeholder:text-safestep-beige/35 focus:outline-none focus:border-safestep-moss transition-colors leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-safestep-moss font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Never enter bank passwords, PINs, OTPs, or CVV.</span>
          </div>
          
          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="inline-flex items-center gap-1 text-xs text-safestep-beige/70 hover:text-safestep-moss transition-colors"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Input</span>
          </button>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="lg"
          disabled={isAnalyzing || (stagedEvidence.length === 0 && !descriptionText.trim())}
          onClick={() => onReconstruct(descriptionText)}
          className="w-full shadow-glow-moss"
          icon={<ShieldAlert className="w-5 h-5 text-safestep-darker" />}
        >
          {isAnalyzing ? t.common.loading : t.intake.analyzeButton}
        </Button>
      </div>

      {/* Voice Modal */}
      <VoiceIntakeModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceComplete={handleVoiceComplete}
      />
    </div>
  );
};
