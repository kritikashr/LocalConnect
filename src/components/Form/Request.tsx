"use client";
import { requestSchema, TRequestSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { postServiceRequest } from "@/lib/api";

const Request = () => {
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
      alert("You must be logged in to submit a request.");
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
      alert("Submitted successfully.");
    } catch (err) {
      alert("Failed to submit request.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 px-3 w-[30vw]"
    >
      {/* Title Field */}
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="title">Title</label>
        <input
          {...register("title")}
          type="text"
          id="title"
          placeholder="Notice title"
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

      <Button type="submit" disabled={isSubmitting}>
        Submit Notice
      </Button>
    </form>
  );
};

export default Request;
