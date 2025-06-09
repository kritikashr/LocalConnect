import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
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
