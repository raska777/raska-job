// app/layout.tsx

"use client";

import { SessionProvider } from "next-auth/react"; // Auth provayder
import Navbar from "./components/Navbar"; // Navbarni qo‘shamiz

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar /> {/* Har bir sahifada ko‘rinadigan Navbar */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
