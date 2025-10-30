import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

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
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              credentials: "include", // important if backend sets cookies
            }
          );

          if (!res.ok) {
            console.error("Login failed:", await res.text());
            return null;
          }

          const result = await res.json();

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
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.picture;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    // 🧠 Make tokens available in `useSession()` on client
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("🔹 Session callback:", { session, token });
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        picture: token.picture as any,
      };
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      return session;
    },
  },

  pages: {
    signIn: "/login", // custom login page
  },

  secret: process.env.NEXTAUTH_SECRET,
};
