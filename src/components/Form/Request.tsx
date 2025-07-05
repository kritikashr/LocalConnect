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
      {errorAlert && (
        <ErrorAlert/>
      )}

      {/* Login Alert */}
      {loginAlert && (
        <AlertLogin/>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-7 px-3 w-[38vw] font-bold"
      >
        {/* Title Field */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Request title"
            className="p-2 py-3 border rounded border-[#00000066]"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description")}
            id="description"
            placeholder="Brief description"
            className="p-2 py-3 border rounded border-[#00000066]"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Service Category (Select) */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="serviceCategoryId">Category</label>
          <select
            {...register("serviceCategoryId")}
            id="serviceCategoryId"
            defaultValue=""
            className="p-2 py-3 border rounded border-[#00000066]"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="1">Electricity</option>
            <option value="2">Water Supply</option>
            <option value="3">Waste Management</option>
            <option value="4">Road Repair</option>
            <option value="5">Emergency Rescue</option>
          </select>
          {errors.serviceCategoryId && (
            <p className="text-red-500">{errors.serviceCategoryId.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-10  py-4 text-base"
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default Request;
