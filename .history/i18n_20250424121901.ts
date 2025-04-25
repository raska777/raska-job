// /i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Supported locales
const locales = ['en', 'uz', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  // Validate the incoming locale parameter
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});