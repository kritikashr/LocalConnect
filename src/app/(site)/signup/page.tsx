import SignupForm from "@/components/Form/SignupForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center  w-full h-[90vh] bg-gradient-to-b from-gray-50 to-white">
      <div className="border rounded-lg bg-white shadow-2xl flex  justify-center items-center">
        <div className="flex flex-col gap-5 items-center m-5 w-[40vw]">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Create an <span className="text-blue-600">Account</span>
          </h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default page;
