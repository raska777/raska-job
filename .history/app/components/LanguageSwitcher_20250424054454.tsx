import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const changeLanguage = (e: { target: { value: any; }; }) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <select 
      onChange={changeLanguage}
      value={router.locale}
      className="p-2 border rounded"
    >
      <option value="uz">🇺🇿 O'zbekcha</option>
      <option value="en">🇬🇧 English</option>
      <option value="ru">🇷🇺 Русский</option>
      <option value="ko">🇰🇷 한국어</option>
    </select>
  );
}