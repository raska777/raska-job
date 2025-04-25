// // middleware.ts
// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'ko', 'ru', 'uz'],
//   defaultLocale: 'uz',
//   localePrefix: 'always' // yoki 'always' | 'never'
// });

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };
import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './i18n-config'; // Agar alohida config fayli bo'lsa

export default createMiddleware({
  locales: ['en', 'ko', 'ru', 'uz'],
  defaultLocale: 'uz',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};