import React from 'react';
import { RecoveryShield } from '../components/recovery/RecoveryShield';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const RecoveryShieldPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 pb-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-safestep-beige/70 hover:text-safestep-beige"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.common.back} to Home</span>
      </button>

      <RecoveryShield />
    </div>
  );
};
