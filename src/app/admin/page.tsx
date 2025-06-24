
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";


const  page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") return <p>Access Denied</p>;
  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <Link href="/admin/news">
          <Button className="md:h-11 lg:h-12 lg:text-base lg:px-6">
            Manage News
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
