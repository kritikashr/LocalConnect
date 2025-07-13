import React from "react";
import { Complaint } from "@/lib/type";
import { format } from "date-fns";

interface UserComplaintProps {
  complaints: Complaint[];
}

const UserComplaint = ({ complaints }: UserComplaintProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Complaints</h2>
      <table className="min-w-full border text-sm mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Status</th>
            <th className="border px-3 py-4">Created At</th>
            <th className="border px-3 py-4">Location</th>
            <th className="border px-3 py-4">Category</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((req) => (
            <tr key={req.id}>
              <td className="border px-3 py-4 text-center">{req.id}</td>
              <td className="border px-3 py-4 text-center">
                {req.description}
              </td>
              <td className="border px-3 py-4 text-center">{req.status}</td>
              <td className="border px-3 py-4 text-center">
                {req.createdAt && format(new Date(req.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="border px-3 py-4 text-center">{req.location}</td>
              <td className="border px-3 py-4 text-center">{req.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserComplaint;
