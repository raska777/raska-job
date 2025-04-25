import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { AuthProvider } from '../providers';

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Validate locale
  const locales = ['en', 'uz', 'ru'];
  const locale = params.locale;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load messages
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Asia/Tashkent"
          >
            {children}
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'uz' },
    { locale: 'ru' }
  ];
}