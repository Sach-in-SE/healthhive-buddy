
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DietRecommendations from '@/components/diet/DietRecommendations';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';
import { useLanguage } from '@/contexts/LanguageContext';

const Diet = () => {
  const { translate, currentLanguage } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold mb-6">Diet Recommendations</h1>
              <p className="text-gray-600 text-lg">
                Get personalized diet suggestions based on your symptoms and health history. Our AI-powered tool analyzes your specific health needs to provide relevant nutritional guidance.
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
