// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const lang = request.nextUrl.pathname.split('/')[1]; // /uz/some-path
  const locales = ['uz', 'en', 'ru', 'ko'];

  if (!locales.includes(lang)) {
    return NextResponse.redirect(new URL('/uz', request.url)); // Default lang is Uzbek
  }

  return NextResponse.next();
}
