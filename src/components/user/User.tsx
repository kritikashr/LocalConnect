"use client";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const User = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    const name = localStorage.getItem("userName") || "";
    setUserEmail(email);
    setUserName(name);
    setIsLoggedIn(!!email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    toast.success("You have been logged out successfully!");
    router.push("/login");
  };
  if (!isLoggedIn) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-11 h-11">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center justify-center gap-3 w-fit">
        <Avatar className="w-14 h-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {userName?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm text-gray-700">{userEmail}</p>
        <Button>
          <Link href="/user">Profile</Link>
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default User;
