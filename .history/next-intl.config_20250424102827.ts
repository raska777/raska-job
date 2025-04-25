import { LocalePrefix } from 'next-intl'; // `LocalePrefix` import qilish

const config = {
  locales: ['uz', 'en', 'ru', 'ko'],
  defaultLocale: 'uz',
  // `localePrefix` uchun to‘g‘ri qiymat kiritish
  localePrefix: 'always' as LocalePrefix<string[], 'always' | 'as-needed' | 'never'>,
};

export default config;
