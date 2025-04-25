import { i18n } from 'next-i18next.config';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { initI18next } from 'react-i18next';

const serverI18n = initI18next({
  ...i18n,
  backend: {
    loadPath: `${process.cwd()}/public/locales/{{lng}}/{{ns}}.json`,
  },
});

serverI18n.use(Backend).use(initReactI18next);

export default serverI18n;