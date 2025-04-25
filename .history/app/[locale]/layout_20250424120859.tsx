// app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  // Load the proper messages file (make sure messages/*.json exists)
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return notFound(); // if there's no messages/xx.json → 404
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
