import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: unknown;
      id?: string | null;
      name?: string | null;
      email?: string | null;
      role?: string | null;
    };
  }

  interface User {
    role?: string | null;
  }
}
