
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
// 'use client';
// import { createContext, useState, useContext, useEffect } from 'react';
// import { translations } from '@/lib/translations'; // import qilish
// type LanguageCode = 'uz' | 'en' | 'ru' | 'ko' | 'vi' | 'th';

// interface LanguageContextType {
//   language: LanguageCode;
//   changeLanguage: (lang: LanguageCode) => void;
//   translate: (key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
//   const [language, setLanguage] = useState<LanguageCode>('uz');

//   // Tilni localStorage dan o'qiydi (agar mavjud bo'lsa)
//   useEffect(() => {
//     const savedLang = localStorage.getItem('language') as LanguageCode;
//     if (savedLang && supportedLanguages.includes(savedLang)) {
//       setLanguage(savedLang);
//     }
//   }, []);

//   // Til o'zgartirilganda localStorage ga saqlaydi
//   const changeLanguage = (lang: LanguageCode) => {
//     if (supportedLanguages.includes(lang)) {
//       setLanguage(lang);
//       localStorage.setItem('language', lang);
//     }
//   };

//   // Tarjima funksiyasi
//   const translate = (key: string): string => {
//     return translations[language]?.[key] || key;
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = (): LanguageContextType => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };

// const supportedLanguages: LanguageCode[] = ['uz', 'en', 'ru', 'ko', 'vi', 'th'];

'use client';
import { createContext, useState, useContext, useEffect } from 'react';

// Til kodlari uchun type
type LanguageCode = 'uz' | 'en' | 'ru' | 'ko' | 'vi' | 'th';

interface LanguageContextType {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('uz');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && supportedLanguages.includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: LanguageCode) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

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

const translations = {
  uz: {
    welcome: "Xush kelibsiz",
    changeLanguage: "Tilni o‘zgartirish",
    home: "Bosh sahifa",
    about: "Biz haqimizda",
    contact: "Aloqa",
  },
  en: {
    welcome: "Welcome",
    changeLanguage: "Change language",
    home: "Home",
    about: "About us",
    contact: "Contact",
  },
  ru: {
    welcome: "Добро пожаловать",
    changeLanguage: "Изменить язык",
    home: "Главная",
    about: "О нас",
    contact: "Контакты",
  },
  ko: {
    welcome: "환영합니다",
    changeLanguage: "언어 변경",
    home: "홈페이지",
    about: "회사 소개",
    contact: "연락처",
  },
  vi: {
    welcome: "Chào mừng",
    changeLanguage: "Thay đổi ngôn ngữ",
    home: "Trang chủ",
    about: "Về chúng tôi",
    contact: "Liên hệ",
  },
  th: {
    welcome: "ยินดีต้อนรับ",
    changeLanguage: "เปลี่ยนภาษา",
    home: "หน้าหลัก",
    about: "เกี่ยวกับเรา",
    contact: "ติดต่อ",
  },
};
