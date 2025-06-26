// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions  = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // For demo, accept one admin user
//         if (
//           credentials?.email === "admin@example.com" &&
//           credentials?.password === "admin123"
//         ) {
//           return { id: "1", name: "Admin User", email: credentials.email, role: "admin" };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: any; user?: { role?: string } }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any; token: any }) {
//       if (token && session.user) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password in credentials");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          console.log("Backend response status:", res.status);

          if (!res.ok) {
            const errorBody = await res.text();
            console.error("Login failed response body:", errorBody);
            return null;
          }

          const user = await res.json();

          console.log("User data returned from backend:", user);

          if (user && user.email) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: user.token, // include token if you want
            };
          } else {
            console.log("User data missing email or invalid:", user);
          }
          return null;
        } catch (error) {
          console.error("Error during login fetch:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
