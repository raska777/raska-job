module.exports = {
    i18n: {
      defaultLocale: 'uz',
      locales: ['en', 'ko', 'ru', 'uz'],
    },
    reloadOnPrerender: true, // Ishlab chiqish rejimida qayta yuklash
    localePath: typeof window === 'undefined' 
      ? require('path').resolve('./public/locales')
      : '/locales',
  };