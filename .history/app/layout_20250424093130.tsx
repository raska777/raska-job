
// "use client";
// import { NextIntlClientProvider } from 'next-intl';
// import { SessionProvider } from "next-auth/react"; // Auth provayder

// export default function RootLayout({ children }: { children: React.ReactNode }) {

//   return (
//     <html lang={locale}>
//       <body>
//         <SessionProvider>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
// import { SessionProvider } from "next-auth/react"; // Auth provayder

// export default async function LocaleLayout({
//   children,
//   params: { locale }
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   const messages = await getMessages();

//   return (
//     <html lang={locale}>
//       <body>
        
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <SessionProvider>          {children}</SessionProvider>

//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

// import { getMessages } from 'next-intl/server';
// import { notFound } from 'next/navigation';
// import { Providers } from '@/app/providers';

// type Props = {
//   children: React.ReactNode;
//   params: { 
//     locale: 'en' | 'ko' | 'ru' | 'uz';
//   };
// };

// export default async function LocaleLayout({
//   children,
//   params: { locale }
// }: Props) {
//   // Til parametrini tekshirish
//   if (!['en', 'ko', 'ru', 'uz'].includes(locale)) notFound();

//   const messages = await getMessages({ locale });

//   return (
//     <html lang={locale}>
//       <body>
//         <Providers locale={locale} messages={messages}>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
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