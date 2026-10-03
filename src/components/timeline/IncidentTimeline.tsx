import React from 'react';
import { TimelineEvent, EvidenceItem } from '../../types/incident';
import { TimelineEventItem } from './TimelineEventItem';
import { Clock, ShieldAlert } from 'lucide-react';

interface IncidentTimelineProps {
  events: TimelineEvent[];
  evidenceList: EvidenceItem[];
  onSelectEvidence?: (evidenceId: string) => void;
}

export const IncidentTimeline: React.FC<IncidentTimelineProps> = ({
  events,
  evidenceList,
  onSelectEvidence,
}) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-safestep-moss/30 bg-safestep-darker/50">
        <Clock className="w-8 h-8 text-safestep-moss/50 mx-auto mb-2" />
        <p className="text-sm text-safestep-beige/70">No timeline events reconstructed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between pb-4 border-b border-safestep-midnight mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-safestep-moss" />
          <h3 className="text-base font-bold text-safestep-beige">Reconstructed Chronological Timeline</h3>
        </div>
        <span className="text-xs font-mono text-safestep-moss bg-safestep-moss/10 px-2.5 py-1 rounded-full border border-safestep-moss/30">
          {events.length} Events Detected
        </span>
      </div>

      <div className="relative pl-1">
        {events.map((event, index) => (
          <TimelineEventItem
            key={event.id}
            event={event}
            isLast={index === events.length - 1}
            evidenceList={evidenceList}
            onSelectEvidence={onSelectEvidence}
          />
        ))}
      </div>
    </div>
  );
};
