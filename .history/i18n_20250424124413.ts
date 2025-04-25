import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'uz', 'ru'];

export default getRequestConfig(async ({ locale: message }) => {
  if (!locales.includes(message as any)) notFound();

  return {
    message = (await import(`../../messages/${locale}.json`)).default;
    now: new Date(),
    timeZone: 'Asia/Tashkent'
  };
});