import React from 'react';
import { OfficialSources } from '../components/response/OfficialSources';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OfficialHelpPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-safestep-beige/70 hover:text-safestep-beige"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.common.back} to Home</span>
      </button>

      <OfficialSources />
    </div>
  );
};
