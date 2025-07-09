"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, TSignupSchema } from "@/lib/validation";
import { insertUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import ErrorAlert from "../alert/ErrorAlert";
import { toast } from "sonner";

const SignupForm = () => {
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = async (data: TSignupSchema) => {
    try {
      console.log(data);
      await insertUser(data);
      reset();
      toast.success("You have been registered successfully!")
      router.push("/login");
    } catch (error) {
      setErrorAlert(true);
    }
  };

  return (
    <div className="w-full">
      {/* Error Alert */}
      {errorAlert && <ErrorAlert />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-5 px-3"
      >
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-500">{`${errors.name.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Mobile Number
          </label>
          <input
            {...register("phoneNumber")}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your mobile number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{`${errors.phoneNumber.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Enter your password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-fit mt-4 py-5 px-10 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Details"}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
