module.exports = {
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
};
