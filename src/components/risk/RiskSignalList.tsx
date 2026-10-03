import React from 'react';
import { RiskSignal } from '../../types/incident';
import { AlertTriangle, Clock, TrendingUp, ShieldAlert, BadgePercent, HelpCircle } from 'lucide-react';

interface RiskSignalListProps {
  signals: RiskSignal[];
}

export const RiskSignalList: React.FC<RiskSignalListProps> = ({ signals }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'URGENCY': return Clock;
      case 'ESCALATING_PAYMENT': return TrendingUp;
      case 'AUTHORITY_CLAIM': return ShieldAlert;
      case 'GUARANTEED_PROMISE': return BadgePercent;
      case 'UNVERIFIED_IDENTITY': return HelpCircle;
      default: return AlertTriangle;
    }
  };

  if (!signals || signals.length === 0) {
    return (
      <div className="p-6 text-center rounded-2xl bg-safestep-darker/60 border border-safestep-moss/20 text-xs text-safestep-beige/70">
        No critical risk signals flagged in the provided evidence.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-safestep-midnight">
        <div>
          <h3 className="text-base font-bold text-safestep-beige">Identified Risk Signals</h3>
          <p className="text-xs text-safestep-moss">Transparent rule-based warnings with explicit explanations</p>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-safestep-rose/20 text-safestep-rose border border-safestep-rose/30">
          {signals.length} Signals Detected
        </span>
      </div>

      <div className="space-y-3">
        {signals.map((signal) => {
          const Icon = getIcon(signal.category);
          const isCritical = signal.severity === 'CRITICAL';

          return (
            <div
              key={signal.id}
              className={`rounded-2xl border p-5 transition-all ${
                isCritical
                  ? 'bg-safestep-darker border-safestep-rose/60 shadow-glow-rose'
                  : 'bg-safestep-darker border-safestep-moss/40'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  isCritical ? 'bg-safestep-rose/20 text-safestep-rose' : 'bg-safestep-moss/20 text-safestep-moss'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono tracking-wider font-bold px-2 py-0.5 rounded uppercase bg-safestep-midnight text-safestep-beige border border-safestep-midnight">
                      {signal.category.replace('_', ' ')}
                    </span>
                    <span className={`text-[11px] font-bold ${
                      isCritical ? 'text-safestep-rose' : 'text-safestep-moss'
                    }`}>
                      {signal.severity} SEVERITY
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-safestep-beige">
                    {signal.title}
                  </h4>

                  {/* WHY IT MATTERS section */}
                  <div className="rounded-xl bg-safestep-midnight/40 p-3 border border-safestep-moss/20">
                    <div className="text-[11px] font-mono text-safestep-moss uppercase font-bold tracking-wider mb-1">
                      Why it matters:
                    </div>
                    <p className="text-xs sm:text-sm text-safestep-beige/90 leading-relaxed">
                      {signal.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
