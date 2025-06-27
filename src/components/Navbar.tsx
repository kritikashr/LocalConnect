"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex justify-between items-center w-full p-4 bg-gray-100 sticky top-0">
      <div>Logo</div>
      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/complaint">Complaint</Link>
        <Link href="/news">News</Link>

        {session?.user?.role?.toLowerCase() === "admin" && (
          <Link href="/admin">Admin Panel</Link>
        )}

        {session ? (
          <>
            <span>Hello, {session.user?.name ?? session.user?.email}</span>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Login</button>
        )}
      </div>
    </div>
  );
}
