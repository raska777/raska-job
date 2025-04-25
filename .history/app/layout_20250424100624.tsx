// import type { Metadata } from 'next';
// import { Providers } from './providers';

// export const metadata: Metadata = {
//   title: 'My App',
//   description: 'Internationalized application',
// };

// export default function RootLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   return (
//     <html lang={locale}>
//       <body>
//         <Providers locale={locale}>
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }

// app/[locale]/layout.tsx
import { dir } from 'i18next';
import { languages } from '@/i18n/settings';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>{children}</body>
    </html>
  );
}