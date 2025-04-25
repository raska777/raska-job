import createMiddleware from 'next-intl/middleware';
import intlConfig from './next-intl.config'; // ⚠️ config nomini o'zgartirdik!

export default createMiddleware(intlConfig);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
