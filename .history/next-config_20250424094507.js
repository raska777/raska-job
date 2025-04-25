const withNextIntl = require('next-intl/plugin')('./next-intl.config.ts'); // yoki .js agar u .js bo‘lsa

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

module.exports = withNextIntl(nextConfig);
