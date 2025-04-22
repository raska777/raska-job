'use client';
import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const availableLanguages = ['uz', 'en', 'ru', 'ko', 'vi', 'th']; // tillar kodi

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('uz');

  const changeLanguage = (lang) => {
    if (availableLanguages.includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
