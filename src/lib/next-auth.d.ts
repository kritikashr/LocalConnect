// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken: string;
  }
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    email: string;
    name: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    email: string;
    name: string;
  }
}