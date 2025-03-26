
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center max-w-7xl mx-auto">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <span className="inline-block px-3 py-1 text-xs font-medium text-health-600 bg-health-100 rounded-full mb-6">
              Your AI Health Companion
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              Intelligent health guidance at your fingertips
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              HealthAssist uses advanced AI to help you understand symptoms, check potential conditions, and get personalized health insights - all in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="health-gradient hover:shadow-highlight transition-all" asChild>
                <Link to="/symptoms">
                  Check Symptoms <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-200 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-glassy border border-white/20 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Health Assistant Dashboard" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-health-200 rounded-full opacity-30 blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-100 rounded-full opacity-40 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
