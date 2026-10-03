import React from 'react';
import { Home, ShieldAlert, ShieldCheck, Building2, PlusCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useIncident } from '../../context/IncidentContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  const { createNewIncident } = useIncident();

  const items = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'detail', label: t.nav.incidents, icon: ShieldAlert },
    { 
      id: 'intake', 
      label: 'New', 
      icon: PlusCircle, 
      isAction: true,
      onClick: () => {
        createNewIncident();
        setActiveTab('intake');
      }
    },
    { id: 'recovery', label: 'Shield', icon: ShieldCheck },
    { id: 'official', label: 'Help', icon: Building2 },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-safestep-darker/95 backdrop-blur-lg border-t border-safestep-moss/20 px-2 py-1.5 safe-bottom">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isAction) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center -mt-4 p-2 rounded-full bg-safestep-moss text-safestep-darker shadow-glow-moss border-2 border-safestep-darker active:scale-95 transition-transform"
                aria-label="Start new incident"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-safestep-moss font-bold' : 'text-safestep-beige/70 hover:text-safestep-beige'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
