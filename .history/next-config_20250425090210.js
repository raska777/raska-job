module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: [
      'existing-domain.com',
      'lh3.googleusercontent.com', // Add this line
    ],
  },
  experimental: {
    appDir: true,
  },
};