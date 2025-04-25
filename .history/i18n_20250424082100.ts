// i18n.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import type {AbstractIntlMessages} from 'next-intl';

const locales = ['en', 'ko', 'ru', 'uz'];

export default getRequestConfig(async ({locale}) => {
  // TypeScript xatolarini oldini olish
  if (!locales.includes(locale as any)) notFound();

  // Xavfsiz import qilish
  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../public/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return {
    locale, // Majburiy
    messages,
    now: new Date(), // Vaqt zonasi uchun
    timeZone: 'Asia/Tashkent' // ixtiyoriy
  };
});