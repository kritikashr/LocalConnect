import { LoginResponse, Notice, ServiceRequest } from "./type";
import {
  TComplaintSchema,
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

//Get user session
export async function getUserSession(): Promise<JWT | null> {
  const session = await getServerSession(authOptions);
  if (session?.user && "accessToken" in session.user) {
    return session.user as JWT;
  }
  return null;
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
  return fetchAPI<void>(`/api/admin/servicerequests/${id}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(status),
  });
}

//Post a complaint
export async function postComplaint(
  complaint: TComplaintSchema,
  token: string | undefined
): Promise<void> {
  return fetchAPI<void>("/api/Complaint", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(complaint),
  });
}
//Get all complaints
export async function getAllComplaints(
  token: string | undefined
): Promise<any[]> {
  return fetchAPI<any[]>("/api/admin/complaints", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//update complaint status
export async function updateComplaintStatus(
  id: number,
  status: string,
  token: string | undefined 
): Promise<void> {
  return fetchAPI<void>(`/api/admin/complaints/${id}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
}

//Get pending service provider
export async function getServiceProvider(
  token: string | undefined
): Promise<any> {
  return fetchAPI<any>("/api/admin/serviceproviders/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Get approved service provider
export async function getApprovedServiceProvider(
  token: string | undefined
): Promise<any> {
  return fetchAPI<any>("/api/admin/serviceproviders/approved", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Update service provider status
export async function updateServiceProviderStatus(
  id: number,
  token: string | undefined
): Promise<void> {
  return fetchAPI<void>(`/api/admin/serviceproviders/${id}/approve`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Delete service Provider
export async function deleteServiceProvider(
  id: number,
  token: string | undefined
): Promise<void> {
  return fetchAPI<void>(`/api/admin/serviceproviders/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Get all user
export async function getAllUsers(token: string | undefined): Promise<any[]> {
  return fetchAPI<any[]>("/api/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Delete user
export async function deleteUser(
  id: number,
  token: string | undefined
): Promise<void> {
  return fetchAPI<void>(`/api/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
