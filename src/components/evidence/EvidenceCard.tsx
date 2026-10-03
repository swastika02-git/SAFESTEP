import React from 'react';
import { EvidenceItem } from '../../types/incident';
import { Image, FileText, Mic, Trash2, CheckCircle2 } from 'lucide-react';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  index: number;
  onRemove?: (id: string) => void;
  onView?: (evidence: EvidenceItem) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  index,
  onRemove,
  onView,
}) => {
  const getTypeIcon = () => {
    switch (evidence.type) {
      case 'IMAGE': return Image;
      case 'DOCUMENT': return FileText;
      case 'VOICE': return Mic;
      case 'TEXT':
      default: return FileText;
    }
  };

  const Icon = getTypeIcon();

  return (
    <div className="relative rounded-2xl border border-safestep-moss/30 bg-safestep-darker/90 p-4 transition-all hover:border-safestep-moss/60 hover:shadow-card flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-safestep-midnight text-safestep-moss">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-safestep-moss font-bold uppercase tracking-wider">
                EVIDENCE #{index + 1} • {evidence.type}
              </div>
              <h5 className="text-xs font-bold text-safestep-beige line-clamp-1" title={evidence.name}>
                {evidence.name}
              </h5>
            </div>
          </div>

          {onRemove && (
            <button
              onClick={() => onRemove(evidence.id)}
              className="p-1 rounded-lg text-safestep-rose/60 hover:text-safestep-rose hover:bg-safestep-rose/10 transition-colors"
              title="Remove evidence"
              aria-label="Remove evidence"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Thumbnail Preview for Images */}
        {evidence.fileData && evidence.type === 'IMAGE' && (
          <div 
            onClick={() => onView && onView(evidence)}
            className="w-full h-32 rounded-xl overflow-hidden bg-safestep-midnight/40 mb-3 border border-safestep-midnight cursor-pointer group relative"
          >
            <img 
              src={evidence.fileData} 
              alt={evidence.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-safestep-darker/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-safestep-beige">
              Click to Zoom
            </div>
          </div>
        )}

        {/* Extracted Text Snippet */}
        <div className="rounded-xl bg-safestep-midnight/30 p-2.5 border border-safestep-moss/10 text-xs">
          <div className="text-[10px] font-mono text-safestep-beige/50 uppercase font-semibold mb-0.5">
            Extracted Content:
          </div>
          <p className="text-safestep-beige/90 line-clamp-3 leading-relaxed text-[11px]">
            {evidence.extractedText}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-safestep-midnight flex items-center justify-between text-[10px] text-safestep-beige/60">
        <span className="flex items-center gap-1 text-safestep-moss font-semibold">
          <CheckCircle2 className="w-3 h-3" />
          Processed & Indexed
        </span>
        <span className="font-mono">
          {new Date(evidence.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
