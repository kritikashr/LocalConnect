"use server";
import {
  Complaint,
  LoginResponse,
  Notice,
  Provider,
  ServiceRequest,
  UserStats,
} from "./type";
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
  options: RequestInit = {},
  timeout = 10000,
  retry = true // flag to avoid infinite retry loop
): Promise<T> {
  const res = await fetchWithTimeout(
    `${API_BASE}${path}`,
    {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
      body: options.body,
      credentials: "include",
      signal: options.signal,
    },
    timeout
  );

  if (res.status == 401 && retry && !path.includes("/login")) {
    // Try refreshing token
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry original request once
      return fetchAPI<T>(path, options, timeout, false);
    } else {
      // Refresh failed — logout user
      await userLogout();
      throw new Error("Session expired, user logged out");
    }
  }

  if (!res.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorBody = await res.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } catch (err) {
      errorMessage = await res.text();
    }

    // Throw with clean message
    throw new Error(errorMessage);
  }

  if (options.method === "DELETE" || res.status === 204) {
    return {} as T;
  }

  return res.json();
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/Auth/refresh-token`, {
      method: "POST",
      credentials: "include", // send cookie with refresh token
    });
    if (!res.ok) return false;

    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("userToken", data.accessToken);
      console.log("Access token refreshed successfully");
      return true;
    }
    return false;
  } catch {
    return false;
  }
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
//logout user
export async function userLogout(): Promise<void> {
  await fetchAPI<void>("/api/Auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

//Get user session
export async function getUserSession(): Promise<JWT | null> {
  const session = await getServerSession(authOptions);
  if (session?.user && "accessToken" in session.user) {
    return session.user as JWT;
  }
  return null;
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
export async function deleteNotice(id: number, token: string): Promise<void> {
  await fetchAPI<void>(`/api/News/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  category: string,
  token: string | undefined,
  page: number = 1,
  pageSize: number = 10
): Promise<{ complaints: Complaint[]; totalPages: number }> {
  const query = [
    category && category !== "All"
      ? `category=${encodeURIComponent(category)}`
      : "",
    `page=${page}`,
    `pageSize=${pageSize}`,
  ]
    .filter(Boolean)
    .join("&");

  // Fetch data from the API
  const response = await fetchAPI<{
    complaints: Complaint[];
    totalPages: number;
  }>(`/api/admin/complaints?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

//Get all complaints by user
export async function getComplaints(
  category: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ complaints: Complaint[]; totalPages: number }> {
  // Generate query string for category, page, and pageSize
  const query = [
    category && category !== "All"
      ? `category=${encodeURIComponent(category)}`
      : "",
    `page=${page}`,
    `pageSize=${pageSize}`,
  ]
    .filter(Boolean)
    .join("&");

  // Fetch data from the API
  const response = await fetchAPI<{
    complaints: Complaint[];
    totalPages: number;
  }>("/api/Complaint?" + query);

  return response;
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
    body: JSON.stringify(status),
  });
}

//Get pending service provider
export async function getServiceProvider(
  token: string | undefined
): Promise<Provider[]> {
  return fetchAPI<Provider[]>("/api/ServiceProviders/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Get approved service provider
export async function getApprovedServiceProvider(
  token: string | undefined
): Promise<Provider[]> {
  return fetchAPI<Provider[]>("/api/ServiceProviders/approved", {
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
  return fetchAPI<void>(`/api/ServiceProviders/${id}/approve`, {
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
  return fetchAPI<void>(`/api/ServiceProviders/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//Get all user
export async function getAllUsers(
  role: string,
  token: string | undefined
): Promise<LoginResponse[]> {
  const query =
    role && role !== "All" ? `?role=${encodeURIComponent(role)}` : "";
  return fetchAPI<LoginResponse[]>("/api/admin/users" + query, {
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

//Get approved service provider
export async function getApprovedServiceProviders(
  category: string
): Promise<Provider[]> {
  const query =
    category && category !== "All"
      ? `?category=${encodeURIComponent(category)}`
      : "";
  return fetchAPI<Provider[]>("/api/ServiceProviders/approved" + query);
}

// get user complaints
export async function getUserComplaints(
  userId: number,
  token: string | undefined
): Promise<Complaint[]> {
  return fetchAPI<Complaint[]>(`/api/Complaint/citizen/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// get user service requests
export async function getUserServiceRequests(
  userId: number,
  token: string | undefined
): Promise<ServiceRequest[]> {
  return fetchAPI<ServiceRequest[]>(`/api/ServiceRequests/citizen/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//get news
export async function getNepaliNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`)
    .then((res) => res.json())
    .catch(console.error);

  return res;
}
// Post email subscription
export async function postEmailSubscription(email: string): Promise<void> {
  return fetchAPI<void>("/api/Newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// Get completed complaints count
export async function getCompletedComplaintsCount(
  token: string | undefined
): Promise<number> {
  const res = await fetchAPI<{ completedCount: number }>(
    "/api/Complaint/count/completed",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.completedCount;
}

export async function getUserStats(
  token: string | undefined
): Promise<UserStats> {
  return await fetchAPI<UserStats>("/api/Auth/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProviderCount(
  token: string | undefined
): Promise<number> {
  const res = await fetchAPI<{ approvedCount: number }>("/api/ServiceProviders/approved/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.approvedCount;
}

export async function getRequestCount(
  token: string | undefined
): Promise<number> {
  const res = await fetchAPI<{ pendingCount: number }>("/api/ServiceRequests/pending/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.pendingCount;
}