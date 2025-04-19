// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to RaskaJob',
        postJob: 'Post a Job',
        myJobs: 'My Jobs',
      },
    },
    uz: {
      translation: {
        welcome: 'RaskaJobga xush kelibsiz',
        postJob: 'Ish e\'lonini joylashtirish',
        myJobs: 'Mening e\'lonlarim',
      },
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React bilan ishlaganda bu kerak emas
  },
});

export default i18n;
