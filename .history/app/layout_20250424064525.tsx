// app/layout.tsx
'use client';

import '../globals.css';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
// IMPORTni to‘g‘ri yo‘l: loyha ildizidagi i18n.ts
import i18n from '../i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();  // agar global namespace bo‘lsa

  return (
    <html lang={i18n.language}>
      <body>
        <LanguageSwitcher />
        <Suspense fallback={<div>Loading translations…</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
