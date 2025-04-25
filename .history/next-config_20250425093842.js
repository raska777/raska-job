// module.exports = {
//   env: {
//     MONGODB_URI: process.env.MONGODB_URI,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//       },
//       {
//         protocol: 'https',
//         hostname: '*.googleusercontent.com', // Barcha Google subdomainlari uchun
//       },
//     ],
//   },
//   experimental: {
//     serverActions: true, // next-auth 4.x uchun kerak bo'lishi mumkin  },
// }
// }
// next.config.js

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//       },
//       {
//         protocol: 'https',
//         hostname: '*.googleusercontent.com', // Barcha Google subdomainlari uchun
//       },
//     ],
//   },
// };

// module.exports = nextConfig;

// next.config.js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // bu yerga kerakli domenlarni qo‘shamiz
  },
};

module.exports = nextConfig;
