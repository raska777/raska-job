export const locales = ['uz', 'en', 'ru', 'ko'] as const;
export const defaultLocale = 'uz' as const;

export type Locale = (typeof locales)[number];

export const localePrefix = 'as-needed'; // 'always' | 'never'

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    uz: '/haqida',
    ru: '/o-nas',
    ko: '/gwanhan-yeongu'
  }
} as const;