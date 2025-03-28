import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, AlertTriangle, Mic, Volume2, VolumeX, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import ChatbotMessage from './ChatbotMessage';
import { initSpeechRecognition, speakText, isSpeaking, stopSpeaking } from '@/utils/voiceUtils';
import HospitalFinder from '@/components/hospitals/HospitalFinder';
import LanguageSelector from '@/components/language/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
  showHospitalFinder?: boolean;
  symptoms?: string[];
}

const ChatbotInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    setMessages([{
      id: '1',
      content: t('chatbot.welcomeMessage'),
      isUser: false,
      timestamp: new Date(),
    }]);
  }, [currentLanguage, t]);

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
      toast.info(t('chatbot.listening'), {
        description: t('chatbot.speakClearly'),
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
    const symptomKeywords = [
      'pain', 'ache', 'fever', 'cough', 'headache', 'nausea', 
      'dizzy', 'tired', 'fatigue', 'weakness', 'rash', 'sore throat',
      'chest', 'breathing', 'stomach', 'vomit', 'diarrhea', 'blood pressure',
      'joint', 'muscle', 'back', 'neck', 'migraine', 'cold', 'flu'
    ];
    
    return symptomKeywords.filter(symptom => 
      message.toLowerCase().includes(symptom)
    );
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
        toast.error(t('chatbot.urgentAttention'), {
          description: t('chatbot.contactProvider'),
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
    
    const urgentSymptoms = ['chest pain', 'difficulty breathing', 'unconscious', 'seizure', 'stroke', 'severe bleeding', 'poisoning'];
    const moderateSymptoms = ['fever', 'persistent pain', 'vomiting', 'diarrhea', 'dehydration', 'infection'];
    const mildSymptoms = ['headache', 'cold', 'cough', 'sore throat', 'runny nose', 'mild pain'];
    
    const isAskingForHospital = 
      lowerCaseMessage.includes('hospital') || 
      lowerCaseMessage.includes('doctor') || 
      lowerCaseMessage.includes('emergency') ||
      lowerCaseMessage.includes('clinic') ||
      lowerCaseMessage.includes('medical center');
    
    const hasUrgentSymptoms = urgentSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    const hasModerateSymptoms = moderateSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    const hasMildSymptoms = mildSymptoms.some(symptom => lowerCaseMessage.includes(symptom));
    
    if (hasUrgentSymptoms || isAskingForHospital) {
      urgency = 'high';
      content = t('chatbot.urgentMessage');
      showHospitalFinder = true;
    } else if (hasModerateSymptoms) {
      urgency = 'medium';
      content = t('chatbot.moderateMessage');
      showHospitalFinder = lowerCaseMessage.includes('where') || lowerCaseMessage.includes('find');
    } else if (hasMildSymptoms) {
      urgency = 'low';
      content = t('chatbot.mildMessage');
    } else if (lowerCaseMessage.includes('symptom') || lowerCaseMessage.includes('sick') || lowerCaseMessage.includes('pain')) {
      content = t('chatbot.symptomHelp');
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      content = t('chatbot.greeting');
    } else if (lowerCaseMessage.includes('thank')) {
      content = t('chatbot.thankYou');
    } else if (lowerCaseMessage.includes('hospital') || lowerCaseMessage.includes('doctor') || lowerCaseMessage.includes('emergency')) {
      content = t('chatbot.hospitalSearch');
      showHospitalFinder = true;
    } else {
      content = t('chatbot.needMoreInfo');
    }
    
    return {
      id: (Date.now() + 1).toString(),
      content,
      isUser: false,
      timestamp: new Date(),
      urgency,
      showHospitalFinder,
      symptoms: extractedSymptoms
    };
  };

  return (
    <div className="chatbot-container" dir={isRTL ? 'rtl' : 'ltr'}>
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
              placeholder={t('chatbot.placeholder')}
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
            title={t('common.findHospitals')}
          >
            <MapPin size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('hospitals.findFacilities')}</DialogTitle>
          </DialogHeader>
          <HospitalFinder />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatbotInterface;
