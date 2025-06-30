import { getServiceRequest } from "@/lib/api";
import React, { use } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { DeleteButtonWrapper } from "../ui/DeleteButtonWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ManageRequest: React.FC = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const requests = await getServiceRequest(token);
  console.log(requests);

  return (
    <div className="p-4 w-full">
      {/* <Link href="/admin/news/add">
        <Button className="my-5">Add </Button>
      </Link> */}
      <table className="min-w-full border border-gray-300 text-sm w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">CreatedAt</th>
            <th className="border px-3 py-2">CompletedAt</th>
            <th className="border px-3 py-2">User</th>
            <th className="border px-3 py-2">Service Category</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request: any) => (
            <tr key={request.id}>
              <td className="border px-3 py-1 text-center">{request.id}</td>
              <td className="border px-3 py-1">{request.title}</td>
              <td className="border px-3 py-1">{request.description}</td>
              <td className="border px-3 py-1">{request.status}</td>
              <td className="border px-3 py-1">
                {request.createdAt &&
                  format(new Date(request.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="border px-3 py-1">
                {request.completedAt &&
                  format(new Date(request.completedAt), "dd/MM/yyyy")}
              </td>
              <td className="border px-3 py-1">{request.citizen}</td>
              <td className="border px-3 py-1">{request.serviceCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequest;
