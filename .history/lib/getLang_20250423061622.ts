// lib/getLang.ts
'use client';

export function getUserLang(): string {
  return typeof window !== 'undefined'
    ? localStorage.getItem('lang') || 'en'
    : 'en';
}
