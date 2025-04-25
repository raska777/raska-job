import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['uz', 'en', 'ru', 'ko'] as const;
export const defaultLocale = 'uz';

export default getRequestConfig(async ({ locale }) => {
  // Agar locale undefined bo'lsa, default localeni ishlatamiz
  const validatedLocale = locale || defaultLocale;

  // Til mavjudligini tekshiramiz
  if (!locales.includes(validatedLocale as any)) {
    notFound();
  }

  try {
    // Root papkadagi messages papkasidan import qilamiz
    const messages = (await import(`../messages/${validatedLocale}.json`)).default;
    
    return {
      locale: validatedLocale,
      messages,
      now: new Date(),
      timeZone: 'Asia/Tashkent'
    };
  } catch (error) {
    console.error('Xatolik yuz berdi:', error);
    notFound();
  }
});