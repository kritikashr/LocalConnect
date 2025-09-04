import { getAllUsers, getUserSession } from "@/lib/api";
import { handleDeleteUsers } from "../Admin/action";

export default async function RecentUsers() {
  const session = await getUserSession();

  if (!session || typeof session.accessToken !== "string") return <p>Unauthorized</p>;

  // Fetch all users (or you can create an endpoint for just recent users)
  let users = await getAllUsers("All", session.accessToken);

  // Sort by creation date descending (most recent first) and take the latest 5
  users = users
    .reverse()
    .slice(0, 1);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-3 py-4">ID</th>
            <th className="border px-3 py-4">Name</th>
            <th className="border px-3 py-4">Email</th>
            <th className="border px-3 py-4">Role</th>
            <th className="border px-3 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="border px-3 py-4 text-center">{user.id}</td>
              <td className="border px-3 py-4 text-center">{user.name}</td>
              <td className="border px-3 py-4 text-center">{user.email}</td>
              <td className="border px-3 py-4 text-center">{user.role}</td>
              <td className="border px-3 py-4 text-center">
                <form action={handleDeleteUsers}>
                  <input type="hidden" name="userId" value={user.id} />
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
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
