const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  i18n,
};

module.exports = nextConfig;