import Login from "@/components/Form/Login";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md ">
      <Login />
      <div className="flex flex-col items-center  gap-1 mt-4">
        <p>Don't have an account ?</p>
        <Link href="/signup" className="text-blue-500">Register now</Link>
      </div>
    </div>
  );
};

export default page;
