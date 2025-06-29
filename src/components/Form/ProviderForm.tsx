"use client";
import React from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, TSignupSchema } from "@/lib/validation";
import { insertProvider } from "@/lib/api";
import { useRouter } from "next/navigation";

const ProviderForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: TSignupSchema) => {
    console.log(data);
    await insertProvider(data);
    reset();
    alert("Registered successfully.");
    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 px-3 w-[30vw] "
    >
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="name">Full Name</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          className="p-2 py-3 border-1 rounded border-[#00000066]"
        />
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="email">Email Address</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 py-3 border-1 rounded border-[#00000066]"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="phoneNumber">Mobile Number</label>
        <input
          {...register("phoneNumber")}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter your mobile number"
          className="p-2 py-3 border-1 rounded border-[#00000066]"
        />
        {errors.phoneNumber && (
          <p className="text-red-500">{`${errors.phoneNumber.message}`}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="password">Enter your password</label>
        <input
          {...register("password")}
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          className="p-2 py-3 border-1 rounded border-[#00000066]"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="p-2 py-3 border-1 rounded border-[#00000066]"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

export default ProviderForm;
