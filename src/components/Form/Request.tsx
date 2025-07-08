"use client";
import { requestSchema, TRequestSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { postServiceRequest } from "@/lib/api";
import { useRouter } from "next/navigation";
import AlertLogin from "../alert/alertLogin";
import ErrorAlert from "../alert/ErrorAlert";

const Request = () => {
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Omit<TRequestSchema, "citizenId">>({
    resolver: zodResolver(requestSchema.omit({ citizenId: true })),
  });

  const onSubmit = async (data: Omit<TRequestSchema, "citizenId">) => {
    const token = localStorage.getItem("userToken");
    const citizenId = Number(localStorage.getItem("userId"));

    if (!token || !citizenId) {
      setLoginAlert(true);
      return;
    }

    const finalData: TRequestSchema = {
      ...data,
      citizenId,
    };

    try {
      console.log("Sending:", finalData, token);
      await postServiceRequest(finalData, token);
      reset();
      router.push("/");
    } catch (err) {
      setErrorAlert(true);
      console.error(err);
    }
  };

  return (
    <div>
      {/* Error Alert */}
      {errorAlert && <ErrorAlert />}

      {/* Login Alert */}
      {loginAlert && <AlertLogin />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-7 px-3 w-[38vw] font-medium"
      >
        {/* Title Field */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Request title"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            placeholder="Brief description"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Service Category (Select) */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="categoryName"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            {...register("categoryName")}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Carpenter">Carpenter</option>
            <option value="House Cleaner">House Cleaner</option>
            <option value="AC/Fridge Repair">AC/Fridge Repair</option>
            <option value="Beautician">Beautician</option>
            <option value="Taxi Driver">Taxi Driver</option>
            <option value="Pest Control">Pest Control</option>
          </select>
          {errors.categoryName && (
            <p className="text-red-500">{errors.categoryName.message}</p>
          )}
        </div>

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-5 px-10 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Request;
