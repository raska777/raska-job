
"use client";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SessionProvider } from "next-auth/react"; // Auth provayder
import en from 'zod/locales/en.js';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang={en}>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}