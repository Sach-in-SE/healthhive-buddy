
import axios from 'axios';

// Available languages
export const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
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
    // Try using LibreTranslate API
    // You would normally use a real LibreTranslate instance URL here
    // For a production app, you'd replace this with a real API endpoint
    
    // Uncomment the following code to use a real LibreTranslate API
    // const response = await axios.post('https://libretranslate.de/translate', {
    //   q: text,
    //   source: 'en',
    //   target: targetLang,
    //   format: 'text'
    // });
    
    // return response.data.translatedText;
    
    // For demo purposes, let's expand our mock translations
    const mockTranslations: Record<string, Record<string, string>> = {
      'es': {
        'Hello! I\'m your Health Assistant.': '¡Hola! Soy tu Asistente de Salud.',
        'How can I help you today?': '¿Cómo puedo ayudarte hoy?',
        'I can help you check your symptoms.': 'Puedo ayudarte a verificar tus síntomas.',
        'Please contact emergency services': 'Por favor contacta a los servicios de emergencia',
        'The symptoms you\'ve described may need medical attention': 'Los síntomas que has descrito pueden necesitar atención médica',
        'Symptom Checker': 'Verificador de Síntomas',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'Describe tus síntomas y obtén información sobre posibles condiciones. Nuestra herramienta con IA compara tus síntomas con miles de condiciones para proporcionarte información relevante.'
      },
      'hi': {
        'Hello! I\'m your Health Assistant.': 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ।',
        'How can I help you today?': 'मैं आज आपकी कैसे मदद कर सकता हूँ?',
        'I can help you check your symptoms.': 'मैं आपके लक्षणों की जाँच करने में मदद कर सकता हूँ।',
        'Please contact emergency services': 'कृपया आपातकालीन सेवाओं से संपर्क करें',
        'The symptoms you\'ve described may need medical attention': 'आपके द्वारा वर्णित लक्षणों के लिए चिकित्सा ध्यान की आवश्यकता हो सकती है',
        'Symptom Checker': 'लक्षण जांचकर्ता',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'अपने लक्षणों का वर्णन करें और संभावित स्थितियों के बारे में जानकारी प्राप्त करें। हमारा AI-संचालित टूल आपके लक्षणों की तुलना हजारों स्थितियों से करता है ताकि आपको प्रासंगिक जानकारी प्रदान की जा सके।'
      },
      'fr': {
        'Hello! I\'m your Health Assistant.': 'Bonjour! Je suis votre assistant santé.',
        'How can I help you today?': 'Comment puis-je vous aider aujourd\'hui?',
        'I can help you check your symptoms.': 'Je peux vous aider à vérifier vos symptômes.',
        'Please contact emergency services': 'Veuillez contacter les services d\'urgence',
        'The symptoms you\'ve described may need medical attention': 'Les symptômes que vous avez décrits peuvent nécessiter une attention médicale',
        'Symptom Checker': 'Vérificateur de Symptômes',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'Décrivez vos symptômes et obtenez des informations sur les conditions possibles. Notre outil alimenté par l\'IA compare vos symptômes à des milliers de conditions pour vous fournir des informations pertinentes.'
      },
      'de': {
        'Hello! I\'m your Health Assistant.': 'Hallo! Ich bin Ihr Gesundheitsassistent.',
        'How can I help you today?': 'Wie kann ich Ihnen heute helfen?',
        'I can help you check your symptoms.': 'Ich kann Ihnen helfen, Ihre Symptome zu überprüfen.',
        'Please contact emergency services': 'Bitte kontaktieren Sie den Notdienst',
        'The symptoms you\'ve described may need medical attention': 'Die von Ihnen beschriebenen Symptome können ärztliche Aufmerksamkeit erfordern',
        'Symptom Checker': 'Symptom-Checker',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'Beschreiben Sie Ihre Symptome und erhalten Sie Einblicke in mögliche Erkrankungen. Unser KI-gestütztes Tool vergleicht Ihre Symptome mit Tausenden von Erkrankungen, um Ihnen relevante Informationen zu liefern.'
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

// Translate object values recursively
export const translateObject = async <T>(obj: T, targetLang: string): Promise<T> => {
  if (targetLang === 'en' || !obj) {
    return obj;
  }
  
  if (typeof obj === 'string') {
    return await translateText(obj, targetLang) as unknown as T;
  }
  
  if (Array.isArray(obj)) {
    const translatedArray = await Promise.all(
      obj.map(item => translateObject(item, targetLang))
    );
    return translatedArray as unknown as T;
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const translatedObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      translatedObj[key] = await translateObject(value, targetLang);
    }
    return translatedObj as T;
  }
  
  return obj;
};
