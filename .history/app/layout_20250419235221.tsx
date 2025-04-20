
"use client";

import { SessionProvider } from "next-auth/react"; // Auth provayder
import import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <ToastContainer />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
