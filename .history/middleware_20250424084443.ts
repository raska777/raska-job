// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'ko', 'ru', 'uz'],
//   defaultLocale: 'uz', // O‘zbek tilini standart qilish
//   localePrefix: 'always' // Har doim URLda til kodini ko‘rsatish (/en/about)
// });

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };

import { LocalePrefix } from 'next-intl';

const config = {
  locales: ['en', 'ko', 'ru', 'uz'],
  defaultLocale: 'uz',
  localePrefix: 'always' as LocalePrefix<string[], 'always' | 'never'>, // Correct type for localePrefix
};

export default config;
