"use server";

import { cookies } from "next/headers";
import ClientProfileSidebar from "@/components/user/ClientProfileSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserComplaints, getUserServiceRequests } from "@/lib/api";
import UserComplaint from "@/components/user/UserComplaint";
import UserRequest from "@/components/user/UserRequest";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const userInfoRaw = (await cookieStore).get("userInfo")?.value;
  const accessToken = (await cookieStore).get("accessToken")?.value;

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

  const complaints = await getUserComplaints(initialData.userId, accessToken); 
  const requests = await getUserServiceRequests(initialData.userId, accessToken); 
  return (
    <div className="flex justify-center items-center p-10">
      <div className="bg-white shadow-xl rounded-2xl flex w-full overflow-hidden">
        <ClientProfileSidebar initialData={initialData} />
        <div className="w-3/4 p-6">
          <Tabs defaultValue="complaint" className="w-full">
            <TabsList className="w-full rounded-none h-fit">
              <TabsTrigger value="complaint" className="rounded-none text-base">
                Complaints
              </TabsTrigger>
              <TabsTrigger value="request" className="rounded-none text-base">
                Request
              </TabsTrigger>
            </TabsList>
            <TabsContent value="complaint">
              <UserComplaint complaints={complaints} />
            </TabsContent>
            <TabsContent value="request">
              <UserRequest requests={requests} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
