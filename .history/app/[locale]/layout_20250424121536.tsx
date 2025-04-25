import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate the requested locale
  const locales = ['en', 'uz', 'ru']; // Supported locales
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the given locale
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider 
          locale={locale} 
          messages={messages}
          timeZone="Asia/Tashkent" // Optional: Set your timezone
          now={new Date()} // Optional: Provide current date
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'uz' }, { locale: 'ru' }];
}