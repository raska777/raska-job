// module.exports = {
//     env: {
//       MONGODB_URI: process.env.MONGODB_URI,
//     },
//     images: {
//       domains: ['lh3.googleusercontent.com'],
//     },
//     experimental: {
//       appDir: true,
//     },
//   };

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       appDir: true
//     },
//     images: {
//       domains: ['lh3.googleusercontent.com']
//     },
//     env: {
//       MONGODB_URI: process.env.MONGODB_URI
//     },
//     // ✅ i18n qo‘shish (SEO va boshqa holatlar uchun foydali)
//     i18n: {
//       locales: ['en', 'ko', 'ru', 'uz'],
//       defaultLocale: 'uz',
//       localeDetection: false // biz `next-intl` da aniqlaymiz
//     }
//   };
  
//   module.exports = nextConfig;
  
// const withNextIntl = require('next-intl/plugin')(
//     './next-intl.config.js' // 🧠 bu fayl biz yuqorida yaratdik
//   );
  
//   /** @type {import('next').NextConfig} */
//   const nextConfig = {
//     experimental: {
//       appDir: true
//     },
//     images: {
//       domains: ['lh3.googleusercontent.com']
//     },
//     env: {
//       MONGODB_URI: process.env.MONGODB_URI
//     }
//   };
  
//   module.exports = withNextIntl(nextConfig); // ✅ now wrapped with next-intl plugin
  

// const withNextIntl = require('next-intl/plugin')(
//     './next-intl.config.ts' // Biz yuqorida yaratgan next-intl konfiguratsiya fayli
//   );
  
//   /** @type {import('next').NextConfig} */
//   const nextConfig = {
//     experimental: {
//       appDir: true, // App Router uchun qo‘shimcha eksperimental sozlama
//     },
//     images: {
//       domains: ['lh3.googleusercontent.com'], // Tashqi rasm domenlarini qo‘shish
//     },
//     env: {
//       MONGODB_URI: process.env.MONGODB_URI, // MongoDB uchun ulanish URL
//     },
//     i18n: {
//       locales: ['en', 'ko', 'ru', 'uz'], // Qo‘llab-quvvatlanadigan tillar
//       defaultLocale: 'uz', // Standart til O‘zbek
//       localeDetection: false, // Tilni aniqlashni o‘chirib qo‘yish (next-intl ishlatiladi)
//     },
//   };
  
//   module.exports = withNextIntl(nextConfig); // next-intl plugin bilan o‘rab qo‘ysak
  

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // URLda har doim til prefiksi (/en, /ko, ...)
  localeDetection: false // Agar brauzer tilini avtomatik aniqlash kerak bo'lmasa
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};