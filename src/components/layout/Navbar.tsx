import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldAlert, 
  Building2, 
  FileText,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useIncident } from '../../context/IncidentContext';
import { SupportedLanguage } from '../../types/i18n';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const { loadDemoIncident, createNewIncident } = useIncident();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLangMeta = supportedLanguages.find(l => l.code === language) || supportedLanguages[0];

  const handleSelectLang = (code: SupportedLanguage) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'detail', label: t.nav.incidents },
    { id: 'recovery', label: t.nav.recoveryShield },
    { id: 'official', label: t.nav.officialHelp },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-safestep-dark/95 backdrop-blur-md border-b border-safestep-moss/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="SAFESTEP Home"
        >
          <div className="w-10 h-10 rounded-xl bg-safestep-midnight flex items-center justify-center border border-safestep-moss/50 shadow-glow-moss group-hover:border-safestep-moss transition-all">
            <ShieldCheck className="w-6 h-6 text-safestep-moss group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider text-safestep-beige">SAFESTEP</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-safestep-moss/20 text-safestep-moss border border-safestep-moss/30">
                BHARAT
              </span>
            </div>
            <p className="text-[11px] text-safestep-beige/70 hidden sm:block font-medium">
              {t.common.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-safestep-midnight/30 px-2 py-1.5 rounded-full border border-safestep-moss/20">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-safestep-moss text-safestep-darker shadow-sm'
                    : 'text-safestep-beige/80 hover:text-safestep-beige hover:bg-safestep-midnight/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Language Selector + Demo + Start Incident) */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safestep-midnight/60 hover:bg-safestep-midnight border border-safestep-moss/30 text-safestep-beige text-xs font-medium transition-colors"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-safestep-moss" />
              <span className="font-semibold">{currentLangMeta.nativeName}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-safestep-darker border border-safestep-moss/40 rounded-xl shadow-elevated p-2 z-50 max-h-80 overflow-y-auto">
                <div className="text-[10px] uppercase font-bold text-safestep-moss px-2.5 py-1 tracking-wider border-b border-safestep-midnight mb-1">
                  11 Indian Languages
                </div>
                {supportedLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleSelectLang(l.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      language === l.code
                        ? 'bg-safestep-moss text-safestep-darker font-bold'
                        : 'text-safestep-beige hover:bg-safestep-midnight/50'
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    <span className="text-[11px] opacity-75">{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Demo Button */}
          <button
            onClick={() => {
              loadDemoIncident();
              setActiveTab('detail');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safestep-rose/20 hover:bg-safestep-rose/30 text-safestep-rose-light border border-safestep-rose/40 text-xs font-bold transition-colors"
            title="Load live IPO scam demonstration incident"
          >
            <Sparkles className="w-3.5 h-3.5 text-safestep-rose" />
            <span>{t.common.tryDemo}</span>
          </button>

          {/* Start Incident CTA */}
          <button
            onClick={() => {
              createNewIncident();
              setActiveTab('intake');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-safestep-moss hover:bg-safestep-moss-light text-safestep-darker text-xs font-extrabold shadow-glow-moss transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">{t.nav.startIncident}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-safestep-beige hover:bg-safestep-midnight/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-safestep-darker border-b border-safestep-moss/20 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-safestep-moss text-safestep-darker'
                    : 'bg-safestep-midnight/40 text-safestep-beige'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-safestep-midnight flex gap-2">
            <button
              onClick={() => {
                loadDemoIncident();
                setActiveTab('detail');
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-safestep-rose/20 text-safestep-rose-light border border-safestep-rose/40 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.common.tryDemo}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
