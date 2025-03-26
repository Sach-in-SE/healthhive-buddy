
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-center">About HealthAssist</h1>
              
              <div className="glass-panel p-8 rounded-2xl mb-12">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  HealthAssist was created with a simple yet powerful mission: to make reliable health information accessible to everyone. We believe that understanding your health shouldn't be complicated or costly.
                </p>
                <p className="text-gray-600">
                  By combining advanced artificial intelligence with trusted medical information, we've built a platform that can help you interpret symptoms, learn about potential conditions, and make more informed decisions about your health.
                </p>
              </div>
              
              <div className="glass-panel p-8 rounded-2xl mb-12">
                <h2 className="text-2xl font-semibold mb-4">How We Work</h2>
                <p className="text-gray-600 mb-6">
                  HealthAssist uses natural language processing and machine learning to understand your symptoms and health concerns. Our system is trained on a vast database of medical information and is regularly updated to ensure accuracy.
                </p>
                <p className="text-gray-600 mb-6">
                  When you describe your symptoms, our AI analyzes the information and compares it against thousands of conditions to provide you with relevant insights. We also offer personalized recommendations based on your unique health profile.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-500 italic">
                    <strong>Important Note:</strong> HealthAssist is designed to provide information and insights, not to replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
              
              <div className="glass-panel p-8 rounded-2xl mb-12">
                <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                <p className="text-gray-600 mb-6">
                  Behind HealthAssist is a dedicated team of healthcare professionals, AI researchers, and technology experts committed to improving how people access and understand health information.
                </p>
                <p className="text-gray-600">
                  Our medical content is reviewed by licensed physicians to ensure accuracy, and our technology team works continuously to improve the AI's performance and user experience.
                </p>
              </div>
              
              <div className="glass-panel p-8 rounded-2xl text-center">
                <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
                <p className="text-gray-600 mb-6">
                  Ready to experience the future of health assistance? Start using HealthAssist now and take a more active role in understanding your health.
                </p>
                <Button className="health-gradient hover:shadow-highlight transition-all">
                  Try HealthAssist Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default About;
