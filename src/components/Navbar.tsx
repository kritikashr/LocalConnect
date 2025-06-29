"use client";

import Link from "next/link";
import Profile from "./Profile";
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
    <div className="flex justify-between items-center w-full p-4 bg-gray-100 sticky top-0 z-50">
      <div className="font-bold text-lg">Logo</div>
      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/complaint">Complaint</Link>
        <Link href="/news">News</Link>

        {isLoggedIn ? <Profile /> : <Link href="/login">News</Link>}
      </div>
    </div>
  );
}
