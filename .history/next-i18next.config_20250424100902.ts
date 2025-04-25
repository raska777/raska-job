// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'uz',
    locales: ['en', 'uz', 'ru', 'ko'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
};