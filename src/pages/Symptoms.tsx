
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SymptomCheck from '@/components/symptoms/SymptomCheck';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';

const Symptoms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold mb-6">Symptom Checker</h1>
              <p className="text-gray-600 text-lg">
                Describe your symptoms and get insights about possible conditions. Our AI-powered tool compares your symptoms with thousands of conditions to provide you with relevant information.
              </p>
            </div>
            
            <SymptomCheck />
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default Symptoms;
