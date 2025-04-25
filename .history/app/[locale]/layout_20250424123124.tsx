import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export const dynamicParams = false; // Static generation uchun

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const locales = ['en', 'uz', 'ru'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  // Locale ni tekshirish
  if (!locales.includes(params.locale)) notFound();

  // Xabarlarni yuklash
  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`)).default;
  } catch (error) {
    console.error('Xabarlar yuklanmadi:', error);
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider
          locale={params.locale}
          messages={messages}
          timeZone="Asia/Tashkent"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}