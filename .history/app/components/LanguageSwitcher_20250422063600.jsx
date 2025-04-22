'use client'; // Next.js 13+ uchun Client Component deb belgilash

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'uz', name: 'O‘zbek' },
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' },
  ];

  const changeLanguage = (langCode) => {
    // URLni yangi tilga yo‘naltirish (masalan: /uz/about -> /ko/about)
    const newPath = pathname.replace(/^\/(uz|ko|en)/, `/${langCode}`);
    router.push(newPath);
  };

  return (
    <select 
      onChange={(e) => changeLanguage(e.target.value)}
      defaultValue={pathname.split('/')[1] || 'uz'}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}