"use client";
import {
  complaintSchema,
  requestSchema,
  TComplaintSchema,
  TRequestSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { postComplaint } from "@/lib/api";
import ErrorAlert from "../alert/ErrorAlert";
import AlertLogin from "../alert/alertLogin";

const Complaint = () => {
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Omit<TComplaintSchema, "citizenId">>({
      resolver: zodResolver(complaintSchema.omit({ citizenId: true })),
    });
  const onSubmit = async (data: Omit<TComplaintSchema, "citizenId">) => {
    const token = localStorage.getItem("userToken");
    const citizenId = Number(localStorage.getItem("userId"));

    if (!token || !citizenId) {
      setLoginAlert(true);
      return;
    }

    const finalData: TComplaintSchema = {
      ...data,
      citizenId,
    };

    try {
      console.log("Sending:", finalData, token);
      await postComplaint(finalData, token);
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
        className="flex flex-col justify-center items-center gap-5 px-3 w-[30vw]"
      >
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

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="category">Category</label>
          <input
            {...register("category")}
            type="text"
            id="category"
            placeholder="Enter complaint category"
            className="p-2 py-3 border rounded border-[#00000066]"
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="priority">Priority</label>
          <input
            {...register("priority")}
            type="text"
            id="priority"
            placeholder="Enter priority"
            className="p-2 py-3 border rounded border-[#00000066]"
          />
          {errors.priority && (
            <p className="text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
        <label htmlFor="status">Status</label>
        <input
          {...register("status")}
          type="text"
          id="status"
          placeholder="Enter status"
          className="p-2 py-3 border rounded border-[#00000066]"
        />
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}
      </div>

        <Button type="submit" disabled={isSubmitting}>
          Submit Complaint
        </Button>
      </form>
    </div>
  );
};

export default Complaint;
