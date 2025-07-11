"use client";
import { useState } from "react";

export default function PhotoUpload({ userId }: { userId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/upload-photo/${userId}`, {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type") || "";

      let result;
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Unknown error");
      }

      if (!res.ok) {
        alert("Upload failed: " + (result.message || JSON.stringify(result)));
        return;
      }

      alert("Photo uploaded!");
      setUploadedUrl(result.photoUrl);
    } catch (error) {
      alert(
        "Upload failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="p-6 border rounded-md bg-white shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Upload Profile Photo</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded Photo:</p>
          <img
            src={uploadedUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full mt-2"
          />
        </div>
      )}
    </div>
  );
}
