// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ko', 'ru', 'uz'],
  defaultLocale: 'uz',
  localePrefix: 'always' // yoki 'always' | 'never'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};