export const locales = ['uz', 'en', 'ru', 'ko'] as const;
export const defaultLocale = 'uz';

export type Locale = (typeof locales)[number];
