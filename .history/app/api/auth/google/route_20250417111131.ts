// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Google OAuth parametrlari
//     const params = new URLSearchParams({
//       client_id: process.env.GOOGLE_CLIENT_ID || "",
//       redirect_uri: process.env.GOOGLE_REDIRECT_URI || "",
//       response_type: "code",
//       scope: "openid email profile",
//       access_type: "offline",
//       prompt: "consent",
//     });

//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
//     return NextResponse.redirect(authUrl);
//   } catch (error) {
//     console.error("Google auth error:", error);
//     return NextResponse.json(
//       { error: "Google autentifikatsiyada xatolik" },
//       { status: 500 }
//     );
//   }
// }
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };