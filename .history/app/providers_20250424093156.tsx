// app/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextIntlClientProvider 
        locale={locale} 
        messages={messages}
        // Agar xabarlar yuklanmagan bo'lsa, error bermaslik uchun
        onError={(error) => console.error(error)}
        getMessageFallback={({ key }) => key}
      >
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}