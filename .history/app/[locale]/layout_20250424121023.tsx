// app/[locale]/layout.tsx

import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    // ← two dots to go from app/[locale] → app → project root
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()  // if messages/xx.json doesn’t exist, 404
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
