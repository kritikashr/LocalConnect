"use client"
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex justify-between w-full  p-4 px-22 sticky top-0 left-0 bg-gray-100">
        <div>Logo</div>
        <div className="flex gap-7">
          <Link href={"/"}>Home</Link>
          <Link href={"/services"}>Services</Link>
          <Link href={"/complaint"}>Complaint</Link>
          <Link href={"/news"}>News</Link>
          {session?.user?.role === "admin" && (
            <Link href="/admin">Admin Panel</Link>
          )}{" "}
          {session ? (
            <button onClick={() => signOut()}>Logout</button>
          ) : (
            <button onClick={() => signIn()}>Admin</button>
          )}
          <Link href={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
