// import { notFound } from 'next/navigation';
// import { getRequestConfig } from 'next-intl/server';
// import type { AbstractIntlMessages } from 'next-intl';

// const locales = ['en', 'ko', 'ru', 'uz'];

// export default getRequestConfig(async ({ locale }) => {
//   if (!locale || !locales.includes(locale)) {
//     notFound(); // 404 sahifaga yuboriladi
//   }

//   let messages: AbstractIntlMessages;
//   try {
//     messages = (await import(`../public/locales/${locale}.json`)).default;
//   } catch (error) {
//     notFound(); // Agar fayl topilmasa, 404
//   }

//   return {
//     locale, // Endi bu joyda TypeScript `string` deb tan oladi
//     messages,
//     now: new Date(),
//     timeZone: 'Asia/Tashkent',
//   };
// });

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';

const locales = ['en', 'uz', 'ru', 'ko'];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) notFound();

  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return {
    locale,
    messages,
  };
});
