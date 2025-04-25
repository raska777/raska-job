// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'ko', 'ru', 'uz'],
//   defaultLocale: 'uz', // O‘zbek tilini standart qilish
//   localePrefix: 'always' // Har doim URLda til kodini ko‘rsatish (/en/about)
// });

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };
import createMiddleware from 'next-intl/middleware';
import config from 'next-intl.config';

export default createMiddleware(config);

export const configMiddleware = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
