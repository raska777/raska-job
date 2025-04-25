/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DEEPL_API_KEY: process.env.DEEPL_API_KEY,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en', 'ko', 'ru','uz'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  react: { useSuspense: false }, // Suspense bilan muammolarni oldini olish
};

// i18n sozlamalari uchun require
const { i18n } = require('./next-i18next.config');

module.exports = {
  ...nextConfig,
  i18n, // i18n sozlamalarini asosiy konfigga qo'shamiz
};