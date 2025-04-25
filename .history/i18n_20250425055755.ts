import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['uz', 'en', 'ru', 'ko'] as const;
export const defaultLocale = 'uz';

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    now: new Date(),
    // timeZone: 'Asia/Tashkent' // Agar kerak bo'lsa
  };
});