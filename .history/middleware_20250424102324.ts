import createMiddleware from 'next-intl/middleware';
import { config } from 'next-intl.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
