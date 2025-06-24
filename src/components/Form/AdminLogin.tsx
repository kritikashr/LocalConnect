"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, TAdminLoginSchema } from "@/lib/validation";
import { Button } from "../ui/button";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = (data: TAdminLoginSchema) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md flex flex-col gap-6"
    >
      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="mb-2 font-semibold text-gray-700"
        >
          Username
        </label>
        <input
          {...register("username")}
          id="username"
          type="text"
          placeholder="Enter your username"
          className={`p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && (
          <p className="text-red-500 mt-1 text-sm">{errors.username.message}</p>
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
          <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default AdminLogin;
