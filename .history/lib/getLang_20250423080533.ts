'use client';

const SUPPORTED_LANGS = ['en', 'ko', 'th', 'vi', 'ru'];

export function getUserLang(): string {
  if (typeof window === 'undefined') return 'en';

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');

  if (langParam && SUPPORTED_LANGS.includes(langParam)) {
    localStorage.setItem('lang', langParam);
    return langParam;
  }

  const storedLang = localStorage.getItem('lang');
  if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
    return storedLang;
  }

  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGS.includes(browserLang)) {
    return browserLang;
  }

  return 'en';
}
