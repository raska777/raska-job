// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  // ...your existing config…
  webpack(config, { dev }) {
    if (dev) {
      // disable source-maps in development
      config.devtool = false;
    }
    return config;
  },
};
