import SignupForm from "@/components/Form/SignupForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 w-full max-w-md mx-auto">
      <h3>Create an Account</h3>
      <p>Enter the details below to create your account.</p>
      <SignupForm />
    </div>
  );
};

export default page;
