import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, HelpCircle, Lock, Globe, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../types/i18n';
import { setOnboardingCompleted } from '../services/storage/localStorage';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const [step, setStep] = useState(1);

  const handleFinish = () => {
    setOnboardingCompleted(true);
    onComplete();
  };

  const steps = [
    {
      num: 1,
      icon: ShieldCheck,
      title: t.onboarding.step1Title,
      desc: t.onboarding.step1Desc,
      color: 'text-safestep-moss',
      bg: 'bg-safestep-moss/20',
      badge: 'Step 1 of 4'
    },
    {
      num: 2,
      icon: HelpCircle,
      title: t.onboarding.step2Title,
      desc: t.onboarding.step2Desc,
      color: 'text-safestep-rose',
      bg: 'bg-safestep-rose/20',
      badge: 'Step 2 of 4'
    },
    {
      num: 3,
      icon: Lock,
      title: t.onboarding.step3Title,
      desc: t.onboarding.step3Desc,
      color: 'text-safestep-moss',
      bg: 'bg-safestep-midnight',
      badge: 'Step 3 of 4'
    },
    {
      num: 4,
      icon: Globe,
      title: t.onboarding.step4Title,
      desc: t.onboarding.step4Desc,
      color: 'text-safestep-beige',
      bg: 'bg-safestep-midnight',
      badge: 'Step 4 of 4'
    }
  ];

  const current = steps[step - 1];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-safestep-darker p-4 text-safestep-beige select-none">
      <div className="relative w-full max-w-lg rounded-3xl bg-safestep-dark border border-safestep-moss/30 p-6 sm:p-8 shadow-elevated overflow-hidden">
        {/* Progress Bar & Skip */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-safestep-moss' : s < step ? 'w-3 bg-safestep-moss/50' : 'w-3 bg-safestep-midnight'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleFinish}
            className="text-xs text-safestep-beige/60 hover:text-safestep-beige uppercase tracking-wider"
          >
            {t.onboarding.skip}
          </button>
        </div>

        {/* Dynamic Card Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 text-center sm:text-left"
          >
            <div className="inline-block p-4 rounded-2xl bg-safestep-midnight text-safestep-moss border border-safestep-moss/30 shadow-card">
              <Icon className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-wider text-safestep-moss uppercase font-bold">
                {current.badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-safestep-beige mt-1">
                {current.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-safestep-beige/80 leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Step 4: Language Selection Grid */}
            {step === 4 && (
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {supportedLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code as SupportedLanguage)}
                    className={`p-2 rounded-xl text-xs font-semibold text-left flex items-center justify-between border transition-all ${
                      language === l.code
                        ? 'bg-safestep-moss text-safestep-darker border-safestep-moss shadow-sm font-bold'
                        : 'bg-safestep-midnight/40 text-safestep-beige border-safestep-moss/20 hover:border-safestep-moss/50'
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    {language === l.code && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-safestep-midnight flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(step - 1)}
            >
              {t.common.back}
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(step + 1)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.continue}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleFinish}
              icon={<Check className="w-4 h-4" />}
            >
              {t.onboarding.getStarted}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
