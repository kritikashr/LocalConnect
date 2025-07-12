"use client";

import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaPlus } from "react-icons/fa6";
import AlertLogin from "../alert/alertLogin";
import ErrorAlert from "../alert/ErrorAlert";

interface AvatarUploaderProps {
  photoUrl: string | null;
  name: string;
  onUpload: (url: string) => void;
  userId: number;
}

export default function AvatarUploader({
  photoUrl,
  name,
  onUpload,
  userId,
}: AvatarUploaderProps) {
  const [errorAlert, setErrorAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/auth/upload-photo/${userId}`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setLoginAlert(true);
        onUpload(result.photoUrl);
      }

      if (!res.ok) {
        setErrorAlert(true);
        return;
      }

      onUpload(result.photoUrl);
    } catch (err) {
      setErrorAlert(true);
    }
  };

  return (
    <>
      {/* Error Alert */}
      {errorAlert && <ErrorAlert />}

      {/* Login Alert */}
      {loginAlert && (
        <AlertLogin message="Please log in again to see your updated profile." />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div onClick={handleClick} className="cursor-pointer group relative">
        <Avatar className="w-24 h-24 mb-4 border-2 border-gray-300 group-hover:ring-2 group-hover:ring-purple-500 transition">
          <AvatarImage
            src={photoUrl ? `http://localhost:5000${photoUrl}` : "/default.jpg"}
            alt={name}
          />
          <AvatarFallback>{name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-2 right-1 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          <FaPlus />
        </div>
      </div>
    </>
  );
}
