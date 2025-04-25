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
  // `params` asinxron API bo'lgani uchun uni `await` qilib olish zarur
  const { locale } = await params; // params`ni kutamiz

  let messages;
  try {
    // locale ni olish uchun getMessages methodidan foydalanamiz
    messages = await getMessages({ locale });
  } catch (e) {
    // Agar tarjima fayli topilmasa, 404 sahifasiga o'tish
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
