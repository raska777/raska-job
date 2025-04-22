
// //context/LanguageContext.jsx

// 'use client';
// import { createContext, useState, useContext } from 'react';

// const LanguageContext = createContext();

// const availableLanguages = ['uz', 'en', 'ru', 'ko', 'vi', 'th']; // tillar kodi

// export function LanguageProvider({ children }) {
//   const [language, setLanguage] = useState('uz');

//   const changeLanguage = (lang) => {
//     if (availableLanguages.includes(lang)) {
//       setLanguage(lang);
//     }
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export function useLanguage() {
//   return useContext(LanguageContext);
// }


// context/LanguageContext.tsx
'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/lib/translations'; // import qilish
type LanguageCode = 'uz' | 'en' | 'ru' | 'ko' | 'vi' | 'th';

interface LanguageContextType {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('uz');

  // Tilni localStorage dan o'qiydi (agar mavjud bo'lsa)
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && supportedLanguages.includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  // Til o'zgartirilganda localStorage ga saqlaydi
  const changeLanguage = (lang: LanguageCode) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  // Tarjima funksiyasi
  const translate = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const supportedLanguages: LanguageCode[] = ['uz', 'en', 'ru', 'ko', 'vi', 'th'];