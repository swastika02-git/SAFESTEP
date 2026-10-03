import React, { useState } from 'react';
import { ResponseAction } from '../../types/incident';
import { PhoneCall, ExternalLink, ShieldCheck, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../common/Button';

interface ActionChecklistProps {
  actions: ResponseAction[];
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({ actions }) => {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  const toggleComplete = (id: string) => {
    setCompletedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-safestep-midnight">
        <div>
          <h3 className="text-base font-bold text-safestep-beige">Immediate Recommended Actions</h3>
          <p className="text-xs text-safestep-moss">Sequential response steps based on your current exposure status</p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-safestep-moss/20 text-safestep-moss font-bold border border-safestep-moss/30">
          Deterministic Safety Engine
        </span>
      </div>

      <div className="space-y-3">
        {actions.map((act) => {
          const isDone = Boolean(completedMap[act.id]);

          return (
            <div
              key={act.id}
              className={`rounded-2xl border p-5 transition-all ${
                act.isUrgent
                  ? 'bg-safestep-darker border-safestep-rose/60 shadow-glow-rose'
                  : 'bg-safestep-darker border-safestep-moss/30'
              } ${isDone ? 'opacity-70 border-safestep-moss/20' : ''}`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => toggleComplete(act.id)}
                  className="mt-1 text-safestep-moss hover:scale-110 transition-transform"
                  aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-safestep-moss" />
                  ) : (
                    <Circle className="w-6 h-6 text-safestep-beige/40 hover:text-safestep-moss" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-safestep-midnight text-safestep-moss">
                      STEP {act.stepNumber}
                    </span>
                    {act.isUrgent && (
                      <span className="text-[11px] font-bold text-safestep-rose uppercase tracking-wider">
                        CRITICAL ACTION
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm sm:text-base font-bold ${isDone ? 'line-through text-safestep-beige/60' : 'text-safestep-beige'}`}>
                    {act.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-safestep-beige/85 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Direct Action Triggers (Call 1930 / Open Cybercrime) */}
                  {(act.actionPhone || act.actionUrl) && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {act.actionPhone && (
                        <a
                          href={`tel:${act.actionPhone}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-safestep-rose hover:bg-safestep-rose-light text-safestep-darker text-xs font-extrabold shadow-sm transition-all"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Call {act.actionPhone} Immediately</span>
                        </a>
                      )}

                      {act.actionUrl && (
                        <a
                          href={act.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-safestep-midnight hover:bg-safestep-midnight-light border border-safestep-moss/40 text-safestep-beige text-xs font-bold transition-all"
                        >
                          <span>Open cybercrime.gov.in</span>
                          <ExternalLink className="w-3.5 h-3.5 text-safestep-moss" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
