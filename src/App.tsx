import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { IncidentProvider } from './context/IncidentContext';
import { OpeningIntro } from './components/animations/OpeningIntro';
import { Onboarding } from './pages/Onboarding';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { PrivacyBadge } from './components/layout/PrivacyBadge';
import { Home } from './pages/Home';
import { IntakePage } from './pages/IntakePage';
import { IncidentDetail } from './pages/IncidentDetail';
import { RecoveryShieldPage } from './pages/RecoveryShieldPage';
import { OfficialHelpPage } from './pages/OfficialHelpPage';
import { SettingsPage } from './pages/SettingsPage';
import { isOnboardingCompleted } from './services/storage/localStorage';
import { ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [hasIntroFinished, setHasIntroFinished] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => isOnboardingCompleted());
  const [activeTab, setActiveTab] = useState<string>('home');

  if (!hasIntroFinished) {
    return <OpeningIntro onComplete={() => setHasIntroFinished(true)} />;
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  return (
    <div className="min-h-screen bg-safestep-dark text-safestep-beige flex flex-col selection:bg-safestep-moss selection:text-safestep-darker">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Persistent Privacy Banner */}
      <PrivacyBadge />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <Home onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'intake' && (
          <IntakePage
            onReconstructionDone={() => setActiveTab('detail')}
            onBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'detail' && (
          <IncidentDetail
            onBack={() => setActiveTab('home')}
            onNavigateToIntake={() => setActiveTab('intake')}
            onNavigateToRecovery={() => setActiveTab('recovery')}
          />
        )}

        {activeTab === 'recovery' && (
          <RecoveryShieldPage onBack={() => setActiveTab('home')} />
        )}

        {activeTab === 'official' && (
          <OfficialHelpPage onBack={() => setActiveTab('home')} />
        )}

        {activeTab === 'settings' && (
          <SettingsPage onBack={() => setActiveTab('home')} />
        )}
      </main>

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Footer */}
      <footer className="border-t border-safestep-moss/20 bg-safestep-darker/90 py-8 px-4 text-center text-xs text-safestep-beige/60 space-y-3 hidden sm:block">
        <div className="flex items-center justify-center gap-2 text-safestep-moss font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>SAFESTEP — Built for SANGYAN Hackathon</span>
        </div>
        <p className="max-w-3xl mx-auto leading-relaxed text-[11px] text-safestep-beige/50">
          Disclaimer: SAFESTEP is an automated informational safety and financial incident reconstruction prototype.
          It does not provide investment tips, legal counsel, or financial guarantees. If money has been fraudulently debited,
          immediately contact the National Cyber Crime Helpline at <strong>1930</strong> and your home bank.
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px]">
          <button onClick={() => setActiveTab('official')} className="hover:text-safestep-moss transition-colors">
            Official Portals
          </button>
          <span>•</span>
          <button onClick={() => setActiveTab('recovery')} className="hover:text-safestep-moss transition-colors">
            Recovery Shield
          </button>
          <span>•</span>
          <button onClick={() => setActiveTab('settings')} className="hover:text-safestep-moss transition-colors">
            Languages & Settings
          </button>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <IncidentProvider>
        <AppContent />
      </IncidentProvider>
    </LanguageProvider>
  );
}

export default App;
