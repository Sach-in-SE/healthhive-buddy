
import React from 'react';
import { MessageSquare, Activity, Bell, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl transition-all hover:shadow-medium transform hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl health-gradient flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare size={22} className="text-white" />,
      title: "AI Health Chatbot",
      description: "Talk with our intelligent assistant to discuss symptoms and get immediate health guidance."
    },
    {
      icon: <Activity size={22} className="text-white" />,
      title: "Symptom Checker",
      description: "Describe your symptoms and receive insights about potential conditions based on medical data."
    },
    {
      icon: <Bell size={22} className="text-white" />,
      title: "Medication Reminders",
      description: "Never miss a dose with personalized reminders for your medications and treatments."
    },
    {
      icon: <Shield size={22} className="text-white" />,
      title: "Private & Secure",
      description: "Your health data is encrypted and protected with the highest security standards."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Intelligent Health Features</h2>
          <p className="text-gray-600">
            Our AI-powered platform provides a comprehensive suite of tools to help you monitor and manage your health.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-20 bottom-40 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -left-20 top-20 w-96 h-96 bg-health-100 rounded-full opacity-40 blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
