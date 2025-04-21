module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // Google rasm domainini qo‘shish
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};
