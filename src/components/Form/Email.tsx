"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { postEmailSubscription } from "@/lib/api";
import ErrorAlert from "../alert/ErrorAlert";
import { emailSchema, TEmailSchema } from "@/lib/validation";

const EmailSubscription = () => {
  const [errorAlert, setErrorAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TEmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: TEmailSchema) => {
    try {
      console.log("Sending:", data);
      await postEmailSubscription(data.email);
      reset();
      toast.success("You've successfully subscribed to the newsletter!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      {/* Error Alert */}
      {errorAlert && <ErrorAlert />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center gap-4"
      >
        <div>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border-1 border-white rounded-lg text-sm font-semibold p-2 w-[350px]"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="text-base">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default EmailSubscription;
