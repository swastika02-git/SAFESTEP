import React from 'react';
import { EvidenceUploader } from '../components/evidence/EvidenceUploader';
import { ProcessingSteps } from '../components/animations/ProcessingSteps';
import { useIncident } from '../context/IncidentContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface IntakePageProps {
  onReconstructionDone: () => void;
  onBack: () => void;
}

export const IntakePage: React.FC<IntakePageProps> = ({
  onReconstructionDone,
  onBack,
}) => {
  const { t } = useLanguage();
  const { isAnalyzing, processingStep, runReconstruction } = useIncident();

  const handleStartReconstruction = async (description: string) => {
    await runReconstruction(description);
    onReconstructionDone();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-safestep-beige/70 hover:text-safestep-beige"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back} to Home</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-safestep-moss">
          <ShieldCheck className="w-4 h-4" />
          <span>Evidence Intake Console</span>
        </div>
      </div>

      <div className="text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-safestep-beige">
          {t.intake.title}
        </h2>
        <p className="text-xs sm:text-sm text-safestep-beige/80 max-w-xl">
          {t.intake.subtitle}
        </p>
      </div>

      {/* Main Content: If Analyzing show 6-step progress, otherwise show uploader */}
      {isAnalyzing ? (
        <div className="py-12 animate-fade-in">
          <ProcessingSteps currentStep={processingStep} />
        </div>
      ) : (
        <EvidenceUploader
          onReconstruct={handleStartReconstruction}
          isAnalyzing={isAnalyzing}
        />
      )}
    </div>
  );
};
