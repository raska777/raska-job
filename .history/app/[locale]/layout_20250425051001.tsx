// app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const locales = ['uz', 'en', 'ru', 'ko'];

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Har doim `locale` qiymatini set qilish kerak
  unstable_setRequestLocale(locale);

  // Agar noto‘g‘ri locale kelsa, 404 sahifaga otkazamiz
  if (!locales.includes(locale)) notFound();

  // Tarjima faylini yuklaymiz
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
