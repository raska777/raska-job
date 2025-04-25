module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Barcha Google subdomainlari uchun
      },
    ],
  },
  experimental: {
    serverActions: true, // next-auth 4.x uchun kerak bo'lishi mumkin  },
};
}