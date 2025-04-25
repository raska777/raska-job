'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const SUPPORTED_LANGS = ['en', 'ko', 'th', 'vi', 'ru'];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);

    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {SUPPORTED_LANGS.map((lang) => (
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
