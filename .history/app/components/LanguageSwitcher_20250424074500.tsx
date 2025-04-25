import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('uz')}>O'zbek</button>
      <button onClick={() => changeLanguage('ko')}>Korean</button>
    </div>
  );
};

export default LanguageSwitcher;
