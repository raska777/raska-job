// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ko', 'ru'],
  defaultLocale: 'en',
  localePrefix: 'always' // yoki 'always' | 'never'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};