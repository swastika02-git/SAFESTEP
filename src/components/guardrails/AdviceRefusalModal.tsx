import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ShieldCheck, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdviceRefusalModalProps {
  isOpen: boolean;
  onClose: () => void;
  queryAsked?: string;
}

export const AdviceRefusalModal: React.FC<AdviceRefusalModalProps> = ({
  isOpen,
  onClose,
  queryAsked = 'Should I buy this stock?',
}) => {
  const { t } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.guardrails.refusalNotice}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center space-y-4 py-3">
        <div className="p-3.5 rounded-2xl bg-safestep-midnight text-safestep-moss border border-safestep-moss/40 shadow-glow-moss">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h4 className="text-base font-bold text-safestep-beige">
            Non-Investment Advisory Policy
          </h4>
          <p className="text-xs text-safestep-beige/70 italic bg-safestep-midnight/40 p-2.5 rounded-xl border border-safestep-moss/10">
            "{queryAsked}"
          </p>
        </div>

        <p className="text-xs sm:text-sm text-safestep-beige/90 leading-relaxed text-left bg-safestep-darker p-3.5 rounded-xl border border-safestep-moss/20">
          SAFESTEP strictly does not provide stock recommendations, buy/sell/hold advice, price predictions, or promote financial products.
          <br /><br />
          Our mission is strictly <strong>incident safety, evidence reconstruction, and official regulatory reporting</strong> for Indian retail investors.
        </p>

        <Button
          variant="primary"
          onClick={onClose}
          className="w-full"
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          {t.guardrails.returnToSafety}
        </Button>
      </div>
    </Modal>
  );
};
