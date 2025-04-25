import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './next-intl.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
