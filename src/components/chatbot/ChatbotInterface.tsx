
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, AlertTriangle, Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import ChatbotMessage from './ChatbotMessage';
import { initSpeechRecognition, speakText, isSpeaking, stopSpeaking } from '@/utils/voiceUtils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
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
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    const recognitionInstance = initSpeechRecognition();
    setRecognition(recognitionInstance);
    
    if (recognitionInstance) {
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        // Automatically send message after voice input
        setTimeout(() => {
          handleSendMessage(new Event('submit') as unknown as React.FormEvent);
        }, 500);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          toast.error("Microphone access denied", {
            description: "Please allow microphone access to use voice input.",
          });
        }
      };
    }
    
    // Initialize voices for speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    // Speak the last bot message when messages change
    const lastMessage = messages[messages.length - 1];
    if (isVoiceEnabled && lastMessage && !lastMessage.isUser && isOpen) {
      speakText(lastMessage.content);
    }
  }, [isOpen, messages, isVoiceEnabled]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      stopSpeaking();
    }
  };
  
  const toggleVoiceInput = () => {
    if (!recognition) {
      toast.error("Speech recognition not supported", {
        description: "Your browser doesn't support voice input functionality.",
      });
      return;
    }
    
    if (isListening) {
      recognition.abort();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setInputValue('');
      toast.info("Listening...", {
        description: "Please speak clearly to input your symptoms.",
      });
    }
  };
  
  const toggleVoiceOutput = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isVoiceEnabled) {
      stopSpeaking();
    }
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
      const botResponse = getAIResponse(inputValue.trim());
      setMessages((prev) => [...prev, botResponse]);
      
      // If the response has high urgency, show a toast notification
      if (botResponse.urgency === 'high') {
        toast.error("Urgent medical attention may be required", {
          description: "Please contact a healthcare provider immediately.",
          duration: 8000,
        });
      }
    }, 1000);
  };

  const getAIResponse = (userMessage: string): Message => {
    // Simplified response logic with severity assessment
    const lowerCaseMessage = userMessage.toLowerCase();
    let content = '';
    let urgency: 'low' | 'medium' | 'high' | undefined = undefined;
    
    // Check for urgent symptoms
    const urgentSymptoms = ['chest pain', 'difficulty breathing', 'unconscious', 'seizure', 'stroke', 'severe bleeding', 'poisoning'];
    const moderateSymptoms = ['fever', 'persistent pain', 'vomiting', 'diarrhea', 'dehydration', 'infection'];
    const mildSymptoms = ['headache', 'cold', 'cough', 'sore throat', 'runny nose', 'mild pain'];
    
    // Check if message contains any urgent symptoms
    const hasUrgentSymptoms = urgentSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    const hasModerateSymptoms = moderateSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    const hasMildSymptoms = mildSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    
    if (hasUrgentSymptoms) {
      urgency = 'high';
      content = "I'm detecting symptoms that may require immediate medical attention. Please contact emergency services or go to the nearest emergency room immediately. Would you like me to help find the nearest hospital?";
    } else if (hasModerateSymptoms) {
      urgency = 'medium';
      content = "The symptoms you've described may need medical attention. Consider consulting with a healthcare provider soon. Would you like more information about your symptoms?";
    } else if (hasMildSymptoms) {
      urgency = 'low';
      content = "Based on what you've shared, your symptoms appear to be mild. Rest and self-care may help, but monitor your symptoms for changes. Would you like some self-care suggestions?";
    } else if (lowerCaseMessage.includes('symptom') || lowerCaseMessage.includes('sick') || lowerCaseMessage.includes('pain')) {
      content = "I can help you check your symptoms. Could you please tell me more about what you're experiencing?";
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      content = "Hello! How can I assist you with your health today?";
    } else if (lowerCaseMessage.includes('thank')) {
      content = "You're welcome! Is there anything else I can help you with?";
    } else if (lowerCaseMessage.includes('hospital') || lowerCaseMessage.includes('doctor') || lowerCaseMessage.includes('emergency')) {
      content = "If you need to find a healthcare provider, I can help you locate nearby hospitals or doctors. Would you like me to search for medical facilities in your area?";
    } else {
      content = "I understand you're looking for health information. Could you provide more details about your question or concern?";
    }
    
    return {
      id: (Date.now() + 1).toString(),
      content,
      isUser: false,
      timestamp: new Date(),
      urgency
    };
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Window */}
      <div className={`chatbot-window ${isOpen ? 'visible' : 'hidden'}`}>
        {/* Header */}
        <div className="health-gradient p-4 flex justify-between items-center">
          <h3 className="text-white font-medium">Health Assistant</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-health-600/20" 
              onClick={toggleVoiceOutput}
              title={isVoiceEnabled ? "Disable voice output" : "Enable voice output"}
            >
              {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-health-600/20" 
              onClick={toggleChatbot}
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        
        {/* Messages Container */}
        <div className="h-[calc(100%-128px)] overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatbotMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              urgency={message.urgency}
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
              placeholder="Type your symptoms or questions..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-health-400 focus:border-transparent text-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isListening}
            />
            <Button 
              type="button" 
              size="icon" 
              className={`h-10 w-10 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
              onClick={toggleVoiceInput}
            >
              <Mic size={18} className="text-white" />
            </Button>
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
