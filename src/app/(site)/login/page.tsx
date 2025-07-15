import Login from "@/components/Form/Login";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="bg-white shadow-2xl rounded-3xl px-10 py-12 w-2/5 border border-gray-100 transition-all duration-300 ">
        <Login />
        <div className="flex flex-col items-center  gap-1 mt-4">
          <p>Don't have an account ?</p>
          <Link href="/signup" className="text-blue-500">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
