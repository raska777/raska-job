const withNextIntl = require('next-intl/plugin')('./next-intl.config.js');

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
