"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  serviceProviderSchema,
  TServiceProviderSchema,
} from "@/lib/validation";
import { insertProvider } from "@/lib/api";
import { useRouter } from "next/navigation";
import ErrorAlert from "../alert/ErrorAlert";
import { toast } from "sonner";

const ProviderForm = () => {
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TServiceProviderSchema>({
    resolver: zodResolver(serviceProviderSchema),
  });

  const onSubmit = async (data: TServiceProviderSchema) => {
    try {
      console.log(data);
      await insertProvider(data);
      reset();
      toast.success("You have been registered successfully!");
      router.push("/");
    } catch (error) {
      setErrorAlert(true);
      console.error(error);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      {errorAlert && <ErrorAlert />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-3xl px-10 py-12 w-full max-w-3xl border border-gray-100 transition-all duration-300"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Register as a <span className="text-blue-600">Service Provider</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              {...register("phoneNumber")}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Service Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Service Category
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              {...register("experienceYear", { valueAsNumber: true })}
              type="number"
              placeholder="e.g. 3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.experienceYear && (
              <p className="text-sm text-red-500 mt-1">
                {errors.experienceYear.message}
              </p>
            )}
          </div>

          {/* About You */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              About You
            </label>
            <textarea
              {...register("description")}
              placeholder="Tell us about your skills "
              className="w-full px-4 py-3 h-[50px] border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300"
        >
          {isSubmitting ? "Registering..." : "Submit Details"}
        </button>
      </form>
    </div>
  );
};

export default ProviderForm;
