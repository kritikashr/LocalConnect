import { getApprovedServiceProvider, getUserSession } from "@/lib/api";
import { handleDelete } from "./action";
import { ClockFading } from "lucide-react";
export default async function ApprovedProvider() {
  const session = await getUserSession();
  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;

  const pending = await getApprovedServiceProvider(session.accessToken);

  return (
    <div className="py-4 w-full">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Name</th>
            <th className="border px-3 py-4">Email</th>
            <th className="border px-3 py-4">Phone Number</th>
            <th className="border px-3 py-4">Category</th>
            <th className="border px-3 py-4">Experience</th>
            <th className="border px-3 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {pending.map((req: any) => (
            <tr key={req.id}>
              <td className="border px-3 py-4 text-center">{req.id}</td>
              <td className="border px-3 py-4 text-center">{req.name}</td>
              <td className="border px-3 py-4 text-center">{req.email}</td>
              <td className="border px-3 py-4 text-center">{req.phoneNumber}</td>
              <td className="border px-3 py-4 text-center">{req.category}</td>
              <td className="border px-3 py-4 text-center">
                {req.experienceYear}
              </td>
              <td className="border py-3 flex justify-center gap-5 w-full h-full ">
                <form action={handleDelete}>
                  <input type="hidden" name="providerId" value={req.userId} />
                  <button className="bg-red-600 text-white px-3 py-1 rounded ">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
