import { getAllComplaints, getUserSession } from "@/lib/api";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import UpdateComplaintStatus from "../Form/UpdateComplaintStauts";

export default async function ManageComplaint() {
  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || !session.accessToken || session.accessToken === "undefined") {
    return <p>Unauthorized</p>;
  }

  const complaints = await getAllComplaints(session.accessToken as string);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold ">Manage Complaints</h2>
      <Link href="/file-complaint">
        <Button className="mt-4 mb-1 rounded-none text-base bg-white text-black border hover:bg-gray-200">
          Add Complaint
        </Button>
      </Link>
      <table className="min-w-full border text-sm mt-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Status</th>
            <th className="border px-3 py-4">Created At</th>
            <th className="border px-3 py-4">Location</th>
            <th className="border px-3 py-4">User</th>
            <th className="border px-3 py-4">Category</th>
            <th className="border px-3 py-4">Actions</th>
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
              <td className="border px-3 py-4 text-center">
                {req.citizenName}
              </td>
              <td className="border px-3 py-4 text-center">{req.category}</td>
              <td className="border px-3 h-full">
                <UpdateComplaintStatus
                  complaintId={req.id}
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
