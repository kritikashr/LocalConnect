import { getServiceRequest, getUserSession } from "@/lib/api";
import { format } from "date-fns";
import UpdateStatusForm from "../Form/UpdateStatusForm";

export default async function ManageRequestPage() {
  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || typeof session.accessToken !== "string") return <p>Unauthorized</p>;

  const requests = await getServiceRequest(session.accessToken);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Manage Service Requests</h2>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Created At</th>
            <th className="border px-3 py-2">Completed At</th>
            <th className="border px-3 py-2">User</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="border px-3 py-2">{req.id}</td>
              <td className="border px-3 py-2">{req.title}</td>
              <td className="border px-3 py-2">{req.description}</td>
              <td className="border px-3 py-2">{req.status}</td>
              <td className="border px-3 py-2">
                {req.createdAt && format(new Date(req.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="border px-3 py-2">
                {req.completedAt && format(new Date(req.completedAt), "dd/MM/yyyy")}
              </td>
              <td className="border px-3 py-2">{req.citizen}</td>
              <td className="border px-3 py-2">{req.serviceCategory}</td>
              <td className="border px-3 py-2">
                <UpdateStatusForm requestId={req.id} currentStatus={req.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
