
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatbotMessage from './ChatbotMessage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Health Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue.trim()),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    // Simplified response logic - this would be replaced with actual API calls
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('symptom') || lowerCaseMessage.includes('sick') || lowerCaseMessage.includes('pain')) {
      return "I can help you check your symptoms. Could you please tell me more about what you're experiencing?";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Hello! How can I assist you with your health today?";
    } else if (lowerCaseMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I understand you're looking for health information. Could you provide more details about your question or concern?";
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Window */}
      <div className={`chatbot-window ${isOpen ? 'visible' : 'hidden'}`}>
        {/* Header */}
        <div className="health-gradient p-4 flex justify-between items-center">
          <h3 className="text-white font-medium">Health Assistant</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-health-600/20" 
            onClick={toggleChatbot}
          >
            <X size={18} />
          </Button>
        </div>
        
        {/* Messages Container */}
        <div className="h-[calc(100%-128px)] overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatbotMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <form 
          onSubmit={handleSendMessage}
          className="border-t border-gray-100 p-4 bg-white/80 backdrop-blur-sm"
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-health-400 focus:border-transparent text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-10 w-10 rounded-full health-gradient hover:shadow-highlight transition-all"
              disabled={!inputValue.trim()}
            >
              <Send size={18} className="text-white" />
            </Button>
          </div>
        </form>
      </div>
      
      {/* Trigger Button */}
      <div 
        className="chatbot-trigger health-gradient ml-auto"
        onClick={toggleChatbot}
      >
        <MessageSquare size={22} />
      </div>
    </div>
  );
};

export default ChatbotInterface;
