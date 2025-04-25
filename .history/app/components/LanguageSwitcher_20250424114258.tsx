// components/LanguageContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en'|'ko'|'ru'|'uz'|'th'|'vi';
interface Ctx { lang: Lang; setLang: (l:Lang)=>void }
const C = createContext<Ctx>({ lang:'en', setLang:()=>{} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return <C.Provider value={{ lang, setLang }}>{children}</C.Provider>;
}

export function useLanguage() { return useContext(C); }
