import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
    id?: string;
    name?: string;
    email?: string;
  }
  interface Session {
    user: User;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) return null;

          const user = await res.json();

          if (user && user.token && user.email && user.role) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
              accessToken: user.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken ?? "";
        token.role = user.role ?? "";
        token.email = user.email ?? "";
        token.name = user.name ?? "";
        token.id = user.id ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? "";
        session.user.role = typeof token.role === "string" ? token.role : "";
        session.user.name = token.name ?? "";
        session.user.id =
          typeof token.id === "string"
            ? token.id
            : token.id
            ? String(token.id)
            : "";
        session.user.accessToken =
          typeof token.accessToken === "string"
            ? token.accessToken
            : token.accessToken
            ? String(token.accessToken)
            : ""; // ✅ fixed: accessToken now inside session.user
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
