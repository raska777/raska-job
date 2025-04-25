module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    appDir: true,
  },
};