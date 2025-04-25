// i18n.ts

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'uz', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) notFound();

  const messages = (await import(`app/messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    now: new Date(),
    timeZone: 'Asia/Tashkent',
  };
});