
"use client";

import { SessionProvider } from "next-auth/react"; // Auth provayder
import { Toast } from "react-toastify";
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
