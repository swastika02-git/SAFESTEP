import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, TranslationSchema, LanguageMeta } from '../types/i18n';
import { translations, SUPPORTED_LANGUAGES, getTranslation } from '../i18n';
import { getSavedLanguage, saveLanguage } from '../services/storage/localStorage';
import { speechService } from '../services/speech/speechService';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationSchema;
  supportedLanguages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = getSavedLanguage();
    if (saved && saved in translations) {
      return saved as SupportedLanguage;
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    saveLanguage(lang);
    speechService.setLanguage(lang);
  };

  useEffect(() => {
    speechService.setLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: getTranslation(language),
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
