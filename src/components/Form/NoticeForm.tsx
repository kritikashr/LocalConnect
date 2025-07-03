"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TNoticeSchema, noticeSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { createNotice } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
      router.push("/admin/news");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-5 px-3 w-[30vw]"
    >
      {/* Title */}
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

      {/* Description */}
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

      {/* Location */}
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="location">Location</label>
        <input
          {...register("location")}
          type="text"
          id="location"
          placeholder="Enter location"
          className="p-2 py-3 border rounded border-[#00000066]"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="contact">Contact</label>
        <input
          {...register("contact")}
          type="text"
          id="contact"
          placeholder="Contact number"
          className="p-2 py-3 border rounded border-[#00000066]"
        />
        {errors.contact && (
          <p className="text-red-500">{errors.contact.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Submit Notice
      </Button>
    </form>
  );
};

export default NoticeForm;
