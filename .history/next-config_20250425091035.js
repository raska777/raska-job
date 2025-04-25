module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',  // barcha subdomains uchun
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};