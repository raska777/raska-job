// app/layout.tsx
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar'; // Navbarni shu yerga import qilamiz
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RaskaJob',
  description: 'Koreyadagi ish e’lonlari platformasi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar /> {/* Navbar barcha sahifalar oldidan chiqadi */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
