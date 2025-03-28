
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
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  variant?: 'minimal' | 'full';
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'full',
  className = ''
}) => {
  const { currentLanguage, setLanguage, availableLanguages, isRTL } = useLanguage();
  const { t } = useTranslation();
  
  const currentLanguageName = availableLanguages.find(
    lang => lang.code === currentLanguage
  )?.name || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant === 'minimal' ? 'ghost' : 'outline'} 
          size={variant === 'minimal' ? 'icon' : 'sm'}
          className={`${variant === 'minimal' ? 'rounded-full h-8 w-8 p-0' : ''} ${className}`}
        >
          <Globe size={variant === 'minimal' ? 16 : 14} className={variant === 'minimal' ? '' : 'mr-2'} />
          {variant === 'full' && <span>{currentLanguageName}</span>}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className={isRTL ? 'rtl-menu' : ''}>
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`cursor-pointer ${currentLanguage === language.code ? 'bg-blue-50' : ''}`}
          >
            {language.name}
            {currentLanguage === language.code && (
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-blue-600`}>✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
