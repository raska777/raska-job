// pages/index.tsx
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher'; // Til o'zgartirish
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

const PostJob = dynamic(() => import('@/app/components/PostJob'), { ssr: false });
const JobList = dynamic(() => import('../components/JobList'), { ssr: false });
const AuthButtons = dynamic(() => import('../components/AuthButtons'), { ssr: false });

export default function Home() {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = () => {
    // search handling logic
  };

  return (
    <div>
      <header>
        <LanguageSwitcher />
        <input
          type="text"
          placeholder={t('searchJob')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <JobList searchQuery={searchTerm} selectedCity={selectedCity} />
        </Suspense>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'uz', ['common'])),
    },
  };
};
