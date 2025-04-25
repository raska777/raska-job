export default function LocaleLayout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: { locale: string }; // Note this is an object with locale property
  }) {
    return (
      <html lang={params.locale}>
        <body>
          {children}
        </body>
      </html>
    );
  }