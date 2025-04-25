import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export default async function LocaleLayout({children, params}: Props) {
  // Extract locale from params
  const locale = params.locale;

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Generate static paths for SSG
export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'uz'}, {locale: 'ru'}];
}