import React from 'react';
import { Mail, Phone, Star } from 'lucide-react';

const ServiceProviderCard = ({ provider }: { provider: {
  name: string;
  photoUrl: string;
  category: string;
  rating: number;
  email: string;
  phone: string;
} }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <img
          src="https://github.com/shadcn.png"
          alt={provider.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{provider.name}</h2>
          <p className="text-sm text-gray-500">{provider.category}</p>
          <div className="flex items-center mt-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{provider.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 space-y-2">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{provider.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{provider.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderCard;
