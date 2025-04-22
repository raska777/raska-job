'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '@/context/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      <LanguageProvider>
        {children}
      </LanguageProvider>
  );
}
