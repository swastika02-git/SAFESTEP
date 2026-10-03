import React from 'react';
import { OFFICIAL_SOURCES } from '../../services/officialSources/officialData';
import { ExternalLink, ShieldCheck, PhoneCall, AlertOctagon, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OfficialSources: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Golden Hour Critical Callout */}
      <div className="rounded-2xl border-2 border-safestep-rose bg-safestep-darker/90 p-5 shadow-glow-rose">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-safestep-rose/20 text-safestep-rose shrink-0">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-safestep-rose uppercase tracking-wide">
              Critical Golden Hour Action
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-safestep-beige leading-relaxed">
              {t.officialHelp.goldenHourWarning}
            </p>
            <div className="mt-3">
              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-safestep-rose hover:bg-safestep-rose-light text-safestep-darker text-sm font-extrabold shadow-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.officialHelp.call1930Action}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Official Directory Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-safestep-midnight">
          <div>
            <h3 className="text-base font-bold text-safestep-beige">{t.officialHelp.title}</h3>
            <p className="text-xs text-safestep-moss">{t.officialHelp.subtitle}</p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-safestep-moss/20 text-safestep-moss border border-safestep-moss/40">
            {t.common.officialSource}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_SOURCES.map((source) => (
            <div
              key={source.id}
              className="rounded-2xl border border-safestep-moss/30 bg-safestep-darker/80 p-5 flex flex-col justify-between hover:border-safestep-moss/60 transition-all shadow-card"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-safestep-midnight text-safestep-moss border border-safestep-midnight font-bold">
                    {source.badge.replace('_', ' ')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-safestep-moss">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.common.officialSource}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-safestep-beige mb-1">
                  {source.name}
                </h4>
                <div className="text-xs text-safestep-moss/80 font-medium mb-2">
                  {source.organization}
                </div>

                <p className="text-xs text-safestep-beige/80 leading-relaxed mb-3">
                  {source.description}
                </p>

                {/* Steps */}
                <div className="bg-safestep-midnight/40 rounded-xl p-3 border border-safestep-moss/10 mb-3 space-y-1.5">
                  <div className="text-[10px] font-mono text-safestep-moss font-bold uppercase tracking-wider">
                    Procedure:
                  </div>
                  {source.stepsToFollow.map((step, idx) => (
                    <div key={idx} className="text-[11px] text-safestep-beige/85 flex items-start gap-1.5">
                      <span className="text-safestep-moss font-mono shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-safestep-midnight">
                {source.helpline && (
                  <a
                    href={`tel:${source.helpline.split('/')[0].trim()}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safestep-rose/20 text-safestep-rose hover:bg-safestep-rose/30 text-xs font-bold border border-safestep-rose/40"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {source.helpline}</span>
                  </a>
                )}

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safestep-midnight hover:bg-safestep-midnight-light text-safestep-beige text-xs font-bold border border-safestep-moss/30 ml-auto"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-safestep-moss" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notice against Private Recovery Scams */}
      <div className="rounded-2xl border border-safestep-rose/40 bg-safestep-darker p-5 text-xs text-safestep-beige/90 leading-relaxed">
        <div className="flex items-center gap-2 text-safestep-rose font-bold mb-1">
          <AlertOctagon className="w-4 h-4" />
          <span>IMPORTANT WARNING ABOUT PRIVATE RECOVERY AGENTS</span>
        </div>
        <p>{t.officialHelp.noPrivateRecoveryNotice}</p>
      </div>
    </div>
  );
};
