import { getApprovedServiceProvider, getUserSession } from "@/lib/api";
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
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pending.map((req: any) => (
            <tr key={req.id}>
              <td className="border px-3 py-2 text-center">{req.id}</td>
              <td className="border px-3 py-2 text-center">{req.name}</td>
              <td className="border px-3 py-2 text-center">{req.email}</td>
              <td className="border px-3 py-2 text-center"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
