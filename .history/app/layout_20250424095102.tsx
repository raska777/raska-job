
// app/layout.tsx
import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { Providers } from './providers';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'My App',
  description: 'Internationalized application',
};

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  // Qo'llab-quvvatlanadigan tillar ro'yxati
  const supportedLocales = ['en', 'ko', 'ru', 'uz'];
  const defaultLocale = 'uz';

  // Agar so'ralgan til qo'llab-quvvatlanmasa, default tilga o'tkazish
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  // Xabarlarni yuklash
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error('Failed to load messages:', error);
    messages = await getMessages({ locale: defaultLocale });
  }

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}