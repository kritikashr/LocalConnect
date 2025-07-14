"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { userLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import ErrorAlert from "../alert/ErrorAlert";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const user = await userLogin(data);
      // Save to localStorage
      localStorage.setItem("userToken", user.accessToken);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userId", user.id.toString());

      // Notify other tabs
      window.dispatchEvent(new Event("auth-change"));

      toast.success(`Welcome, ${user.name}`);
      router.push("/");
    } catch (err: any) {
      setErrorAlert(true);
      console.error("Login error:", err);
      toast.error(err.message || "Login failed.");
    }
  };

  return (
    <div>
      {/* Error Alert */}
      {errorAlert && <ErrorAlert />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            placeholder="Enter your email."
            className={`p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Enter your password"
            className={`p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 py-5 px-7 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
