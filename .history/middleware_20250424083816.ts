// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'ko', 'ru', 'uz'],
//   defaultLocale: 'uz', // O‘zbek tilini standart qilish
//   localePrefix: 'always' // Har doim URLda til kodini ko‘rsatish (/en/about)
// });

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';

const locales = ['en', 'uz', 'ru', 'ko'];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) notFound();

  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return {
    locale,
    messages,
  };
});
