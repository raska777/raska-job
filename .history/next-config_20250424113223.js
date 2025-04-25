/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,        // React’ni qat’iy rejimda ishlatish
  experimental: {
    appDir: true,               // App Routerni yoqish
  },
  images: {
    domains: ['lh3.googleusercontent.com'],  // kerakli domenlarni qo‘shing
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DEEPL_API_KEY: process.env.DEEPL_API_KEY,
    // boshqalar...
  },
};
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl({
  // Boshqa next.js sozlamalari
});
module.exports = nextConfig;
