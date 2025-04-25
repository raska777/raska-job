import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { translateText } from './lib/translate';

// Qo'llab-quvvatlanadigan tillar
const locales = ['en', 'uz', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  // Agar til qo'llab-quvvatlanmasa yoki locale undefined bo'lsa
  if (!locale || !locales.includes(locale)) notFound();

  // Asosiy til fayllari (masalan, inglizcha)
  const baseMessages = (await import(`app/messages/en.json`)).default;

  // Agar inglizcha bo'lsa, tarjima qilish shart emas
  if (locale === 'en') {
    return {
      locale: 'en', // locale qo'shildi
      messages: baseMessages,
      now: new Date() // vaqt ma'lumoti
    };
  }

  // DeepL orqali tarjima qilish
  const translatedMessages: Record<string, string> = {};
  
  for (const key in baseMessages) {
    const value = baseMessages[key];
    translatedMessages[key] = await translateText(value, locale.toUpperCase());
  }

  return {
    locale: locale, // locale qo'shildi
    messages: translatedMessages,
    now: new Date() // vaqt ma'lumoti
  };
});