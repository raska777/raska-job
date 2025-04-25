// i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: 'uz', // Default language
    fallbackLng: 'uz', // Fallback language
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
