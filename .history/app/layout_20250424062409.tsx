
"use client";

import { SessionProvider } from "next-auth/react"; // Auth provayder
import "i18"
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="uz">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
