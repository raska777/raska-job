// next.config.js
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DEEPL_API_KEY: process.env.DEEPL_API_KEY,
  },
};
