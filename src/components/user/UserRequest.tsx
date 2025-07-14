import React from "react";
import { ServiceRequest } from "@/lib/type";
import { format } from "date-fns";

interface UserRequestProps {
  requests: ServiceRequest[];
}

const UserRequest = ({ requests }: UserRequestProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Service Requests</h2>
      <table className="min-w-full border text-sm mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Title</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Status</th>
            <th className="border px-3 py-4">Created At</th>
            {/* <th className="border px-3 py-4">Completed At</th> */}
            <th className="border px-3 py-4">Category</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="border px-3 py-4 text-center">{req.id}</td>
              <td className="border px-3 py-4 text-center">{req.title}</td>
              <td className="border px-3 py-4 text-center">
                {req.description}
              </td>
              <td className="border px-3 py-4 text-center">{req.status}</td>
              <td className="border px-3 py-4 text-center">
                {req.createdAt && format(new Date(req.createdAt), "dd/MM/yyyy")}
              </td>
              {/* <td className="border px-3 py-4 text-center">
                      {req.completedAt &&
                        format(new Date(req.completedAt), "dd/MM/yyyy")}
                    </td> */}
              <td className="border px-3 py-4 text-center">
                {req.categoryName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRequest;
