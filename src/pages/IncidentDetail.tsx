import React, { useState } from 'react';
import { useIncident } from '../context/IncidentContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldAlert, 
  Clock, 
  FileText, 
  Link2, 
  Share2, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Download, 
  ArrowLeft,
  Building2,
  CheckCircle2,
  PlusCircle,
  HelpCircle,
  AlertTriangle,
  ZoomIn
} from 'lucide-react';
import { IncidentTimeline } from '../components/timeline/IncidentTimeline';
import { IncidentGraph } from '../components/graph/IncidentGraph';
import { EvidenceClaimBoard } from '../components/evidence/EvidenceClaimBoard';
import { RiskSignalList } from '../components/risk/RiskSignalList';
import { ActionChecklist } from '../components/response/ActionChecklist';
import { OfficialSources } from '../components/response/OfficialSources';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { exportIncidentAsText } from '../services/storage/localStorage';
import { speechService } from '../services/speech/speechService';
import { EvidenceItem } from '../types/incident';

interface IncidentDetailProps {
  onBack: () => void;
  onNavigateToIntake: () => void;
  onNavigateToRecovery: () => void;
}

export const IncidentDetail: React.FC<IncidentDetailProps> = ({
  onBack,
  onNavigateToIntake,
  onNavigateToRecovery,
}) => {
  const { t } = useLanguage();
  const { currentIncident, deleteCurrentIncident, loadDemoIncident } = useIncident();

  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'graph' | 'claims' | 'signals' | 'response' | 'evidence'>('timeline');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [viewingEvidence, setViewingEvidence] = useState<EvidenceItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!currentIncident) {
    return (
      <div className="py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-safestep-moss/50 mx-auto" />
        <h3 className="text-lg font-bold text-safestep-beige">No Incident Selected</h3>
        <p className="text-xs text-safestep-beige/70">
          Load our pre-built demonstration incident or upload your own evidence.
        </p>
        <div className="flex justify-center gap-3">
          <Button
            variant="primary"
            onClick={() => loadDemoIncident()}
          >
            {t.common.tryDemo}
          </Button>
          <Button
            variant="secondary"
            onClick={onNavigateToIntake}
          >
            Start New Incident
          </Button>
        </div>
      </div>
    );
  }

  const handleAudioNarration = () => {
    if (isPlayingAudio) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      const summaryText = `${currentIncident.title}. What they claimed: ${currentIncident.summary.whatTheyClaimed}. What they asked: ${currentIncident.summary.whatTheyAsked}. What happened: ${currentIncident.summary.whatHappened}. What they asked next: ${currentIncident.summary.whatTheyAskedNext}. What remains uncertain: ${currentIncident.summary.whatRemainsUncertain}.`;
      setIsPlayingAudio(true);
      speechService.speak(summaryText, () => setIsPlayingAudio(false));
    }
  };

  const handleExport = () => {
    const text = exportIncidentAsText(currentIncident);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SAFESTEP_Incident_${currentIncident.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = () => {
    switch (currentIncident.status) {
      case 'ADDITIONAL_PAYMENT_REQUESTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-safestep-rose/30 text-safestep-rose border border-safestep-rose shadow-glow-rose">
            ADDITIONAL PAYMENT REQUESTED (EXTORTION RISK)
          </span>
        );
      case 'PAYMENT_MADE':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-safestep-rose/20 text-safestep-rose border border-safestep-rose/40">
            PAYMENT MADE (GOLDEN HOUR ACTIVE)
          </span>
        );
      case 'RECOVERY_CONTACT_DETECTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-safestep-rose text-safestep-darker border border-safestep-rose shadow-glow-rose">
            SECONDARY RECOVERY SCAM DETECTED
          </span>
        );
      case 'INFORMATION_EXPOSED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-safestep-midnight text-safestep-beige border border-safestep-moss/40">
            CREDENTIALS EXPOSED
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-safestep-moss/20 text-safestep-moss border border-safestep-moss/40">
            PREVENTION & VERIFICATION
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-safestep-midnight">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-safestep-beige/70 hover:text-safestep-beige"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back} to Home</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* TTS Audio Readout */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAudioNarration}
            icon={isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-safestep-rose" /> : <Volume2 className="w-3.5 h-3.5 text-safestep-moss" />}
          >
            {isPlayingAudio ? t.detail.stopReading : t.detail.listenToSummary}
          </Button>

          {/* Export Report */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            icon={<Download className="w-3.5 h-3.5 text-safestep-moss" />}
          >
            {t.detail.exportSummary}
          </Button>

          {/* Delete Incident */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-xl text-safestep-rose/60 hover:text-safestep-rose hover:bg-safestep-rose/10 transition-colors"
            title="Delete this incident"
            aria-label="Delete this incident"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Incident Header Info */}
      <div className="rounded-3xl bg-gradient-to-br from-safestep-midnight/50 via-safestep-darker to-safestep-dark border border-safestep-moss/30 p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {getStatusBadge()}
          <span className="text-xs font-mono text-safestep-beige/60">
            ID: {currentIncident.id} • {new Date(currentIncident.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-safestep-beige">
          {currentIncident.title}
        </h1>

        {/* 5 What Questions Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-safestep-darker/90 border border-safestep-moss/20">
            <div className="text-[10px] font-mono uppercase text-safestep-moss font-bold mb-1">
              {t.detail.whatTheyClaimed}
            </div>
            <p className="text-xs text-safestep-beige/90 line-clamp-3 italic">
              {currentIncident.summary.whatTheyClaimed}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-safestep-darker/90 border border-safestep-rose/30">
            <div className="text-[10px] font-mono uppercase text-safestep-rose font-bold mb-1">
              {t.detail.whatTheyAsked}
            </div>
            <p className="text-xs font-bold text-safestep-rose line-clamp-2">
              {currentIncident.summary.whatTheyAsked}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-safestep-darker/90 border border-safestep-moss/20">
            <div className="text-[10px] font-mono uppercase text-safestep-moss font-bold mb-1">
              {t.detail.whatHappened}
            </div>
            <p className="text-xs text-safestep-beige/90 line-clamp-3">
              {currentIncident.summary.whatHappened}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-safestep-darker/90 border border-safestep-rose/40">
            <div className="text-[10px] font-mono uppercase text-safestep-rose font-bold mb-1">
              {t.detail.whatTheyAskedNext}
            </div>
            <p className="text-xs font-bold text-safestep-beige line-clamp-3">
              {currentIncident.summary.whatTheyAskedNext}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-safestep-darker/90 border border-safestep-moss/20 sm:col-span-2 lg:col-span-1">
            <div className="text-[10px] font-mono uppercase text-safestep-moss font-bold mb-1">
              {t.detail.whatRemainsUncertain}
            </div>
            <p className="text-xs text-safestep-beige/70 line-clamp-3">
              {currentIncident.summary.whatRemainsUncertain}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-safestep-midnight text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2.5 rounded-t-xl transition-colors shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'timeline'
              ? 'bg-safestep-moss text-safestep-darker font-bold'
              : 'text-safestep-beige/70 hover:text-safestep-beige hover:bg-safestep-midnight/40'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t.detail.timelineTab}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('graph')}
          className={`px-4 py-2.5 rounded-t-xl transition-colors shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'graph'
              ? 'bg-safestep-moss text-safestep-darker font-bold'
              : 'text-safestep-beige/70 hover:text-safestep-beige hover:bg-safestep-midnight/40'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>{t.detail.graphTab}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('claims')}
          className={`px-4 py-2.5 rounded-t-xl transition-colors shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'claims'
              ? 'bg-safestep-moss text-safestep-darker font-bold'
              : 'text-safestep-beige/70 hover:text-safestep-beige hover:bg-safestep-midnight/40'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>{t.detail.claimsTab}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('signals')}
          className={`px-4 py-2.5 rounded-t-xl transition-colors shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'signals'
              ? 'bg-safestep-moss text-safestep-darker font-bold'
              : 'text-safestep-beige/70 hover:text-safestep-beige hover:bg-safestep-midnight/40'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t.detail.riskSignalsTab} ({currentIncident.riskSignals.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('response')}
          className={`px-4 py-2.5 rounded-t-xl transition-colors shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'response'
              ? 'bg-safestep-moss text-safestep-darker font-bold'
              : 'text-safestep-beige/70 hover:text-safestep-beige hover:bg-safestep-midnight/40'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{t.detail.responseTab}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('evidence')}
          className={`px-4 py-2.5 rounded-t-xl transition-colors shrink-0 flex items-center gap-1.5 ${
            activeSubTab === 'evidence'
              ? 'bg-safestep-moss text-safestep-darker font-bold'
              : 'text-safestep-beige/70 hover:text-safestep-beige hover:bg-safestep-midnight/40'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t.detail.evidenceTab} ({currentIncident.evidence.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeSubTab === 'timeline' && (
          <IncidentTimeline
            events={currentIncident.timelineEvents}
            evidenceList={currentIncident.evidence}
            onSelectEvidence={(id) => {
              const item = currentIncident.evidence.find(e => e.id === id);
              if (item) setViewingEvidence(item);
            }}
          />
        )}

        {activeSubTab === 'graph' && (
          <IncidentGraph
            events={currentIncident.timelineEvents}
            evidenceList={currentIncident.evidence}
          />
        )}

        {activeSubTab === 'claims' && (
          <EvidenceClaimBoard
            incident={currentIncident}
            onSelectEvidence={(id) => {
              const item = currentIncident.evidence.find(e => e.id === id);
              if (item) setViewingEvidence(item);
            }}
          />
        )}

        {activeSubTab === 'signals' && (
          <RiskSignalList signals={currentIncident.riskSignals} />
        )}

        {activeSubTab === 'response' && (
          <div className="space-y-8">
            <ActionChecklist actions={currentIncident.responseActions} />
            <OfficialSources />
          </div>
        )}

        {activeSubTab === 'evidence' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-safestep-midnight">
              <h3 className="text-base font-bold text-safestep-beige">Attached Evidence Items</h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={onNavigateToIntake}
                icon={<PlusCircle className="w-3.5 h-3.5" />}
              >
                Add More Evidence
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentIncident.evidence.map((ev, idx) => (
                <EvidenceCard
                  key={ev.id}
                  evidence={ev}
                  index={idx}
                  onView={(item) => setViewingEvidence(item)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Recovery Shield Promo Banner */}
      <div className="rounded-3xl border border-safestep-rose/50 bg-gradient-to-r from-safestep-darker via-safestep-midnight/40 to-safestep-dark p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-safestep-rose/20 text-safestep-rose shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h4 className="text-sm sm:text-base font-bold text-safestep-beige">
              Did someone contact you offering to recover your lost funds?
            </h4>
            <p className="text-xs text-safestep-beige/70">
              Run their message through the Recovery Shield before making another payment.
            </p>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={onNavigateToRecovery}
          className="shrink-0"
        >
          Check Recovery Message
        </Button>
      </div>

      {/* Evidence Viewer Modal */}
      {viewingEvidence && (
        <Modal
          isOpen={Boolean(viewingEvidence)}
          onClose={() => setViewingEvidence(null)}
          title={`Evidence Inspection: ${viewingEvidence.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-left">
            {viewingEvidence.fileData && viewingEvidence.type === 'IMAGE' && (
              <div className="w-full max-h-96 rounded-2xl overflow-hidden bg-safestep-midnight/50 border border-safestep-moss/30 flex items-center justify-center p-2">
                <img
                  src={viewingEvidence.fileData}
                  alt={viewingEvidence.name}
                  className="max-h-88 object-contain rounded-xl"
                />
              </div>
            )}

            <div className="rounded-xl bg-safestep-midnight/40 p-4 border border-safestep-moss/20">
              <div className="text-xs font-mono font-bold text-safestep-moss uppercase mb-1">
                Extracted Text & Metadata:
              </div>
              <p className="text-sm text-safestep-beige leading-relaxed">
                {viewingEvidence.extractedText}
              </p>
            </div>

            <div className="text-xs text-safestep-beige/60 font-mono">
              Type: {viewingEvidence.type} • Indexed on {new Date(viewingEvidence.createdAt).toLocaleString()}
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Delete Incident"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-center py-2">
            <AlertTriangle className="w-10 h-10 text-safestep-rose mx-auto" />
            <h4 className="text-base font-bold text-safestep-beige">
              {t.detail.deleteIncidentPrompt}
            </h4>
            <p className="text-xs text-safestep-beige/70">
              All extracted timelines, risk signals, and locally staged evidence files will be permanently erased from your browser.
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                {t.common.cancel}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  deleteCurrentIncident();
                  setShowDeleteConfirm(false);
                  onBack();
                }}
                className="flex-1"
              >
                {t.common.delete}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
