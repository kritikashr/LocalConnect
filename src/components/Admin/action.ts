"use server";

import {
  deleteServiceProvider,
  getUserSession,
  updateServiceProviderStatus,
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
