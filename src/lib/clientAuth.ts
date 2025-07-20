"use client";

import { TLoginSchema } from "./validation";
import { LoginResponse } from "./type";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function clientUserLogin(user: TLoginSchema): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Login failed: ${message}`);
  }

  return response.json();
}

export async function clientUserLogout(): Promise<void> {
  const response = await fetch(`${API_BASE}/api/Auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Logout failed: ${message}`);
  }
} 


export function getStoredToken(): string | null {
  return localStorage.getItem("userToken");
}

export function clearStoredToken(): void {
  localStorage.removeItem("userToken");
}
