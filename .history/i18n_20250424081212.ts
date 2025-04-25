// i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Qo'llab-quvvatlanadigan tillar ro'yxati
const locales = ['en', 'ko', 'ru', 'uz'];

export default getRequestConfig(async ({ locales }) => {
  // Agar so'ralgan til ro'yxatda bo'lmasa, 404 qaytar
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default
  };
});