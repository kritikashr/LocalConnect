"use client";

import {
  Handshake,
  Inbox,
  Newspaper,
  TriangleAlert,
  Users,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

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
    title: "Complaints",
    url: "#",
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
    url: "#",
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="h-full flex">
          <SidebarGroup>
            <SidebarGroupLabel>
              <p className="text-base p-2 pt-4">Admin Panel</p>
            </SidebarGroupLabel>

            <div className="mt-10 flex flex-col justify-between h-full">
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="mt-2 flex items-center gap-2"
                        >
                          <item.icon />
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
