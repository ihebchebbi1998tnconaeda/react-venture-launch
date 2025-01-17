import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from './language/LanguageProvider';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
            <Globe className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('en')}
            className={language === 'en' ? 'bg-accent' : ''}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleLanguageChange('fr')}
            className={language === 'fr' ? 'bg-accent' : ''}
          >
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;