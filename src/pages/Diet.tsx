
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DietRecommendations from '@/components/diet/DietRecommendations';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/language/LanguageSelector';

const Diet = () => {
  const { translate, currentLanguage } = useLanguage();
  const [title, setTitle] = useState("Diet Recommendations");
  const [description, setDescription] = useState(
    "Get personalized diet suggestions based on your symptoms and health history. Our AI-powered tool analyzes your specific health needs to provide relevant nutritional guidance."
  );

  useEffect(() => {
    const translateContent = async () => {
      const translatedTitle = await translate("Diet Recommendations");
      const translatedDescription = await translate(
        "Get personalized diet suggestions based on your symptoms and health history. Our AI-powered tool analyzes your specific health needs to provide relevant nutritional guidance."
      );
      
      setTitle(translatedTitle);
      setDescription(translatedDescription);
    };

    translateContent();
  }, [currentLanguage, translate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 relative">
              <div className="absolute top-0 right-0">
                <LanguageSelector variant="minimal" />
              </div>
              <h1 className="text-4xl font-bold mb-6">{title}</h1>
              <p className="text-gray-600 text-lg">
                {description}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <DietRecommendations />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default Diet;
