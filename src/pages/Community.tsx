
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommunityForum from '@/components/community/CommunityForum';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/language/LanguageSelector';

const Community = () => {
  const { translate, currentLanguage } = useLanguage();
  const [title, setTitle] = useState("HealthHive Community");
  const [description, setDescription] = useState(
    "Connect with others facing similar health challenges, share experiences, and get advice from verified healthcare professionals."
  );

  useEffect(() => {
    const translateContent = async () => {
      const translatedTitle = await translate("HealthHive Community");
      const translatedDescription = await translate(
        "Connect with others facing similar health challenges, share experiences, and get advice from verified healthcare professionals."
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
            
            <CommunityForum />
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default Community;
