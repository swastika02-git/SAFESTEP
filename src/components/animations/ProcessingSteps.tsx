import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProcessingStepsProps {
  currentStep: number; // 1 to 6
}

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ currentStep }) => {
  const { t } = useLanguage();

  const steps = [
    { num: 1, label: t.intake.processingStep1 },
    { num: 2, label: t.intake.processingStep2 },
    { num: 3, label: t.intake.processingStep3 },
    { num: 4, label: t.intake.processingStep4 },
    { num: 5, label: t.intake.processingStep5 },
    { num: 6, label: t.intake.processingStep6 },
  ];

  return (
    <div className="w-full max-w-lg mx-auto bg-safestep-darker/90 border border-safestep-moss/40 rounded-2xl p-6 shadow-elevated">
      <div className="flex items-center justify-between border-b border-safestep-midnight pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-safestep-midnight text-safestep-moss">
            <ShieldAlert className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h3 className="text-base font-bold text-safestep-beige">Reconstructing Incident</h3>
            <p className="text-xs text-safestep-moss">Step {currentStep} of 6 in progress...</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-safestep-moss/20 text-safestep-moss border border-safestep-moss/40">
          AI & Rule Engine
        </span>
      </div>

      <div className="space-y-3.5">
        {steps.map((step) => {
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.num * 0.08 }}
              className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                isCurrent 
                  ? 'bg-safestep-midnight/50 border border-safestep-moss/40 text-safestep-beige' 
                  : isDone
                  ? 'bg-safestep-dark/40 text-safestep-moss'
                  : 'text-safestep-beige/40'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-safestep-moss" />
                ) : isCurrent ? (
                  <CircleDashed className="w-5 h-5 text-safestep-rose animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-safestep-beige/20 flex items-center justify-center text-[10px] font-mono">
                    {step.num}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <span className="text-xs font-mono tracking-wider opacity-75 mr-2">STEP {step.num}:</span>
                <span className={`text-sm ${isCurrent ? 'font-semibold text-safestep-beige' : ''}`}>
                  {step.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
