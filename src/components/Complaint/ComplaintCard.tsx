import React from "react";
import { GrLocationPin } from "react-icons/gr";
import { format } from "date-fns";

interface Complaint {
  id: number;
  description: string;
  category: string;
  location: string;
  createdAt: string | null;
  citizenName: string;
  priority: string;
  photoUrl?: string | null;
}

// ComplaintCard.tsx
interface ComplaintCardProps {
  complaint: Complaint; // single item, not array
}

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  return (
    <div className="my-5 p-4 rounded-xl flex flex-col gap-2 bg-[#f0f0f0] shadow-md">
      <div className="flex items-center gap-3">
        <img
          src={
            complaint.photoUrl
              ? `http://localhost:5000${complaint.photoUrl}`
              : "https://github.com/shadcn.png"
          }
          alt={complaint.citizenName}
          className="w-13 h-13 rounded-full object-cover border-2 border-blue-500 shadow"
        />
        <p>{complaint.citizenName}</p>
      </div>

      <p className="text-xl font-semibold text-center">
        {complaint.description}
      </p>

      <div className="flex justify-between text-sm text-gray-700 px-2">
        <span className="capitalize">{complaint.category}</span>
        <span className="flex items-center gap-1">
          <GrLocationPin size={18} />
          {complaint.location}
        </span>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-1 px-2">
        <span>Priority : {complaint.priority}</span>
        <span>
          {complaint.createdAt &&
            format(new Date(complaint.createdAt), "dd/MM/yyyy")}
        </span>
      </div>
    </div>
  );
}
