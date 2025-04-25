export default function LocaleLayout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: { locale: string };
  }) {
    const messages = getMessages(params.locale);
    
    return (
      <html lang={params.locale}>
        <body>
          <NextIntlClientProvider 
            locale={params.locale}
            messages={messages}
          >
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }