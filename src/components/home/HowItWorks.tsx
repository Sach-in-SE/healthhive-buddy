
import React from 'react';
import { Button } from '@/components/ui/button';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Describe your symptoms",
      description: "Simply tell our AI assistant about how you're feeling or what symptoms you're experiencing."
    },
    {
      number: "02",
      title: "Get instant analysis",
      description: "Our system analyzes your symptoms and compares them against medical databases to provide insights."
    },
    {
      number: "03",
      title: "Review potential conditions",
      description: "Receive information about possible conditions related to your symptoms with probability assessments."
    },
    {
      number: "04",
      title: "Get guidance and next steps",
      description: "Get recommendations on what to do next, whether it's self-care tips or when to seek medical attention."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Our intuitive process makes it easy to check your symptoms and get reliable health insights in minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-health-400 opacity-30">{step.number}</span>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[60%] w-full border-t-2 border-dashed border-health-200"></div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 text-sm text-center">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button size="lg" className="health-gradient hover:shadow-highlight transition-all">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
