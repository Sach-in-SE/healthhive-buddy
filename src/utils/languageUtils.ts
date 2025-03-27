
import axios from 'axios';

// Updated available languages with RTL indicators
export const availableLanguages = [
  { code: 'en', name: 'English', isRTL: false },
  { code: 'es', name: 'Español', isRTL: false },
  { code: 'hi', name: 'हिन्दी', isRTL: false },
  { code: 'fr', name: 'Français', isRTL: false },
  { code: 'de', name: 'Deutsch', isRTL: false },
  { code: 'zh', name: '中文', isRTL: false },
  { code: 'ar', name: 'العربية', isRTL: true },
  { code: 'ru', name: 'Русский', isRTL: false },
  { code: 'pt', name: 'Português', isRTL: false },
  { code: 'ja', name: '日本語', isRTL: false },
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
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'Describe tus síntomas y obtén información sobre posibles condiciones. Nuestra herramienta con IA compara tus síntomas con miles de condiciones para proporcionarte información relevante.',
        'Diet Recommendations': 'Recomendaciones de Dieta',
        'Get personalized diet suggestions based on your symptoms and health history.': 'Obtén sugerencias de dieta personalizadas basadas en tus síntomas e historial de salud.',
        'Community': 'Comunidad',
        'Connect with others facing similar health challenges.': 'Conéctate con otras personas que enfrentan desafíos de salud similares.',
        'About': 'Acerca de',
        'Find Nearby Medical Facilities': 'Encuentra Instalaciones Médicas Cercanas',
        'Select your symptoms': 'Selecciona tus síntomas',
        'Search for a symptom...': 'Buscar un síntoma...',
        'No symptoms selected yet.': 'Aún no se han seleccionado síntomas.',
        'Use the search bar above to add symptoms.': 'Usa la barra de búsqueda arriba para añadir síntomas.',
        'Analyze Symptoms': 'Analizar Síntomas',
        'Analyzing...': 'Analizando...',
        'Possible Conditions': 'Condiciones Posibles',
        'Recommendations:': 'Recomendaciones:',
        'Start New Check': 'Iniciar Nueva Verificación',
        'Important:': 'Importante:',
        'This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.': 'Esto no es un diagnóstico médico. Por favor consulta con un profesional de la salud para un consejo médico adecuado.'
      },
      'hi': {
        'Hello! I\'m your Health Assistant.': 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ।',
        'How can I help you today?': 'मैं आज आपकी कैसे मदद कर सकता हूँ?',
        'I can help you check your symptoms.': 'मैं आपके लक्षणों की जाँच करने में मदद कर सकता हूँ।',
        'Please contact emergency services': 'कृपया आपातकालीन सेवाओं से संपर्क करें',
        'The symptoms you\'ve described may need medical attention': 'आपके द्वारा वर्णित लक्षणों के लिए चिकित्सा ध्यान की आवश्यकता हो सकती है',
        'Symptom Checker': 'लक्षण जांचकर्ता',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'अपने लक्षणों का वर्णन करें और संभावित स्थितियों के बारे में जानकारी प्राप्त करें। हमारा AI-संचालित टूल आपके लक्षणों की तुलना हजारों स्थितियों से करता है ताकि आपको प्रासंगिक जानकारी प्रदान की जा सके।',
        'Diet Recommendations': 'आहार सुझाव',
        'Get personalized diet suggestions based on your symptoms and health history.': 'अपने लक्षणों और स्वास्थ्य इतिहास के आधार पर व्यक्तिगत आहार सुझाव प्राप्त करें।',
        'Community': 'समुदाय',
        'Connect with others facing similar health challenges.': 'समान स्वास्थ्य चुनौतियों का सामना करने वाले अन्य लोगों से जुड़ें।',
        'About': 'के बारे में',
        'Find Nearby Medical Facilities': 'नजदीकी चिकित्सा सुविधाएं खोजें',
        'Select your symptoms': 'अपने लक्षण चुनें',
        'Search for a symptom...': 'एक लक्षण के लिए खोजें...',
        'No symptoms selected yet.': 'अभी तक कोई लक्षण नहीं चुना गया है।',
        'Use the search bar above to add symptoms.': 'लक्षण जोड़ने के लिए ऊपर खोज पट्टी का उपयोग करें।',
        'Analyze Symptoms': 'लक्षणों का विश्लेषण करें',
        'Analyzing...': 'विश्लेषण कर रहा है...',
        'Possible Conditions': 'संभावित स्थितियां',
        'Recommendations:': 'सिफारिशें:',
        'Start New Check': 'नई जांच शुरू करें',
        'Important:': 'महत्वपूर्ण:',
        'This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.': 'यह चिकित्सा निदान नहीं है। कृपया उचित चिकित्सा सलाह के लिए स्वास्थ्य देखभाल पेशेवर से परामर्श करें।'
      },
      'ar': {
        'Hello! I\'m your Health Assistant.': 'مرحبا! أنا مساعدك الصحي.',
        'How can I help you today?': 'كيف يمكنني مساعدتك اليوم؟',
        'I can help you check your symptoms.': 'يمكنني مساعدتك في فحص الأعراض.',
        'Please contact emergency services': 'يرجى الاتصال بخدمات الطوارئ',
        'The symptoms you\'ve described may need medical attention': 'قد تحتاج الأعراض التي وصفتها إلى عناية طبية',
        'Symptom Checker': 'فاحص الأعراض',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'صف أعراضك واحصل على رؤى حول الحالات المحتملة. تقارن أداتنا المدعومة بالذكاء الاصطناعي أعراضك مع آلاف الحالات لتزويدك بالمعلومات ذات الصلة.',
        'Diet Recommendations': 'توصيات النظام الغذائي',
        'Get personalized diet suggestions based on your symptoms and health history.': 'احصل على اقتراحات غذائية مخصصة بناءً على أعراضك وتاريخك الصحي.',
        'Community': 'مجتمع',
        'Connect with others facing similar health challenges.': 'تواصل مع الآخرين الذين يواجهون تحديات صحية مماثلة.',
        'About': 'حول',
        'Find Nearby Medical Facilities': 'ابحث عن المرافق الطبية القريبة',
        'Select your symptoms': 'حدد الأعراض الخاصة بك',
        'Search for a symptom...': 'ابحث عن عرض...',
        'No symptoms selected yet.': 'لم يتم تحديد أي أعراض حتى الآن.',
        'Use the search bar above to add symptoms.': 'استخدم شريط البحث أعلاه لإضافة الأعراض.',
        'Analyze Symptoms': 'تحليل الأعراض',
        'Analyzing...': 'جارٍ التحليل...',
        'Possible Conditions': 'الحالات المحتملة',
        'Recommendations:': 'توصيات:',
        'Start New Check': 'بدء فحص جديد',
        'Important:': 'مهم:',
        'This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.': 'هذا ليس تشخيصًا طبيًا. يرجى استشارة أخصائي رعاية صحية للحصول على المشورة الطبية المناسبة.'
      },
      'fr': {
        'Hello! I\'m your Health Assistant.': 'Bonjour! Je suis votre assistant santé.',
        'How can I help you today?': 'Comment puis-je vous aider aujourd\'hui?',
        'I can help you check your symptoms.': 'Je peux vous aider à vérifier vos symptômes.',
        'Please contact emergency services': 'Veuillez contacter les services d\'urgence',
        'The symptoms you\'ve described may need medical attention': 'Les symptômes que vous avez décrits peuvent nécessiter une attention médicale',
        'Symptom Checker': 'Vérificateur de Symptômes',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'Décrivez vos symptômes et obtenez des informations sur les conditions possibles. Notre outil alimenté par l\'IA compare vos symptômes à des milliers de conditions pour vous fournir des informations pertinentes.',
        'Diet Recommendations': 'Recommandations Diététiques',
        'Get personalized diet suggestions based on your symptoms and health history.': 'Obtenez des suggestions de régime personnalisées basées sur vos symptômes et votre historique de santé.',
        'Community': 'Communauté',
        'Connect with others facing similar health challenges.': 'Connectez-vous avec d\'autres personnes confrontées à des défis de santé similaires.',
        'About': 'À propos',
        'Find Nearby Medical Facilities': 'Trouver des Établissements Médicaux à Proximité',
        'Select your symptoms': 'Sélectionnez vos symptômes',
        'Search for a symptom...': 'Rechercher un symptôme...',
        'No symptoms selected yet.': 'Aucun symptôme sélectionné pour l\'instant.',
        'Use the search bar above to add symptoms.': 'Utilisez la barre de recherche ci-dessus pour ajouter des symptômes.',
        'Analyze Symptoms': 'Analyser les Symptômes',
        'Analyzing...': 'Analyse en cours...',
        'Possible Conditions': 'Conditions Possibles',
        'Recommendations:': 'Recommandations:',
        'Start New Check': 'Commencer une Nouvelle Vérification',
        'Important:': 'Important:',
        'This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.': 'Ceci n\'est pas un diagnostic médical. Veuillez consulter un professionnel de la santé pour des conseils médicaux appropriés.'
      },
      'de': {
        'Hello! I\'m your Health Assistant.': 'Hallo! Ich bin Ihr Gesundheitsassistent.',
        'How can I help you today?': 'Wie kann ich Ihnen heute helfen?',
        'I can help you check your symptoms.': 'Ich kann Ihnen helfen, Ihre Symptome zu überprüfen.',
        'Please contact emergency services': 'Bitte kontaktieren Sie den Notdienst',
        'The symptoms you\'ve described may need medical attention': 'Die von Ihnen beschriebenen Symptome können ärztliche Aufmerksamkeit erfordern',
        'Symptom Checker': 'Symptom-Checker',
        'Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.': 'Beschreiben Sie Ihre Symptome und erhalten Sie Einblicke in mögliche Erkrankungen. Unser KI-gestütztes Tool vergleicht Ihre Symptome mit Tausenden von Erkrankungen, um Ihnen relevante Informationen zu liefern.',
        'Diet Recommendations': 'Ernährungsempfehlungen',
        'Get personalized diet suggestions based on your symptoms and health history.': 'Erhalten Sie personalisierte Ernährungsvorschläge basierend auf Ihren Symptomen und Ihrer Gesundheitsgeschichte.',
        'Community': 'Gemeinschaft',
        'Connect with others facing similar health challenges.': 'Verbinden Sie sich mit anderen, die ähnliche gesundheitliche Herausforderungen haben.',
        'About': 'Über uns',
        'Find Nearby Medical Facilities': 'Medizinische Einrichtungen in der Nähe finden',
        'Select your symptoms': 'Wählen Sie Ihre Symptome',
        'Search for a symptom...': 'Nach einem Symptom suchen...',
        'No symptoms selected yet.': 'Noch keine Symptome ausgewählt.',
        'Use the search bar above to add symptoms.': 'Verwenden Sie die Suchleiste oben, um Symptome hinzuzufügen.',
        'Analyze Symptoms': 'Symptome analysieren',
        'Analyzing...': 'Analysiere...',
        'Possible Conditions': 'Mögliche Erkrankungen',
        'Recommendations:': 'Empfehlungen:',
        'Start New Check': 'Neue Überprüfung starten',
        'Important:': 'Wichtig:',
        'This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.': 'Dies ist keine medizinische Diagnose. Bitte konsultieren Sie einen Arzt für eine richtige medizinische Beratung.'
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

// Get RTL status based on language code
export const isRTL = (langCode: string): boolean => {
  const language = availableLanguages.find(lang => lang.code === langCode);
  return language ? language.isRTL : false;
};
