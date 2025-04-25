
// "use client";

// import { SessionProvider } from "next-auth/react"; // Auth provayder
// export default function RootLayout({ children }: { children: React.ReactNode }) {

//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

'use client';

import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Suspense } from 'react';
import 'styles/global.css'; // Tailwind asosiy CSS
import 'styles/custom.css'; // Ixtiyoriy custom style
import LanguageSwitcher from './components/LanguageSwitcher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "i18n.ts"

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
