"use client"
import { requestSchema, TRequestSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const Request = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<TRequestSchema>({
        resolver: zodResolver(requestSchema),
      });
      const onSubmit = (data : TRequestSchema)=>{
        console.log(data);
        reset();
        alert(" successfully.");
            
      }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 px-3 w-[30vw]"
    >
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
        <label htmlFor="serviceCategory">Category</label>
        <input
          {...register("serviceCategory")}
          type="text"
          id="serviceCategory"
          placeholder="Enter service category"
          className="p-2 py-3 border rounded border-[#00000066]"
        />
        {errors.serviceCategory && (
          <p className="text-red-500">{errors.serviceCategory.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Submit Notice
      </Button>
    </form>
  );
};

export default Request;
