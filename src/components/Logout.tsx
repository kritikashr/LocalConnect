"use client";

import { userLogout } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await userLogout();
      localStorage.clear();
      window.dispatchEvent(new Event("auth-change"));
      toast.success("You have been logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
