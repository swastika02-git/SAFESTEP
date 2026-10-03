import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useIncident } from '../context/IncidentContext';
import { SupportedLanguage } from '../types/i18n';
import { 
  Globe, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  AlertTriangle,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const SettingsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const { resetAllData, loadBengaliDemo, loadHindiDemo, loadDemoIncident } = useIncident();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearedMsg, setClearedMsg] = useState(false);

  const handleClear = () => {
    resetAllData();
    setShowClearConfirm(false);
    setClearedMsg(true);
    setTimeout(() => setClearedMsg(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16 text-left">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-safestep-beige/70 hover:text-safestep-beige"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.common.back} to Home</span>
      </button>

      <div>
        <h2 className="text-2xl font-extrabold text-safestep-beige">Settings & Regional Language</h2>
        <p className="text-xs text-safestep-beige/70 mt-1">
          Customize your regional language preference and manage local browser session storage.
        </p>
      </div>

      {/* Language Section */}
      <div className="rounded-2xl border border-safestep-moss/30 bg-safestep-darker/90 p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-5 h-5 text-safestep-moss" />
          <h3 className="text-base font-bold text-safestep-beige">Choose Your Language</h3>
        </div>
        <p className="text-xs text-safestep-beige/70">
          SAFESTEP supports 11 Indian languages across all timelines, risk explanations, audio summaries, and response guides.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {supportedLanguages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code as SupportedLanguage)}
                className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-safestep-moss text-safestep-darker border-safestep-moss font-bold shadow-sm'
                    : 'bg-safestep-midnight/40 text-safestep-beige border-safestep-moss/20 hover:border-safestep-moss/50'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{l.nativeName}</div>
                  <div className="text-[11px] opacity-75">{l.name}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Demo Scenario Selectors */}
      <div className="rounded-2xl border border-safestep-moss/30 bg-safestep-darker/90 p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-safestep-rose" />
          <h3 className="text-base font-bold text-safestep-beige">Ready-to-Demo Scenarios</h3>
        </div>
        <p className="text-xs text-safestep-beige/70">
          Switch to specific regional language demo scenarios for hackathon judging evaluations:
        </p>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              loadBengaliDemo();
              onBack();
            }}
          >
            বাংলা ডেমো (Bengali Demo)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              loadHindiDemo();
              onBack();
            }}
          >
            हिन्दी डेमो (Hindi Demo)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              loadDemoIncident('en');
              onBack();
            }}
          >
            English Demo
          </Button>
        </div>
      </div>

      {/* Privacy & Storage Controls */}
      <div className="rounded-2xl border border-safestep-rose/40 bg-safestep-darker/90 p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-safestep-rose">
          <Trash2 className="w-5 h-5" />
          <h3 className="text-base font-bold text-safestep-beige">Data Management & Privacy</h3>
        </div>
        <p className="text-xs text-safestep-beige/70 leading-relaxed">
          SAFESTEP operates on local data minimization. Your evidence and incident records are retained only in your local browser storage.
        </p>

        {clearedMsg && (
          <div className="p-3 rounded-xl bg-safestep-moss/20 border border-safestep-moss text-safestep-moss text-xs font-bold">
            All stored incidents and staged files cleared successfully.
          </div>
        )}

        <Button
          variant="danger"
          size="sm"
          onClick={() => setShowClearConfirm(true)}
          icon={<Trash2 className="w-4 h-4" />}
        >
          Clear All Incident Data & Reset
        </Button>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <Modal
          isOpen={showClearConfirm}
          onClose={() => setShowClearConfirm(false)}
          title="Clear All Local Data"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-center py-2">
            <AlertTriangle className="w-10 h-10 text-safestep-rose mx-auto" />
            <h4 className="text-base font-bold text-safestep-beige">
              Erase all local incident records?
            </h4>
            <p className="text-xs text-safestep-beige/70">
              This will remove all uploaded evidence, reconstructed timelines, and settings from your browser storage.
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1"
              >
                {t.common.cancel}
              </Button>
              <Button
                variant="danger"
                onClick={handleClear}
                className="flex-1"
              >
                Yes, Clear All
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
