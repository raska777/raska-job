// app/layout.tsx
import './globals.css';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n'; // Import i18n configuration
import { LanguageSwitcher } from './components/LanguageSwitcher'; // Tilni o'zgartirish uchun komponent

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <html lang={i18n.language}>
      <body>
        <div>
          <LanguageSwitcher />
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </body>
    </html>
  );
}
