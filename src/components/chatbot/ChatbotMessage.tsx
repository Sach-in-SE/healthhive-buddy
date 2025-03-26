
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatbotMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ content, isUser, timestamp }) => {
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
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
      >
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
