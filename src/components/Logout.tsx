"use client";

async function handleLogout() {
  // Call backend logout to delete cookie
  await fetch("http://localhost:5000/api/Auth/logout", {
    method: "POST",
    credentials: "include", // important to send cookies
  });
}

export default function LogoutButton() {
  return <button onClick={handleLogout}>Logout</button>;
}
