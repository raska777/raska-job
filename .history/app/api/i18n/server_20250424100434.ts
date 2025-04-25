// src/i18n/server.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { i18nConfig } from 'app/api/i18n/i18n-config';

export async function createServerI18n(locale: string, ns: string[] = ['common']) {
  const instance = i18next.createInstance();

  await instance
    .use(Backend)
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      lng: locale,
      ns,
      backend: {
        loadPath: `${process.cwd()}/public/locales/{{lng}}/{{ns}}.json`,
      },
      initImmediate: false, // Sinxron tarzda ishlashi uchun
    });

  return instance;
}