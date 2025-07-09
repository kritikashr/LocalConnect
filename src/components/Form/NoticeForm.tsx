"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TNoticeSchema, noticeSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { createNotice } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const NoticeForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TNoticeSchema>({
    resolver: zodResolver(noticeSchema),
  });

  const onSubmit = async (data: TNoticeSchema) => {
    try {
      const token = session?.user.accessToken;
      if (!token) throw new Error("User not authenticated");
      await createNotice(data, token);
      reset();
      toast.success("Your notice have been registered successfully!")
      router.push("/admin/news");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5   p-5  shadow-2xl rounded-3xl px-10 py-12 w-full max-w-3xl border border-gray-100 transition-all duration-300"
    >
      {/* Title */}
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
          placeholder="Notice title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          {...register("location")}
          type="text"
          id="location"
          placeholder="Enter location"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="contact"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Contact
        </label>
        <input
          {...register("contact")}
          type="text"
          id="contact"
          placeholder="Contact number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.contact && (
          <p className="text-red-500">{errors.contact.message}</p>
        )}
      </div>

      <div className="flex justify-center items-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-fit mt-2 py-5 px-7 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Notice"}
        </Button>
      </div>
    </form>
  );
};

export default NoticeForm;
