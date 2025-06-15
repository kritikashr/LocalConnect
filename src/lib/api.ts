import { Notice } from "./type";
import { TNoticeSchema } from "./validation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

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

  // ✅ Skip JSON parsing if DELETE or 204 No Content
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
export async function createNotice(notice: TNoticeSchema): Promise<Notice> {
  return fetchAPI<Notice>("/api/News", {
    method: "POST",
    body: JSON.stringify(notice),
  });
}

// Delete a notice
export async function deleteNotice(id: number): Promise<void> {
  await fetchAPI<void>(`/api/News/${id}`, {
    method: "DELETE",
  });
}
