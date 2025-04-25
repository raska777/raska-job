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
  // params.locale ni to'g'ri kutish kerak, async/await ishlatish
  const { locale } = params; // params bu erda to'g'ridan-to'g'ri ishlatiladi

  let messages;
  try {
    // getMessages faqat locale'ni qabul qiladi, shuning uchun params.locale ishlatiladi
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
