// // types/next-auth.d.ts
// import "next-auth";
// import "next-auth/jwt";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     provider?: string;
//     name?: string | null;
//     email?: string | null;
//   }

//   interface Session {
//     user: {
//       id: string;
//       provider?: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     provider?: string;
//   }
// }

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    provider?: string;
    name?: string | null;
    email?: string | null;
    role?: string; // 🔐 Qo‘shilgan
  }

  interface Session {
    user: {
      id: string;
      provider?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // 🔐 Qo‘shilgan
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider?: string;
    role?: string; // 🔐 Qo‘shilgan
  }
}
