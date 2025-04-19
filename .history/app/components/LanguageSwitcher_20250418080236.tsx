'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => changeLanguage('en')} className="px-2 py-1 border rounded">EN</button>
      <button onClick={() => changeLanguage('ko')} className="px-2 py-1 border rounded">KO</button>
    </div>
  );
}
