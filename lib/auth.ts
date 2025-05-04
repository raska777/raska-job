// lib/auth.ts
import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { sendWelcomeEmail } from "@/lib/email";

// Extend the User and Session types to include your custom fields
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db("raska");

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

          if (user?.password && await compare(credentials.password, user.password)) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role || "user",
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const client = await clientPromise;
          const db = client.db("raska");

          const existingUser = await db
            .collection("users")
            .findOne({ email: user.email });

          if (!existingUser) {
            await db.collection("users").insertOne({
              email: user.email,
              name: user.name,
              isSubscribed: false,
              createdAt: new Date(),
              provider: "google",
              emailVerified: new Date(),
              role: "user",
            });

            if (user.email) {
              await sendWelcomeEmail(user.email, user.name || "사용자");
            }
          }
        } catch (err) {
          console.error("Google login error:", err);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role || "user";
      }
      return session;
    },
  },
};