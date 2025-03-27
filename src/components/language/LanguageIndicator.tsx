
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LanguageIndicatorProps {
  className?: string;
  showRTL?: boolean;
}

const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ 
  className = '',
  showRTL = true
}) => {
  const { currentLanguage, availableLanguages, isRTL } = useLanguage();
  
  const currentLanguageName = availableLanguages.find(
    lang => lang.code === currentLanguage
  )?.name || 'English';

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Globe size={14} className="text-gray-500" />
      <span className="text-sm font-medium">{currentLanguageName}</span>
      {showRTL && isRTL && (
        <Badge variant="outline" className="text-xs h-5 px-1.5 border-amber-300 text-amber-700 bg-amber-50">
          RTL
        </Badge>
      )}
    </div>
  );
};

export default LanguageIndicator;
