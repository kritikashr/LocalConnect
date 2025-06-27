import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
    id?: string;
    name?: string;
    email?: string;
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
        session.user.role = token.role ?? "";
        session.user.name = token.name ?? "";
        session.user.id = token.id ?? "";
        session.accessToken = token.accessToken ?? "";
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },


  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
