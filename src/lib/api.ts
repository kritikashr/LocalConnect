import { LoginResponse, Notice, ServiceRequest } from "./type";
import {
  TLoginSchema,
  TNoticeSchema,
  TRequestSchema,
  TSignupSchema,
} from "./validation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JWT } from "next-auth/jwt";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch data with a timeout
// This function will abort the request if it takes longer than the specified timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 5000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
}

// Generic function to fetch data from the API
// It handles different HTTP methods and returns the parsed JSON response
async function fetchAPI<T = any>(
  path: string,
  options?: RequestInit,
  timeout = 5000
): Promise<T> {
  const res = await fetchWithTimeout(
    `${API_BASE}${path}`,
    {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options?.headers || {}),
      },
      body: options?.body,
    },
    timeout
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error ${res.status}: ${message}`);
  }

  if (options?.method === "DELETE" || res.status === 204) {
    return {} as T;
  }

  return res.json();
}

// Get all notices
export async function getNotices(): Promise<Notice[]> {
  return fetchAPI<Notice[]>("/api/News");
}

// Create a notice
export async function createNotice(
  notice: TNoticeSchema,
  token: string
): Promise<Notice> {
  return fetchAPI<Notice>("/api/News", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(notice),
  });
}

// Delete a notice
export async function deleteNotice(id: number): Promise<void> {
  await fetchAPI<void>(`/api/News/${id}`, {
    method: "DELETE",
  });
}

// insert a user
export async function insertUser(user: TSignupSchema): Promise<void> {
  await fetchAPI<void>("/api/Auth/register-citizen", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

// insert a service provider
export async function insertProvider(user: TSignupSchema): Promise<void> {
  await fetchAPI<void>("/api/Auth/register-serviceprovider", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

// user login
export async function userLogin(user: TLoginSchema): Promise<LoginResponse> {
  const response = await fetchAPI<LoginResponse>("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
  });
  localStorage.setItem("userToken", response.token);
  localStorage.setItem("userName", response.name);
  localStorage.setItem("userEmail", response.email);
  localStorage.setItem("userRole", response.role);
  localStorage.setItem("userId", response.id);
  window.dispatchEvent(new Event("auth-change"));
  return response;
}

export async function adminLogin(
  user: TLoginSchema
): Promise<{ message: string }> {
  const response = await fetchAPI<{ message: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
  });
  return response;
}

//Post a service request
export async function postServiceRequest(
  request: TRequestSchema,
  token: string
): Promise<void> {
  return fetchAPI<void>("/api/ServiceRequests", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
}

//Get service request
export async function getServiceRequest(
  token: string | undefined
): Promise<ServiceRequest[]> {
  return fetchAPI<ServiceRequest[]>("/api/admin/servicerequests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Update service request status
export async function updateServiceRequestStatus(
  id: number,
  status: string,
  token: string | undefined
): Promise<void> {
  return fetchAPI<void>(`/api/ServiceRequests/${id}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(status),
  });
}
