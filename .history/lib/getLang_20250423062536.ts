// lib/getLang.ts
'use client';

export function getUserLang(): string {
  // Agar brauzer muhitida bo'lsa, localStorage dan tilni olamiz
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang') || 'en'; // Default: inglizcha
  }
  return 'en'; // Serverda ishlaganda ham inglizcha
}