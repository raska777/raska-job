// app/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // JSON fayllardan tarjima olish uchun
  .use(LanguageDetector) // brauzer tilini aniqlash
  .use(initReactI18next) // react bilan ulash
  .init({
    fallbackLng: 'uz', // default til
    supportedLngs: ['uz', 'en', 'ru', 'ko'],
    debug: false,
    interpolation: {
      escapeValue: false, // react uchun kerak emas
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // tarjima fayllar yo‘li
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
