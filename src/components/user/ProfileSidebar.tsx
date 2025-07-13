"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import AvatarUploader from "./AvatarUploader";

interface SidebarProps {
  name: string;
  role: string;
  photoUrl: string | null;
  setName: (v: string) => void;
  setRole: (v: string) => void;
  setPhotoUrl: (v: string) => void;
  userId: number;
}

export default function ProfileSidebar({
  name,
  role,
  photoUrl,
  setName,
  setRole,
  setPhotoUrl,
  userId,
}: SidebarProps) {
  return (
    <div className="w-1/4 bg-gray-100 p-6 flex flex-col items-center">
      <AvatarUploader
        photoUrl={photoUrl}
        name={name}
        onUpload={setPhotoUrl}
        userId={userId}
      />

      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-2 text-center font-semibold"
        placeholder="Name"
      />
      <Input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mt-2 text-center text-sm"
        placeholder="Role"
      />
    </div>
  );
}
