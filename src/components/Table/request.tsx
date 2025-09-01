import { getServiceRequest, getUserSession } from "@/lib/api";
import { format } from "date-fns";
import UpdateStatusForm from "../Form/UpdateStatusForm";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function RecentRequest() {
  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;

  // Fetch all requests and pick the most recent one
  const requests = await getServiceRequest(session.accessToken);
  const recentRequest = requests[0];
  if (!recentRequest) {
    return <p>No service requests found.</p>;
  }

  return (
    <div className=" w-full">
      <h2 className="text-xl font-semibold mb-4">
        Recent Service Request
      </h2>

      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Title</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Status</th>
            <th className="border px-3 py-4">Created At</th>
            <th className="border px-3 py-4">User</th>
            <th className="border px-3 py-4">Category</th>
            <th className="border px-3 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={recentRequest?.id}>
            <td className="border px-3 py-4 text-center">{recentRequest.id}</td>
            <td className="border px-3 py-4 text-center">
              {recentRequest.title}
            </td>
            <td className="border px-3 py-4 text-center">
              {recentRequest.description}
            </td>
            <td className="border px-3 py-4 text-center">
              {recentRequest.status}
            </td>
            <td className="border px-3 py-4 text-center">
              {recentRequest.createdAt &&
                format(new Date(recentRequest.createdAt), "dd/MM/yyyy")}
            </td>
            <td className="border px-3 py-4 text-center">
              {recentRequest.citizenName}
            </td>
            <td className="border px-3 py-4 text-center">
              {recentRequest.categoryName}
            </td>
            <td className="border px-3 h-full">
              <UpdateStatusForm
                requestId={recentRequest.id}
                currentStatus={recentRequest.status}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
