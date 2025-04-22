import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();  // `setLanguage`ni `changeLanguage` bilan almashtirish

  const languages = [
    { code: 'uz', name: 'O‘zbek' },
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'th', name: 'ไทย' },
  ];

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
