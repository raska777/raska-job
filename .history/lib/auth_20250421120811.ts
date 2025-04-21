

// // lib/auth.ts
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { compare } from "bcryptjs";
// import clientPromise from "@/lib/mongodb";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const client = await clientPromise;
//         const db = client.db("raska");

//         const user = await db
//           .collection("users")
//           .findOne({ email: credentials?.email });

//         if (user && await compare(credentials!.password, user.password)) {
//           return {
//             id: user._id.toString(),
//             name: user.name,
//             email: user.email,
//           };
//         }
//         return null;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     // Google orqali login qilganda foydalanuvchini bazaga qo'shish
//     async signIn({ user, account}) {
//       if (account?.provider === "google") {
//         try {
//           const client = await clientPromise;
//           const db = client.db("raska");
          
//           // Foydalanuvchini mavjudligini tekshirish
//           const existingUser = await db.collection("users").findOne({ 
//             email: user.email 
//           });
          
//           // Agar mavjud bo'lmasa, yangi foydalanuvchi yaratish
//           if (!existingUser) {
//             await db.collection("users").insertOne({
//               email: user.email,
//               name: user.name,
//               isSubscribed: false,
//               createdAt: new Date(),
//               provider: 'google',
//               emailVerified: new Date(),
//             });
//           }
//         } catch (error) {
//           console.error("Google sign-in error:", error);
//           return false;
//         }
//       }
//       return true;
//     },
    
//     // JWT tokeniga qo'shimcha ma'lumotlar qo'shish
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//       }
//       if (account) {
//         token.provider = account.provider;
//       }
//       return token;
//     },
    
//     // Sessionga qo'shimcha ma'lumotlar qo'shish
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.provider = token.provider as string;
//       }
//       return session;
//     }
//   },
// };

// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db("raska");

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user || !user.password) {
          return null;
        }

        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          provider: 'credentials'
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const client = await clientPromise;
          const db = client.db("raska");
          
          const existingUser = await db.collection("users").findOne({ 
            email: user.email 
          });
          
          if (!existingUser) {
            await db.collection("users").insertOne({
              email: user.email,
              name: user.name,
              isSubscribed: false,
              createdAt: new Date(),
              provider: 'google',
              emailVerified: new Date(),
            });
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    }
  },
};