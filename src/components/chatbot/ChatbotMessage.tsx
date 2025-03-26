
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { speakText } from '@/utils/voiceUtils';

interface ChatbotMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  urgency?: 'low' | 'medium' | 'high';
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ 
  content, 
  isUser, 
  timestamp,
  urgency
}) => {
  // Get background color based on urgency level
  const getUrgencyStyles = () => {
    if (!urgency || isUser) return '';
    
    switch (urgency) {
      case 'low':
        return 'bg-[#F2FCE2] border-l-4 border-green-500';
      case 'medium':
        return 'bg-[#FEF7CD] border-l-4 border-yellow-500';
      case 'high':
        return 'bg-red-100 border-l-4 border-red-500';
      default:
        return '';
    }
  };

  const getUrgencyIcon = () => {
    if (!urgency || isUser) return null;
    
    switch (urgency) {
      case 'low':
        return <Info size={16} className="mr-1 text-green-600" />;
      case 'medium':
        return <HelpCircle size={16} className="mr-1 text-yellow-600" />;
      case 'high':
        return <AlertTriangle size={16} className="mr-1 text-red-600" />;
      default:
        return null;
    }
  };

  const getUrgencyTitle = () => {
    if (!urgency || isUser) return '';
    
    switch (urgency) {
      case 'low':
        return 'Mild Concern - Self Care Recommended';
      case 'medium':
        return 'Moderate Concern - Medical Consultation Advised';
      case 'high':
        return 'Urgent Medical Attention Recommended';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        "mb-4 max-w-[85%] chat-message-appear",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <div 
        className={cn(
          "px-4 py-3 rounded-2xl text-sm",
          isUser 
            ? "bg-health-500 text-white rounded-tr-none" 
            : urgency
              ? getUrgencyStyles()
              : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
      >
        {!isUser && urgency && (
          <div className={cn(
            "flex items-center mb-2 font-medium",
            urgency === 'low' ? "text-green-600" : 
            urgency === 'medium' ? "text-yellow-600" : "text-red-600"
          )}>
            {getUrgencyIcon()}
            <span>{getUrgencyTitle()}</span>
          </div>
        )}
        {content}
      </div>
      <div 
        className={cn(
          "text-xs mt-1 text-gray-400",
          isUser ? "text-right" : "text-left"
        )}
      >
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatbotMessage;
