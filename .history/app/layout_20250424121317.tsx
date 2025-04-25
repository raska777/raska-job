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
    // JSON fayllarini /messages papkasidan import qilish
    messages = (await import(`messages/${locale}.json`)).default
  } catch {
    notFound()  // Agar JSON fayl topilmasa, 404 sahifasini ko'rsatish
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
