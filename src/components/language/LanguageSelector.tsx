
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSelectorProps {
  variant?: 'minimal' | 'full';
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'full',
  className = ''
}) => {
  const { currentLanguage, setLanguage, availableLanguages, isRTL } = useLanguage();
  
  const currentLanguageInfo = availableLanguages.find(
    lang => lang.code === currentLanguage
  );
  
  const currentLanguageName = currentLanguageInfo?.name || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant === 'minimal' ? 'ghost' : 'outline'} 
          size={variant === 'minimal' ? 'icon' : 'sm'}
          className={`${variant === 'minimal' ? 'rounded-full h-8 w-8 p-0' : ''} ${className}`}
        >
          <Globe size={variant === 'minimal' ? 16 : 14} className={variant === 'minimal' ? '' : 'mr-2'} />
          {variant === 'full' && (
            <>
              <span>{currentLanguageName}</span>
              {isRTL && <span className="ml-1 text-xs bg-amber-100 px-1 rounded text-amber-700">RTL</span>}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="dropdown-align-right">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`cursor-pointer flex justify-between ${currentLanguage === language.code ? 'bg-blue-50' : ''}`}
          >
            <span>{language.name}</span>
            <div className="flex items-center">
              {language.isRTL && (
                <span className="mr-2 text-xs bg-amber-100 px-1 rounded text-amber-700">RTL</span>
              )}
              {currentLanguage === language.code && (
                <span className="text-blue-600">✓</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
