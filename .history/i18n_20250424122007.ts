import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { type AbstractIntlMessages } from 'next-intl';

// Supported locales
const locales = ['en', 'uz', 'ru'];

interface RequestConfig {
  locale: string;
  messages: AbstractIntlMessages;
  now: Date;
  timeZone?: string;
}

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  // Validate the incoming locale parameter
  if (!locales.includes(locale as any)) notFound();

  // Load messages
  const messages: AbstractIntlMessages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale, // Include the locale in the return object
    messages,
    now: new Date(), // Required field
    timeZone: 'Asia/Tashkent' // Optional but recommended
  };
});