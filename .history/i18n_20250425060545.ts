import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './config/i18n-config';

export default getRequestConfig(async ({locale}) => {
  // Agar locale undefined bo'lsa, default localeni ishlatamiz
  const validatedLocale = locale || defaultLocale;
  
  // Til mavjudligini tekshiramiz
  if (!locales.includes(validatedLocale as any)) {
    notFound();
  }

  return {
    locale: validatedLocale, // Endi locale har doim string bo'ladi
    messages: (await import(`../messages/${validatedLocale}.json`)).default,
    now: new Date(),
    timeZone: 'Asia/Tashkent'
  };
});