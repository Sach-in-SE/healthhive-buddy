import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, AlertTriangle, Mic, Volume2, VolumeX, Globe, MapPin, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import ChatbotMessage from './ChatbotMessage';
import { initSpeechRecognition, speakText, isSpeaking, stopSpeaking } from '@/utils/voiceUtils';
import HospitalFinder from '@/components/hospitals/HospitalFinder';
import LanguageSelector from '@/components/language/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getAvailableSymptoms,
  analyzeSymptoms,
  SymptomateSymptom,
  SymptomateCondition
} from '@/services/symptomate-api';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getDietRecommendations, DietRecommendation } from '@/services/diet-recommendation';
import CompactDietRecommendation from '@/components/diet/CompactDietRecommendation';
import DietRecommendations from '@/components/diet/DietRecommendations';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
  showHospitalFinder?: boolean;
  symptoms?: string[];
  detectedConditions?: SymptomateCondition[];
  dietRecommendation?: DietRecommendation;
}

const ChatbotInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [availableSymptoms, setAvailableSymptoms] = useState<SymptomateSymptom[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { translate, currentLanguage } = useLanguage();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const apiLanguage = currentLanguage === 'en' ? 'en-gb' : 
                            currentLanguage === 'es' ? 'es-es' : 'en-gb';
        const symptoms = await getAvailableSymptoms(apiLanguage);
        setAvailableSymptoms(symptoms);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };
    
    fetchSymptoms();
  }, [currentLanguage]);

  useEffect(() => {
    const setWelcomeMessage = async () => {
      const welcomeContent = await translate("Hello! I'm your Health Assistant. How can I help you today?");
      
      setMessages([{
        id: '1',
        content: welcomeContent,
        isUser: false,
        timestamp: new Date(),
      }]);
    };
    
    setWelcomeMessage();
  }, [currentLanguage, translate]);

  useEffect(() => {
    const recognitionInstance = initSpeechRecognition();
    setRecognition(recognitionInstance);
    
    if (recognitionInstance) {
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
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

  const extractSymptoms = (message: string): string[] => {
    if (!availableSymptoms.length) return [];
    
    const lowerCaseMessage = message.toLowerCase();
    return availableSymptoms
      .filter(symptom => lowerCaseMessage.includes(symptom.name.toLowerCase()))
      .map(symptom => symptom.name);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const extractedSymptoms = extractSymptoms(inputValue);
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
      symptoms: extractedSymptoms
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    
    setTimeout(async () => {
      const botResponse = await getAIResponse(inputValue.trim(), extractedSymptoms);
      setMessages((prev) => [...prev, botResponse]);
      
      if (botResponse.urgency === 'high') {
        toast.error("Urgent medical attention may be required", {
          description: "Please contact a healthcare provider immediately.",
          duration: 8000,
        });
      }
    }, 1000);
  };

  const getAIResponse = async (userMessage: string, extractedSymptoms: string[]): Promise<Message> => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let content = '';
    let urgency: 'low' | 'medium' | 'high' | undefined = undefined;
    let showHospitalFinder = false;
    let detectedConditions: SymptomateCondition[] | undefined = undefined;
    let dietRecommendation: DietRecommendation | undefined = undefined;
    
    const isDietRelated = 
      lowerCaseMessage.includes('diet') || 
      lowerCaseMessage.includes('food') || 
      lowerCaseMessage.includes('nutrition') || 
      lowerCaseMessage.includes('eat') || 
      lowerCaseMessage.includes('meal');
    
    const symptomMatches = availableSymptoms.filter(symptom => 
      lowerCaseMessage.includes(symptom.name.toLowerCase())
    );
    
    const urgentSymptoms = ['chest pain', 'difficulty breathing', 'unconscious', 'seizure', 'stroke', 'severe bleeding', 'poisoning'];
    const moderateSymptoms = ['fever', 'persistent pain', 'vomiting', 'diarrhea', 'dehydration', 'infection'];
    
    const isAskingForHospital = 
      lowerCaseMessage.includes('hospital') || 
      lowerCaseMessage.includes('doctor') || 
      lowerCaseMessage.includes('emergency') ||
      lowerCaseMessage.includes('clinic') ||
      lowerCaseMessage.includes('medical center');
    
    const hasUrgentSymptoms = urgentSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    const hasModerateSymptoms = moderateSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    
    if (extractedSymptoms.length > 0 || symptomMatches.length > 0) {
      try {
        const firstSymptom = availableSymptoms.find(s => 
          extractedSymptoms.includes(s.name) || 
          symptomMatches.some(match => match.id === s.id)
        );
        
        if (firstSymptom) {
          const mockRequest = {
            sex: 'male' as const,
            age: 35,
            symptoms: [{
              id: firstSymptom.id,
              reported: 'present' as const
            }]
          };
          
          const analysisResult = await analyzeSymptoms(mockRequest);
          detectedConditions = analysisResult.conditions;
          
          if (analysisResult.triage) {
            if (analysisResult.triage.level === 'emergency') {
              urgency = 'high';
            } else if (analysisResult.triage.level === 'consultation') {
              urgency = 'medium';
            } else {
              urgency = 'low';
            }
          }
          
          if (isDietRelated) {
            const dietRecommendations = getDietRecommendations(detectedConditions);
            if (dietRecommendations.length > 0) {
              dietRecommendation = dietRecommendations[0];
              
              const baseContent = `Based on your symptoms, I would recommend a ${dietRecommendation.title}. This diet focuses on foods that may help manage your potential condition. Would you like to see the complete diet plan?`;
              content = await translate(baseContent);
            }
          } else {
            const conditionsList = detectedConditions
              .slice(0, 3)
              .map(c => c.commonName)
              .join(', ');
              
            const baseContent = `Based on your symptoms, you might be experiencing ${conditionsList}. ${analysisResult.triage?.description || ''}`;
            content = await translate(baseContent);
          }
        }
      } catch (error) {
        console.error('Error analyzing symptoms:', error);
      }
    }
    
    if (!content) {
      if (hasUrgentSymptoms || isAskingForHospital) {
        urgency = 'high';
        const baseContent = "I'm detecting symptoms that may require immediate medical attention. Please contact emergency services or go to the nearest emergency room immediately.";
        content = await translate(baseContent);
        showHospitalFinder = true;
      } else if (hasModerateSymptoms || symptomMatches.length > 0) {
        urgency = 'medium';
        const baseContent = "The symptoms you've described may need medical attention. Would you like to use our symptom checker for more specific information?";
        content = await translate(baseContent);
        showHospitalFinder = lowerCaseMessage.includes('where') || lowerCaseMessage.includes('find');
      } else if (isDietRelated) {
        const baseContent = "I can provide diet recommendations based on your health needs. Could you please tell me about any symptoms or medical conditions you're experiencing?";
        content = await translate(baseContent);
      } else if (lowerCaseMessage.includes('symptom') || lowerCaseMessage.includes('sick') || lowerCaseMessage.includes('pain')) {
        const baseContent = "I can help you check your symptoms. Could you please tell me more about what you're experiencing?";
        content = await translate(baseContent);
      } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
        const baseContent = "Hello! How can I assist you with your health today?";
        content = await translate(baseContent);
      } else if (lowerCaseMessage.includes('thank')) {
        const baseContent = "You're welcome! Is there anything else I can help you with?";
        content = await translate(baseContent);
      } else if (lowerCaseMessage.includes('hospital') || lowerCaseMessage.includes('doctor') || lowerCaseMessage.includes('emergency')) {
        const baseContent = "I can help you locate nearby hospitals or doctors. Would you like me to search for medical facilities in your area?";
        content = await translate(baseContent);
        showHospitalFinder = true;
      } else {
        const baseContent = "I understand you're looking for health information. Could you provide more details about your question or concern?";
        content = await translate(baseContent);
      }
    }
    
    return {
      id: (Date.now() + 1).toString(),
      content,
      isUser: false,
      timestamp: new Date(),
      urgency,
      showHospitalFinder,
      symptoms: extractedSymptoms,
      detectedConditions,
      dietRecommendation
    };
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="health-gradient p-4 flex justify-between items-center">
          <h3 className="text-white font-medium">Health Assistant</h3>
          <div className="flex items-center gap-2">
            <LanguageSelector variant="minimal" />
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
        
        <div className="h-[calc(100%-128px)] overflow-y-auto p-4">
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ChatbotMessage
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
                urgency={message.urgency}
              />
              
              {!message.isUser && message.showHospitalFinder && (
                <div className="mb-4 max-w-[85%] mr-auto">
                  <HospitalFinder 
                    symptoms={message.symptoms} 
                    urgency={message.urgency}
                  />
                </div>
              )}
              
              {!message.isUser && message.dietRecommendation && (
                <div className="mb-4 max-w-[85%] mr-auto">
                  <CompactDietRecommendation 
                    diet={message.dietRecommendation}
                    detectedConditions={message.detectedConditions}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
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
              className={`h-10 w-10 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600 pulse-animation' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
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
      
      <div 
        className="chatbot-trigger health-gradient ml-auto"
        onClick={toggleChatbot}
      >
        <MessageSquare size={22} />
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 left-8 health-gradient rounded-full h-12 w-12 p-0 flex items-center justify-center shadow-highlight"
            title="Find nearby hospitals"
          >
            <MapPin size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Find Nearby Medical Facilities</DialogTitle>
          </DialogHeader>
          <HospitalFinder />
        </DialogContent>
      </Dialog>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 left-24 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full h-12 w-12 p-0 flex items-center justify-center shadow-highlight"
            title="Diet Recommendations"
          >
            <Utensils size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Diet Recommendations</DialogTitle>
          </DialogHeader>
          <DietRecommendations />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatbotInterface;
