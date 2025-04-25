'use client'

import { usePathname, useRouter } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ko')}>KR</button>
      <button onClick={() => changeLanguage('ru')}>RU</button>
      <button onClick={() => changeLanguage('uz')}>UZ</button>
    </div>
  );
};

export default LanguageSwitcher;
