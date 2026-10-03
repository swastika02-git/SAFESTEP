import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  ArrowRight, 
  Mic, 
  FileSearch, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Building2, 
  HelpCircle, 
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useLanguage } from '../context/LanguageContext';
import { useIncident } from '../context/IncidentContext';
import { AdviceRefusalModal } from '../components/guardrails/AdviceRefusalModal';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { loadDemoIncident, createNewIncident } = useIncident();
  const [guardrailModalOpen, setGuardrailModalOpen] = useState(false);

  const situationStates = [
    {
      id: 'state-nothing',
      title: t.home.stateNothingSent,
      desc: t.home.stateNothingSentDesc,
      icon: ShieldCheck,
      color: 'border-safestep-moss/50 hover:border-safestep-moss',
      badgeBg: 'bg-safestep-moss/20 text-safestep-moss',
      actionTab: 'intake',
    },
    {
      id: 'state-info',
      title: t.home.stateInfoShared,
      desc: t.home.stateInfoSharedDesc,
      icon: Lock,
      color: 'border-safestep-midnight/60 hover:border-safestep-midnight',
      badgeBg: 'bg-safestep-midnight text-safestep-beige',
      actionTab: 'intake',
    },
    {
      id: 'state-money',
      title: t.home.stateMoneySent,
      desc: t.home.stateMoneySentDesc,
      icon: AlertTriangle,
      color: 'border-safestep-rose/60 hover:border-safestep-rose shadow-glow-rose',
      badgeBg: 'bg-safestep-rose/20 text-safestep-rose',
      actionTab: 'official',
    },
    {
      id: 'state-more',
      title: t.home.stateMoneySentMoreAsked,
      desc: t.home.stateMoneySentMoreAskedDesc,
      icon: TrendingDown,
      color: 'border-safestep-rose hover:border-safestep-rose-light shadow-glow-rose',
      badgeBg: 'bg-safestep-rose/30 text-safestep-rose-light font-bold',
      actionTab: 'recovery',
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-safestep-darker via-safestep-midnight/30 to-safestep-dark border border-safestep-moss/30 p-6 sm:p-10 lg:p-12 shadow-card">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="homeGrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#839958" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#homeGrid)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-safestep-moss/20 border border-safestep-moss/30 text-safestep-moss text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Bharat Investor Financial Safety System</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-safestep-beige leading-tight">
                {t.home.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-safestep-beige/85 max-w-xl leading-relaxed">
                {t.home.heroSubtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  createNewIncident();
                  onNavigate('intake');
                }}
                icon={<ArrowRight className="w-5 h-5 text-safestep-darker" />}
                className="shadow-glow-moss"
              >
                {t.home.startCta}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  loadDemoIncident();
                  onNavigate('detail');
                }}
                icon={<Sparkles className="w-4 h-4 text-safestep-rose" />}
              >
                {t.common.tryDemo}
              </Button>
            </div>

            {/* Secondary Quick Action Links */}
            <div className="pt-4 border-t border-safestep-midnight/70 flex flex-wrap items-center gap-3 text-xs text-safestep-beige/80">
              <button
                onClick={() => {
                  createNewIncident();
                  onNavigate('intake');
                }}
                className="flex items-center gap-1.5 hover:text-safestep-moss transition-colors"
              >
                <FileSearch className="w-4 h-4 text-safestep-moss" />
                <span>{t.home.analyzeMsgCta}</span>
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  createNewIncident();
                  onNavigate('intake');
                }}
                className="flex items-center gap-1.5 hover:text-safestep-moss transition-colors"
              >
                <Mic className="w-4 h-4 text-safestep-moss" />
                <span>{t.home.tellUsVoiceCta}</span>
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('recovery')}
                className="flex items-center gap-1.5 hover:text-safestep-moss transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-safestep-rose" />
                <span>{t.home.recoveryShieldCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Animated Incident Reconstruction Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-safestep-darker/95 border border-safestep-moss/40 p-5 shadow-elevated space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-safestep-midnight text-xs">
                <span className="font-mono text-safestep-moss font-bold uppercase tracking-wider">
                  Live Flow Visualization
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-safestep-moss/20 text-safestep-moss font-bold">
                  Evidence → Action
                </span>
              </div>

              {/* Stepping Reconstruction Stack */}
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-safestep-midnight/40 border border-safestep-moss/20 flex items-center justify-between">
                  <span className="text-safestep-beige/70">1. UNNOTICED CONTACT</span>
                  <span className="text-safestep-moss font-bold">WhatsApp / SMS</span>
                </div>
                <div className="text-center text-safestep-moss/50 text-xs">↓</div>
                
                <div className="p-3 rounded-xl bg-safestep-midnight/50 border border-safestep-moss/30 flex items-center justify-between">
                  <span className="text-safestep-beige/70">2. ALLEGED CLAIM</span>
                  <span className="text-safestep-moss font-bold">"IPO Allotment"</span>
                </div>
                <div className="text-center text-safestep-moss/50 text-xs">↓</div>

                <div className="p-3 rounded-xl bg-safestep-midnight/60 border border-safestep-rose/40 flex items-center justify-between">
                  <span className="text-safestep-beige/70">3. PAYMENT DEMAND</span>
                  <span className="text-safestep-rose font-bold">₹38,500 (20 min)</span>
                </div>
                <div className="text-center text-safestep-moss/50 text-xs">↓</div>

                <div className="p-3 rounded-xl bg-safestep-darker border border-safestep-rose shadow-glow-rose flex items-center justify-between">
                  <span className="text-safestep-beige/70">4. ESCALATION HOLD</span>
                  <span className="text-safestep-rose font-bold">+₹12,000 Deposit</span>
                </div>
                <div className="text-center text-safestep-moss/50 text-xs">↓</div>

                <div className="p-3 rounded-xl bg-safestep-moss/20 border border-safestep-moss flex items-center justify-between text-safestep-beige font-bold">
                  <span>5. OFFICIAL RESPONSE</span>
                  <span className="text-safestep-moss">Call 1930 Helpline</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    loadDemoIncident();
                    onNavigate('detail');
                  }}
                  className="text-xs text-safestep-moss font-bold hover:underline"
                >
                  Inspect Full Incident Reconstruction →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE ARE YOU RIGHT NOW? SECTION */}
      <section className="space-y-4">
        <div className="text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-safestep-beige">
            {t.home.whereAreYouNowTitle}
          </h2>
          <p className="text-xs sm:text-sm text-safestep-beige/70">
            {t.home.whereAreYouNowSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {situationStates.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => {
                  if (st.id === 'state-nothing' || st.id === 'state-info') {
                    createNewIncident();
                    onNavigate('intake');
                  } else if (st.id === 'state-money') {
                    onNavigate('official');
                  } else {
                    onNavigate('recovery');
                  }
                }}
                className={`rounded-2xl border bg-safestep-darker/90 p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-card ${st.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-safestep-midnight text-safestep-moss">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${st.badgeBg}`}>
                      SELECT
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-safestep-beige">
                    {st.title}
                  </h3>

                  <p className="text-xs text-safestep-beige/75 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-safestep-midnight flex items-center justify-between text-xs font-semibold text-safestep-moss">
                  <span>View Safe Guidance</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE DIFFERENTIATING PRINCIPLES */}
      <section className="rounded-3xl bg-safestep-midnight/30 border border-safestep-moss/20 p-6 sm:p-8 space-y-6">
        <div className="text-left">
          <h3 className="text-lg sm:text-xl font-extrabold text-safestep-beige">
            {t.home.corePrinciplesTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <div className="text-safestep-moss font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.home.principle1Title}</span>
            </div>
            <p className="text-xs text-safestep-beige/80 leading-relaxed">
              {t.home.principle1Desc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-safestep-moss font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.home.principle2Title}</span>
            </div>
            <p className="text-xs text-safestep-beige/80 leading-relaxed">
              {t.home.principle2Desc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-safestep-rose font-bold text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-safestep-rose" />
              <span>{t.home.principle3Title}</span>
            </div>
            <p className="text-xs text-safestep-beige/80 leading-relaxed">
              {t.home.principle3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* INVESTMENT ADVICE GUARDRAIL DEMO SECTION */}
      <section className="rounded-2xl border border-safestep-moss/30 bg-safestep-darker/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-safestep-midnight text-safestep-moss shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="text-left">
            <div className="text-xs font-mono font-bold text-safestep-moss uppercase">
              Safety Guardrail Demonstration
            </div>
            <h4 className="text-sm font-bold text-safestep-beige">
              {t.home.guardrailDemoQuery}
            </h4>
            <p className="text-xs text-safestep-beige/70 mt-0.5">
              Click to observe how SAFESTEP firmly refuses stock tips or buy/sell advice.
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setGuardrailModalOpen(true)}
          className="shrink-0"
        >
          Test Safety Refusal
        </Button>
      </section>

      {/* Guardrail Modal */}
      <AdviceRefusalModal
        isOpen={guardrailModalOpen}
        onClose={() => setGuardrailModalOpen(false)}
        queryAsked="Should I buy Premier Tech stock?"
      />
    </div>
  );
};
