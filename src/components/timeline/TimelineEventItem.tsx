import React, { useState } from 'react';
import { TimelineEvent, EvidenceItem } from '../../types/incident';
import { EventTypeBadge, VerificationBadge } from '../common/Badge';
import { ChevronDown, ChevronUp, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface TimelineEventItemProps {
  event: TimelineEvent;
  isLast: boolean;
  evidenceList: EvidenceItem[];
  onSelectEvidence?: (evidenceId: string) => void;
}

export const TimelineEventItem: React.FC<TimelineEventItemProps> = ({
  event,
  isLast,
  evidenceList,
  onSelectEvidence,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const supportingEvidence = evidenceList.filter(e => event.evidenceIds.includes(e.id));

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Time & Vertical Connector */}
      <div className="flex flex-col items-center shrink-0 w-18 pt-0.5">
        <span className="text-xs font-mono font-bold text-safestep-moss tracking-tight">
          {event.timestamp}
        </span>
        {!isLast && (
          <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-safestep-moss via-safestep-midnight to-safestep-moss/20 my-1 group-hover:from-safestep-moss-light" />
        )}
      </div>

      {/* Node Dot */}
      <div className="relative mt-1 shrink-0">
        <div className={`w-3.5 h-3.5 rounded-full border-2 border-safestep-darker transition-all ${
          event.type === 'ESCALATION' || event.type === 'RECOVERY_CONTACT'
            ? 'bg-safestep-rose ring-4 ring-safestep-rose/20'
            : event.type === 'PAYMENT'
            ? 'bg-safestep-rose ring-2 ring-safestep-rose/40'
            : 'bg-safestep-moss ring-2 ring-safestep-moss/30'
        }`} />
      </div>

      {/* Event Content Card */}
      <div className="flex-1 pb-6">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-2xl border border-safestep-moss/25 bg-safestep-darker/90 hover:border-safestep-moss/50 p-4 transition-all cursor-pointer shadow-sm"
        >
          {/* Card Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <EventTypeBadge type={event.type} />
              <VerificationBadge state={event.verificationState} />
            </div>

            <div className="flex items-center gap-2 text-safestep-beige/60">
              {event.amount && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-safestep-rose/20 text-safestep-rose border border-safestep-rose/30">
                  {event.amount}
                </span>
              )}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          {/* Event Title */}
          <h4 className="mt-2 text-sm sm:text-base font-bold text-safestep-beige">
            {event.title}
          </h4>

          {/* Expanded Description & Evidence Links */}
          {isExpanded && (
            <div className="mt-2 pt-2 border-t border-safestep-midnight/60 space-y-3">
              <p className="text-xs sm:text-sm text-safestep-beige/85 leading-relaxed">
                {event.description}
              </p>

              {/* Supporting Evidence Connection */}
              {supportingEvidence.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-safestep-moss flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Supported by:
                  </span>
                  {supportingEvidence.map((ev, idx) => (
                    <button
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectEvidence) onSelectEvidence(ev.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-safestep-midnight hover:bg-safestep-midnight-light border border-safestep-moss/30 text-safestep-beige text-xs font-mono transition-colors"
                      title={ev.extractedText}
                    >
                      <FileText className="w-3 h-3 text-safestep-moss" />
                      <span>Evidence #{idx + 1} ({ev.name.slice(0, 16)})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
