'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Agar URLda til parametrini ham o'zgartirmoqchi bo'lsangiz:
    router.replace(`/${lng}${window.location.pathname.replace(/^\/(en|ko|ru|uz)/, '')}`);
  };

  return (
    <select 
      onChange={(e) => changeLanguage(e.target.value)}
      value={i18n.language}
      className="p-2 border rounded"
    >
      <option value="uz">🇺🇿 O'zbekcha</option>
      <option value="en">🇬🇧 English</option>
      <option value="ru">🇷🇺 Русский</option>
      <option value="ko">🇰🇷 한국어</option>
    </select>
  );
}