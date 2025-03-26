
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="health-gradient rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-balance">
              Start your journey to better health understanding today
            </h2>
            <p className="text-white text-opacity-90 mb-8">
              Get immediate insights about your health concerns with our AI-powered assistant.
              No waiting rooms. No appointments. Just answers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-health-600 hover:bg-gray-100" asChild>
                <Link to="/symptoms">
                  Check Your Symptoms
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
