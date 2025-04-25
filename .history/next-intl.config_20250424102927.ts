// next-intl.config.ts
const config = {
  locales: ['uz', 'en', 'ru', 'ko'],
  defaultLocale: 'uz',
  localePrefix: 'always',
} as const;  // ← butun obyektni literal turlar bilan aniqlaydi

export default config;
