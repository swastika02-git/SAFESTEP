import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineEvent, EvidenceItem } from '../../types/incident';
import { VerificationBadge, EventTypeBadge } from '../common/Badge';
import { 
  ArrowRight, 
  MessageSquare, 
  AlertCircle, 
  CreditCard, 
  Send, 
  TrendingUp, 
  ShieldAlert, 
  X,
  FileText
} from 'lucide-react';

interface IncidentGraphProps {
  events: TimelineEvent[];
  evidenceList: EvidenceItem[];
}

export const IncidentGraph: React.FC<IncidentGraphProps> = ({ events, evidenceList }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(
    events.length > 0 ? events[0].id : null
  );

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];
  const supportingEvidence = selectedEvent 
    ? evidenceList.filter(e => selectedEvent.evidenceIds.includes(e.id))
    : [];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'CONTACT': return MessageSquare;
      case 'CLAIM': return AlertCircle;
      case 'REQUEST': return CreditCard;
      case 'ACTION': return Send;
      case 'PAYMENT': return CreditCard;
      case 'ESCALATION': return TrendingUp;
      case 'RECOVERY_CONTACT': return ShieldAlert;
      default: return AlertCircle;
    }
  };

  return (
    <div className="w-full bg-safestep-darker/90 border border-safestep-moss/30 rounded-2xl p-6 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-safestep-midnight">
        <div>
          <h3 className="text-base font-bold text-safestep-beige">Incident Workflow Graph</h3>
          <p className="text-xs text-safestep-moss">Click any node to inspect evidence linkage and verification status</p>
        </div>
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-safestep-midnight text-safestep-moss font-mono">
          Interactive Reconstruction
        </span>
      </div>

      {/* Horizontal Flow Nodes */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="flex items-center min-w-max gap-3 px-2">
          {events.map((evt, index) => {
            const Icon = getNodeIcon(evt.type);
            const isSelected = selectedEventId === evt.id;
            const isEscalation = evt.type === 'ESCALATION' || evt.type === 'RECOVERY_CONTACT';

            return (
              <React.Fragment key={evt.id}>
                {/* Node Box */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer transition-all w-36 select-none ${
                    isSelected
                      ? 'bg-safestep-midnight border-safestep-moss shadow-glow-moss scale-105'
                      : isEscalation
                      ? 'bg-safestep-darker border-safestep-rose/60 hover:border-safestep-rose'
                      : 'bg-safestep-darker border-safestep-moss/30 hover:border-safestep-moss/70'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className={`p-2 rounded-xl mb-2 ${
                    isEscalation 
                      ? 'bg-safestep-rose/20 text-safestep-rose' 
                      : 'bg-safestep-moss/20 text-safestep-moss'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Node Type Label */}
                  <span className="text-[10px] font-mono tracking-wider text-safestep-beige/70 uppercase">
                    {evt.type}
                  </span>

                  {/* Short Title */}
                  <span className="text-xs font-bold text-safestep-beige text-center line-clamp-1 mt-0.5">
                    {evt.title}
                  </span>

                  {/* Timestamp Badge */}
                  <span className="text-[10px] font-mono font-semibold text-safestep-moss mt-1.5 px-2 py-0.5 rounded bg-safestep-dark">
                    {evt.timestamp}
                  </span>

                  {evt.amount && (
                    <span className="mt-1 text-[11px] font-bold text-safestep-rose">
                      {evt.amount}
                    </span>
                  )}
                </motion.div>

                {/* Animated Arrow Connector */}
                {index < events.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.05 }}
                    className="flex items-center text-safestep-moss/60 shrink-0"
                  >
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Detail Inspector Panel */}
      {selectedEvent && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl bg-safestep-midnight/40 border border-safestep-moss/40 p-5 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-safestep-midnight pb-3">
              <div className="flex items-center gap-3">
                <EventTypeBadge type={selectedEvent.type} />
                <VerificationBadge state={selectedEvent.verificationState} />
              </div>
              <div className="text-xs font-mono text-safestep-moss font-bold">
                Timestamp: {selectedEvent.timestamp}
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-safestep-beige">
                {selectedEvent.title}
              </h4>
              <p className="mt-1 text-sm text-safestep-beige/90 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Linked Supporting Evidence */}
            {supportingEvidence.length > 0 && (
              <div className="pt-2 border-t border-safestep-midnight">
                <div className="text-xs font-semibold text-safestep-moss mb-2">
                  Linked Evidence Artifacts ({supportingEvidence.length}):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {supportingEvidence.map((ev, i) => (
                    <div 
                      key={ev.id}
                      className="p-3 rounded-xl bg-safestep-darker/90 border border-safestep-moss/20 text-xs space-y-1"
                    >
                      <div className="flex items-center gap-2 font-bold text-safestep-beige">
                        <FileText className="w-3.5 h-3.5 text-safestep-moss" />
                        <span>Evidence #{i + 1}: {ev.name}</span>
                      </div>
                      <p className="text-[11px] text-safestep-beige/70 line-clamp-2 italic">
                        "{ev.extractedText}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
