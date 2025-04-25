
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

import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/app/providers';

type Props = {
  children: React.ReactNode;
  params: { 
    locale: 'en' | 'ko' | 'ru' | 'uz';
  };
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Til parametrini tekshirish
  if (!['en', 'ko', 'ru', 'uz'].includes(locale)) notFound();

  const messages = await getMessages({ locale });

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