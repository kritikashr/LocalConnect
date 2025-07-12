"use server"
import { cookies } from "next/headers";
import ClientProfileSidebar from "@/components/user/ClientProfileSidebar"; 

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userInfoRaw = cookieStore.get("userInfo")?.value;

  let initialData = {
    name: "",
    role: "",
    photoUrl: null,
    userId: 1,
  };

  if (userInfoRaw) {
    try {
      const user = JSON.parse(decodeURIComponent(userInfoRaw));
      initialData = {
        name: user.name || "",
        role: user.role || "",
        photoUrl: user.photoUrl || null,
        userId: user.id || 1,
      };
    } catch (err) {
      console.error("Failed to parse userInfo cookie:", err);
    }
  }

  return (
    <div className="flex justify-center items-center p-10">
      <div className="bg-white shadow-xl rounded-2xl flex w-full overflow-hidden">
        <ClientProfileSidebar initialData={initialData} />
        <div className="w-3/4 p-6">{/* Right panel content */}</div>
      </div>
    </div>
  );
}
