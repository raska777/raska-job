// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'; // yoki boshqa provider

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});
