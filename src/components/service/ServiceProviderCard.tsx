import React from "react";
import { Mail, Phone, Star } from "lucide-react";

const ServiceProviderCard = ({
  provider,
}: {
  provider: {
    id: number;
    name: string;
    email: string;
    category: string;
    description: string;
    experienceYear: number;
    phoneNumber: string;
    photoUrl?: string;
    rating: number;
  };
}) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 p-6 w-full max-w-sm text-center">
      {/* Image */}
      <img
        src={
          provider.photoUrl
            ? `http://localhost:5000${provider.photoUrl}`
            : "https://github.com/shadcn.png"
        }
        alt={provider.name}
        className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-blue-500 shadow"
      />

      {/* Name & Category */}
      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        {provider.name}
      </h2>
      <span className="inline-block mt-1 px-3 py-1 text-xs bg-indigo-100 text-blue-700 rounded-sm font-medium">
        {provider.category}
      </span>

      {/* Experience Highlighted */}
      <p className="mt-4 text-sm font-bold text-blue-600">
        {provider.experienceYear} years of experience
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 italic mt-1 h-[60px] line-clamp-3">
        {provider.description}
      </p>

      {/* Rating */}
      <div className="flex justify-center items-center mt-3 text-yellow-500">
        <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
        <span className="ml-1 text-sm font-semibold">
          {(provider.rating ?? 0).toFixed(1)}
        </span>
      </div>

      {/* Contact Info */}
      <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-center items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{provider.email}</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{provider.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderCard;
