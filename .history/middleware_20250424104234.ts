import createMiddleware from 'next-intl/middleware';
import config from './next-intl.config'; // ✅ default import
export default createMiddleware(config);

export const configMiddleware = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
