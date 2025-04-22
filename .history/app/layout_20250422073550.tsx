
"use client";

import { SessionProvider } from "next-auth/react"; // Auth provayder
import { Providers } from "./providers";
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
