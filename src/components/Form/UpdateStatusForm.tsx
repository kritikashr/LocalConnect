import React from "react";
import { handleRequestStatus } from "../Admin/action";

export default function UpdateStatusForm({
  requestId,
  currentStatus,
}: {
  requestId: number;
  currentStatus: string;
}) {
  return (
    <form action={handleRequestStatus} className="flex gap-2 w-full justify-center">
      <input type="hidden" name="requestId" value={requestId}/>
      <select
        name="currentStatus"
        defaultValue={currentStatus}
        className="border rounded px-2 py-1"
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
