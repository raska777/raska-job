// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // params.locale'ni await qilish
  const locale = await params.locale;

  let messages;

  try {
    messages = await getMessages({ locale });
  } catch (error) {
    notFound(); // Til fayli topilmasa, 404 sahifasiga yo‘naltiriladi
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
