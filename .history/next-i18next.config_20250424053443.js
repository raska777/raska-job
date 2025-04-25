module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'ko', 'th', 'vi', 'ru'],
      localeDetection: true,
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  };