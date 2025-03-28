
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/language/LanguageSelector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-lg health-gradient"></span>
          <span className="text-lg font-semibold">HealthAssist</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-health-600 transition-colors">
              {t('common.home')}
            </Link>
            <Link to="/symptoms" className="text-sm font-medium hover:text-health-600 transition-colors">
              {t('common.symptomChecker')}
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-health-600 transition-colors">
              {t('common.about')}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button size="sm" className="health-gradient hover:shadow-highlight transition-all">
              {t('common.signIn')}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ${
          isMenuOpen ? 'max-h-80 border-b' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Link 
            to="/" 
            className="py-2 text-sm font-medium hover:text-health-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('common.home')}
          </Link>
          <Link 
            to="/symptoms" 
            className="py-2 text-sm font-medium hover:text-health-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('common.symptomChecker')}
          </Link>
          <Link 
            to="/about" 
            className="py-2 text-sm font-medium hover:text-health-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('common.about')}
          </Link>
          <div className="flex items-center gap-2 py-2">
            <LanguageSelector />
            <Button 
              size="sm" 
              className="health-gradient hover:shadow-highlight transition-all grow"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.signIn')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
