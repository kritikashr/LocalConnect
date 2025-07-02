"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";

export function RoleDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRole = searchParams.get("role") || "All";
  const [role, setRole] = useState(currentRole);

  useEffect(() => {
    if (role) {
      const newParams = new URLSearchParams(searchParams);
      if (role === "All") {
        newParams.delete("role");
      } else {
        newParams.set("role", role);
      }
      router.push(`?${newParams.toString()}`);
    }
  }, [role]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mb-6 rounded-none text-base hover:bg-gray-200">{role}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Citizen">Citizen</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ServiceProvider">ServiceProvider</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Admin">Admin</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
