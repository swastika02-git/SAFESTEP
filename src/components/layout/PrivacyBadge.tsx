import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PrivacyBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div 
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-safestep-midnight/40 border border-safestep-moss/30 text-safestep-beige text-xs font-medium"
        title="Zero credentials collected"
      >
        <Lock className="w-3.5 h-3.5 text-safestep-moss" />
        <span>{t.common.privacyBanner}</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-safestep-midnight/30 border-y border-safestep-moss/20 py-2.5 px-4 text-safestep-beige">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-safestep-moss/20 text-safestep-moss">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold tracking-wide text-safestep-moss">
            {t.common.privacyBanner}:
          </span>
          <span className="text-safestep-beige/90">
            {t.common.privacySubtext}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-safestep-moss font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4 text-safestep-moss" />
          <span>Local Browser Session</span>
        </div>
      </div>
    </div>
  );
};
