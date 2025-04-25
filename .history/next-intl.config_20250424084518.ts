import { LocalePrefix } from 'next-intl';

const config = {
  locales: ['en', 'ko', 'ru', 'uz'],
  defaultLocale: 'uz',
  localePrefix: 'always' as LocalePrefix<string[], 'always' | 'never'>, // Correct type for localePrefix
};

export default config;
