import { getAllComplaints, getUserSession } from "@/lib/api";
import { format } from "date-fns";
import UpdateComplaintStatus from "../Form/UpdateComplaintStauts";
import CategoryFilter from "../CategoryFilter";

export interface PageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ManageComplaint({ searchParams }: PageProps) {
  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;

  const params = await searchParams;
  const category = params.category || "All";
  const categories = [
    "All",
    "request",
    "offer",
    "aid_related",
    "medical_help",
    "medical_products",
    "search_and_rescue",
    "security",
    "military",
    "water",
    "food",
    "shelter",
    "clothing",
    "money",
    "missing_people",
    "refugees",
    "death",
    "other_aid",
    "infrastructure_related",
    "transport",
    "buildings",
    "electricity",
    "tools",
    "hospitals",
    "shops",
    "aid_centers",
    "other_infrastructure",
    "weather_related",
    "floods",
    "storm",
    "fire",
    "earthquake",
    "cold",
    "other_weather",
    "direct_report",
  ];
  const complaints = await getAllComplaints(category, session.accessToken);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-3">Manage Complaints</h2>
      <CategoryFilter selectedCategory={category} categories={categories} />
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
