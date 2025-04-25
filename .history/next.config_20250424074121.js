/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DEEPL_API_KEY: process.env.DEEPL_API_KEY,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  i18n: {
    locales: ['en', 'uz', 'ru', 'ko'], // Add your supported languages here
    defaultLocale: 'en', // Default language
    localeDetection: true, // Enable or disable automatic language detection
  },
  reactStrictMode: true,
  // i18next konfiguratsiyasini qo‘shish
};

module.exports = nextConfig;
