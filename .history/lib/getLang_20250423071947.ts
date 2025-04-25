'use client';

export function getUserLang(): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    
    if (langParam && ['en', 'ko', 'th', 'vi', 'ru'].includes(langParam)) {
      localStorage.setItem('lang', langParam);
      return langParam;
    }
    
    return localStorage.getItem('lang') || 'en';
  }
  return 'en';
}