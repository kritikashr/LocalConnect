"use client";

import { useRouter } from "next/navigation";

export async function handleLogout() {
  const router = useRouter();
  try {
    // Call backend logout to delete cookie
    const res = await fetch("http://localhost:5000/api/Auth/logout", {
      method: "POST",
      credentials: "include", // important to send cookies
    });

    if (res.ok) {
      // Clear localStorage on successful logout
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      window.dispatchEvent(new Event("auth-change")); // Optional, to notify other parts of app

      // Optionally, redirect to login page
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export default function LogoutButton() {
  return <button onClick={handleLogout}>Logout</button>;
}
