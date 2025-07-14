import { ca } from "date-fns/locale";
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

export const requestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categoryName: z.enum(
      [
        "Electrician",
        "Plumber",
        "Carpenter",
        "House Cleaner",
        "AC/Fridge Repair",
        "Beautician",
        "Taxi Driver",
        "Pest Control",
      ],
      {
        message: "Category is required",
      }
  ),
  citizenId: z.coerce.number().min(1, "User not identified."),
});

export type TRequestSchema = z.infer<typeof requestSchema>;

export const complaintSchema = z.object({
  description: z.string().min(3, { message: "Description is required" }),
  citizenId: z.coerce.number().min(1, "User not identified."),
  location: z.string().min(3, { message: "Location is required" }),
});

export type TComplaintSchema = z.infer<typeof complaintSchema>;

export const serviceProviderSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(7, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
    category: z.enum(
      [
        "Electrician",
        "Plumber",
        "Carpenter",
        "House Cleaner",
        "AC/Fridge Repair",
        "Beautician",
        "Taxi Driver",
        "Pest Control",
      ],
      {
        message: "Service category is required",
      }
    ),
    experienceYear: z
      .number({ invalid_type_error: "Experience must be a number" })
      .min(0, "Experience year must be positive"),
    description: z.string().min(10, "Please describe yourself"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TServiceProviderSchema = z.infer<typeof serviceProviderSchema>;
