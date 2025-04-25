import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages } from 'i18';

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  const lang = acceptLanguage.get(req.headers.get('accept-language')) || fallbackLng;
  const pathname = req.nextUrl.pathname;

  if (
    !languages.some((lng) => pathname.startsWith(`/${lng}`)) &&
    !pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
