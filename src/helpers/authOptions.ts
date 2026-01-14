/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Email or password is missing");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BaseURL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // ✅ INSIDE options
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          console.log("BASE URL:", process.env.NEXT_PUBLIC_BaseURL);
          if (!res.ok) {
            console.error("Login failed:", await res.text());
            return null;
          }

          let result;
          try {
            result = await res.json();
          } catch {
            console.error("Backend did not return JSON");
            return null;
          }

          const userData = result?.data?.user;
          const tokens = result?.data?.tokens;
          if (!userData || !tokens) return null;
          if (!userData?.id) {
            console.error("User not found in backend response");
            return null;
          }

          return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            picture: userData.picture ?? null,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            accessToken: tokens.accessToken, // ✅ include tokens here
            refreshToken: tokens.refreshToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // 🧠 Attach backend tokens to NextAuth's JWT
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?:
        | User
        | (AdapterUser & {
            accessToken?: string;
            refreshToken?: string;
            picture?: any;
            createdAt?: string;
            updatedAt?: string;
          });
      trigger?: "signIn" | "signUp" | "update";
      session?: Session & { user: any }; // user here can contain custom fields like picture, createdAt
    }): // ||{ token, user,trigger,session }: { token: JWT; user?: any,trigger:any }
    Promise<JWT> {
      // ✅ Only access trigger safely
      if (trigger === "update" && session?.user) {
        token.id = session.user.id;
        token.name = session.user.name;
        token.email = session.user.email;
        token.role = session.user.role;
        token.picture = session.user.picture ?? null;
        token.createdAt = session.user.createdAt ?? null;
        token.updatedAt = session.user.updatedAt ?? null;
        token.accessToken = (session as any).accessToken;
        token.refreshToken = (session as any).refreshToken;
      }
      // ✔👍 On login
      if (user && user.id) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.role = (user as any).role ?? null;
        token.picture = (user as any).picture ?? null;
        token.createdAt = (user as any).createdAt ?? null;
        token.updatedAt = (user as any).updatedAt ?? null;
        token.accessToken = (user as any).accessToken ?? null;
        token.refreshToken = (user as any).refreshToken ?? null;
      }
      return token;
    },

    // 🧠 Make tokens available in `useSession()` on client
   async session({ session, token }) {
  if (token?.id) {
    session.user = {
      id: token.id as string,
      name: token.name as string,
      email: token.email as string,
      role: token.role as string,
      picture: token.picture,
      createdAt: token.createdAt as string,
      updatedAt: token.updatedAt as string,
    };
  }

  (session as any).accessToken = token.accessToken ?? null;
  (session as any).refreshToken = token.refreshToken ?? null;

  return session;
},
  },

  pages: {
    signIn: "/login", // custom login page
  },

  secret: process.env.NEXTAUTH_SECRET,
};
