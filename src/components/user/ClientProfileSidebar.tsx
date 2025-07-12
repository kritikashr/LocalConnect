"use client";

import React, { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";

export default function ClientProfileSidebar({
  initialData,
}: {
  initialData: {
    name: string;
    role: string;
    photoUrl: string | null;
    userId: number;
  };
}) {
  const [name, setName] = useState(initialData.name);
  const [role, setRole] = useState(initialData.role);
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialData.photoUrl);

  return (
    <ProfileSidebar
      name={name}
      role={role}
      photoUrl={photoUrl}
      setName={setName}
      setRole={setRole}
      setPhotoUrl={setPhotoUrl}
      userId={initialData.userId}
    />
  );
}
