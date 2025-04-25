'use client';

const SUPPORTED_LANGS = ['en', 'ko', 'th', 'vi', 'ru'] as const;

export function getUserLang(defaultLang: string = 'en'): string {
  if (typeof window === 'undefined') return defaultLang;
  
  try {
    // 1. URL parametrlarini tekshirish
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    
    if (urlLang && SUPPORTED_LANGS.includes(urlLang as any)) {
      localStorage.setItem('lang', urlLang);
      return urlLang;
    }
    
    // 2. LocalStorage ni tekshirish
    const storedLang = localStorage.getItem('lang');
    if (storedLang && SUPPORTED_LANGS.includes(storedLang as any)) {
      return storedLang;
    }
    
    // 3. Browser tilini aniqlash
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGS.includes(browserLang as any)) {
      return browserLang;
    }
    
    return defaultLang;
  } catch (e) {
    return defaultLang;
  }
}