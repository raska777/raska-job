import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages } from './i18n/settings';

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    languages.some((lng) => pathname.startsWith(`/${lng}`))
  ) {
    return;
  }

  const language = acceptLanguage.get(req.headers.get('accept-language')) || fallbackLng;
  return NextResponse.redirect(new URL(`/${language}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
