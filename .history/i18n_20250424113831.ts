import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { translateText } from './lib/translate';

// Qo'llab-quvvatlanadigan tillar
const locales = ['en', 'uz', 'ru'];

// Message lar uchun interface
interface AppMessages {
  [key: string]: string;
  profile: string;
  allCities: string;
  "ish nomi...": string;
  search: string;
  RaskaJob: string;
  loginToPost: string;
  notLoggedIn: string;
  searchResults: string;
  in: string;
  inAllCities: string;
  allJobs: string;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) notFound();

  const baseMessages: AppMessages = (await import(`../messages/en.json`)).default;
  
  if (locale === 'en') {
    return {
      locale: 'en',
      messages: baseMessages,
      now: new Date()
    };
  }

  const translatedMessages: Record<string, string> = {};
  
  // Kalitlarni aniq tekshirib olish
  const messageKeys = Object.keys(baseMessages) as Array<keyof AppMessages>;
  
  for (const key of messageKeys) {
    translatedMessages[key] = await translateText(baseMessages[key], locale.toUpperCase());
  }

  return {
    locale,
    messages: translatedMessages,
    now: new Date()
  };
});