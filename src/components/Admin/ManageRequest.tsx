import { getServiceRequest, getUserSession } from "@/lib/api";
import { format } from "date-fns";
import UpdateStatusForm from "../Form/UpdateStatusForm";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function ManageRequestPage() {
  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;

  const requests = await getServiceRequest(session.accessToken);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold ">Manage Service Requests</h2>
      <Link href="/add-request">
        <Button className="mt-4 mb-1 rounded-none text-base bg-white text-black border hover:bg-gray-200">
          Add Service Request
        </Button>
      </Link>
      <table className="min-w-full border text-sm mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Title</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Status</th>
            <th className="border px-3 py-4">Created At</th>
            <th className="border px-3 py-4">Completed At</th>
            <th className="border px-3 py-4">User</th>
            <th className="border px-3 py-4">Category</th>
            <th className="border px-3 py-4">Actions</th>
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
              <td className="border px-3 py-4 text-center">
                {req.completedAt &&
                  format(new Date(req.completedAt), "dd/MM/yyyy")}
              </td>
              <td className="border px-3 py-4 text-center">{req.citizen}</td>
              <td className="border px-3 py-4 text-center">
                {req.serviceCategory}
              </td>
              <td className="border px-3 h-full">
                <UpdateStatusForm
                  requestId={req.id}
                  currentStatus={req.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
