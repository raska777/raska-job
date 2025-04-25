import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { AuthProvider } from '../providers';

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function LocaleLayout({ children, params }: Props) {
  // Validate the locale
  const locales = ['en', 'uz', 'ru'];
  if (!locales.includes(params.locale)) notFound();

  // Dynamically load messages
  let messages;
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider
            locale={params.locale}
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
  return [{ locale: 'en' }, { locale: 'uz' }, { locale: 'ru' }];
}