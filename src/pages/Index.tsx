
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import ChatbotInterface from '@/components/chatbot/ChatbotInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
          <FeaturesSection />
          <HowItWorks />
          <TestimonialsSection />
          <CtaSection />
        </Suspense>
      </main>
      <Footer />
      <ChatbotInterface />
    </div>
  );
};

export default Index;
