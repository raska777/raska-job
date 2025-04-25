
// "use client";
// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
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

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RaskaJob',
  description: 'Multilingual job board for Central Asia & Korea'
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
      <SessionProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          
            {children}
        </NextIntlClientProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
