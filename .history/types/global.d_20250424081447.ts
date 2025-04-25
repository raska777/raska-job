// types/global.d.ts

import NextAuth from "next-auth";
import type { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  declare module 'next-intl' {
    function useTranslations(namespace?: string): (key: string) => string;
  }
}

export {};
