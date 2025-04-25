import type { Metadata } from 'next';
import { Providers } from '../providers';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Internationalized application',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}