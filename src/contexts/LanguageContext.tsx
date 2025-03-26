
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserLanguage, translateText, availableLanguages } from '@/utils/languageUtils';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
  availableLanguages: { code: string; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(getUserLanguage());
  const [isTranslating, setIsTranslating] = useState(false);

  // Set initial language based on browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('preferredLanguage', code);
  };

  const translate = async (text: string): Promise<string> => {
    if (currentLanguage === 'en' || !text) {
      return text;
    }
    
    setIsTranslating(true);
    try {
      const translated = await translateText(text, currentLanguage);
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        translate, 
        isTranslating,
        availableLanguages
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
