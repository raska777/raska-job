export const locales = ['uz', 'en', 'ru', 'ko'] as const;
export const defaultLocale = 'uz';

export type Locale = (typeof locales)[number];
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Mavjud tillar ro'yxati

export default getRequestConfig(async ({locale}) => {
  // So'ralgan til mavjudligini tekshirish
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});