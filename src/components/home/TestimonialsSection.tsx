
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, position }) => {
  return (
    <div className="glass-panel p-8 rounded-2xl">
      <Quote size={24} className="text-health-400 mb-4" />
      <p className="text-gray-700 mb-6 leading-relaxed">{content}</p>
      <div>
        <h4 className="font-semibold">{author}</h4>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      content: "HealthAssist helped me understand my symptoms when I was unsure whether to see a doctor. The insights were accurate and saved me unnecessary worry.",
      author: "Sarah Johnson",
      position: "Teacher"
    },
    {
      content: "I use the medication reminder feature every day. It's simple but incredibly effective. The AI chatbot also provides helpful information about my health questions.",
      author: "Michael Chen",
      position: "Software Engineer"
    },
    {
      content: "As someone who travels frequently, having a reliable health assistant in my pocket gives me peace of mind. The symptom checker is impressively accurate.",
      author: "Elena Rodriguez",
      position: "Flight Attendant"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Users Say</h2>
          <p className="text-gray-600">
            Thousands of people use HealthAssist to better understand and manage their health.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              position={testimonial.position}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
