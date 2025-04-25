// components/LanguageSwitcher.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    
    // URLga lang parametrini qo'shamiz
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {['en', 'ko', 'th', 'vi', 'ru'].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};