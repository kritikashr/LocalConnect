"use client";

import {
  Handshake,
  Inbox,
  Newspaper,
  TriangleAlert,
  Users,
  LogOut,
  ShieldUser,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Admin Panel",
    url: "/admin",
    icon: ShieldUser,
  },
  {
    title: "Complaints",
    url: "/admin/complaint",
    icon: TriangleAlert,
  },
  {
    title: "Service Provider",
    url: "/admin/provider",
    icon: Handshake,
  },
  {
    title: "Service Request",
    url: "/admin/request",
    icon: Inbox,
  },
  {
    title: "News and alert",
    url: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="h-full flex">
          <SidebarGroup>
            {/* <SidebarGroupLabel className="p-2 mt-5 mb-1 flex gap-2 items-center">
              <RiAdminLine />
              <p className="text-base font-medium text-gray-600">Admin Panel</p>
            </SidebarGroupLabel> */}

            <div className="flex flex-col justify-between h-full">
              <SidebarGroupContent>
                <SidebarMenu className="pt-8">
                  {items.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className="py-7">
                          <Link
                            href={item.url}
                            className={`mt-2 flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                              isActive
                                ? "bg-gray-200 text-gray-600 font-semibold"
                                : "text-gray-600  hover:bg-gray-50"
                            }`}
                          >
                            <item.icon />
                            <span className="text-base">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>

              <div className="mt-auto px-4 pb-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 w-full text-left text-red-600 hover:text-red-800"
                >
                  <LogOut />
                  <span className="text-base">Logout</span>
                </button>
              </div>
            </div>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
