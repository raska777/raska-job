module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ['lh3.googleusercontent.com'], 
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Faqat true/false qiymati bo'lishi kerak
    // appDir: true <- Bu satrni o'chirib tashlang (Next.js 13+ da avtomatik)
  },
  // Boshqa sozlamalar...
}

module.exports = nextConfig