// middleware.ts
import createMiddleware from 'next-intl/middleware';
import config from './next-intl.config'; // default sifatida import qilish

export default createMiddleware(config);

export const configMiddleware = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
