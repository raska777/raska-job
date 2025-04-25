// components/LanguageSwitcher.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    router.refresh(); // Sahifani yangilaydi
  };

  return (
    <div className="flex gap-2">
      {['uz', 'en', 'ko', 'th', 'vi', 'ru'].map((lang) => (
        <button key={lang} onClick={() => changeLanguage(lang)}>
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
