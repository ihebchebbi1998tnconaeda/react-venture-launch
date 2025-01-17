import React, { createContext, useContext, useEffect, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'en,fr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  useEffect(() => {
    const translateLanguage = (languageCode: string) => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = languageCode;
        selectElement.dispatchEvent(new Event('change'));
      }
    };

    // Clean up Google Translate UI elements
    const cleanup = () => {
      const elements = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate');
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none';
        }
      });
      document.body.style.top = '0px';
    };

    translateLanguage(language);
    cleanup();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div id="google_translate_element" style={{ display: 'none' }} />
      {children}
    </LanguageContext.Provider>
  );
};