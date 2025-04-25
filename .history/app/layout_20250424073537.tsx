// app/layout.tsx
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
import 'styles/global.css';
import 'styles/custom.css';
import LanguageSwitcher from './components/LanguageSwitcher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/i18n'; // Import i18n to initialize translations

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LanguageSwitcher />
          <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
            {children}
          </Suspense>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
