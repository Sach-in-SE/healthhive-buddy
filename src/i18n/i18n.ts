
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import hiTranslation from './locales/hi.json';
import arTranslation from './locales/ar.json';
import frTranslation from './locales/fr.json';
import deTranslation from './locales/de.json';
import zhTranslation from './locales/zh.json';
import ruTranslation from './locales/ru.json';
import ptTranslation from './locales/pt.json';
import jaTranslation from './locales/ja.json';

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  hi: {
    translation: hiTranslation
  },
  ar: {
    translation: arTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  },
  zh: {
    translation: zhTranslation
  },
  ru: {
    translation: ruTranslation
  },
  pt: {
    translation: ptTranslation
  },
  ja: {
    translation: jaTranslation
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
