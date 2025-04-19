// LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Tilni o'zgartirish funksiyasi
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // i18next orqali tilni o'zgartiramiz
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('uz')}>UZ</button>
    </div>
  );
};

export default LanguageSwitcher;
