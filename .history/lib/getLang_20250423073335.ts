// lib/getLang.ts
'use client';

export function getUserLang(): string {
  if (typeof window !== 'undefined') {
    // URL parametrlarini tekshirish
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    
    // Agar URLda til parametri bo'lsa, uni saqlab qo'yamiz
   // lib/getLang.ts
if (langParam && ['en', 'ko', 'th', 'vi', 'ru'].includes(langParam)) {
    if (localStorage.getItem('lang') !== langParam) {
      localStorage.setItem('lang', langParam);
    }
    return langParam;
  }
    
    return localStorage.getItem('lang') || 'en';
  }
  return 'en';
}