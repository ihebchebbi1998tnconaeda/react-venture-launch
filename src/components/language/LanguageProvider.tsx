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
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'fr';
  });

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
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    return () => {
      // Cleanup
      delete window.googleTranslateElementInit;
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    const translateLanguage = (languageCode: string) => {
      // Wait for Google Translate to be ready
      const waitForGoogleTranslate = setInterval(() => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          clearInterval(waitForGoogleTranslate);
          select.value = languageCode;
          select.dispatchEvent(new Event('change'));
          
          // Clean up Google Translate UI elements
          const elements = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate');
          elements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
            }
          });
          
          // Reset body position
          document.body.style.top = '0px';
          
          // Store the language preference
          localStorage.setItem('preferredLanguage', languageCode);
        }
      }, 100);

      // Clear interval after 5 seconds to prevent infinite loop
      setTimeout(() => clearInterval(waitForGoogleTranslate), 5000);
    };

    console.log('Language changed to:', language);
    translateLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div id="google_translate_element" style={{ display: 'none' }} />
      {children}
    </LanguageContext.Provider>
  );
};