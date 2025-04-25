// i18n.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'ko', 'ru', 'uz'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale)) notFound();

  return {
    locale, // <-- locale ni qo'shish majburiy
    messages: (await import(`../public/locales/${locale}.json`)).default,
    now: new Date() // ixtiyoriy, lekin tavsiya etiladi
  };
});