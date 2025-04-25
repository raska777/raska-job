// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // now `request.nextUrl` exists
  const lang = request.nextUrl.pathname.split('/')[1]; // e.g. "/uz/some-path" → "uz"
  const locales = ['uz', 'en', 'ru', 'ko'];

  if (!locales.includes(lang)) {
    // redirect to default locale
    return NextResponse.redirect(new URL(`/uz${request.nextUrl.pathname}`, request.url));
  }

  return NextResponse.next();
}

// apply to all non-static, non-api routes
export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
