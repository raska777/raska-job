// middleware.ts
// middleware.ts
// import createMiddleware from 'next-intl/middleware';
// import { NextRequest, NextResponse } from 'next/server';

// const locales = ['en', 'ko', 'ru', 'uz'];

// export default function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (!pathnameHasLocale) {
//     return NextResponse.redirect(new URL('/uz', request.url));
//   }

//   return createMiddleware({
//     locales,
//     defaultLocale: 'uz',
//     localePrefix: 'always'
//   })(request);
// }

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
// };
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'ko', 'ru', 'uz'];
const defaultLocale = 'uz';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Tilni pathdan ajratib olish
  const pathLocale = locales.find(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Agar til yo'q bo'lsa, default tilga yo'naltirish
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