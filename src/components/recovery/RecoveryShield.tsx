import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Link2,
  DollarSign
} from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useIncident } from '../../context/IncidentContext';
import { SAMPLE_RECOVERY_OFFER } from '../../services/demoData';

export const RecoveryShield: React.FC = () => {
  const { t } = useLanguage();
  const { currentIncident, attachRecoveryContact } = useIncident();

  const [inputText, setInputText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [attached, setAttached] = useState(false);

  const previousLoss = currentIncident?.userLossAmount || '₹38,500';

  const handleAnalyze = () => {
    if (inputText.trim()) {
      setAnalyzed(true);
      setAttached(false);
    }
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_RECOVERY_OFFER.rawText);
    setAnalyzed(true);
    setAttached(false);
  };

  const handleAttach = () => {
    attachRecoveryContact({
      actor: 'Cyber Recovery Legal Cell',
      feeRequested: '₹4,999',
      promisedRecoveryAmount: previousLoss,
      channel: 'Telegram / WhatsApp',
      rawText: inputText,
    });
    setAttached(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-safestep-midnight via-safestep-darker to-safestep-dark border border-safestep-moss/40 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-safestep-rose/20 text-safestep-rose border border-safestep-rose/40 shadow-glow-rose">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-safestep-beige">
                {t.recoveryShield.title}
              </h2>
              <p className="text-xs sm:text-sm text-safestep-moss font-semibold">
                {t.recoveryShield.tagline}
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-safestep-midnight text-safestep-beige border border-safestep-moss/30">
            Linked to Loss: {previousLoss}
          </span>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-safestep-beige/90 leading-relaxed max-w-2xl">
          {t.recoveryShield.description}
        </p>
      </div>

      {/* Input Form Card */}
      <div className="rounded-2xl border border-safestep-moss/30 bg-safestep-darker/90 p-6 space-y-4 shadow-card">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-bold text-safestep-beige">
            {t.recoveryShield.inputPrompt}
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-safestep-rose" />}
            onClick={handleLoadSample}
            className="text-xs text-safestep-rose"
          >
            {t.recoveryShield.tryDemoRecoveryMsg}
          </Button>
        </div>

        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setAnalyzed(false);
          }}
          placeholder={t.recoveryShield.inputPlaceholder}
          className="w-full bg-safestep-dark rounded-xl border border-safestep-midnight p-3.5 text-xs sm:text-sm text-safestep-beige placeholder:text-safestep-beige/35 focus:outline-none focus:border-safestep-moss transition-colors leading-relaxed"
        />

        <div className="flex justify-end">
          <Button
            variant="primary"
            disabled={!inputText.trim()}
            onClick={handleAnalyze}
            icon={<ShieldAlert className="w-4 h-4 text-safestep-darker" />}
          >
            {t.recoveryShield.analyzeButton}
          </Button>
        </div>
      </div>

      {/* Analysis Result Banner & Warning */}
      {analyzed && (
        <div className="rounded-3xl border-2 border-safestep-rose bg-safestep-darker p-6 sm:p-8 space-y-6 shadow-glow-rose animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-safestep-rose/20 text-safestep-rose shrink-0">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-wider font-extrabold text-safestep-rose uppercase mb-1">
                HIGH RISK EXTORTION PATTERN
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-safestep-beige">
                {t.recoveryShield.detectionAlertTitle}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-safestep-beige/90 leading-relaxed">
                {t.recoveryShield.detectionAlertDesc}
              </p>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl bg-safestep-midnight/40 border border-safestep-rose/30 p-3.5">
              <div className="text-[10px] font-mono text-safestep-rose font-bold uppercase mb-1">
                1. Prior Incident Connection
              </div>
              <p className="text-xs text-safestep-beige/90">
                Matches previous reported loss amount ({previousLoss}). Fraudsters buy victim contact lists from darknet databases.
              </p>
            </div>

            <div className="rounded-xl bg-safestep-midnight/40 border border-safestep-rose/30 p-3.5">
              <div className="text-[10px] font-mono text-safestep-rose font-bold uppercase mb-1">
                2. Upfront Fee Demand
              </div>
              <p className="text-xs text-safestep-beige/90">
                Demands ₹4,999 "legal filing / unlocking fee". Legitimate police or cyber authorities NEVER charge upfront fees to recover funds.
              </p>
            </div>

            <div className="rounded-xl bg-safestep-midnight/40 border border-safestep-rose/30 p-3.5">
              <div className="text-[10px] font-mono text-safestep-rose font-bold uppercase mb-1">
                3. False Guarantee
              </div>
              <p className="text-xs text-safestep-beige/90">
                Promises "Guaranteed 100% refund within 2 hours". Recovery of cyber funds is legally bound to court and inter-bank freezing orders.
              </p>
            </div>
          </div>

          {/* Two Cardinal Rules */}
          <div className="rounded-2xl bg-safestep-dark/80 border border-safestep-moss/30 p-4 space-y-2">
            <div className="text-xs font-mono font-bold text-safestep-moss uppercase tracking-wider">
              SAFESTEP Primary Defense Rules:
            </div>
            <div className="flex items-start gap-2 text-xs text-safestep-beige">
              <CheckCircle2 className="w-4 h-4 text-safestep-moss shrink-0 mt-0.5" />
              <span>{t.recoveryShield.rule1}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-safestep-beige">
              <CheckCircle2 className="w-4 h-4 text-safestep-moss shrink-0 mt-0.5" />
              <span>{t.recoveryShield.rule2}</span>
            </div>
          </div>

          {/* Attach to Incident Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-safestep-midnight">
            <p className="text-xs text-safestep-beige/70">
              Attach this secondary contact as evidence to your main incident report for filing with 1930 / cybercrime.gov.in.
            </p>

            <Button
              variant={attached ? 'secondary' : 'primary'}
              onClick={handleAttach}
              disabled={attached}
              icon={attached ? <CheckCircle2 className="w-4 h-4 text-safestep-moss" /> : <Link2 className="w-4 h-4" />}
            >
              {attached ? t.recoveryShield.attachedSuccess : t.recoveryShield.attachToTimeline}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
