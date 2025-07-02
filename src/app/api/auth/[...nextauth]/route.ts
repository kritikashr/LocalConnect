import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

<<<<<<< HEAD
=======
// Extend NextAuth types
>>>>>>> dd87c1134defecde25f29adb58a9fed9558e2fc5
declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
    id?: string;
    name?: string;
    email?: string;
  }
<<<<<<< HEAD
  interface Session {
    user: User;
    accessToken?: string;
=======

  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      role?: string;
      accessToken?: string;
    };
>>>>>>> dd87c1134defecde25f29adb58a9fed9558e2fc5
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
<<<<<<< HEAD
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.accessToken = typeof token.accessToken === "string" ? token.accessToken : "";
=======
        session.user.id = token.id ?? "";
        session.user.accessToken = token.accessToken ?? ""; // ✅ fixed: accessToken now inside session.user
>>>>>>> dd87c1134defecde25f29adb58a9fed9558e2fc5
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
