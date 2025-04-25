// next-intl.config.ts
import { NextIntlConfig } from 'next-intl';

const config: NextIntlConfig = {
  locales: ['en', 'ko', 'ru', 'uz'],
  defaultLocale: 'uz',
  localePrefix: 'always' // URL har doim tilni o'z ichiga oladi: /en, /ko, ...
};

export default config;
