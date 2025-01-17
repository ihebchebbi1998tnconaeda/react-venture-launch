import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en';
import frTranslations from './locales/fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    lng: 'fr', // Default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;