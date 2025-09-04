import { getAllComplaints, getUserSession } from "@/lib/api";
import { format } from "date-fns";
import UpdateComplaintStatus from "../Form/UpdateComplaintStatus";
import { Complaint } from "@/lib/type";

export default async function RecentComplaints() {
  const session = await getUserSession();

  if (!session || !session.accessToken || session.accessToken === "undefined") {
    return <p>Unauthorized</p>;
  }

  let complaints: Complaint[] = [];

  try {
    const data = await getAllComplaints(
      "All",
      session.accessToken as string,
      1, 
      1
    );
    complaints = data.complaints || [];
  } catch (error) {
    console.error("Error fetching recent complaints:", error);
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-3">Recent Complaints</h2>

      <table className="min-w-full border text-sm mt-5">
        <thead >
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Description</th>
            <th className="border px-3 py-4">Status</th>
            <th className="border px-3 py-4">Created At</th>
            <th className="border px-3 py-4">User</th>
            <th className="border px-3 py-4">Category</th>
            <th className="border px-3 py-4">Actions</th>
          </tr>
        </thead>
        <tbody >
          {complaints.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                😔 No recent complaints found.
              </td>
            </tr>
          ) : (
            complaints.map((req) => (
              <tr key={req.id}>
                <td className="border px-3 py-4 text-center">{req.id}</td>
                <td className="border px-3 py-4 text-center">{req.description}</td>
                <td className="border px-3 py-4 text-center">{req.status}</td>
                <td className="border px-3 py-4 text-center">
                  {req.createdAt && format(new Date(req.createdAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-3 py-4 text-center">{req.citizenName}</td>
                <td className="border px-3 py-4 text-center">{req.category}</td>
                <td className="border px-3 h-full">
                  <UpdateComplaintStatus
                    complaintId={req.id}
                    currentStatus={req.status}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
