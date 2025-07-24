"use client";
import { useEffect } from "react";

export default function CookieTestPage() {
  useEffect(() => {
    fetch("http://localhost:5000/api/Auth/test-cookie", {
      method: "GET",
      credentials: "include", // VERY IMPORTANT
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from API:", data);
      });
  }, []);

  return <div>Testing cookie set...</div>;
}
