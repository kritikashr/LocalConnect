import { getAllUsers, getUserSession } from "@/lib/api";
import { handleDeleteUsers } from "./action";
import { RoleDropdown } from "../ui/RoleDropdown";

export default async function ManageUser() {
  const session = await getUserSession();

  // If session is null or doesn't have an accessToken, unauthorized
  if (!session || typeof session.accessToken !== "string")
    return <p>Unauthorized</p>;

  const users = await getAllUsers(session.accessToken);


  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <RoleDropdown/>
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Name</th>
            <th className="border px-3 py-4">Email</th>
            <th className="border px-3 py-4">Role</th>
            <th className="border px-3 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((req: any) => (
            <tr key={req.id}>
              <td className="border px-3 py-4 text-center">{req.id}</td>
              <td className="border px-3 py-4 text-center">{req.name}</td>
              <td className="border px-3 py-4 text-center">{req.email}</td>
              <td className="border px-3 py-4 text-center">{req.role}</td>
              <td className="border px-3 h-full text-center">
                <form action={handleDeleteUsers}>
                  <input type="hidden" name="userId" value={req.id} />
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
