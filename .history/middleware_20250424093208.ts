// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'ko', 'ru', 'uz'];
const defaultLocale = 'uz';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // URL manzilidan tilni aniqlash
  const pathLocale = locales.find(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Agar til aniqlanmagan bo'lsa, default tilga yo'naltirish
  if (!pathLocale) {
    return Response.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};