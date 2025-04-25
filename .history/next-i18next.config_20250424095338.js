module.exports = {
  i18n: {
    defaultLocale: 'uz',
    locales: ['en', 'ko', 'ru', 'uz'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: typeof window === 'undefined' 
    ? require('path').resolve('./public/locales') 
    : '/locales',
};