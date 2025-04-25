import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { translateText } from './lib/translate';

// Qo'llab-quvvatlanadigan tillar
const locales = ['en', 'uz', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  // Agar til qo'llab-quvvatlanmasa
  if (!locales.includes(locale as any)) notFound();

  // Asosiy til fayllari (masalan, inglizcha)
  const baseMessages = (await import(`app/messages/en.json`)).default;

  // Agar inglizcha bo'lsa, tarjima qilish shart emas
  if (locale === 'en') {
    return {
      messages: baseMessages
    };
  }

  // DeepL orqali tarjima qilish
  const translatedMessages = {};
  
  for (const key in baseMessages) {
    const value = baseMessages[key];
    translatedMessages[key] = await translateText(value, locale.toUpperCase());
  }

  return {
    messages: translatedMessages
  };
});