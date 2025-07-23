"use server";

import {
  deleteNotice,
  deleteServiceProvider,
  deleteUser,
  getUserSession,
  updateComplaintStatus,
  updateServiceProviderStatus,
  updateServiceRequestStatus,
} from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function handleApprove(formData: FormData) {
  const session = await getUserSession();
  const id = formData.get("providerId");

  if (!session?.accessToken) throw new Error("Unauthorized");
  if (!id) throw new Error("Missing provider ID");

  await updateServiceProviderStatus(Number(id), session.accessToken);
  revalidatePath("/admin/provider");
}

export async function handleDelete(formData: FormData) {
  const session = await getUserSession();
  const id = formData.get("providerId");

  if (!session?.accessToken) throw new Error("Unauthorized");
  if (!id) throw new Error("Missing provider ID");

  await deleteServiceProvider(Number(id), session.accessToken);
  revalidatePath("/admin/provider");
}

export async function handleDeleteUsers(formData: FormData) {
  const session = await getUserSession();
  const id = formData.get("userId");

  if (!session?.accessToken) throw new Error("Unauthorized");
  if (!id) throw new Error("Missing user ID");

  await deleteUser(Number(id), session.accessToken);
  revalidatePath("/admin/users");
}

export async function handleDeleteNews(formData: FormData) {
  const session = await getUserSession();
  const id = formData.get("newsId");

  if (!session?.accessToken) throw new Error("Unauthorized");
  if (!id) throw new Error("Missing news ID");

  await deleteNotice(Number(id), session.accessToken);
  revalidatePath("/admin/news");
}

export async function handleRequestStatus(formData: FormData) {
  const session = await getUserSession();
  const id = formData.get("requestId");
  const status = formData.get("currentStatus");

  if (!session?.accessToken) throw new Error("Unauthorized");
  if (!id || !status) throw new Error("Missing request ID or status");

  await updateServiceRequestStatus(
    Number(id),
    status.toString(),
    session.accessToken
  );
  revalidatePath("/admin/request");
}

export async function handleComplaintStatus(formData: FormData) {
  const session = await getUserSession();
  const id = formData.get("complaintId");
  const status = formData.get("currentStatus");

  if (!session?.accessToken) throw new Error("Unauthorized");
  if (!id || !status) throw new Error("Missing complaint ID or status");

  await updateComplaintStatus(
    Number(id),
    status.toString(),
    session.accessToken
  );
  revalidatePath("/admin/complaint");
}