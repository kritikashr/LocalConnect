import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    name: z.string().min(5, { message: "Full name is required" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(10, { message: "Phone number must be at most 10 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please re-enter your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export const noticeSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(5, { message: "Description is too short" }),
  location: z.string().min(3, { message: "Location is required" }),
  contact: z.string().min(5, { message: "Contact is required" }),
});

export type TNoticeSchema = z.infer<typeof noticeSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, { message: "User email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export type TLoginSchema = z.infer<typeof loginSchema>;
