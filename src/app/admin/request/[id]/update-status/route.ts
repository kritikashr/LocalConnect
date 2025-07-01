import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateServiceRequestStatus } from "@/lib/api";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin?callbackUrl=/admin", req.url));
  }

  const formData = await req.formData();
  const status = formData.get("status")?.toString();

  if (!status) {
    return new NextResponse("Status not provided", { status: 400 });
  }

  try {
    await updateServiceRequestStatus(Number(params.id), status, token);
    return NextResponse.redirect(new URL("/admin/request", req.url));
  } catch (error) {
    console.error("Failed to update:", error);
    return new NextResponse(
      "Failed to update status: " + (error instanceof Error ? error.message : "Unknown error"),
      { status: 500 }
    );
  }
}
