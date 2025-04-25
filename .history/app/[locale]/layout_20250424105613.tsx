// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // ✳️ `params` async API boʻlgani uchun await qilamiz
  const { locale } = await params;

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (e) {
    notFound(); // tarjima fayli topilmasa 404
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
