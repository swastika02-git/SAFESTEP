import React from 'react';
import { VerificationState, EventType } from '../../types/incident';
import { CheckCircle2, AlertTriangle, HelpCircle, User } from 'lucide-react';

export const VerificationBadge: React.FC<{ state: VerificationState }> = ({ state }) => {
  switch (state) {
    case 'CONFIRMED_FROM_EVIDENCE':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-safestep-moss/20 text-safestep-moss border border-safestep-moss/40">
          <CheckCircle2 className="w-3 h-3" />
          Confirmed from Evidence
        </span>
      );
    case 'USER_REPORTED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-safestep-midnight/40 text-safestep-beige border border-safestep-midnight">
          <User className="w-3 h-3 text-safestep-moss" />
          User Reported
        </span>
      );
    case 'INFERRED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-safestep-beige/10 text-safestep-beige/90 border border-safestep-beige/20">
          <HelpCircle className="w-3 h-3 text-safestep-rose" />
          Inferred
        </span>
      );
    case 'UNVERIFIED':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-safestep-rose/20 text-safestep-rose border border-safestep-rose/40">
          <AlertTriangle className="w-3 h-3" />
          Unverified Detail
        </span>
      );
  }
};

export const EventTypeBadge: React.FC<{ type: EventType }> = ({ type }) => {
  const styles: Record<EventType, { label: string; bg: string; text: string; border: string }> = {
    CONTACT: { label: 'CONTACT', bg: 'bg-safestep-midnight/50', text: 'text-safestep-beige', border: 'border-safestep-midnight' },
    CLAIM: { label: 'CLAIM', bg: 'bg-safestep-moss/20', text: 'text-safestep-moss', border: 'border-safestep-moss/30' },
    REQUEST: { label: 'REQUEST', bg: 'bg-safestep-rose/20', text: 'text-safestep-rose', border: 'border-safestep-rose/40' },
    ACTION: { label: 'USER ACTION', bg: 'bg-safestep-midnight/60', text: 'text-safestep-beige', border: 'border-safestep-moss/30' },
    PAYMENT: { label: 'PAYMENT MADE', bg: 'bg-safestep-rose/30', text: 'text-safestep-rose-light', border: 'border-safestep-rose' },
    ESCALATION: { label: 'ESCALATION', bg: 'bg-safestep-rose/40', text: 'text-safestep-beige', border: 'border-safestep-rose' },
    RECOVERY_CONTACT: { label: 'RECOVERY ATTEMPT', bg: 'bg-safestep-rose/50', text: 'text-safestep-beige font-bold', border: 'border-safestep-rose' },
  };

  const style = styles[type] || styles.CONTACT;

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider uppercase border ${style.bg} ${style.text} ${style.border}`}>
      {style.label}
    </span>
  );
};
