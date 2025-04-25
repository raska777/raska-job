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
  
const withNextIntl = require('next-intl/plugin')(
    './next-intl.config.js' // 🧠 bu fayl biz yuqorida yaratdik
  );
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    experimental: {
      appDir: true
    },
    images: {
      domains: ['lh3.googleusercontent.com']
    },
    env: {
      MONGODB_URI: process.env.MONGODB_URI
    }
  };
  
  module.exports = withNextIntl(nextConfig); // ✅ now wrapped with next-intl plugin
  