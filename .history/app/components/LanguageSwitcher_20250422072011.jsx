
// //app/components/LanguageSwitcher.jsx
// import { useLanguage } from '@/context/LanguageContext';

// export default function LanguageSwitcher() {
//   const { language, changeLanguage } = useLanguage();  // `setLanguage`ni `changeLanguage` bilan almashtirish

//   const languages = [
//     { code: 'uz', name: 'O‘zbek' },
//     { code: 'ko', name: '한국어' },
//     { code: 'en', name: 'English' },
//     { code: 'ru', name: 'Русский' },
//     { code: 'vi', name: 'Tiếng Việt' },
//     { code: 'th', name: 'ไทย' },
//   ];

//   return (
//     <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
//       {languages.map((lang) => (
//         <option key={lang.code} value={lang.code}>
//           {lang.name}
//         </option>
//       ))}
//     </select>
//   );
// }


// components/LanguageSwitcher.tsx
'use client';
import { useLanguage } from '@/context/LanguageContext';

const languageOptions = [
  { code: 'uz', name: 'Oʻzbekcha', emoji: '🇺🇿' },
  { code: 'en', name: 'English', emoji: '🇬🇧' },
  { code: 'ru', name: 'Русский', emoji: '🇷🇺' },
  { code: 'ko', name: '한국어', emoji: '🇰🇷' },
  { code: 'vi', name: 'Tiếng Việt', emoji: '🇻🇳' },
  { code: 'th', name: 'ไทย', emoji: '🇹🇭' },
];

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value as any)}
      className="px-3 py-2 border rounded bg-white dark:bg-gray-800"
    >
      {languageOptions.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.emoji} {lang.name}
        </option>
      ))}
    </select>
  );
}