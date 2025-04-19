// // app/layout.tsx

// "use client";

// import { SessionProvider } from "next-auth/react"; // Auth provayder
// import Navbar from "./components/Navbar"; // Navbarni qo‘shamiz
// import { usePathname } from "next/navigation"; // Sahtifalar yo'lini olish uchun

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname(); // Joriy sahifaning yo‘lini olish

//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           {/* Agar sahifa root (home) sahifa bo‘lsa, Navbarni ko‘rsatamiz */}
//           {pathname === "/"}
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

"use client";

import { SessionProvider } from "next-auth/react"; // Auth provayder

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
