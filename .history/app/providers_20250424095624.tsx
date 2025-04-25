'use client';

import { SessionProvider } from 'next-auth/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'app/api/i18n/client';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export function Providers({ children, locale }: ProvidersProps) {
  // Tilni o'rnatish
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <SessionProvider>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </SessionProvider>
  );
}