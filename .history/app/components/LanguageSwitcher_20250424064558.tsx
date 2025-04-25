// app/components/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // URL boshidagi prefiksni yangilash (/uz/… → /en/…)
    const segments = pathname.split('/');
    segments[1] = lng;
    router.push(segments.join('/') || '/');
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="uz">🇺🇿 O‘zbekcha</option>
      <option value="en">🇬🇧 English</option>
      <option value="ru">🇷🇺 Русский</option>
      <option value="ko">🇰🇷 한국어</option>
    </select>
  );
}
