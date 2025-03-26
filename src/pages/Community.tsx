
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommunityForum from '@/components/community/CommunityForum';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold mb-6">HealthHive Community</h1>
              <p className="text-gray-600 text-lg">
                Connect with others facing similar health challenges, share experiences, and get advice from verified healthcare professionals.
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
