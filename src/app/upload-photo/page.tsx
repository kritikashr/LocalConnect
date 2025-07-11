"use client";
import { useEffect, useState } from "react";
import PhotoUpload from "@/components/Form/PhotoUpload";

export default function UploadPhotoPage() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(Number(storedId));
    }
  }, []);

  if (userId === null) return <div>Loading...</div>;

  return <PhotoUpload userId={userId} />;
}
