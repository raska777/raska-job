import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { type AbstractIntlMessages } from 'next-intl';

const locales = ['en', 'uz', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  // Kelayotgan locale parametrini tekshiramiz
  if (!locales.includes(locale as any)) notFound();

  // JSON fayldan tarjimalarni yuklaymiz
  const messages: AbstractIntlMessages = (await import(`./messages/${locale}.json`)).default;

  // To'g'ri strukturadagi obyektni qaytaramiz
  return {
    locale: locale,  // locale maydonini qo'shdik
    messages,
    now: new Date(),
    timeZone: 'Asia/Tashkent'
  };
});