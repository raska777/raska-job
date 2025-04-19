// next.config.js
module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
// next.config.js
export const authOptions = {
  // bu bo‘limni route.ts ichida bo‘lsa, undan export qilamiz
};

export default {
  experimental: {
    appDir: true,
    serverActions: true,
  },
};
