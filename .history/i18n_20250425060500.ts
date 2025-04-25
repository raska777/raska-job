import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from '/config/i18n-config';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale: locale, // locale maydonini qo'shish majburiy
    messages: (await import(`../messages/${locale}.json`)).default,
    now: new Date(), // tavsiya etilgan
    timeZone: 'Asia/Tashkent' // ixtiyoriy
  };
});