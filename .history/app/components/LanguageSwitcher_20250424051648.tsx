'use client';

import { SUPPORTED_LANGS } from '@/utils/lang';
import { useRouter, useSearchParams } from 'next/navigation';
import { setLanguage } from '@/utils/language-detection';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = async (lang: string) => {
    try {
      await setLanguage(lang);
      
      const params = new URLSearchParams(searchParams.toString());
      params.set('lang', lang);
      router.push(`?${params.toString()}`);
      router.refresh(); // Server komponentlarini yangilash
    } catch (error) {
      console.error('Language change failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};