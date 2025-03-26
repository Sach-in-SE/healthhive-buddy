
import axios from 'axios';

// Available languages
export const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: 'Chinese' },
];

// Get user's browser language
export const getUserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0];
  // Check if browser language is supported, default to English if not
  return availableLanguages.some(lang => lang.code === browserLang) ? browserLang : 'en';
};

// Translation service using LibreTranslate API
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  // If target language is English or the text is empty, return the original text
  if (targetLang === 'en' || !text.trim()) {
    return text;
  }

  try {
    // You would normally use a real LibreTranslate instance URL here
    // For demo purposes, we'll use a mock translation
    // const response = await axios.post('https://libretranslate.com/translate', {
    //   q: text,
    //   source: 'en',
    //   target: targetLang,
    //   format: 'text'
    // });
    
    // return response.data.translatedText;
    
    // For demo purposes, let's add some mock translations
    const mockTranslations: Record<string, Record<string, string>> = {
      'es': {
        'Hello! I\'m your Health Assistant.': '¡Hola! Soy tu Asistente de Salud.',
        'How can I help you today?': '¿Cómo puedo ayudarte hoy?',
        'I can help you check your symptoms.': 'Puedo ayudarte a verificar tus síntomas.',
        'Please contact emergency services': 'Por favor contacta a los servicios de emergencia',
        'The symptoms you\'ve described may need medical attention': 'Los síntomas que has descrito pueden necesitar atención médica'
      },
      'hi': {
        'Hello! I\'m your Health Assistant.': 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ।',
        'How can I help you today?': 'मैं आज आपकी कैसे मदद कर सकता हूँ?',
        'I can help you check your symptoms.': 'मैं आपके लक्षणों की जाँच करने में मदद कर सकता हूँ।',
        'Please contact emergency services': 'कृपया आपातकालीन सेवाओं से संपर्क करें',
        'The symptoms you\'ve described may need medical attention': 'आपके द्वारा वर्णित लक्षणों के लिए चिकित्सा ध्यान की आवश्यकता हो सकती है'
      }
    };
    
    // Check if we have a mock translation
    if (mockTranslations[targetLang] && mockTranslations[targetLang][text]) {
      return mockTranslations[targetLang][text];
    }
    
    console.log(`Translation requested for: ${text} to ${targetLang}`);
    // Return original text if no mock translation is available
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
};

// Batch translate an array of texts
export const batchTranslate = async (texts: string[], targetLang: string): Promise<string[]> => {
  if (targetLang === 'en') {
    return texts;
  }
  
  try {
    const translatedTexts = await Promise.all(
      texts.map(text => translateText(text, targetLang))
    );
    return translatedTexts;
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts;
  }
};
