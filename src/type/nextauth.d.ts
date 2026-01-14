import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      picture?: string | null;
      createdAt?: string;
      updatedAt?: string;
      
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
      updatedAt?: string;
    picture?: string | null;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
      updatedAt?: string;
    picture?: string | null;
    accessToken?: string;
    refreshToken?: string;
  }
}
