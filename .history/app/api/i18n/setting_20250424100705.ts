// src/i18n/settings.ts
export const languages = ['en', 'uz', 'ru', 'ko'] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = 'uz';