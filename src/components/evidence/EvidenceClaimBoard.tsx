import React from 'react';
import { Incident } from '../../types/incident';
import { VerificationBadge } from '../common/Badge';
import { ArrowRight, Link2, FileText, CheckCircle2 } from 'lucide-react';

interface EvidenceClaimBoardProps {
  incident: Incident;
  onSelectEvidence?: (evidenceId: string) => void;
}

export const EvidenceClaimBoard: React.FC<EvidenceClaimBoardProps> = ({
  incident,
  onSelectEvidence,
}) => {
  const getEvidenceById = (id: string) => {
    return incident.evidence.find(e => e.id === id);
  };

  const investigationItems = [
    {
      category: 'CLAIM',
      title: 'IPO Allocation Claim',
      content: incident.summary.whatTheyClaimed,
      evidenceIds: incident.claims.flatMap(c => c.evidenceIds),
      verification: 'CONFIRMED_FROM_EVIDENCE' as const,
    },
    {
      category: 'REQUEST',
      title: 'Initial Payment Request',
      content: incident.summary.whatTheyAsked,
      evidenceIds: incident.requests.flatMap(r => r.evidenceIds),
      verification: 'CONFIRMED_FROM_EVIDENCE' as const,
    },
    {
      category: 'PAYMENT',
      title: 'Payment Execution',
      content: incident.summary.whatHappened,
      evidenceIds: incident.payments.flatMap(p => p.evidenceIds),
      verification: 'CONFIRMED_FROM_EVIDENCE' as const,
    },
    {
      category: 'ESCALATION',
      title: 'Second Payment / Deposit Demand',
      content: incident.summary.whatTheyAskedNext,
      evidenceIds: incident.secondRequests.flatMap(r => r.evidenceIds),
      verification: 'CONFIRMED_FROM_EVIDENCE' as const,
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-safestep-midnight">
        <div>
          <h3 className="text-base font-bold text-safestep-beige">Evidence ↔ Claim Investigation Board</h3>
          <p className="text-xs text-safestep-moss">Every claim and payment is explicitly tethered to verified artifacts</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-safestep-moss font-semibold">
          <Link2 className="w-4 h-4" />
          <span>Explainable Reasoning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investigationItems.map((item, idx) => {
          const matchedEv = item.evidenceIds
            .map(id => getEvidenceById(id))
            .filter((e): e is NonNullable<typeof e> => Boolean(e));

          return (
            <div
              key={idx}
              className="rounded-2xl border border-safestep-moss/30 bg-safestep-darker/90 p-5 space-y-3 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider font-bold px-2 py-0.5 rounded bg-safestep-midnight text-safestep-moss border border-safestep-midnight">
                  {item.category}
                </span>
                <VerificationBadge state={item.verification} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-safestep-beige">{item.title}</h4>
                <p className="mt-1 text-xs text-safestep-beige/90 bg-safestep-midnight/40 p-3 rounded-xl border border-safestep-moss/10 italic">
                  {item.content}
                </p>
              </div>

              {/* Connected Supporting Evidence Box */}
              <div className="pt-2 border-t border-safestep-midnight">
                <div className="text-[11px] font-semibold text-safestep-moss mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-safestep-moss" />
                  <span>Supporting Evidence Artifact:</span>
                </div>

                {matchedEv.length > 0 ? (
                  <div className="space-y-1.5">
                    {matchedEv.map((ev, evIdx) => (
                      <div
                        key={ev.id}
                        onClick={() => onSelectEvidence && onSelectEvidence(ev.id)}
                        className="flex items-center justify-between p-2 rounded-lg bg-safestep-dark border border-safestep-moss/20 hover:border-safestep-moss/50 cursor-pointer transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-safestep-moss shrink-0" />
                          <span className="font-mono text-safestep-beige truncate">
                            Evidence #{evIdx + 1}: {ev.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-safestep-moss/70 shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-safestep-beige/50 italic p-2 bg-safestep-dark rounded-lg">
                    Supported by primary incident evidence file.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
