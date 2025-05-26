import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ha' : 'en');
  };

  return (
    <button
      className="group flex items-center space-x-1 rounded-full border border-white bg-white px-3 py-1 text-sm text-green-700 transition-colors hover:bg-green-100 hover:text-green-800 hover:border-green-200 shadow"
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4 text-green-700 group-hover:text-green-800" />
      <span>{language === 'en' ? 'English' : 'Hausa'}</span>
    </button>
  );
};

export default LanguageSwitcher;