
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


import { Providers } from '@/app/providers'; // Yangi fayl yaratishingiz kerak

export default async function LocaleLayout({ children, params: { locale } }: Props) {
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