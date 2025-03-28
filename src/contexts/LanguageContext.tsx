
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n/i18n'; // Import i18n configuration

// Define RTL languages
const RTL_LANGUAGES = ['ar'];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translate: (key: string) => string;
  isTranslating: boolean;
  availableLanguages: { code: string; name: string }[];
  isRTL: boolean;
}

export const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Set initial language from localStorage if available
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    // Update RTL state when language changes
    const isRTL = RTL_LANGUAGES.includes(i18n.language);
    setIsRTL(isRTL);
    
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    
    // Apply RTL-specific styles
    if (isRTL) {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [i18n.language]);

  const setLanguage = (code: string) => {
    setIsTranslating(true);
    i18n.changeLanguage(code).then(() => {
      localStorage.setItem('preferredLanguage', code);
      setIsTranslating(false);
    });
  };

  const translate = (key: string): string => {
    return t(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: i18n.language,
        setLanguage,
        translate,
        isTranslating,
        availableLanguages,
        isRTL
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
