
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LanguageIndicatorProps {
  className?: string;
  showRTL?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ 
  className = '',
  showRTL = true,
  size = 'md'
}) => {
  const { currentLanguage, availableLanguages, isRTL } = useLanguage();
  
  const currentLanguageInfo = availableLanguages.find(
    lang => lang.code === currentLanguage
  );
  
  const currentLanguageName = currentLanguageInfo?.name || 'English';
  
  // Size variations
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Globe size={iconSizes[size]} className="text-gray-500" />
      <span className={`${textSizes[size]} font-medium`}>{currentLanguageName}</span>
      {showRTL && isRTL && (
        <Badge variant="outline" className={`${size === 'sm' ? 'text-xs h-4 px-1' : 'text-xs h-5 px-1.5'} border-amber-300 text-amber-700 bg-amber-50`}>
          RTL
        </Badge>
      )}
    </div>
  );
};

export default LanguageIndicator;
