module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com', // Google Drive rasmlari uchun
      },
    ],
  },
  // Next.js 14+ uchun experimental sozlamalarni olib tashlash
};