import createMiddleware from 'next-intl/middleware';
import config from './next-intl.config';

export default createMiddleware(config);

export const configMiddleware = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
