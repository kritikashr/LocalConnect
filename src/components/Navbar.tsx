"use client";

import Link from "next/link";
import User from "./user/User";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const userEmail = localStorage.getItem("userEmail");
      setIsLoggedIn(!!userEmail);
    };

    checkLogin(); // initial load
    window.addEventListener("auth-change", checkLogin);

    return () => {
      window.removeEventListener("auth-change", checkLogin);
    };
  }, []);

  return (
    <div className="flex justify-between items-center w-full h-16 p-4 bg-white shadow-md sticky top-0 z-50 px-14">
      <div className="font-bold text-lg">Logo</div>
      <div className="flex gap-6 items-center font-semibold">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        {/* <Link href="/complaint">Complaint</Link> */}
        <Link href="/news">News</Link>

        {isLoggedIn ? <User /> : <Link href="/login">Login</Link>}
      </div>
    </div>
  );
}
