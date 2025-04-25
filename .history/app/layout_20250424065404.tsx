import { Suspense } from 'react';
import { useTranslation } from 'next-i18next';
import 'react-toastify/dist/ReactToastify.css';
import "app/styles/global.css";
import "app/styles/custom.css";
import LanguageSwitcher from './components/LanguageSwitcher';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <html lang="en">
      <body>
        <div className="raskajob-container min-h-screen flex flex-col">
          {/* Language Switcher */}
          <div>
            <LanguageSwitcher />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>

          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
