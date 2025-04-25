const withNextIntl = require('next-intl/plugin')('./next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/uz', // ⬅️ Buni qo'shing
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

export default withNextIntl(nextConfig);
