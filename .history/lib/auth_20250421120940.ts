// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // to'g'ri import
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextAuthOptions } from "next-auth";
console.log("👀 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("raska");

        const user = await db
          .collection("users")
          .findOne({ email: credentials?.email });

        if (user && await compare(credentials!.password, user.password)) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        }

        return null;
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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const client = await clientPromise;
          const db = client.db("raska");
          
          // Foydalanuvchini mavjudligini tekshirish
          const existingUser = await db.collection("users").findOne({ 
            email: user.email 
          });
          
          // Agar mavjud bo'lmasa, yangi foydalanuvchi yaratish
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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};
