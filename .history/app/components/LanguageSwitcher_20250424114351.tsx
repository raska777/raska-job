// components/LanguageSwitcher.tsx
'use client';
import { useLanguage } from './LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <select
      value={lang}
      onChange={e => setLang(e.target.value as any)}
      className="border p-1 rounded"
    >
      <option value="en">English</option>
      <option value="ko">한국어</option>
      <option value="ru">Русский</option>
      <option value="uz">O‘zbekcha</option>
      <option value="th">ไทย</option>
      <option value="vi">Tiếng Việt</option>
    </select>
  );
}
