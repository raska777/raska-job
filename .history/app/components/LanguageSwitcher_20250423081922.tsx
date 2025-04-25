'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isTranslating, setIsTranslating] = useState(false);

  // Tilni o'zgartirish funksiyasi
  const changeLanguage = async (lang: string) => {
    try {
      // Tilni localStorage ga saqlash
      localStorage.setItem('lang', lang);
      
      // URL parametrlarini yangilash
      const params = new URLSearchParams(searchParams.toString());
      params.set('lang', lang);
      router.push(`?${params.toString()}`);

      // Agar avtomatik tarjima yoqilgan bo'lsa
      if (localStorage.getItem('autoTranslate') === 'true') {
        setIsTranslating(true);
        await translatePageContent(lang);
      }
    } catch (error) {
      console.error('Tilni o\'zgartirishda xato:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Sahifa kontentini tarjima qilish
  const translatePageContent = async (targetLang: string) => {
    try {
      // Barcha tarjima qilinadigan elementlarni topish
      const elements = document.querySelectorAll('[data-translate]');
      
      // Har bir element uchun tarjima so'rovini yuborish
      for (const element of elements) {
        const text = element.textContent?.trim();
        if (text) {
          const translatedText = await translateText(text, targetLang);
          if (translatedText) {
            element.textContent = translatedText;
          }
        }
      }
    } catch (error) {
      console.error('Tarjima qilishda xato:', error);
    }
  };

  // DeepL API orqali tarjima qilish
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Tarjima so\'rovi muvaffaqiyatsiz');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Tarjima xatosi:', error);
      return text; // Xato yuz bersa original matnni qaytarish
    }
  };

  // Avtomatik tarjimani yoqish/o'chirish
  const toggleAutoTranslate = () => {
    const current = localStorage.getItem('autoTranslate') === 'true';
    localStorage.setItem('autoTranslate', String(!current));
    if (!current) {
      const lang = localStorage.getItem('lang') || 'en';
      changeLanguage(lang); // Avtomatik tarjimani yoqqanda darhol tarjima qilish
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {['en', 'ko', 'th', 'vi', 'ru'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-3 py-1 rounded hover:bg-gray-300 ${
              localStorage.getItem('lang') === lang 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200'
            }`}
            disabled={isTranslating}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={localStorage.getItem('autoTranslate') === 'true'}
          onChange={toggleAutoTranslate}
          className="w-4 h-4"
        />
        <span>Avtomatik tarjima</span>
      </label>
      
      {isTranslating && (
        <div className="text-sm text-blue-500">Tarjima qilinmoqda...</div>
      )}
    </div>
  );
};