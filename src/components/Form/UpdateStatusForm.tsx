import React from "react";

export default function UpdateStatusForm({
  requestId,
  currentStatus,
}: {
  requestId: number;
  currentStatus: string;
}) {
  return (
    <form action={`/admin/request/${requestId}/update-status`} method="POST">
      <select
        name="status"
        defaultValue={currentStatus}
        className="border rounded px-2 py-1 mr-2"
      >
        <option value="pending">Pending</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Update
      </button>
    </form>
  );
}
