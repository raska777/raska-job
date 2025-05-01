/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Faqat Google rasm domenini qo'shish
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI, // MongoDB URI (agar kerak bo'lsa)
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
