// app/layout.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
import 'styles/global.css'; // Tailwind asosiy CSS
import 'styles/custom.css'; // Ixtiyoriy custom style
import 'react-toastify/dist/ReactToastify.css';
import "i18n.ts"; // i18nni import qilish

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LanguageSwitcher />
          <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            {children}
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
